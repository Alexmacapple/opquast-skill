/**
 * HTML Report Template - ES6 Template Literals
 *
 * Single-file HTML report with inline CSS.
 * No external dependencies required.
 */

/**
 * Generate inline CSS styles
 * @returns {string}
 */
function getInlineCSS() {
  return `
    :root {
      --color-bg: #f8fafc;
      --color-card: #ffffff;
      --color-text: #1e293b;
      --color-text-muted: #64748b;
      --color-border: #e2e8f0;
      --color-primary: #3b82f6;
      --color-critical: #dc2626;
      --color-major: #ea580c;
      --color-minor: #ca8a04;
      --color-success: #16a34a;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: var(--color-bg);
      color: var(--color-text);
      line-height: 1.6;
      padding: 2rem;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
    }

    /* Header */
    .header {
      background: var(--color-card);
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .header-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .header-logo h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-primary);
    }

    .header-meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .meta-item {
      padding: 0.75rem;
      background: var(--color-bg);
      border-radius: 8px;
    }

    .meta-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-muted);
      margin-bottom: 0.25rem;
    }

    .meta-value {
      font-weight: 500;
      word-break: break-all;
    }

    /* Score Gauge */
    .score-section {
      background: var(--color-card);
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      text-align: center;
    }

    .score-gauge {
      position: relative;
      width: 150px;
      height: 150px;
      margin: 0 auto 1.5rem;
    }

    .score-circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: conic-gradient(
        var(--gauge-color, var(--color-primary)) var(--gauge-percent, 0%),
        var(--color-border) 0%
      );
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .score-inner {
      width: 120px;
      height: 120px;
      background: var(--color-card);
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .score-value {
      font-size: 2.5rem;
      font-weight: 700;
    }

    .score-label {
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    .score-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .score-stat {
      padding: 1rem;
      background: var(--color-bg);
      border-radius: 8px;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .stat-label {
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }

    /* Warnings */
    .warnings {
      background: #fef3c7;
      border: 1px solid #fbbf24;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1.5rem;
    }

    .warnings h3 {
      color: #92400e;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .warnings ul {
      list-style: none;
      font-size: 0.875rem;
      color: #78350f;
    }

    .warnings li::before {
      content: "\\26A0  ";
    }

    /* Violations Section */
    .violations-section {
      background: var(--color-card);
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .severity-group {
      margin-bottom: 1.5rem;
    }

    .severity-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      margin-bottom: 0.75rem;
    }

    .severity-critical .severity-header {
      background: #fef2f2;
      border-left: 4px solid var(--color-critical);
    }

    .severity-major .severity-header {
      background: #fff7ed;
      border-left: 4px solid var(--color-major);
    }

    .severity-minor .severity-header {
      background: #fefce8;
      border-left: 4px solid var(--color-minor);
    }

    .severity-badge {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
    }

    .severity-count {
      margin-left: auto;
      background: rgba(0,0,0,0.1);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .violation-list {
      list-style: none;
      margin-left: 1rem;
    }

    .violation-item {
      padding: 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      margin-bottom: 0.5rem;
    }

    .violation-title {
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .violation-rule {
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }

    .violation-elements {
      font-size: 0.75rem;
      color: var(--color-text-muted);
      margin-top: 0.5rem;
    }

    /* Quick Wins */
    .quickwins-section {
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .quickwins-section .section-title {
      color: #065f46;
    }

    .quickwin-item {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 0.75rem;
      border-left: 4px solid var(--color-success);
    }

    .quickwin-effort {
      display: inline-block;
      background: #d1fae5;
      color: #065f46;
      font-size: 0.625rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-weight: 600;
      margin-left: 0.5rem;
    }

    /* Non-Verifiable */
    .nonverifiable-section {
      background: var(--color-card);
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      border: 1px dashed var(--color-border);
    }

    .nonverifiable-section .section-title {
      color: var(--color-text-muted);
    }

    .nonverifiable-item {
      padding: 0.75rem;
      background: var(--color-bg);
      border-radius: 8px;
      margin-bottom: 0.5rem;
    }

    /* Footer */
    .footer {
      text-align: center;
      padding: 1.5rem;
      color: var(--color-text-muted);
      font-size: 0.875rem;
    }

    .footer a {
      color: var(--color-primary);
      text-decoration: none;
    }

    /* Print styles */
    @media print {
      body {
        background: white;
        padding: 1rem;
      }

      .header, .score-section, .violations-section,
      .quickwins-section, .nonverifiable-section {
        box-shadow: none;
        break-inside: avoid;
      }

      .quickwins-section {
        background: #f0fdf4;
      }
    }
  `;
}

