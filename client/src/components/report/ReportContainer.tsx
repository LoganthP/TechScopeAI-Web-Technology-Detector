import React from 'react';
import { Shield, Activity, Cpu, Network, AlertTriangle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface TechItem {
    name: string;
    category: string;
    confidence: number;
}

interface Finding {
    type: string;
    message: string;
}

interface ReportData {
    scanId?: string;
    url: string;
    detected: TechItem[];
    headers: Record<string, any>;
    riskAnalysis?: {
        securityGrade: string;
        aiRiskScore: number;
        findings: Finding[];
        exposureLevel: string;
    };
    htmlLength: number;
}

interface ReportContainerProps {
    data: ReportData | null;
}

const ReportContainer: React.FC<ReportContainerProps> = ({ data }) => {
    if (!data) return null;

    return (
        <div
            id="pdf-report-content"
            className="p-10 bg-[#0A0F1F] text-white w-[1000px] font-sans"
            style={{ position: 'absolute', left: '-9999px', top: 0 }}
        >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-primary/30 pb-6 mb-8">
                <div className="flex items-center gap-3">
                    <Shield className="w-10 h-10 text-primary" />
                    <div>
                        <h1 className="text-3xl font-bold tracking-widest text-primary uppercase">TechScope AI</h1>
                        <p className="text-muted-foreground text-sm">Security Intelligence Report</p>
                    </div>
                </div>
                <div className="text-right text-xs text-muted-foreground font-mono">
                    <p>ID: {data.scanId || '---'}</p>
                    <p>DATE: {new Date().toLocaleString()}</p>
                </div>
            </div>

            {/* Analysis Summary (Simulated Charts for PDF) */}
            <div className="mb-10 grid grid-cols-2 gap-8">
                <div className="p-6 border border-primary/20 rounded-xl bg-primary/2">
                    <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-primary">Stack Composition Breakdown</h2>
                    <div className="space-y-3">
                        {Object.entries((data.detected as TechItem[]).reduce((acc: Record<string, number>, tech: TechItem) => {
                            acc[tech.category] = (acc[tech.category] || 0) + 1;
                            return acc;
                        }, {})).map(([category, count], idx) => (
                            <div key={idx} className="flex justify-between items-center">
                                <span className="text-sm font-mono opacity-80">{category}</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-24 h-2 bg-primary/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${(count / data.detected.length) * 100}%` }}></div>
                                    </div>
                                    <span className="text-sm font-bold">{count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-6 border border-primary/20 rounded-xl bg-primary/2">
                    <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-primary">Security Vector Analysis</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 border border-primary/10 rounded-lg">
                            <p className="text-[10px] uppercase opacity-50">Critical Risks</p>
                            <p className="text-xl font-bold">{(data.riskAnalysis?.findings as Finding[]).filter((f: Finding) => f.type === 'critical').length || 0}</p>
                        </div>
                        <div className="p-3 border border-primary/10 rounded-lg">
                            <p className="text-[10px] uppercase opacity-50">Warning Alerts</p>
                            <p className="text-xl font-bold">{(data.riskAnalysis?.findings as Finding[]).filter((f: Finding) => f.type === 'warning').length || 0}</p>
                        </div>
                        <div className="p-3 border border-primary/10 rounded-lg">
                            <p className="text-[10px] uppercase opacity-50">Complexity Index</p>
                            <p className="text-xl font-bold">{(data.detected.length / 2).toFixed(1)}/5.0</p>
                        </div>
                        <div className="p-3 border border-primary/10 rounded-lg">
                            <p className="text-[10px] uppercase opacity-50">Score Rating</p>
                            <p className="text-xl font-bold text-primary">{data.riskAnalysis?.securityGrade}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Target Info */}
            <div className="mb-10 p-6 bg-primary/5 border border-primary/20 rounded-xl">
                <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-primary">
                    <Activity className="w-4 h-4" /> Assessment Target
                </h2>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase mb-1">Target URL</p>
                        <p className="text-lg font-mono truncate">{data.url}</p>
                    </div>
                    {data.riskAnalysis && (
                        <div className="flex gap-10">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase mb-1">Security Grade</p>
                                <p className="text-3xl font-bold text-primary">{data.riskAnalysis.securityGrade}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase mb-1">Risk Score</p>
                                <p className="text-3xl font-bold text-white">{data.riskAnalysis.aiRiskScore}<span className="text-sm text-muted-foreground">/100</span></p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-2 gap-8 mb-10">
                {/* Tech Stack */}
                <Card className="bg-background/20 border-primary/10">
                    <CardHeader>
                        <CardTitle className="text-sm uppercase flex items-center gap-2"><Cpu className="w-4 h-4 text-primary" /> Detected Stack ({data.detected.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {data.detected.map((tech: TechItem, i: number) => (
                            <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded">
                                <span className="font-bold">{tech.name}</span>
                                <Badge variant="outline" className="text-[10px] uppercase border-primary/30">{tech.category}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Risk Findings */}
                {data.riskAnalysis && (
                    <Card className="bg-background/20 border-primary/10">
                        <CardHeader>
                            <CardTitle className="text-sm uppercase flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-primary" /> Critical Findings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {data.riskAnalysis.findings.filter((f: Finding) => f.type !== 'safe').map((finding: Finding, i: number) => (
                                <div key={i} className={`flex items-start gap-2 p-2 rounded text-xs ${finding.type === 'critical' ? 'bg-red-500/10 text-red-300' : 'bg-yellow-500/10 text-yellow-200'}`}>
                                    {finding.type === 'critical' ? <AlertTriangle className="w-3 h-3 shrink-0" /> : <Shield className="w-3 h-3 shrink-0" />}
                                    <span>{finding.message}</span>
                                </div>
                            ))}
                            {data.riskAnalysis.findings.filter((f: Finding) => f.type !== 'safe').length === 0 && (
                                <p className="text-xs text-muted-foreground italic text-center py-4">No critical security vulnerabilities found in initial sweep.</p>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Headers Summary */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-secondary">
                    <Network className="w-4 h-4" /> Header Intelligence Summary
                </h2>
                <div className="grid grid-cols-2 gap-x-10 gap-y-2 font-mono text-xs">
                    {Object.entries(data.headers).slice(0, 10).map(([k, v]) => (
                        <div key={k} className="flex justify-between border-b border-white/5 pb-1">
                            <span className="text-primary/70">{k}:</span>
                            <span className="truncate max-w-[200px]">{String(v)}</span>
                        </div>
                    ))}
                    {Object.keys(data.headers).length > 10 && (
                        <p className="col-span-2 text-center text-muted-foreground mt-2 text-[10px]">... and {Object.keys(data.headers).length - 10} more headers analyzed</p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-white/10 text-center text-[10px] text-muted-foreground font-mono">
                CONFIDENTIAL — PREPARED BY TECHSCOPE AI SECURITY ENGINE — OFFLINE COMPATIBLE AUDIT
            </div>
        </div>
    );
};

export default ReportContainer;
