"""Capture and check the Phase 1 browser specimen."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

out = Path(__file__).resolve().parents[1] / 'styleguide'
out.mkdir(exist_ok=True)
report = {'checks': [], 'errors': []}
with sync_playwright() as p:
    browser = p.chromium.launch()
    report['browser'] = browser.version
    for width in [375, 768, 1280, 1536]:
        for theme in ['light', 'dark']:
            page = browser.new_page(viewport={'width': width, 'height': 900}, color_scheme=theme, reduced_motion='reduce')
            page.on('pageerror', lambda e: report['errors'].append(str(e)))
            response = page.goto('http://127.0.0.1:3000/styleguide', wait_until='networkidle')
            page.evaluate('document.fonts.ready')
            page.locator('#service-theme').select_option(theme)
            page.locator('summary').first.focus()
            page.keyboard.press('Enter')
            assert page.locator('details').first.get_attribute('open') is not None
            page.keyboard.press('Enter')
            assert page.locator('details').first.get_attribute('open') is None
            check = page.evaluate('''() => ({
                width: innerWidth,
                overflow: document.documentElement.scrollWidth > innerWidth,
                theme: document.querySelector('.service-site').dataset.theme,
                background: getComputedStyle(document.querySelector('.service-site')).backgroundColor,
                font: getComputedStyle(document.querySelector('.service-site')).fontFamily,
                fonts: Array.from(document.fonts).filter(f=>f.status==='loaded').map(f=>f.family),
                noindex: document.querySelector('meta[name="robots"]').content.includes('noindex'),
                motion: getComputedStyle(document.querySelector('.service-button')).transitionDuration,
                comparisonColumns: getComputedStyle(document.querySelector('.service-pair')).gridTemplateColumns
            })''')
            assert response.status == 200 and not check['overflow'] and check['noindex']
            report['checks'].append(check)
            if width in [375, 1280]:
                page.evaluate('document.activeElement.blur()')
                page.evaluate('window.scrollTo(0,0)')
                page.add_style_tag(content='nextjs-portal { display: none !important; }')
                page.screenshot(path=str(out / f'styleguide-{width}-{theme}.png'), full_page=True)
            page.close()
    page = browser.new_page(viewport={'width': 640, 'height': 900})
    page.goto('http://127.0.0.1:3000/styleguide', wait_until='networkidle')
    page.add_style_tag(content='html { font-size: 200%; }')
    report['textEnlargementOverflow'] = page.evaluate('document.documentElement.scrollWidth > innerWidth')
    assert not report['textEnlargementOverflow']
    sitemap = page.request.get('http://127.0.0.1:3000/sitemap.xml').text()
    assert '/styleguide' not in sitemap
    report['sitemapExcluded'] = True
    page.close()
    page = browser.new_page(java_script_enabled=False, color_scheme='dark')
    response = page.goto('http://127.0.0.1:3000/styleguide', wait_until='networkidle')
    assert response.status == 200 and page.locator('h1').is_visible()
    report['noScriptContent'] = True
    browser.close()
out.joinpath('checks.json').write_text(json.dumps(report, indent=2))
print(json.dumps(report, indent=2))
assert not report['errors']
