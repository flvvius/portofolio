"""Capture tagged baseline and current service site at matched viewports."""
from pathlib import Path
import json, datetime, subprocess
from playwright.sync_api import sync_playwright
out=Path(__file__).resolve().parents[1]/'teardown-001'
report={'createdAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'baseline':'v1-portfolio / b1ec959','after':'refactor/service-site','viewports':[],'notes':['The original site had no pricing section. Its experience/writing area is the before comparison for the new pricing section.','Baseline uses the tagged application source in an isolated temporary checkout.','Next development indicators are hidden only for baseline captures. No application content is removed.']}
report['afterSourceRevision']=subprocess.check_output(['git','rev-parse','HEAD'],cwd=out.parents[1],text=True).strip()
report['baselineNextVersion']='16.0.7'
report['afterNextVersion']=json.loads((out.parents[1]/'node_modules/next/package.json').read_text())['version']
with sync_playwright() as p:
 b=p.chromium.launch();report['browser']=b.version
 for width,height in [(375,812),(1280,900)]:
  for version,base in [('before','http://127.0.0.1:3122'),('after','http://127.0.0.1:3001')]:
   context=b.new_context(viewport={'width':width,'height':height},color_scheme='light',reduced_motion='reduce')
   page=context.new_page();response=page.goto(base,wait_until='networkidle',timeout=120000);assert response.status==200
   page.evaluate('document.fonts.ready');page.add_style_tag(content='nextjs-portal{display:none!important}')
   for y in range(0,page.evaluate('document.body.scrollHeight'),600):page.evaluate('(y)=>scrollTo(0,y)',y);page.wait_for_timeout(50)
   page.evaluate('scrollTo(0,0)');page.wait_for_timeout(200)
   page.screenshot(path=str(out/f'hero-{width}-{version}.png'))
   if width==375:page.screenshot(path=str(out/f'mobile-{version}.png'),full_page=True)
   target='#the-record-player' if version=='before' else '#pricing'
   page.locator(target).scroll_into_view_if_needed();page.evaluate('(selector)=>{const y=document.querySelector(selector).getBoundingClientRect().top+scrollY;scrollTo(0,y)}',target);page.wait_for_timeout(200)
   page.screenshot(path=str(out/f'pricing-{width}-{version}.png'))
   report['viewports'].append({'version':version,'width':width,'height':height,'status':response.status,'font':page.locator('body').evaluate('(e)=>getComputedStyle(e).fontFamily')})
   context.close()
 b.close()
out.joinpath('capture-manifest.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
