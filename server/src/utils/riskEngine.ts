export interface Finding {
    type: 'critical' | 'warning' | 'safe';
    message: string;
}

export interface RiskAnalysis {
    aiRiskScore: number;
    securityGrade: string;
    exposureLevel: 'Critical' | 'High' | 'Medium' | 'Low' | 'Safe';
    findings: Finding[];
}

interface DetectedTech {
    name: string;
    category: string;
    confidence: number;
}

/**
 * Calculate a security score from 0–100 (higher = more secure).
 * Starts at 0 and accumulates points for each security measure detected.
 */
export function calculateRiskScore(
    headers: Record<string, string>,
    technologies: DetectedTech[],
    url: string
): { score: number; findings: Finding[] } {
    let score = 0;
    const findings: Finding[] = [];
    const h = normalizeHeaders(headers);

    // ── HTTPS (+15) ──
    if (url.startsWith('https')) {
        score += 15;
        findings.push({ type: 'safe', message: 'HTTPS Enabled — Connection is encrypted' });
    } else {
        findings.push({ type: 'critical', message: 'No HTTPS — Connection is unencrypted' });
    }

    // ── HSTS (+15) ──
    if (h['strict-transport-security']) {
        const maxAge = parseInt(h['strict-transport-security'].match(/max-age=(\d+)/)?.[1] || '0');
        if (maxAge >= 31536000) {
            score += 15;
            findings.push({ type: 'safe', message: 'Strong HSTS (max-age >= 1 year)' });
        } else if (maxAge > 0) {
            score += 8;
            findings.push({ type: 'warning', message: `Weak HSTS configuration (max-age=${maxAge}s, recommend >= 31536000)` });
        }
    } else {
        findings.push({ type: 'critical', message: 'Missing HSTS — Vulnerable to downgrade attacks' });
    }

    // ── Content-Security-Policy (+20) ──
    if (h['content-security-policy']) {
        score += 20;
        findings.push({ type: 'safe', message: 'Content Security Policy (CSP) is configured' });
    } else {
        findings.push({ type: 'critical', message: 'Missing Content Security Policy (CSP) — XSS risk elevated' });
    }

    // ── X-Frame-Options (+10) ──
    if (h['x-frame-options']) {
        score += 10;
        findings.push({ type: 'safe', message: 'X-Frame-Options set — Clickjacking protected' });
    } else {
        findings.push({ type: 'warning', message: 'Missing X-Frame-Options — Potential clickjacking risk' });
    }

    // ── X-Content-Type-Options (+10) ──
    if (h['x-content-type-options']) {
        score += 10;
        findings.push({ type: 'safe', message: 'X-Content-Type-Options: nosniff enabled' });
    } else {
        findings.push({ type: 'warning', message: 'Missing X-Content-Type-Options — MIME sniffing risk' });
    }

    // ── Secure Cookies (+10) ──
    const rawCookie = h['set-cookie'] || '';
    const setCookie = Array.isArray(rawCookie) ? rawCookie.join('; ') : String(rawCookie);
    if (setCookie.toLowerCase().includes('secure') && setCookie.toLowerCase().includes('httponly')) {
        score += 10;
        findings.push({ type: 'safe', message: 'Cookies marked Secure + HttpOnly' });
    } else if (setCookie) {
        score += 3;
        findings.push({ type: 'warning', message: 'Cookies present but missing Secure/HttpOnly flags' });
    }

    // ── Referrer-Policy (+5) ──
    if (h['referrer-policy']) {
        score += 5;
        findings.push({ type: 'safe', message: 'Referrer-Policy configured' });
    }

    // ── Permissions-Policy (+5) ──
    if (h['permissions-policy'] || h['feature-policy']) {
        score += 5;
        findings.push({ type: 'safe', message: 'Permissions-Policy / Feature-Policy configured' });
    }

    // ── Information Disclosure Penalties ──
    if (h['x-powered-by']) {
        score = Math.max(0, score - 10);
        findings.push({ type: 'warning', message: `X-Powered-By header exposed: "${h['x-powered-by']}" — Remove to reduce fingerprinting` });
    }
    if (h['server'] && !/cloudflare/i.test(h['server'])) {
        score = Math.max(0, score - 5);
        findings.push({ type: 'warning', message: `Server header exposed: "${h['server']}"` });
    }

    // ── CMS / Framework penalty ──
    const outdatedCms = technologies.filter(t =>
        t.category === 'CMS' && ['WordPress', 'Drupal', 'Joomla'].includes(t.name)
    );
    if (outdatedCms.length > 0) {
        score = Math.max(0, score - 10);
        findings.push({ type: 'warning', message: `Legacy CMS detected (${outdatedCms.map(c => c.name).join(', ')}) — Ensure it is up-to-date` });
    }

    // Clamp
    score = Math.min(100, Math.max(0, score));

    return { score, findings };
}

/**
 * Map a numeric score to a letter grade.
 */
export function generateSecurityGrade(score: number): string {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
}

/**
 * Determine overall exposure level from the score.
 */
export function detectExposureLevel(score: number): RiskAnalysis['exposureLevel'] {
    if (score >= 85) return 'Safe';
    if (score >= 70) return 'Low';
    if (score >= 50) return 'Medium';
    if (score >= 30) return 'High';
    return 'Critical';
}

/**
 * Build the full risk report object that gets embedded in the scan response.
 */
export function buildRiskReport(
    headers: Record<string, string>,
    technologies: DetectedTech[],
    url: string
): RiskAnalysis {
    const { score, findings } = calculateRiskScore(headers, technologies, url);
    return {
        aiRiskScore: score,
        securityGrade: generateSecurityGrade(score),
        exposureLevel: detectExposureLevel(score),
        findings
    };
}

/** Lowercase all header keys and flatten array values for consistent lookup */
function normalizeHeaders(headers: Record<string, string | string[]>): Record<string, string> {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(headers)) {
        out[k.toLowerCase()] = Array.isArray(v) ? v.join('; ') : String(v);
    }
    return out;
}
