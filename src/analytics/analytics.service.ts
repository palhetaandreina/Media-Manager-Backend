import { Logger } from '@nestjs/common';
import puppeteer from 'puppeteer';

export class AnalyticsService {
  async printPDF(url: string) {
    const browser = await puppeteer.launch({
      headless: true,
      timeout: 2000,
      executablePath: '/usr/bin/chromium',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    new Logger().log('launch');

    const page = await browser.newPage();

    new Logger().log('new page');

    await page.goto(url, { waitUntil: 'networkidle0' });

    new Logger().log('goto');

    const pdf = await page.pdf({ format: 'A4' });

    new Logger().log('pdf');

    await browser.close();

    new Logger().log('close');

    return pdf;
  }
}
