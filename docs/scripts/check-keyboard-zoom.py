"""Walk page controls with Tab and check doubled rendering and reduced motion."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[2]
report={'keyboard':[], 'zoom':[], 'reducedMotion':[]}
paths=['/','/about','/work','/work/pricele','/audit/start','/privacy','/terms','/blog']
with sync_playwright() as p:
 b=p.chromium.launch()
 page=b.new_page(viewport={'width':1280,'height':900},reduced_motion='reduce')
 for route in paths:
  page.goto('http://127.0.0.1:3001'+route,wait_until='networkidle')
  count=page.locator('a[href],button:not([disabled]),input:not([disabled]):not([tabindex="-1"]),select,textarea,summary').count()
  visited=[]
  for _ in range(count+3):
   page.keyboard.press('Tab')
   item=page.evaluate('''()=>{const e=document.activeElement;const s=getComputedStyle(e);return {tag:e.tagName,name:e.textContent.trim().slice(0,70)||e.getAttribute('aria-label')||e.name,outline:s.outlineStyle,outlineWidth:s.outlineWidth}}''')
   if item['tag']=='BODY':continue
   assert item['outline']!='none' and item['outlineWidth']!='0px', (route,item)
   visited.append(item)
  report['keyboard'].append({'route':route,'tabStops':visited})
  page.evaluate('document.documentElement.style.zoom="2"')
  overflow=page.evaluate('document.documentElement.scrollWidth>document.documentElement.clientWidth')
  report['zoom'].append({'route':route,'cssZoom':2,'viewport':1280,'overflow':overflow})
  assert not overflow,route
  durations=page.evaluate('''()=>Array.from(document.querySelectorAll('*')).flatMap(e=>{const s=getComputedStyle(e);return [s.transitionDuration,s.animationDuration].flatMap(v=>v.split(',').map(t=>parseFloat(t)*(t.trim().endsWith('ms')?1:1000)))})''')
  maximum=max(durations)
  assert maximum<=1,(route,maximum)
  report['reducedMotion'].append({'route':route,'maximumDurationMs':maximum})
 b.close()
(root/'docs/quality/keyboard-zoom.json').write_text(json.dumps(report,indent=2))
print(json.dumps({'keyboardPages':len(report['keyboard']),'zoomPages':len(report['zoom']),'reducedMotionPages':len(report['reducedMotion'])}))
