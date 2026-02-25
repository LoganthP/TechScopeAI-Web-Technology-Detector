import axios from 'axios';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { rules } from '../detectors/rules';
import { DetectedTech } from '../detectors/types';

export const scanUrl = async (url: string) => {
    let html = '';
    let headers: Record<string, string> = {};

    try {
        const response = await axios.get(url, { timeout: 8000 });
        html = response.data;
        headers = response.headers as Record<string, string>;
    } catch (err: any) {
        if (err.response) {
            html = err.response.data;
            headers = err.response.headers;
        } else {
            console.error(`[Scanner] Axios failed, falling back to Puppeteer: ${err.message}`);
            // Fallback to Puppeteer for complex sites
            let browser;
            try {
                browser = await puppeteer.launch({
                    headless: true,
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                });
                const page = await browser.newPage();
                // Set a realistic user agent
                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

                const response = await page.goto(url, {
                    waitUntil: 'networkidle2',
                    timeout: 20000
                });

                html = await page.content();
                headers = response?.headers() || {};
            } catch (browserErr: any) {
                console.error(`[Scanner] Puppeteer also failed: ${browserErr.message}`);
                throw new Error(`Target unreachable: ${browserErr.message}`);
            } finally {
                if (browser) await browser.close();
            }
        }
    }

    const $ = cheerio.load(html);
    const detected: DetectedTech[] = [];
    const lowercaseHtml = html.toLowerCase();

    for (const rule of rules) {
        let matched = false;

        // Check Headers
        if (rule.match.headers) {
            for (const [key, pattern] of Object.entries(rule.match.headers)) {
                const headerValue = headers[key.toLowerCase()];
                if (headerValue && (typeof pattern === 'string' ? headerValue.includes(pattern) : pattern.test(headerValue))) {
                    matched = true;
                    break;
                }
            }
        }

        // Check HTML & Scripts
        if (!matched && rule.match.html) {
            for (const pattern of rule.match.html) {
                if (pattern.test(lowercaseHtml)) {
                    matched = true;
                    break;
                }
            }
        }

        if (!matched && rule.match.scripts) {
            const scriptTags = $('script').map((i, el) => $(el).attr('src') || $(el).html() || '').get().join('\n');
            for (const pattern of rule.match.scripts) {
                if (pattern.test(scriptTags)) {
                    matched = true;
                    break;
                }
            }
        }

        if (matched) {
            detected.push({ name: rule.name, category: rule.category, confidence: 95 });
        }
    }

    return { detected, headers, htmlLength: html.length };
};

export const calculateRiskScore = (headers: Record<string, string>, detected: DetectedTech[]) => {
    let score = 0;
    const vulnerabilities = [];

    // Security Headers Check
    const securityHeaders = ['strict-transport-security', 'content-security-policy', 'x-frame-options', 'x-content-type-options'];
    for (const header of securityHeaders) {
        if (!headers[header]) {
            score += 10;
            vulnerabilities.push(`Missing Security Header: ${header.toUpperCase()}`);
        }
    }

    // Technology checks
    if (detected.some(tech => tech.name === 'WordPress')) {
        score += 15;
        vulnerabilities.push('WordPress detected - Ensure plugins/themes are regularly updated');
    }

    if (headers['x-powered-by']) {
        score += 20;
        vulnerabilities.push(`Information Disclosure: X-Powered-By header is exposed (${headers['x-powered-by']})`);
    }

    const riskLevel = score < 20 ? 'Low' : score < 50 ? 'Medium' : 'High';
    return { score, riskLevel, vulnerabilities };
};
