/**
 * Exporter Factory
 *
 * Factory pattern for creating exporters based on format.
 * Supports: html, pdf, json, text
 */

import { HTMLExporter } from './html-exporter.js';
import { PDFExporter } from './pdf-exporter.js';

/**
 * Supported export formats
 */
export const SUPPORTED_FORMATS = ['html', 'pdf', 'json', 'text'];

/**
 * Get exporter instance by format
 * @param {string} format - Export format (html, pdf, json, text)
 * @param {Object} options - Exporter options
 * @returns {Object} Exporter instance
 */
export function getExporter(format, options = {}) {
  switch (format.toLowerCase()) {
    case 'html':
      return new HTMLExporter(options);

    case 'pdf':
      return new PDFExporter(options);

    case 'json':
      return new JSONExporter(options);

    case 'text':
      return new TextExporter(options);

    default:
      throw new Error(`Unsupported export format: ${format}. Supported: ${SUPPORTED_FORMATS.join(', ')}`);
  }
}

/**
 * JSON Exporter (built-in, no class needed)
 */
class JSONExporter {
  constructor(options = {}) {
    this.format = 'json';
    this.mimeType = 'application/json';
    this.extension = '.json';
    this.options = options;
  }

  export(results) {
    const indent = this.options.pretty !== false ? 2 : 0;
    return JSON.stringify(results, null, indent);
  }

  exportWithMetadata(results) {
    const content = this.export(results);
    return {
      format: this.format,
      mimeType: this.mimeType,
      extension: this.extension,
      content,
      size: Buffer.byteLength(content, 'utf8'),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Text Exporter (console-friendly output)
 */
class TextExporter {
  constructor(options = {}) {
    this.format = 'text';
    this.mimeType = 'text/plain';
    this.extension = '.txt';
    this.options = options;
  }

  export(results) {
    const lines = [];

    lines.push('================================================');
    lines.push('  Opquast Analysis Report');
    lines.push('================================================\n');

    lines.push(`URL: ${results.url}`);
    lines.push(`Date: ${results.timestamp}`);
    lines.push(`Status: ${results.success ? 'OK' : 'ERROR'}`);

    if (!results.success) {
      lines.push(`Error: ${results.error}`);
      return lines.join('\n');
    }

    // Coverage
    lines.push('\n--- Coverage ---\n');
    const coverage = results.summary?.coverage || {};
    if (coverage.dom) {
      lines.push(`DOM Rules: ${coverage.dom.checked}/${coverage.dom.total} checked (${coverage.dom.percentage}%)`);
    }
    if (coverage.heuristic) {
      lines.push(`Heuristic Validators: ${coverage.heuristic.checked}/${coverage.heuristic.validators} (deterministic)`);
    }
    if (coverage.static) {
      lines.push(`Static Rules: ${coverage.static.remaining || coverage.static.applicable} remaining (LLM required)`);
    }
    if (coverage.interaction) {
      lines.push(`Interaction Rules: ${coverage.interaction.count} (manual testing)`);
    }

    // Violations
    const violations = results.summary?.violations || [];
    if (violations.length > 0) {
      lines.push(`\n--- Violations (${violations.length}) ---\n`);

      const bySeverity = {
        critical: violations.filter(v => v.severity === 'critical'),
        major: violations.filter(v => v.severity === 'major'),
        minor: violations.filter(v => v.severity === 'minor')
      };

      for (const [severity, vList] of Object.entries(bySeverity)) {
        if (vList.length > 0) {
          lines.push(`[${severity.toUpperCase()}] (${vList.length})`);
          for (const v of vList) {
            lines.push(`  - Rule ${v.opquastId}: ${v.title || v.description || 'Unnamed'}`);
            if (v.nodes?.length) {
              lines.push(`    Elements: ${v.nodes.length}`);
            }
          }
          lines.push('');
        }
      }
    } else {
      lines.push('\nNo violations found.\n');
    }

    return lines.join('\n');
  }

  exportWithMetadata(results) {
    const content = this.export(results);
    return {
      format: this.format,
      mimeType: this.mimeType,
      extension: this.extension,
      content,
      size: Buffer.byteLength(content, 'utf8'),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Export results using specified format
 * @param {Object} results - Analysis results
 * @param {string} format - Export format
 * @param {Object} options - Export options
 * @returns {Promise<string|Buffer>} Exported content
 */
export async function exportResults(results, format, options = {}) {
  const exporter = getExporter(format, options);

  // PDF export is async
  if (format === 'pdf') {
    return await exporter.export(results);
  }

  return exporter.export(results);
}

/**
 * Get info about available exporters
 * @returns {Object}
 */
export function getExporterInfo() {
  return {
    version: '1.0.0',
    formats: SUPPORTED_FORMATS,
    features: {
      html: {
        description: 'Single-file HTML report with inline CSS',
        dependencies: 'none'
      },
      pdf: {
        description: 'PDF report via Playwright page.pdf()',
        dependencies: 'playwright (existing)'
      },
      json: {
        description: 'Raw JSON output',
        dependencies: 'none'
      },
      text: {
        description: 'Console-friendly text output',
        dependencies: 'none'
      }
    }
  };
}

export { HTMLExporter, PDFExporter };
