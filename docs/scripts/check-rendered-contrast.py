"""Measure resolved theme colors and inspect small-screen and doubled-text captures."""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[2]
report={'contrast':[], 'reflow':[], 'doubledText':[]}
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':1280,'height':900})
 for theme in ['light','dark']:
  page.goto('http://127.0.0.1:3001/',wait_until='networkidle')
  page.locator('#site-theme').select_option(theme)
  values=page.evaluate('''()=>{
   const c=document.createElement('canvas');c.width=c.height=1;const ctx=c.getContext('2d');
   function rgb(color){ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);return Array.from(ctx.getImageData(0,0,1,1).data).slice(0,3)}
   function lum(v){return v.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((a,x,i)=>a+x*[.2126,.7152,.0722][i],0)}
   function ratio(a,b){a=lum(rgb(a));b=lum(rgb(b));return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)}
   const body=getComputedStyle(document.body), muted=getComputedStyle(document.querySelector('.service-muted')), button=getComputedStyle(document.querySelector('.service-button')), input=getComputedStyle(document.querySelector('.service-field input'));
   const probe=document.createElement('div');probe.style.color='var(--ring)';document.body.append(probe);const ring=getComputedStyle(probe).color;probe.remove();
   return [{role:'body text',ratio:ratio(body.color,body.backgroundColor),minimum:4.5},{role:'muted text',ratio:ratio(muted.color,body.backgroundColor),minimum:4.5},{role:'button text',ratio:ratio(button.color,button.backgroundColor),minimum:4.5},{role:'input boundary',ratio:ratio(input.borderTopColor,input.backgroundColor),minimum:3},{role:'focus ring',ratio:ratio(ring,body.backgroundColor),minimum:3}]
  }''')
  for value in values:assert value['ratio']>=value['minimum'],(theme,value)
  report['contrast'].append({'theme':theme,'measurements':values})
  page.set_viewport_size({'width':320,'height':812})
  for route in ['/','/about','/work/pricele','/audit/start','/privacy','/terms']:
   page.goto('http://127.0.0.1:3001'+route,wait_until='networkidle')
   overflow=page.evaluate('document.documentElement.scrollWidth>innerWidth')
   assert not overflow,(route,theme)
   report['reflow'].append({'route':route,'theme':theme,'width':320,'overflow':overflow})
  page.set_viewport_size({'width':1280,'height':900});page.goto('http://127.0.0.1:3001/',wait_until='networkidle')
  page.evaluate('''()=>{const entries=Array.from(document.querySelectorAll('body,body *')).map(e=>({e,size:parseFloat(getComputedStyle(e).fontSize),line:getComputedStyle(e).lineHeight}));for(const {e,size,line} of entries){e.style.fontSize=(size*2)+'px';if(line!=='normal')e.style.lineHeight=(parseFloat(line)*2)+'px'}}''')
  overflow=page.evaluate('document.documentElement.scrollWidth>innerWidth');assert not overflow
  prices=page.locator('.service-pricing-row').evaluate_all('''rows=>rows.map(row=>{const price=row.querySelector('.service-price');const range=document.createRange();range.selectNodeContents(price);const text=range.getBoundingClientRect();const next=row.children[1].getBoundingClientRect();return {right:text.right,nextLeft:next.left,stacked:next.top>=text.bottom,overlap:next.top<text.bottom&&text.right>next.left}})''')
  assert not any(price['overlap'] for price in prices), prices
  page.screenshot(path=str(root/'docs/quality'/f'text-200-{theme}.png'),full_page=True)
  report['doubledText'].append({'theme':theme,'overflow':overflow,'prices':prices,'method':'Double each computed font size and pixel line height once, including inherited and explicit sizes.'})
 b.close()
(root/'docs/quality/contrast-reflow.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report['contrast'],indent=2))
