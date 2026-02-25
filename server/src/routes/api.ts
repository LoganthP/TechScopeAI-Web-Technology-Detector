import { Router } from 'express';
import { scanUrl } from '../services/scanner';
import { buildRiskReport } from '../utils/riskEngine';
import { saveScanResult, getScanHistory, clearHistory } from '../services/storageService';
import { randomUUID } from 'crypto';

const router = Router();

// Scan a single URL — returns techStack + headers + full riskAnalysis
router.post('/scan', async (req, res) => {
    try {
        let { url } = req.body;
        if (!url) {
            return res.status(400).json({ success: false, error: 'URL is required' });
        }
        if (!url.startsWith('http')) {
            url = 'https://' + url;
        }

        const { detected, headers, htmlLength } = await scanUrl(url);
        const riskAnalysis = buildRiskReport(headers, detected, url);
        const scanId = randomUUID();

        try {
            saveScanResult({
                id: scanId,
                url,
                technologies: detected,
                riskScore: riskAnalysis.securityGrade,
                createdAt: new Date().toISOString()
            });
        } catch (storageErr) {
            console.warn('[API /scan] Storage failed but proceeding with response:', storageErr);
        }

        res.json({
            success: true,
            scanId,
            url,
            detected,
            headers,
            htmlLength,
            riskAnalysis
        });
    } catch (err: any) {
        const statusCode = err.message?.includes('Target unreachable') ? 404 : 500;
        const message = err instanceof Error ? err.message : 'Internal scan engine error';
        console.error(`[API /scan error] [${statusCode}]`, message);
        res.status(statusCode).json({
            success: false,
            error: message,
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

// Compare two URLs side by side
router.post('/compare', async (req, res) => {
    try {
        const { url1, url2 } = req.body;
        if (!url1 || !url2) return res.status(400).json({ success: false, error: 'Both url1 and url2 are required' });

        const fixUrl = (u: string) => u.startsWith('http') ? u : 'https://' + u;
        const fixed1 = fixUrl(url1);
        const fixed2 = fixUrl(url2);

        // Run scans in parallel
        const [scan1, scan2] = await Promise.all([scanUrl(fixed1), scanUrl(fixed2)]);
        const risk1 = buildRiskReport(scan1.headers, scan1.detected, fixed1);
        const risk2 = buildRiskReport(scan2.headers, scan2.detected, fixed2);

        // Build target data
        const targetA = {
            url: fixed1,
            techStack: scan1.detected,
            riskScore: risk1.aiRiskScore,
            grade: risk1.securityGrade,
            headers: scan1.headers
        };

        const targetB = {
            url: fixed2,
            techStack: scan2.detected,
            riskScore: risk2.aiRiskScore,
            grade: risk2.securityGrade,
            headers: scan2.headers
        };

        // Calculate comparison intelligence
        // 1. Tech Differences
        const techsA = new Set(targetA.techStack.map(t => t.name));
        const techsB = new Set(targetB.techStack.map(t => t.name));
        const techDifferences = [
            ...targetA.techStack.filter(t => !techsB.has(t.name)).map(t => ({ name: t.name, uniqueTo: 'A' })),
            ...targetB.techStack.filter(t => !techsA.has(t.name)).map(t => ({ name: t.name, uniqueTo: 'B' }))
        ];

        // 2. Header Gaps
        const headersA = Object.keys(targetA.headers).map(h => h.toLowerCase());
        const headersB = Object.keys(targetB.headers).map(h => h.toLowerCase());
        const headerGaps = [
            ...headersA.filter(h => !headersB.includes(h)).map(h => ({ header: h, missingIn: 'B' })),
            ...headersB.filter(h => !headersA.includes(h)).map(h => ({ header: h, missingIn: 'A' }))
        ];

        // 3. Safer Target (Lower score = lower risk = safer)
        let saferTarget = 'Tie';
        if (targetA.riskScore < targetB.riskScore) saferTarget = 'A';
        if (targetB.riskScore < targetA.riskScore) saferTarget = 'B';

        const comparison = {
            riskDifference: Math.abs(targetA.riskScore - targetB.riskScore),
            saferTarget,
            techDifferences,
            headerGaps
        };

        res.json({
            success: true,
            targetA,
            targetB,
            comparison
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Comparison failed';
        console.error('[API /compare error]', message);
        res.status(500).json({ success: false, error: message });
    }
});

// Get scan history
router.get('/history', (_req, res) => {
    try {
        const history = getScanHistory();
        res.json({ success: true, history });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to load history';
        res.status(500).json({ success: false, error: message });
    }
});

// Clear scan history
router.delete('/history', (_req, res) => {
    try {
        clearHistory();
        res.json({ success: true });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to clear history';
        res.status(500).json({ success: false, error: message });
    }
});

export default router;
