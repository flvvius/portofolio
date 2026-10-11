"""Verify the shorter multipage site, navigation, legacy URLs and readable layouts."""
import json,re
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[2]
base='http://localhost:3001'
paths=['/','/work','/process','/pricing','/faq','/about','/projects','/experience','/work/pricele']
report={'beforeWords':{'/':1077,'/about':865,'/work':62,'/work/pricele':388},'afterWords':{},'states':[],'links':[],'legacy':[]}
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page()
 for route in paths:
  response=page.goto(base+route,wait_until='networkidle');assert response.status==200
  report['afterWords'][route]=len(re.findall(r'\S+',page.locator('main').text_content()))
  assert "Things I didn't make" not in page.locator('main').text_content()
  assert all('#' not in href for href in page.locator('nav[aria-label="Main navigation"] a').evaluate_all('es=>es.map(e=>e.getAttribute("href"))'))
  for href in page.locator('a[href]').evaluate_all('es=>es.map(e=>e.getAttribute("href"))'):
   if href.startswith('/') and not href.startswith('//'):
    target=href.split('#')[0]
    if target not in report['links']:report['links'].append(target)
  for width in [375,768,1280,1536]:
   for theme in ['light','dark']:
    page.set_viewport_size({'width':width,'height':900});page.emulate_media(color_scheme=theme,reduced_motion='reduce')
    overflow=page.evaluate('document.documentElement.scrollWidth>innerWidth');assert not overflow,(route,width,theme)
    page.add_script_tag(path=str(root/'node_modules/axe-core/axe.min.js'))
    violations=page.evaluate('async()=>{const r=await axe.run();return r.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))}')
    assert not violations,(route,width,theme,violations)
    report['states'].append({'route':route,'width':width,'theme':theme,'overflow':overflow,'axeViolations':violations})
  if route in ['/','/about','/pricing']:
   page.set_viewport_size({'width':375,'height':812});page.emulate_media(color_scheme='light');page.screenshot(path=str(root/'docs/quality'/f'pages-{route.strip("/") or "home"}-375.png'),full_page=True)
 for href in report['links']:
  assert page.request.get(base+href).status==200,href
 for old,new in [('/#work','/work'),('/#process','/process'),('/#pricing','/pricing'),('/#the-shelf','/projects'),('/#the-record-player','/experience'),('/#note-pricele','/projects#note-pricele'),('/about#projects','/projects'),('/about#experience','/experience'),('/about#note-miez','/projects#note-miez'),('/the-back-room#books','/about')]:
  page.goto(base+old,wait_until='networkidle');page.wait_for_url(base+new);report['legacy'].append({'from':old,'to':new})
 assert page.request.get(base+'/the-back-room',max_redirects=0).status==301
 page.goto(base+'/faq',wait_until='networkidle');page.locator('summary').first.focus();page.keyboard.press('Enter');assert page.locator('details').first.get_attribute('open') is not None
 page.goto(base+'/',wait_until='networkidle');page.keyboard.press('Tab');assert page.locator('.service-skip').evaluate('e=>e===document.activeElement')
 page.keyboard.press('Enter');assert page.locator('main').evaluate('e=>e===document.activeElement')
 assert page.request.get(base+'/sitemap.xml').text().count('/pricing')==1
 b.close()
report['homepageReductionPercent']=round(100*(1-report['afterWords']['/']/report['beforeWords']['/']),1)
report['totalReductionPercent']=round(100*(1-sum(report['afterWords'].values())/sum(report['beforeWords'].values())),1)
assert report['totalReductionPercent']>=25,report['totalReductionPercent']
(root/'docs/quality/page-structure.json').write_text(json.dumps(report,indent=2))
print(json.dumps({k:v for k,v in report.items() if k not in ['states','links','legacy']},indent=2))