/**
 * Render header section
 * @param {Object} data
 * @returns {string}
 */
function renderHeader(data) {
  return `
    <header class="header">
      <div class="header-logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#3b82f6" stroke-width="2"/>
          <path d="M10 16l4 4 8-8" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h1>Opquast Analysis Report</h1>
      </div>
      <div class="header-meta">
        <div class="meta-item">
          <div class="meta-label">URL</div>
          <div class="meta-value">${escapeHtml(data.url)}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Date</div>
          <div class="meta-value">${escapeHtml(data.date)}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Profile</div>
          <div class="meta-value">${escapeHtml(data.profile)}</div>
        </div>
      </div>
    </header>
  `;
}

/**
 * Render score gauge section
 * @param {Object} data
 * @returns {string}
 */
function renderScoreGauge(data) {
  const score = data.complianceScore;
  const coverage = data.coverage;

  // Determine gauge color based on score
  let gaugeColor = 'var(--color-success)';
  if (score.percentage < 50) gaugeColor = 'var(--color-critical)';
  else if (score.percentage < 75) gaugeColor = 'var(--color-major)';
  else if (score.percentage < 90) gaugeColor = 'var(--color-minor)';

  return `
    <section class="score-section">
      <div class="score-gauge">
        <div class="score-circle" style="--gauge-percent: ${score.percentage}%; --gauge-color: ${gaugeColor}">
          <div class="score-inner">
            <div class="score-value">${score.percentage}%</div>
            <div class="score-label">Compliance</div>
          </div>
        </div>
      </div>

      <div class="score-details">
        <div class="score-stat">
          <div class="stat-value" style="color: var(--color-success)">${score.passed}</div>
          <div class="stat-label">Rules Passed</div>
        </div>
        <div class="score-stat">
          <div class="stat-value" style="color: var(--color-critical)">${score.failed}</div>
          <div class="stat-label">Violations</div>
        </div>
        <div class="score-stat">
          <div class="stat-value">${coverage.totalChecked}</div>
          <div class="stat-label">Rules Checked</div>
        </div>
        <div class="score-stat">
          <div class="stat-value">${coverage.combinedPercentage}%</div>
          <div class="stat-label">Coverage</div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Render warnings section (SPA, etc.)
 * @param {Object} data
 * @returns {string}
 */
function renderWarnings(data) {
  if (!data.warnings || data.warnings.length === 0) {
    return '';
  }

  return `
    <div class="warnings">
      <h3>Warnings</h3>
      <ul>
        ${data.warnings.map(w => `<li>${escapeHtml(w)}</li>`).join('')}
      </ul>
    </div>
  `;
}

/**
 * Render violations by severity
 * @param {Object} data
 * @returns {string}
 */
function renderViolationsBySeverity(data) {
  const { violationsBySeveity, totalViolations } = data;

  if (totalViolations === 0) {
    return `
      <section class="violations-section">
        <h2 class="section-title">
          <span>Violations</span>
        </h2>
        <p style="color: var(--color-success); text-align: center; padding: 2rem;">
          No violations found - Great job!
        </p>
      </section>
    `;
  }

  const renderGroup = (severity, violations) => {
    if (violations.length === 0) return '';

    return `
      <div class="severity-group severity-${severity}">
        <div class="severity-header">
          <span class="severity-badge">${severity}</span>
          <span class="severity-count">${violations.length}</span>
        </div>
        <ul class="violation-list">
          ${violations.map(v => `
            <li class="violation-item">
              <div class="violation-title">${escapeHtml(v.title || v.description || 'Unnamed violation')}</div>
              <div class="violation-rule">Rule ${v.opquastId || 'N/A'} | Source: ${v.source || 'unknown'}</div>
              ${v.nodes && v.nodes.length > 0 ? `
                <div class="violation-elements">${v.nodes.length} element(s) affected</div>
              ` : ''}
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  };

  return `
    <section class="violations-section">
      <h2 class="section-title">
        <span>Violations (${totalViolations})</span>
      </h2>
      ${renderGroup('critical', violationsBySeveity.critical)}
      ${renderGroup('major', violationsBySeveity.major)}
      ${renderGroup('minor', violationsBySeveity.minor)}
    </section>
  `;
}

/**
 * Render quick wins section
 * @param {Object} data
 * @returns {string}
 */
function renderQuickWins(data) {
  const { quickWins } = data;

  if (!quickWins || quickWins.length === 0) {
    return '';
  }

  return `
    <section class="quickwins-section">
      <h2 class="section-title">
        Quick Wins (Top ${quickWins.length})
      </h2>
      <p style="margin-bottom: 1rem; font-size: 0.875rem;">
        Easy fixes with high impact - start with these!
      </p>
      ${quickWins.map(v => `
        <div class="quickwin-item">
          <div class="violation-title">
            ${escapeHtml(v.title || v.description || 'Unnamed rule')}
            <span class="quickwin-effort">Easy Fix</span>
          </div>
          <div class="violation-rule">Rule ${v.opquastId || 'N/A'}</div>
          ${v.nodes && v.nodes.length > 0 ? `
            <div class="violation-elements">${v.nodes.length} element(s) to fix</div>
          ` : ''}
        </div>
      `).join('')}
    </section>
  `;
}

/**
 * Render non-verifiable rules section
 * @param {Object} data
 * @returns {string}
 */
function renderNonVerifiable(data) {
  const { nonVerifiable } = data;

  return `
    <section class="nonverifiable-section">
      <h2 class="section-title">
        Non-Verifiable Rules (Manual Testing Required)
      </h2>
      <div class="nonverifiable-item">
        <strong>${nonVerifiable.interaction.count} Interaction Rules</strong>
        <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-top: 0.25rem;">
          ${nonVerifiable.interaction.note}
        </p>
      </div>
      ${nonVerifiable.llmRequired.count > 0 ? `
        <div class="nonverifiable-item">
          <strong>${nonVerifiable.llmRequired.count} Semantic Analysis Rules</strong>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-top: 0.25rem;">
            ${nonVerifiable.llmRequired.note}
          </p>
        </div>
      ` : ''}
    </section>
  `;
}

/**
 * Render footer
 * @returns {string}
 */
function renderFooter() {
  return `
    <footer class="footer">
      <p>Generated by <a href="https://github.com/anthropics/claude-code">Claude Code</a> Opquast Skill</p>
      <p>Based on <a href="https://www.opquast.com/">Opquast V5</a> - 245 web quality rules</p>
    </footer>
  `;
}

/**
 * Escape HTML special characters
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate complete HTML report
 * @param {Object} data - Prepared data from BaseExporter
 * @returns {string}
 */
export function generateHTML(data) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Opquast Report - ${escapeHtml(data.url)}</title>
  <style>${getInlineCSS()}</style>
</head>
<body>
  <div class="container">
    ${renderHeader(data)}
    ${renderWarnings(data)}
    ${renderScoreGauge(data)}
    ${renderViolationsBySeverity(data)}
    ${renderQuickWins(data)}
    ${renderNonVerifiable(data)}
    ${renderFooter()}
  </div>
</body>
</html>`;
}

export default generateHTML;
