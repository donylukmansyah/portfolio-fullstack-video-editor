"""Capture README screenshots from the local dev server (http://localhost:3001)."""
import os
from playwright.sync_api import sync_playwright

OUT = os.path.abspath("docs/screenshots")
os.makedirs(OUT, exist_ok=True)


def scroll_to(page, sel):
    page.evaluate(
        "(sel) => { const el = document.querySelector(sel); if (el) el.scrollIntoView({block:'center'}); }",
        sel,
    )
    page.wait_for_timeout(900)


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    # 1. Home — hero + portfolio grid (light)
    page.goto("http://localhost:3001/", wait_until="networkidle")
    page.wait_for_timeout(1200)
    page.screenshot(path=f"{OUT}/home.png", full_page=True)
    print("home.png ok")

    # 2. Home — dark mode: navbar is hidden until scroll, then toggle
    page.mouse.wheel(0, 600)
    page.wait_for_timeout(800)
    page.locator("#theme-toggle-button:visible").click()
    page.wait_for_timeout(900)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(600)
    page.screenshot(path=f"{OUT}/home-dark.png", full_page=True)
    print("home-dark.png ok")

    # 3. Portfolio detail modal (back to light first)
    page.locator("#theme-toggle-button:visible").click()
    page.wait_for_timeout(500)
    scroll_to(page, "#portfolio-section .portfolio-card")
    page.locator("#portfolio-section .portfolio-card").first.click()
    page.wait_for_timeout(900)
    page.screenshot(path=f"{OUT}/portfolio-modal.png")
    page.keyboard.press("Escape")
    page.wait_for_timeout(500)
    print("portfolio-modal.png ok")

    # 4. Contact
    page.goto("http://localhost:3001/contact", wait_until="networkidle")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{OUT}/contact.png", full_page=True)
    print("contact.png ok")

    # 5. Resume
    page.goto("http://localhost:3001/resume", wait_until="networkidle")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{OUT}/resume.png", full_page=True)
    print("resume.png ok")

    browser.close()
print("done")