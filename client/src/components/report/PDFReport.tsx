import React from 'react';
import { Shield, Activity, Cpu, Network, AlertTriangle } from 'lucide-react';

interface PDFReportProps {
    data: any;
}

export const PDFReport: React.FC<PDFReportProps> = ({ data }) => {
    if (!data) return null;

    // Static mapping for charts to avoid canvas capturing issues
    const stackCategories = data.detected.reduce((acc: Record<string, number>, tech: any) => {
        acc[tech.category] = (acc[tech.category] || 0) + 1;
        return acc;
    }, {});

    const criticalRisks = data.riskAnalysis?.findings.filter((f: any) => f.type === 'critical').length || 0;
    const warningAlerts = data.riskAnalysis?.findings.filter((f: any) => f.type === 'warning').length || 0;

    return (
        <div
            id="pdf-report-container"
            className="p-10 bg-[#0A0F1F] text-white font-sans"
            style={{
                width: '1000px',
                position: 'fixed',
                left: '-9999px',
                top: 0,
                // Ensure no backdrop blur or heavy shadows that break html2canvas
                background: '#0A0F1F',
                zIndex: -9999
            }}
        >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#00F2FF]/30 pb-6 mb-8">
                <div className="flex items-center gap-3">
                    <Shield className="w-10 h-10 text-[#00F2FF]" />
                    <div>
                        <h1 className="text-3xl font-bold tracking-widest text-[#00F2FF] uppercase m-0 p-0 leading-none">TechScope AI</h1>
                        <p className="text-gray-400 text-sm m-0 p-0 mt-1">Security Intelligence Report</p>
                    </div>
                </div>
                <div className="text-right text-xs text-gray-400 font-mono">
                    <p className="m-0">ID: {data.scanId || '---'}</p>
                    <p className="m-0">DATE: {new Date().toLocaleString()}</p>
                </div>
            </div>

            {/* Target Info */}
            <div className="mb-10 p-6 bg-[#00F2FF]/5 border border-[#00F2FF]/20 rounded-xl">
                <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-[#00F2FF] m-0">
                    <Activity className="w-4 h-4" /> Assessment Target
                </h2>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <p className="text-xs text-gray-400 uppercase mb-1 m-0">Target URL</p>
                        <p className="text-lg font-mono truncate m-0">{data.url}</p>
                    </div>
                    {data.riskAnalysis && (
                        <div className="flex gap-10">
                            <div>
                                <p className="text-xs text-gray-400 uppercase mb-1 m-0">Security Grade</p>
                                <p className="text-3xl font-bold text-[#00F2FF] m-0">{data.riskAnalysis.securityGrade}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase mb-1 m-0">Risk Score</p>
                                <p className="text-3xl font-bold text-white m-0">{data.riskAnalysis.aiRiskScore}<span className="text-sm text-gray-400">/100</span></p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Analysis Summary */}
            <div className="mb-10 grid grid-cols-2 gap-8">
                <div className="p-6 border border-[#00F2FF]/20 rounded-xl bg-[#00F2FF]/5">
                    <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-[#00F2FF] m-0">Stack Composition Summary</h2>
                    <div className="space-y-3">
                        {Object.entries(stackCategories).map(([category, count], idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                                <span className="font-mono text-gray-300">{category}</span>
                                <span className="font-bold">{count as number} detected</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-6 border border-[#00F2FF]/20 rounded-xl bg-[#00F2FF]/5">
                    <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-[#00F2FF] m-0">Security Vector Summary</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 border border-[#00F2FF]/10 rounded-lg">
                            <p className="text-[10px] uppercase text-gray-400 m-0">Critical Risks</p>
                            <p className={`text-xl font-bold m-0 ${criticalRisks > 0 ? 'text-red-400' : 'text-white'}`}>{criticalRisks}</p>
                        </div>
                        <div className="p-3 border border-[#00F2FF]/10 rounded-lg">
                            <p className="text-[10px] uppercase text-gray-400 m-0">Warning Alerts</p>
                            <p className={`text-xl font-bold m-0 ${warningAlerts > 0 ? 'text-yellow-400' : 'text-white'}`}>{warningAlerts}</p>
                        </div>
                        <div className="p-3 border border-[#00F2FF]/10 rounded-lg">
                            <p className="text-[10px] uppercase text-gray-400 m-0">Complexity Index</p>
                            <p className="text-xl font-bold m-0">{(data.detected.length / 2).toFixed(1)}/5.0</p>
                        </div>
                        <div className="p-3 border border-[#00F2FF]/10 rounded-lg">
                            <p className="text-[10px] uppercase text-gray-400 m-0">Score Rating</p>
                            <p className="text-xl font-bold text-[#00F2FF] m-0">{data.riskAnalysis?.securityGrade}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-2 gap-8 mb-10">
                {/* Tech Stack */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                    <h2 className="text-sm uppercase flex items-center gap-2 m-0 mb-4 font-bold"><Cpu className="w-4 h-4 text-[#00F2FF]" /> Detected Stack ({data.detected.length})</h2>
                    <div className="space-y-2">
                        {data.detected.map((tech: any, i: number) => (
                            <div key={i} className="flex justify-between items-center p-2 bg-black/20 rounded text-sm">
                                <span className="font-bold">{tech.name}</span>
                                <span className="text-[10px] uppercase text-gray-400 border border-gray-600 px-2 py-0.5 rounded">{tech.category}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Risk Findings */}
                {data.riskAnalysis && (
                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                        <h2 className="text-sm uppercase flex items-center gap-2 m-0 mb-4 font-bold"><AlertTriangle className="w-4 h-4 text-[#00F2FF]" /> Critical Findings</h2>
                        <div className="space-y-2">
                            {data.riskAnalysis.findings.filter((f: any) => f.type !== 'safe').map((finding: any, i: number) => (
                                <div key={i} className={`flex items-start gap-2 p-3 rounded text-xs ${finding.type === 'critical' ? 'bg-red-500/20 text-red-200 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/30'}`}>
                                    {finding.type === 'critical' ? <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> : <Shield className="w-4 h-4 shrink-0 mt-0.5" />}
                                    <span className="leading-tight">{finding.message}</span>
                                </div>
                            ))}
                            {data.riskAnalysis.findings.filter((f: any) => f.type !== 'safe').length === 0 && (
                                <p className="text-sm text-gray-400 italic text-center py-4 m-0">No critical security vulnerabilities found in initial sweep.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Headers Summary */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-[#7000FF] m-0">
                    <Network className="w-4 h-4" /> Header Intelligence Summary
                </h2>
                <div className="grid grid-cols-2 gap-x-10 gap-y-3 font-mono text-xs">
                    {Object.entries(data.headers).slice(0, 10).map(([k, v]) => (
                        <div key={k} className="flex justify-between border-b border-white/10 pb-1">
                            <span className="text-[#00F2FF]/70">{k}:</span>
                            <span className="truncate max-w-[200px] text-gray-300">{String(v)}</span>
                        </div>
                    ))}
                </div>
                {Object.keys(data.headers).length > 10 && (
                    <p className="text-center text-gray-500 mt-4 text-[10px] m-0">... and {Object.keys(data.headers).length - 10} more headers analyzed</p>
                )}
            </div>

            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-white/10 text-center text-[10px] text-gray-500 font-mono">
                CONFIDENTIAL — PREPARED BY TECHSCOPE AI SECURITY ENGINE — OFFLINE COMPATIBLE AUDIT
            </div>
        </div>
    );
};
