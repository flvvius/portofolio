"""Check production routes, links, accessibility and responsive behavior."""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[2]
out=root/'docs/quality';out.mkdir(exist_ok=True)
base='http://127.0.0.1:3001'
report={'routes':[], 'responsive':[], 'axe':[], 'errors':[], 'links':[], 'fragments':[]}
paths=['/','/about','/work','/work/pricele','/audit/start','/privacy','/terms','/blog','/blog/exploring-something-new','/styleguide']
with sync_playwright() as p:
 b=p.chromium.launch();report['browser']=b.version
 context=b.new_context(viewport={'width':1280,'height':900},color_scheme='light')
 page=context.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)))
 for route in paths:
  response=page.goto(base+route,wait_until='networkidle');assert response.status==200
  report['routes'].append({'route':route,'status':response.status})
  await_font=page.evaluate('document.fonts.ready')
  page.add_script_tag(path=str(root/'node_modules/axe-core/axe.min.js'))
  result=page.evaluate('async()=>{const r=await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21a","wcag21aa"]}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))}')
  report['axe'].append({'route':route,'violations':result})
  for href in page.locator('a[href]').evaluate_all('(a)=>a.map(e=>e.getAttribute("href"))'):
   if href.startswith('/'):
    dest=href.split('#')[0]
    if dest not in report['links']:report['links'].append(dest)
  if route in ['/about','/work/pricele','/audit/start']:
   page.screenshot(path=str(root/'docs/secondary'/f'{route.strip("/").replace("/","-")}-1280.png'),full_page=True)
 for href in report['links']:
  response=page.request.get(base+href);assert response.status==200, (href,response.status)
 for width in [375,768,1280,1536]:
  for theme in ['light','dark']:
   page.set_viewport_size({'width':width,'height':900});page.emulate_media(color_scheme=theme,reduced_motion='reduce')
   for route in ['/', '/about','/work/pricele','/audit/start','/privacy','/terms']:
    page.goto(base+route,wait_until='networkidle');page.evaluate('document.fonts.ready')
    check=page.evaluate('({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,background:getComputedStyle(document.body).backgroundColor,font:getComputedStyle(document.body).fontFamily})')
    report['responsive'].append({'route':route,'theme':theme,**check});assert not check['overflow'],(route,width,theme)
    if route=='/' and width in [375,1280]:
     for y in range(0,page.evaluate('document.body.scrollHeight'),600):page.evaluate('(y)=>scrollTo(0,y)',y);page.wait_for_timeout(40)
     page.evaluate('scrollTo(0,0)');page.screenshot(path=str(root/'docs/homepage'/f'home-{width}-{theme}.png'),full_page=True)
     page.screenshot(path=str(root/'docs/homepage'/f'hero-{width}-{theme}.png'))
   page.goto(base+'/',wait_until='networkidle');page.add_script_tag(path=str(root/'node_modules/axe-core/axe.min.js'))
   result=page.evaluate('async()=>{const r=await axe.run();return r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))}')
   report['axe'].append({'route':'/','theme':theme,'width':width,'violations':result})
 for old,dest in [('the-shelf','projects'),('the-record-player','experience'),('the-door','contact')]+[(f'note-{slug}',f'note-{slug}') for slug in ['miez','commit-ink','sisc','agrobot','pricele','joke-bot']]:
  page.goto(base+'/#'+old,wait_until='networkidle');page.wait_for_url('**/about#'+dest);assert page.locator('#'+dest).count()==1
  report['fragments'].append({'from':'/#'+old,'to':'/about#'+dest})
 for frag in ['', '#books','#film','#art','#places','#aesthetics']:
  response=page.request.get(base+'/the-back-room',max_redirects=0);assert response.status==301
  page.goto(base+'/the-back-room'+frag,wait_until='networkidle');page.wait_for_url('**/about#'+(frag[1:] or 'interests'))
  report['fragments'].append({'from':'/the-back-room'+frag,'to':page.url.replace(base,'')})
 for slug in ['onboarding-concept','dashboard-concept']:
  response=page.request.get(base+'/work/'+slug);assert response.status==404
 report['draftsExcluded']=True
 page.goto(base+'/',wait_until='networkidle');page.keyboard.press('Tab');assert page.locator('.service-skip').evaluate('(e)=>e===document.activeElement')
 page.keyboard.press('Enter');assert page.locator('#main').evaluate('(e)=>e===document.activeElement')
 page.locator('summary').first.focus();page.keyboard.press('Enter');assert page.locator('details').first.get_attribute('open') is not None
 page.keyboard.press('Enter');assert page.locator('details').first.get_attribute('open') is None
 report['keyboardSkipAndFaq']=True
 page.locator('#site-theme').select_option('dark');page.reload(wait_until='networkidle');assert page.locator('html').get_attribute('data-theme')=='dark'
 assert page.locator('#site-theme').input_value()=='dark';report['themePersists']=True
 page.locator('#site-theme').select_option('auto')
 page.set_viewport_size({'width':640,'height':900});page.goto(base+'/',wait_until='networkidle');page.add_style_tag(content='html{font-size:200%}');report['textEnlargementOverflow']=page.evaluate('document.documentElement.scrollWidth>innerWidth')
 assert not report['textEnlargementOverflow']
 page.goto(base+'/',wait_until='networkidle');page.add_style_tag(content='*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}');report['textSpacingOverflow']=page.evaluate('document.documentElement.scrollWidth>innerWidth');assert not report['textSpacingOverflow']
 page=context.new_page();page.route('**/*.{woff,woff2,ttf}',lambda r:r.abort());page.goto(base+'/',wait_until='networkidle');report['fontFallbackOverflow']=page.evaluate('document.documentElement.scrollWidth>innerWidth');assert not report['fontFallbackOverflow']
 page=context.new_page();page.emulate_media(forced_colors='active');page.goto(base+'/',wait_until='networkidle');page.keyboard.press('Tab');report['forcedColorFocus']=page.locator('.service-skip').evaluate('(e)=>getComputedStyle(e).outlineStyle');assert report['forcedColorFocus']!='none'
 nojs=b.new_context(java_script_enabled=False,viewport={'width':375,'height':812});page=nojs.new_page();page.goto(base+'/',wait_until='networkidle');assert page.get_by_role('heading',level=1).is_visible();assert page.locator('#pricing').is_visible();report['noScriptReading']=True
 response=page.request.get(base+'/opengraph-image');assert response.status==200 and response.headers['content-type'].startswith('image/png');report['ogStatus']=response.status
 (out/'opengraph.png').write_bytes(response.body())
 report['missingConfigurationStatus']=page.request.post(base+'/api/forms',headers={'Origin':base},data={'kind':'waitlist','email':'check@example.com'}).status
 assert report['missingConfigurationStatus']==503
 b.close()
out.joinpath('checks.json').write_text(json.dumps(report,indent=2))
print(json.dumps({'routes':len(report['routes']),'links':len(report['links']),'responsive':len(report['responsive']),'violations':[r for r in report['axe'] if r['violations']],'errors':report['errors'],'other':{k:v for k,v in report.items() if k not in ['routes','responsive','axe','errors','links','fragments']}},indent=2))
assert not report['errors']
assert not any(r['violations'] for r in report['axe'])
