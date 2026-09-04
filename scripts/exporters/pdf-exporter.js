/**
 * PDF Exporter
 *
 * Generates PDF reports using Playwright's page.pdf() capability.
 * Reuses the existing Playwright dependency from dom-analyzer - no new dependencies required.
 */

import { BaseExporter } from './base-exporter.js';
import { generateHTML } from './templates/report.html.js';

/**
 * PDF Exporter class
 */
export class PDFExporter extends BaseExporter {
  constructor(options = {}) {
    super(options);
    this.format = 'pdf';
    this.mimeType = 'application/pdf';
    this.extension = '.pdf';

    // PDF-specific options
    this.pdfOptions = {
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
      },
      ...options.pdf
    };
  }

  /**
   * Export results to PDF buffer
   * @param {Object} results - Raw bridge.js results
   * @returns {Promise<Buffer>} PDF content as Buffer
   */
  async export(results) {
    const data = this.prepareData(results);
    const html = generateHTML(data);

    // Dynamically import playwright from dom-analyzer's node_modules
    // This avoids requiring playwright at the top level
    let chromium;
    try {
      const playwright = await import('../dom-analyzer/node_modules/playwright/index.mjs');
      chromium = playwright.chromium;
    } catch {
      // Fallback to global playwright if available
      const playwright = await import('playwright');
      chromium = playwright.chromium;
    }

    // Launch browser for PDF generation
    let browser = null;

    try {
      browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const context = await browser.newContext();
      const page = await context.newPage();

      // Set content and wait for rendering
      await page.setContent(html, {
        waitUntil: 'networkidle'
      });

      // Generate PDF
      const pdfBuffer = await page.pdf(this.pdfOptions);

      // Cleanup
      await page.close();
      await context.close();

      return pdfBuffer;

    } catch (error) {
      throw new Error(`PDF generation failed: ${error.message}`);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  /**
   * Export results and return with metadata
   * @param {Object} results - Raw bridge.js results
   * @returns {Promise<Object>} Export result with content and metadata
   */
  async exportWithMetadata(results) {
    const content = await this.export(results);

    return {
      format: this.format,
      mimeType: this.mimeType,
      extension: this.extension,
      content,
      size: content.length,
      timestamp: new Date().toISOString()
    };
  }
}

export default PDFExporter;
