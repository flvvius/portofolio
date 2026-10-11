"""Test form contracts with a local Resend substitute, never real mail or payment."""
import json, os, subprocess, threading, time, urllib.request
from pathlib import Path
from http.server import BaseHTTPRequestHandler, HTTPServer
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[2];requests=[];mode={'value':'success'}
class Provider(BaseHTTPRequestHandler):
 def do_POST(self):
  data=json.loads(self.rfile.read(int(self.headers['Content-Length'])))
  requests.append(data)
  self.send_response(200 if mode['value']=='success' else 500);self.send_header('Content-Type','application/json');self.end_headers();self.wfile.write(json.dumps({'id':'local-fixture-id'} if mode['value']=='success' else {'error':'fixture failure'}).encode())
 def log_message(self,*args):pass
provider=HTTPServer(('127.0.0.1',3130),Provider);threading.Thread(target=provider.serve_forever,daemon=True).start()
env={**os.environ,'RESEND_API_KEY':'local-fixture-key','FORM_FROM_EMAIL':'test@example.com','FORM_TO_EMAIL':'inbox@example.com','RESEND_API_URL':'http://127.0.0.1:3130/emails','NEXT_PUBLIC_STRIPE_AUDIT_URL':'https://buy.stripe.com/test_fixture','NEXT_PUBLIC_CAL_URL':'https://cal.com/fixture/15min'}
log=open('/private/tmp/service-form-dev.log','w');server=subprocess.Popen(['npm','run','dev','--','--webpack','--hostname','127.0.0.1','--port','3131'],cwd=root,env=env,stdout=log,stderr=subprocess.STDOUT,start_new_session=True)
base='http://127.0.0.1:3131';report={}
try:
 for _ in range(90):
  try:urllib.request.urlopen(base+'/audit/start',timeout=1);break
  except Exception:time.sleep(1)
 with sync_playwright() as p:
  b=p.chromium.launch();context=b.new_context();context.add_init_script('window.recordedEvents=[];window.umami={track:(n,d)=>window.recordedEvents.push({name:n,data:d})}')
  page=context.new_page();page.goto(base+'/',wait_until='networkidle');page.route('https://buy.stripe.com/**',lambda r:r.abort());page.route('https://cal.com/**',lambda r:r.abort());
  page.evaluate('document.addEventListener("click",e=>{const a=e.target.closest("a");if(a&&(a.href.includes("buy.stripe.com")||a.href.includes("cal.com")))e.preventDefault()})');
  assert page.get_by_role('link',name='Get a EUR 300 taste audit',exact=True).first.get_attribute('href')=='https://buy.stripe.com/test_fixture'
  page.get_by_role('link',name='Get a EUR 300 taste audit',exact=True).first.click(no_wait_after=True);page.wait_for_timeout(200)
  report['auditClick']=page.evaluate('recordedEvents.some(e=>e.name==="audit_click")')
  page.goto(base+'/pricing',wait_until='networkidle');page.evaluate('document.addEventListener("click",e=>{const a=e.target.closest("a");if(a&&a.href.includes("cal.com"))e.preventDefault()})');page.get_by_role('link',name='Book a 15-min call').first.click(no_wait_after=True);page.wait_for_timeout(200);report['callClick']=page.evaluate('recordedEvents.some(e=>e.name==="call_click")')
  page.goto(base+'/pricing',wait_until='networkidle');page.locator('#waitlist-email').fill('founder@example.com');page.get_by_role('button',name='Join the waitlist',exact=True).click();page.get_by_role('status').filter(has_text="You're on the waitlist").wait_for();report['waitlistSubmit']=page.evaluate('recordedEvents.some(e=>e.name==="waitlist_submit")')
  assert requests[-1]['to']==['inbox@example.com'] and requests[-1]['reply_to']=='founder@example.com'
  page.goto(base+'/audit/start',wait_until='networkidle')
  values={'name':'Test founder','email':'founder@example.com','company':'Fixture company','appUrl':'https://example.com/app','repoUrl':'https://example.com/repo','flow':'Sign up and create a project','goal':'Make the next step clear','stack':'React, Tailwind','loomUrl':'https://example.com/video','contact':'Email'}
  for key,value in values.items():page.locator('#intake-'+key).fill(value)
  page.get_by_role('button',name='Send audit intake').click();page.get_by_role('status').filter(has_text='Your intake has been sent').wait_for();report['intakeSubmit']=page.evaluate('recordedEvents.some(e=>e.name==="intake_submit")');assert all(value in requests[-1]['text'] for value in values.values())
  # Missing fields and wrong origin must never reach the provider.
  count=len(requests)
  invalid=page.request.post(base+'/api/forms',headers={'Origin':base,'x-forwarded-for':'fixture-validation'},data={'kind':'intake','email':'bad','appUrl':'javascript:alert(1)'})
  assert invalid.status==422 and 'email' in invalid.json()['errors'];report['serverValidation']=True
  wrong=page.request.post(base+'/api/forms',headers={'Origin':'https://example.net'},data={'kind':'waitlist','email':'founder@example.com'});assert wrong.status==403;assert len(requests)==count;report['originProtection']=True
  trap=page.request.post(base+'/api/forms',headers={'Origin':base,'x-forwarded-for':'fixture-trap'},data={'kind':'waitlist','email':'founder@example.com','website':'bot'});assert trap.status==400;report['honeypot']=True
  mode['value']='failure';page.goto(base+'/pricing',wait_until='networkidle');page.locator('#waitlist-email').fill('failure@example.com');page.get_by_role('button',name='Join the waitlist',exact=True).click();page.get_by_role('status').filter(has_text="We couldn't send").wait_for();assert not page.evaluate('recordedEvents.some(e=>e.name==="waitlist_submit")');report['providerFailureNoSuccessEvent']=True
  statuses=[page.request.post(base+'/api/forms',headers={'Origin':base,'x-forwarded-for':'fixture-rate'},data={'kind':'waitlist','email':'rate@example.com'}).status for _ in range(6)]
  assert statuses[-1]==429;report['rateLimit']=True
  page.goto(base+'/work',wait_until='networkidle');page.locator('#proof-pricele').scroll_into_view_if_needed();page.wait_for_timeout(200);assert page.evaluate('recordedEvents.some(e=>e.name==="before_after_view")');report['comparisonView']=True
  b.close()
 report['providerRequests']=len(requests);report['scope']='Local contract fixtures only. No Stripe payment and no actual email delivery.'
 (root/'docs/quality/form-checks.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2));assert all(report[k] for k in ['auditClick','callClick','intakeSubmit','waitlistSubmit'])
finally:
 import signal
 os.killpg(server.pid,signal.SIGTERM);server.wait(timeout=10);provider.shutdown();log.close()
