import { create } from 'zustand';

export type DetectedTech = {
    name: string;
    category: string;
    confidence: number;
    icon?: string;
};

export type Finding = {
    type: 'critical' | 'warning' | 'safe';
    message: string;
};

export type RiskAnalysis = {
    aiRiskScore: number;
    securityGrade: string;
    exposureLevel: 'Critical' | 'High' | 'Medium' | 'Low' | 'Safe';
    findings: Finding[];
};

// Legacy compat — kept so older components don't break
export type RiskData = {
    score: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    vulnerabilities: string[];
};

export type ScanResult = {
    scanId: string;
    url: string;
    detected: DetectedTech[];
    headers: Record<string, string>;
    htmlLength: number;
    riskAnalysis: RiskAnalysis;
    // Legacy field — may or may not be present
    riskData?: RiskData;
};

interface AppState {
    currentScan: ScanResult | null;
    history: ScanResult[];
    isScanning: boolean;
    setCurrentScan: (scan: ScanResult) => void;
    setHistory: (history: ScanResult[]) => void;
    setIsScanning: (isScanning: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    currentScan: null,
    history: [],
    isScanning: false,
    setCurrentScan: (scan) => set({ currentScan: scan }),
    setHistory: (history) => set({ history }),
    setIsScanning: (isScanning) => set({ isScanning })
}));
