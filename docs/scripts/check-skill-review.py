"""Check selected navigation, case-study return and enlarged text on split pages."""
import json,datetime,subprocess,hashlib
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[2];out=root/'docs/quality/skill-review';out.mkdir(exist_ok=True)
base='http://localhost:3001'
paths=['/','/work','/process','/pricing','/faq','/about','/projects','/experience','/work/pricele']
report={'skillRevision':'16dbaaeb4128c42c32a584c13abb99fda372ed85','sourceFiles':{file:hashlib.sha256((root/file).read_bytes()).hexdigest() for file in ['app/service.css','components/service/NavLinks.tsx','components/service/ServiceNav.tsx','components/service/PricingRows.tsx','app/work/[slug]/page.tsx']},'sourceRevision':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'capturedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'states':[],'navigation':[]}
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page();report['browser']=b.version
 for route in paths:
  page.goto(base+route,wait_until='networkidle')
  current=page.locator('nav a[aria-current]');expected=route if route in ['/work','/process','/pricing','/about'] else '/work' if route.startswith('/work/') else '/about' if route in ['/projects','/experience'] else None
  assert current.count()==(1 if expected else 0)
  if expected:
   assert current.get_attribute('href')==expected
   assert 'underline' in current.evaluate('e=>getComputedStyle(e).textDecorationLine')
  report['navigation'].append({'route':route,'selected':expected})
  for theme in ['light','dark']:
   for width in [320,375,1280]:
    page.set_viewport_size({'width':width,'height':900});page.emulate_media(color_scheme=theme,reduced_motion='reduce')
    page.goto(base+route,wait_until='networkidle');page.evaluate('document.fonts.ready')
    page.evaluate('''()=>{const entries=Array.from(document.querySelectorAll('body,body *')).map(e=>({e,size:parseFloat(getComputedStyle(e).fontSize),line:getComputedStyle(e).lineHeight}));for(const {e,size,line} of entries){e.style.fontSize=size*2+'px';if(line!=='normal')e.style.lineHeight=parseFloat(line)*2+'px'}}''')
    overflow=page.evaluate('document.documentElement.scrollWidth>innerWidth')
    name=route.strip('/').replace('/','-') or 'home'
    if width==375 and route in ['/pricing','/work','/about','/work/pricele']:
     page.screenshot(path=str(out/f'{name}-{theme}-200.png'),full_page=True)
    report['states'].append({'route':route,'theme':theme,'width':width,'textScale':2,'overflow':overflow,'actualBackground':page.locator('body').evaluate('e=>getComputedStyle(e).backgroundColor')})
 page.goto(base+'/work/pricele',wait_until='networkidle');page.get_by_role('link',name='Back to work',exact=True).focus();page.keyboard.press('Enter');page.wait_for_url(base+'/work');report['keyboardReturn']=True
 b.close()
(out/'checks.json').write_text(json.dumps(report,indent=2))
failures=[s for s in report['states'] if s['overflow']]
print(json.dumps({'states':len(report['states']),'failures':failures,'keyboardReturn':report['keyboardReturn']},indent=2))
assert not failures
