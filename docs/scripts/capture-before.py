"""Capture the unchanged portfolio and record its public route responses."""
from playwright.sync_api import sync_playwright
import json
from pathlib import Path

out = Path(__file__).resolve().parents[1] / 'before'
out.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    report = {'browser': browser.version, 'source': 'http://127.0.0.1:3000', 'captures': []}
    for width, height in [(375, 812), (1280, 900)]:
        page = browser.new_page(viewport={'width': width, 'height': height}, device_scale_factor=1)
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        response = page.goto(report['source'], wait_until='networkidle', timeout=120000)
        page.evaluate('document.fonts.ready')
        for y in range(0, page.evaluate('document.body.scrollHeight'), 500):
            page.evaluate('(y)=>window.scrollTo(0,y)', y)
            page.wait_for_timeout(100)
        page.wait_for_timeout(1000)
        page.evaluate('window.scrollTo(0,0)')
        page.wait_for_timeout(500)
        page.screenshot(path=str(out / f'home-{width}-full.png'), full_page=True)
        page.screenshot(path=str(out / f'home-{width}-hero.png'))
        report['captures'].append({
            'width': width, 'height': height, 'status': response.status, 'errors': errors,
            'font': page.locator('body').evaluate('(e)=>getComputedStyle(e).fontFamily'),
            'fonts': page.evaluate('Array.from(document.fonts).map(f=>({family:f.family,status:f.status}))'),
            'links': page.locator('a').evaluate_all('(a)=>a.map(e=>({text:e.textContent.trim(),href:e.getAttribute("href")}))'),
        })
        page.close()
    page = browser.new_page()
    report['routes'] = []
    for path in ['/blog', '/blog/exploring-something-new', '/the-back-room', '/sitemap.xml', '/robots.txt', '/api/now-playing', '/main.png', '/icon.svg']:
        response = page.goto(report['source'] + path, wait_until='networkidle', timeout=120000)
        report['routes'].append({'path': path, 'status': response.status})
    out.joinpath('capture-report.json').write_text(json.dumps(report, indent=2))
    browser.close()
    print(json.dumps({'captures': [{k: v for k, v in c.items() if k != 'links'} for c in report['captures']], 'routes': report['routes']}, indent=2))
