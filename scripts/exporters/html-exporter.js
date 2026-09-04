/**
 * HTML Exporter
 *
 * Generates HTML reports using ES6 template literals.
 * No external dependencies required.
 */

import { BaseExporter } from './base-exporter.js';
import { generateHTML } from './templates/report.html.js';

/**
 * HTML Exporter class
 */
export class HTMLExporter extends BaseExporter {
  constructor(options = {}) {
    super(options);
    this.format = 'html';
    this.mimeType = 'text/html';
    this.extension = '.html';
  }

  /**
   * Export results to HTML string
   * @param {Object} results - Raw bridge.js results
   * @returns {string} HTML content
   */
  export(results) {
    const data = this.prepareData(results);
    return generateHTML(data);
  }

  /**
   * Export results and return with metadata
   * @param {Object} results - Raw bridge.js results
   * @returns {Object} Export result with content and metadata
   */
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

export default HTMLExporter;
