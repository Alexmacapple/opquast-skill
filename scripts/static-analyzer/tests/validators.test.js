/**
 * Tests for Static Heuristic Validators
 * PRD-001 Implementation
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const rulesById = Object.fromEntries(JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'rules', 'opquast-v5.json'), 'utf-8')).rules.map(r => [r.id, r]));
import { STATIC_VALIDATORS, runStaticValidators, getValidatorInfo } from '../validators.js';

describe('Static Validators', () => {
  describe('Rule 3: Meta description', () => {
    it('should pass when meta description exists', () => {
      const html = '<html><head><meta name="description" content="Test page description"></head></html>';
      const result = STATIC_VALIDATORS[3].check(html);
      expect(result.valid).toBe(true);
      expect(result.confidence).toBe(1.0);
    });

    it('should pass with reversed attribute order', () => {
      const html = '<html><head><meta content="Description here" name="description"></head></html>';
      const result = STATIC_VALIDATORS[3].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail when meta description is missing', () => {
      const html = '<html><head><title>Test</title></head></html>';
      const result = STATIC_VALIDATORS[3].check(html);
      expect(result.valid).toBe(false);
      expect(result.details).toContain('manquante');
    });
  });

  describe('Rule 103: Page title', () => {
    it('should pass with valid title', () => {
      const html = '<html><head><title>This is a proper page title</title></head></html>';
      const result = STATIC_VALIDATORS[103].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail when title is missing', () => {
      const html = '<html><head></head></html>';
      const result = STATIC_VALIDATORS[103].check(html);
      expect(result.valid).toBe(false);
      expect(result.details).toContain('manquante');
    });

    it('should fail when title is empty', () => {
      const html = '<html><head><title></title></head></html>';
      const result = STATIC_VALIDATORS[103].check(html);
      expect(result.valid).toBe(false);
      expect(result.details).toContain('vide');
    });

    it('should fail when title is too short', () => {
      const html = '<html><head><title>Hi</title></head></html>';
      const result = STATIC_VALIDATORS[103].check(html);
      expect(result.valid).toBe(false);
      expect(result.confidence).toBe(0.8);
    });
  });

  describe('Rule 130: HTML lang attribute', () => {
    it('should pass with lang attribute', () => {
      const html = '<html lang="fr"><head></head></html>';
      const result = STATIC_VALIDATORS[130].check(html);
      expect(result.valid).toBe(true);
    });

    it('should pass with full locale', () => {
      const html = '<html lang="en-US"><head></head></html>';
      const result = STATIC_VALIDATORS[130].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail without lang attribute', () => {
      const html = '<html><head></head></html>';
      const result = STATIC_VALIDATORS[130].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 193: Viewport zoom', () => {
    it('should pass with normal viewport', () => {
      const html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head></html>';
      const result = STATIC_VALIDATORS[193].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail when user-scalable=no', () => {
      const html = '<html><head><meta name="viewport" content="width=device-width, user-scalable=no"></head></html>';
      const result = STATIC_VALIDATORS[193].check(html);
      expect(result.valid).toBe(false);
      expect(result.details).toContain('bloque');
    });

    it('should fail when maximum-scale=1', () => {
      const html = '<html><head><meta name="viewport" content="width=device-width, maximum-scale=1.0"></head></html>';
      const result = STATIC_VALIDATORS[193].check(html);
      expect(result.valid).toBe(false);
    });

    it('should pass without viewport (browser default)', () => {
      const html = '<html><head></head></html>';
      const result = STATIC_VALIDATORS[193].check(html);
      expect(result.valid).toBe(true);
      expect(result.confidence).toBe(0.8);
    });
  });

  describe('Rule 125: No autoplay', () => {
    it('should pass without autoplay', () => {
      const html = '<html><body><video src="test.mp4" controls></video></body></html>';
      const result = STATIC_VALIDATORS[125].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail with autoplay on video', () => {
      const html = '<html><body><video src="test.mp4" autoplay></video></body></html>';
      const result = STATIC_VALIDATORS[125].check(html);
      expect(result.valid).toBe(false);
    });

    it('should fail with autoplay on audio', () => {
      const html = '<html><body><audio src="test.mp3" autoplay></audio></body></html>';
      const result = STATIC_VALIDATORS[125].check(html);
      expect(result.valid).toBe(false);
    });

    it('should detect iframe autoplay', () => {
      const html = '<html><body><iframe src="https://youtube.com/embed/abc?autoplay=1"></iframe></body></html>';
      const result = STATIC_VALIDATORS[125].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 2: Copyright info', () => {
    it('should pass with copyright symbol', () => {
      const html = '<html><body><footer>© 2024 Company</footer></body></html>';
      const result = STATIC_VALIDATORS[2].check(html);
      expect(result.valid).toBe(true);
    });

    it('should pass with copyright text', () => {
      const html = '<html><body><p>Copyright 2024</p></body></html>';
      const result = STATIC_VALIDATORS[2].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail without any copyright info', () => {
      const html = '<html><body><p>Hello world</p></body></html>';
      const result = STATIC_VALIDATORS[2].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 15: Privacy policy', () => {
    it('should pass with privacy link', () => {
      const html = '<html><body><a href="/privacy">Privacy Policy</a></body></html>';
      const result = STATIC_VALIDATORS[15].check(html);
      expect(result.valid).toBe(true);
    });

    it('should pass with French privacy link', () => {
      const html = '<html><body><a href="/confidentialite">Politique de confidentialité</a></body></html>';
      const result = STATIC_VALIDATORS[15].check(html);
      expect(result.valid).toBe(true);
    });

    it('should pass with RGPD mention', () => {
      const html = '<html><body><a href="/rgpd">RGPD</a></body></html>';
      const result = STATIC_VALIDATORS[15].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail without privacy link', () => {
      const html = '<html><body><a href="/contact">Contact</a></body></html>';
      const result = STATIC_VALIDATORS[15].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 1: RSS/Atom feed', () => {
    it('should pass with RSS link', () => {
      const html = '<html><head><link rel="alternate" type="application/rss+xml" href="/feed.xml"></head></html>';
      const result = STATIC_VALIDATORS[1].check(html);
      expect(result.valid).toBe(true);
      expect(result.confidence).toBe(1.0);
    });

    it('should pass with Atom feed', () => {
      const html = '<html><head><link type="application/atom+xml" href="/atom.xml"></head></html>';
      const result = STATIC_VALIDATORS[1].check(html);
      expect(result.valid).toBe(true);
    });

    it('should return null when no feed (not applicable)', () => {
      const html = '<html><head></head><body>Hello</body></html>';
      const result = STATIC_VALIDATORS[1].check(html);
      expect(result).toBeNull();
    });
  });

  describe('Rule 6: Publication date', () => {
    it('should pass with datetime attribute', () => {
      const html = '<html><body><time datetime="2024-01-15">Jan 15</time></body></html>';
      const result = STATIC_VALIDATORS[6].check(html);
      expect(result.valid).toBe(true);
    });

    it('should pass with schema.org datePublished', () => {
      const html = '<html><body><script type="application/ld+json">{"datePublished": "2024-01-15"}</script></body></html>';
      const result = STATIC_VALIDATORS[6].check(html);
      expect(result.valid).toBe(true);
    });

    it('should return null when no date (not applicable)', () => {
      const html = '<html><body><p>Static content</p></body></html>';
      const result = STATIC_VALIDATORS[6].check(html);
      expect(result).toBeNull();
    });
  });

  describe('Rule 8: Ad disclosure', () => {
    it('should return null when no ads detected', () => {
      const html = '<html><body><p>Content</p></body></html>';
      const result = STATIC_VALIDATORS[8].check(html);
      expect(result).toBeNull();
    });

    it('should fail with ads but no disclosure', () => {
      const html = '<html><body><script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script></body></html>';
      const result = STATIC_VALIDATORS[8].check(html);
      expect(result.valid).toBe(false);
    });
  });
});

describe('runStaticValidators', () => {
  it('should run all validators and categorize results', () => {
    const html = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="utf-8">
        <meta name="description" content="Test page for validators">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Complete Test Page Title</title>
      </head>
      <body>
        <footer>© 2024 Test Company</footer>
        <a href="/confidentialite">Politique de confidentialité</a>
      </body>
      </html>
    `;

    const results = runStaticValidators(html);

    expect(results.validators).toBe(30);
    expect(results.passed.length).toBeGreaterThan(0);
    expect(results.passed.some(r => r.opquastId === 3)).toBe(true);
    expect(results.passed.some(r => r.opquastId === 103)).toBe(true);
    expect(results.passed.some(r => r.opquastId === 130)).toBe(true);
  });

  it('should detect multiple failures', () => {
    const html = '<html><head></head><body></body></html>';
    const results = runStaticValidators(html);

    expect(results.failed.length).toBeGreaterThan(0);
    expect(results.failed.some(r => r.opquastId === 103)).toBe(true); // No title
    expect(results.failed.some(r => r.opquastId === 130)).toBe(true); // No lang
  });

  it('should include source and confidence_label', () => {
    const html = '<html lang="fr"><head><title>Test Title Here</title></head></html>';
    const results = runStaticValidators(html);

    const passedRule = results.passed.find(r => r.opquastId === 130);
    expect(passedRule).toBeDefined();
    expect(passedRule.source).toBe('static-heuristic');
    expect(passedRule.confidence_label).toBe('heuristic');
  });
});

describe('getValidatorInfo', () => {
  it('should return validator metadata', () => {
    const info = getValidatorInfo();

    expect(info.name).toBe('Static Heuristic Validators');
    expect(info.validators).toBe(30);
    expect(info.rules).toHaveLength(30);
    expect(info.confidenceLevel).toBeDefined();
    expect(info.confidenceLevel.confidence).toBe(0.75);
  });
});

// ============================================
// PHASE 2 VALIDATOR TESTS (20 additional rules)
// ============================================

describe('Phase 2 Validators', () => {
  describe('Rule 5: Abbreviations', () => {
    it('should pass with abbr title attribute', () => {
      const html = '<html><body><abbr title="HyperText Markup Language">HTML</abbr></body></html>';
      const result = STATIC_VALIDATORS[5].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail when abbr lacks title', () => {
      const html = '<html><body><abbr>HTML</abbr></body></html>';
      const result = STATIC_VALIDATORS[5].check(html);
      expect(result.valid).toBe(false);
    });

    it('should return null when no abbr present', () => {
      const html = '<html><body><p>No abbreviations</p></body></html>';
      const result = STATIC_VALIDATORS[5].check(html);
      expect(result).toBeNull();
    });
  });

  describe('Rule 22: Login credentials', () => {
    it('should pass with email and password fields', () => {
      const html = '<html><body><form><input type="email"><input type="password"></form></body></html>';
      const result = STATIC_VALIDATORS[22].check(html);
      expect(result.valid).toBe(true);
    });

    it('should return null without login form', () => {
      const html = '<html><body><form><input type="text"></form></body></html>';
      const result = STATIC_VALIDATORS[22].check(html);
      expect(result).toBeNull();
    });
  });

  describe('Rule 29: Cookie policy', () => {
    it('should pass with cookie policy link', () => {
      const html = '<html><body><a href="/cookies">Cookie Policy</a></body></html>';
      const result = STATIC_VALIDATORS[29].check(html);
      expect(result.valid).toBe(true);
    });

    it('should pass with cookie banner class', () => {
      const html = '<html><body><div class="cookie-consent">Accept cookies</div></body></html>';
      const result = STATIC_VALIDATORS[29].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail with analytics but no cookie policy', () => {
      const html = '<html><body><script src="analytics.js"></script></body></html>';
      const result = STATIC_VALIDATORS[29].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 37: Terms and conditions', () => {
    it('should pass with CGV link', () => {
      const html = '<html><body><a href="/cgv">CGV</a></body></html>';
      const result = STATIC_VALIDATORS[37].check(html);
      expect(result.valid).toBe(true);
    });

    it('should pass with terms of service text', () => {
      const html = '<html><body><a href="#">Terms of Service</a></body></html>';
      const result = STATIC_VALIDATORS[37].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail for e-commerce without CGV', () => {
      const html = '<html><body><button class="add-to-cart">Buy</button></body></html>';
      const result = STATIC_VALIDATORS[37].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 42: Currency', () => {
    it('should pass with currency symbol', () => {
      const html = '<html><body><span>€ 29.99</span></body></html>';
      const result = STATIC_VALIDATORS[42].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail with price but no currency', () => {
      const html = '<html><body><span class="price">29.99</span></body></html>';
      const result = STATIC_VALIDATORS[42].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 99: Homepage description', () => {
    it('should pass with H1 and meta desc on homepage', () => {
      const html = '<html><head><meta name="description" content="Test"></head><body><main><h1>Welcome</h1></main></body></html>';
      const result = STATIC_VALIDATORS[99].check(html, 'https://example.com/');
      expect(result.valid).toBe(true);
    });

    it('should return null for non-homepage', () => {
      const html = '<html><body><h1>Test</h1></body></html>';
      const result = STATIC_VALIDATORS[99].check(html, 'https://example.com/about');
      expect(result).toBeNull();
    });
  });

  describe('Rule 104: Favicon', () => {
    it('should pass with favicon link', () => {
      const html = '<html><head><link rel="icon" href="/favicon.ico"></head></html>';
      const result = STATIC_VALIDATORS[104].check(html);
      expect(result.valid).toBe(true);
    });

    it('should pass with apple-touch-icon', () => {
      const html = '<html><head><link rel="apple-touch-icon" href="/icon.png"></head></html>';
      const result = STATIC_VALIDATORS[104].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail without favicon', () => {
      const html = '<html><head></head></html>';
      const result = STATIC_VALIDATORS[104].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 105: Print stylesheet', () => {
    it('should pass with print media link', () => {
      const html = '<html><head><link rel="stylesheet" media="print" href="print.css"></head></html>';
      const result = STATIC_VALIDATORS[105].check(html);
      expect(result.valid).toBe(true);
    });

    it('should pass with @media print in style', () => {
      const html = '<html><head><style>@media print { body { font-size: 12pt; } }</style></head></html>';
      const result = STATIC_VALIDATORS[105].check(html);
      expect(result.valid).toBe(true);
    });

    it('should return null without print styles', () => {
      const html = '<html><head><link rel="stylesheet" href="main.css"></head></html>';
      const result = STATIC_VALIDATORS[105].check(html);
      expect(result).toBeNull();
    });
  });

  describe('Rule 106: Canonical URL', () => {
    it('should pass with canonical link', () => {
      const html = '<html><head><link rel="canonical" href="https://example.com/page"></head></html>';
      const result = STATIC_VALIDATORS[106].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail without canonical', () => {
      const html = '<html><head></head></html>';
      const result = STATIC_VALIDATORS[106].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 107: Contact methods', () => {
    it('should pass with email and phone', () => {
      const html = '<html><body><a href="mailto:a@b.com">Email</a><a href="tel:+33123456789">Call</a></body></html>';
      const result = STATIC_VALIDATORS[107].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail with only one contact method', () => {
      const html = '<html><body><a href="mailto:a@b.com">Email</a></body></html>';
      const result = STATIC_VALIDATORS[107].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 108: OpenGraph', () => {
    it('should pass with complete OG tags', () => {
      const html = '<html><head><meta property="og:title" content="T"><meta property="og:description" content="D"><meta property="og:image" content="I"></head></html>';
      const result = STATIC_VALIDATORS[108].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail with incomplete OG tags', () => {
      const html = '<html><head><meta property="og:title" content="T"></head></html>';
      const result = STATIC_VALIDATORS[108].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 109: Twitter Cards', () => {
    it('should pass with complete Twitter Cards', () => {
      const html = '<html><head><meta name="twitter:card" content="summary"><meta name="twitter:title" content="T"></head></html>';
      const result = STATIC_VALIDATORS[109].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail with incomplete Twitter Cards', () => {
      const html = '<html><head><meta name="twitter:card" content="summary"></head></html>';
      const result = STATIC_VALIDATORS[109].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 178: Newsletter unsubscribe', () => {
    it('should pass with unsubscribe link', () => {
      const html = '<html><body><a href="/unsubscribe">Unsubscribe</a></body></html>';
      const result = STATIC_VALIDATORS[178].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail with newsletter but no unsubscribe', () => {
      const html = '<html><body><form>Newsletter inscription email</form></body></html>';
      const result = STATIC_VALIDATORS[178].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 219: Robots meta', () => {
    it('should pass with robots meta tag', () => {
      const html = '<html><head><meta name="robots" content="index, follow"></head></html>';
      const result = STATIC_VALIDATORS[219].check(html);
      expect(result.valid).toBe(true);
    });

    it('should return null without robots meta', () => {
      const html = '<html><head></head></html>';
      const result = STATIC_VALIDATORS[219].check(html);
      expect(result).toBeNull();
    });
  });

  describe('Rule 220: Sitemap', () => {
    it('should pass with sitemap link', () => {
      const html = '<html><body><a href="/sitemap.xml">Sitemap</a></body></html>';
      const result = STATIC_VALIDATORS[220].check(html);
      expect(result.valid).toBe(true);
    });

    it('should return null without sitemap reference', () => {
      const html = '<html><body></body></html>';
      const result = STATIC_VALIDATORS[220].check(html);
      expect(result).toBeNull();
    });
  });

  describe('Rule 221: UTF-8 charset', () => {
    it('should pass with UTF-8 charset', () => {
      const html = '<html><head><meta charset="utf-8"></head></html>';
      const result = STATIC_VALIDATORS[221].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail with other charset', () => {
      const html = '<html><head><meta charset="iso-8859-1"></head></html>';
      const result = STATIC_VALIDATORS[221].check(html);
      expect(result.valid).toBe(false);
    });

    it('should fail without charset', () => {
      const html = '<html><head></head></html>';
      const result = STATIC_VALIDATORS[221].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 222: HTML5 doctype', () => {
    it('should pass with HTML5 doctype', () => {
      const html = '<!DOCTYPE html><html><head></head></html>';
      const result = STATIC_VALIDATORS[222].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail with XHTML doctype', () => {
      const html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0"><html></html>';
      const result = STATIC_VALIDATORS[222].check(html);
      expect(result.valid).toBe(false);
    });

    it('should fail without doctype', () => {
      const html = '<html><head></head></html>';
      const result = STATIC_VALIDATORS[222].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 223: No deprecated elements', () => {
    it('should pass without deprecated elements', () => {
      const html = '<html><body><p>Modern HTML</p></body></html>';
      const result = STATIC_VALIDATORS[223].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail with font tag', () => {
      const html = '<html><body><font color="red">Old</font></body></html>';
      const result = STATIC_VALIDATORS[223].check(html);
      expect(result.valid).toBe(false);
    });

    it('should fail with center tag', () => {
      const html = '<html><body><center>Centered</center></body></html>';
      const result = STATIC_VALIDATORS[223].check(html);
      expect(result.valid).toBe(false);
    });

    it('should fail with marquee tag', () => {
      const html = '<html><body><marquee>Scrolling</marquee></body></html>';
      const result = STATIC_VALIDATORS[223].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 224: Inline styles', () => {
    it('should pass with few inline styles', () => {
      const html = '<html><body><p style="color:red">Text</p></body></html>';
      const result = STATIC_VALIDATORS[224].check(html);
      expect(result.valid).toBe(true);
    });

    it('should fail with excessive inline styles', () => {
      let html = '<html><body>';
      for (let i = 0; i < 25; i++) {
        html += `<p style="color:red">Text ${i}</p>`;
      }
      html += '</body></html>';
      const result = STATIC_VALIDATORS[224].check(html);
      expect(result.valid).toBe(false);
    });
  });

  describe('Rule 225: Structured data', () => {
    it('should pass with JSON-LD', () => {
      const html = '<html><head><script type="application/ld+json">{"@type":"WebPage"}</script></head></html>';
      const result = STATIC_VALIDATORS[225].check(html);
      expect(result.valid).toBe(true);
    });

    it('should pass with microdata', () => {
      const html = '<html><body><div itemscope itemtype="https://schema.org/Product"></div></body></html>';
      const result = STATIC_VALIDATORS[225].check(html);
      expect(result.valid).toBe(true);
    });

    it('should return null without structured data', () => {
      const html = '<html><body></body></html>';
      const result = STATIC_VALIDATORS[225].check(html);
      expect(result).toBeNull();
    });
  });
});

describe('Reference alignment (audit ShipGuard 2026-09-03, r1-z04-028)', () => {
  it('every validator carries the reference title and severity of its rule', () => {
    const mismatches = Object.entries(STATIC_VALIDATORS)
      .filter(([id, v]) => !rulesById[id] || v.title !== rulesById[id].title || v.severity !== rulesById[id].severity)
      .map(([id, v]) => ({ id, title: v.title, severity: v.severity }));
    expect(mismatches).toEqual([]);
  });
});

describe('Audit ShipGuard 2026-09-03 : lang strict et erreurs de validateur', () => {
  it('rejects xml:lang and data-lang as substitutes for lang (r1-z04-032)', () => {
    expect(STATIC_VALIDATORS[130].check('<html xml:lang="fr"><body></body></html>').valid).toBe(false);
    expect(STATIC_VALIDATORS[130].check('<html data-lang="fr"><body></body></html>').valid).toBe(false);
    expect(STATIC_VALIDATORS[130].check('<html lang="fr"><body></body></html>').valid).toBe(true);
    expect(STATIC_VALIDATORS[130].check('<html class="x" lang="fr-FR"><body></body></html>').valid).toBe(true);
  });

  it('reports a throwing validator under errors, not skipped (r1-z04-031)', () => {
    STATIC_VALIDATORS[999] = { title: 'faux', severity: 'minor', check: () => { throw new Error('boum'); } };
    try {
      const r = runStaticValidators('<html lang="fr"></html>');
      expect(r.errors.map(e => e.opquastId)).toContain(999);
      expect(r.skipped.map(e => e.opquastId)).not.toContain(999);
    } finally {
      delete STATIC_VALIDATORS[999];
    }
  });
});

describe('Audit ShipGuard 2026-09-04 : faux positifs et angles morts des validateurs', () => {
  it('n\'accepte pas le mot « licence » hors contexte de droits (r1-z04-033)', () => {
    expect(STATIC_VALIDATORS[2].check('<html><body><p>Licence professionnelle STAPS</p></body></html>').valid).toBe(false);
    expect(STATIC_VALIDATORS[2].check('<html><body><p>Voir la licence STAPS</p></body></html>').valid).toBe(false);
    expect(STATIC_VALIDATORS[2].check('<html><body><p>Contenus publiés sous licence Creative Commons</p></body></html>').valid).toBe(true);
    expect(STATIC_VALIDATORS[2].check('<html><body><p>Licence ouverte Etalab</p></body></html>').valid).toBe(true);
  });

  it('n\'accepte pas un nombre à quatre chiffres du pied de page comme copyright (r1-z04-034)', () => {
    expect(STATIC_VALIDATORS[2].check('<html><body><footer>2026 places disponibles</footer></body></html>').valid).toBe(false);
    expect(STATIC_VALIDATORS[2].check('<html><body><footer>Standard : 01 44 55 66 77 - 75014 Paris</footer></body></html>').valid).toBe(false);
    const enPied = STATIC_VALIDATORS[2].check('<html><body><footer>© 2026 Société</footer></body></html>');
    expect(enPied.valid).toBe(true);
    expect(enPied.confidence).toBe(0.9);
    const horsPied = STATIC_VALIDATORS[2].check('<html><body><p>Copyright 2026 Société</p></body></html>');
    expect(horsPied.valid).toBe(true);
    expect(horsPied.confidence).toBe(0.8);
  });

  it('classe en conforme une publicité correctement identifiée (r1-z04-035)', () => {
    const html = '<html><body><div aria-label="Publicité"><script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script></div></body></html>';
    const result = STATIC_VALIDATORS[8].check(html);
    expect(result).not.toBeNull();
    expect(result.valid).toBe(true);
  });

  it('détecte les variantes de maximum-scale bloquant le zoom (r1-z04-038)', () => {
    const viewport = (content) => `<html><head><meta name="viewport" content="${content}"></head></html>`;
    expect(STATIC_VALIDATORS[193].check(viewport('width=device-width, maximum-scale=1.00')).valid).toBe(false);
    expect(STATIC_VALIDATORS[193].check(viewport('width=device-width, maximum-scale=1.0;')).valid).toBe(false);
    expect(STATIC_VALIDATORS[193].check(viewport('width=device-width, maximum-scale=0.5')).valid).toBe(false);
    expect(STATIC_VALIDATORS[193].check(viewport('width=device-width, maximum-scale=1')).valid).toBe(false);
    expect(STATIC_VALIDATORS[193].check(viewport('width=device-width, maximum-scale=5.0')).valid).toBe(true);
  });

  it('extrait le titre du document et non celui d\'un SVG, balisage interne compris (r1-z04-039)', () => {
    const svgAvant = '<html><body><svg><title>Ico</title></svg></body><head><title>Accueil du site de démonstration</title></head></html>';
    expect(STATIC_VALIDATORS[103].check(svgAvant).valid).toBe(true);
    const balisage = '<html><head><title>Accueil <span>du site de démonstration</span></title></head></html>';
    const result = STATIC_VALIDATORS[103].check(balisage);
    expect(result.valid).toBe(true);
  });

  it('rejette une entrée html qui n\'est pas une chaîne (r1-z04-030)', () => {
    expect(() => runStaticValidators(undefined)).toThrow(TypeError);
    expect(() => runStaticValidators(null)).toThrow(TypeError);
    expect(() => runStaticValidators({ body: '<html></html>' })).toThrow(TypeError);
  });

  it('propage l\'URL de contexte à chaque validateur (r1-z04-036)', () => {
    const recues = [];
    STATIC_VALIDATORS[998] = {
      title: 'sonde',
      severity: 'minor',
      check: (html, url) => { recues.push(url); return null; }
    };
    try {
      runStaticValidators('<html lang="fr"></html>', 'https://exemple.test/page');
    } finally {
      delete STATIC_VALIDATORS[998];
    }
    expect(recues).toEqual(['https://exemple.test/page']);
  });

  it('renseigne la structure des règles ignorées et l\'horodatage (r1-z04-041)', () => {
    const results = runStaticValidators('<html lang="fr"><head><title>Un titre de page valide</title></head><body></body></html>');
    expect(Array.isArray(results.skipped)).toBe(true);
    const ignoree = results.skipped.find(r => r.opquastId === 1);
    expect(ignoree).toBeDefined();
    expect(ignoree.title).toBe(STATIC_VALIDATORS[1].title);
    expect(typeof ignoree.reason).toBe('string');
    expect(ignoree.reason.length).toBeGreaterThan(0);
    expect(Number.isNaN(Date.parse(results.timestamp))).toBe(false);
    expect(results.errors).toEqual([]);
  });
});
