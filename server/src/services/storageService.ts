import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(__dirname, '..', '..', 'data');
const HISTORY_FILE = join(DATA_DIR, 'scan-history.json');

interface ScanRecord {
    id: string;
    url: string;
    technologies: any[];
    riskScore: string;
    createdAt: string;
}

function ensureDataDir() {
    if (!existsSync(DATA_DIR)) {
        mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!existsSync(HISTORY_FILE)) {
        writeFileSync(HISTORY_FILE, '[]', 'utf-8');
    }
}

function readHistory(): ScanRecord[] {
    ensureDataDir();
    try {
        const raw = readFileSync(HISTORY_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function writeHistory(records: ScanRecord[]) {
    ensureDataDir();
    writeFileSync(HISTORY_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

export function saveScanResult(record: ScanRecord) {
    const history = readHistory();
    history.unshift(record);
    // Keep only last 100 scans
    if (history.length > 100) history.length = 100;
    writeHistory(history);
}

export function getScanHistory(): ScanRecord[] {
    return readHistory();
}

export function clearHistory() {
    writeHistory([]);
}
