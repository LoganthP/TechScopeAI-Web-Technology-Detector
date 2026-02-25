import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, Loader2, ShieldAlert, Cpu, Network, CheckCircle2, AlertTriangle, ShieldX, ActivitySquare } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { Progress } from '../components/ui/progress';
import { useAppStore } from '../store/useAppStore';
import { scanWebsite } from '../services/api';
import RiskScoreCard from '../components/risk/RiskScoreCard';
import SecurityGradeBadge from '../components/risk/SecurityGradeBadge';
import RiskFindingsPanel from '../components/risk/RiskFindingsPanel';
import { toast } from 'sonner';
import AnalysisCharts from '../components/analysis/AnalysisCharts';
import { logger } from '../utils/logger';

export default function DetectorPage() {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const { currentScan, isScanning, setCurrentScan, setIsScanning } = useAppStore();
    const [scanProgress, setScanProgress] = useState(0);
    const [isValidUrl, setIsValidUrl] = useState<boolean | null>(null);

    const validateUrl = (value: string) => {
        if (!value) return null;
        const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
        return regex.test(value);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setUrl(val);
        setIsValidUrl(validateUrl(val));
    };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isScanning) {
            setScanProgress(0);
            interval = setInterval(() => {
                setScanProgress(p => (p >= 90 ? 90 : p + Math.random() * 15));
            }, 500);
        } else {
            setScanProgress(100);
        }
        return () => clearInterval(interval);
    }, [isScanning]);

    const handleScan = async (e: FormEvent) => {
        e.preventDefault();
        if (!url) return;
        if (isValidUrl === false) {
            toast.error('Please enter a valid URL');
            return;
        }

        setError('');
        setIsScanning(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setCurrentScan(null as any);

        const toastId = toast.loading(`Scanning ${url.replace(/^https?:\/\//, '')}...`);

        try {
            const result = await scanWebsite(url);
            if (result.success) {
                setCurrentScan(result);
                toast.success('Intelligence sweep complete!', { id: toastId });
            } else {
                const msg = result.error || 'Scan failed';
                setError(msg);
                toast.error(msg, { id: toastId });
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Network error';
            logger.error('Scan failed', err);
            setError(message);
            toast.error(`Error: ${message}`, { id: toastId });
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">

            {/* Search Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center mb-12"
            >
                <Radar className="w-16 h-16 text-primary mb-4 animate-[spin_4s_linear_infinite]" />
                <h1 className="text-3xl font-bold mb-6 glow-text">Initiate Target Sweep</h1>

                <form onSubmit={handleScan} className="w-full max-w-3xl relative flex gap-4">
                    <div className="w-full relative flex-1">
                        <Input
                            type="text"
                            placeholder="https://example.com"
                            value={url}
                            onChange={handleUrlChange}
                            className={`h-14 bg-background/50 text-lg px-6 rounded-xl transition-all shadow-cyber-sm w-full ${isValidUrl === false ? 'border-red-500 focus-visible:ring-red-500 shadow-red-500/20' :
                                isValidUrl === true ? 'border-primary focus-visible:ring-primary shadow-primary/20' :
                                    'border-primary/30 focus-visible:ring-primary'
                                }`}
                            disabled={isScanning}
                        />
                        {isValidUrl === false && <span className="absolute -bottom-5 left-2 text-xs text-red-400">Invalid URL format</span>}
                        {isValidUrl === true && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />}
                        {isValidUrl === false && <AlertTriangle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />}
                    </div>
                    <Button
                        type="submit"
                        disabled={isScanning || !url || isValidUrl === false}
                        className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-cyber hover:shadow-cyber-lg transition-all"
                    >
                        {isScanning ? (
                            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> SCANNING...</>
                        ) : (
                            <><Radar className="w-5 h-5 mr-2" /> EXECUTE</>
                        )}
                    </Button>
                </form>
                {error && <p className="text-red-400 mt-4 font-medium flex items-center gap-2"><ShieldX className="w-4 h-4" /> {error}</p>}
            </motion.div>

            {/* Progress Line */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="max-w-3xl mx-auto mb-12"
                    >
                        <div className="flex justify-between items-center mb-2 text-primary font-mono text-sm">
                            <span>Establishing secure connection...</span>
                            <span>{Math.round(scanProgress)}%</span>
                        </div>
                        <Progress value={scanProgress} className="h-2 bg-primary/20" />
                        <div className="mt-4 p-4 font-mono text-xs text-secondary/80 bg-black/40 rounded-lg border border-primary/10 h-32 overflow-hidden flex flex-col justify-end">
                            <p className="typing-animation">&gt; Initializing recon modules...</p>
                            <p className="typing-animation" style={{ animationDelay: '0.5s' }}>&gt; Resolving target: {url}</p>
                            <p className="typing-animation" style={{ animationDelay: '1s' }}>&gt; Analyzing response headers...</p>
                            <p className="typing-animation" style={{ animationDelay: '1.5s' }}>&gt; Parsing DOM tree patterns...</p>
                            {scanProgress > 50 && <p className="typing-animation truncate text-primary">&gt; Computing risk exposure analysis...</p>}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results Dashboard */}
            {currentScan && !isScanning && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="pb-8"
                >
                    <Tabs defaultValue="overview" className="w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 max-w-5xl mx-auto">
                            <TabsList className="grid w-full grid-cols-5 max-w-2xl bg-background/40 border border-primary/20 h-14 rounded-xl">
                                <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg text-sm">Overview</TabsTrigger>
                                <TabsTrigger value="risk" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg text-sm">Risk Analysis</TabsTrigger>
                                <TabsTrigger value="tech" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg text-sm">Technologies</TabsTrigger>
                                <TabsTrigger value="headers" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg text-sm">Headers</TabsTrigger>
                                <TabsTrigger value="security" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg text-sm">Security</TabsTrigger>
                            </TabsList>
                        </div>

                        {/* ──── OVERVIEW TAB ──── */}
                        <TabsContent value="overview">
                            <div className="grid md:grid-cols-3 gap-6">
                                <Card className="glass-card md:col-span-2 shadow-lg hover:shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2"><ActivitySquare className="w-5 h-5 text-secondary" /> Target Overview</CardTitle>
                                        <CardDescription className="font-mono text-primary/80">{currentScan.url}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-6">
                                        <div className="flex flex-wrap gap-4">
                                            <div className="flex flex-col p-4 bg-background/50 rounded-lg border border-primary/10 flex-1 min-w-[200px]">
                                                <span className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Technologies Found</span>
                                                <span className="text-4xl font-bold text-white glow-text">{currentScan.detected.length}</span>
                                            </div>
                                            <div className="flex flex-col p-4 bg-background/50 rounded-lg border border-primary/10 flex-1 min-w-[200px]">
                                                <span className="text-muted-foreground text-sm uppercase tracking-wider mb-2">HTML Payload</span>
                                                <span className="text-4xl font-bold text-white glow-text">{(currentScan.htmlLength / 1024).toFixed(1)} KB</span>
                                            </div>
                                            {currentScan.riskAnalysis && (
                                                <div className="flex flex-col p-4 bg-background/50 rounded-lg border border-primary/10 flex-1 min-w-[200px]">
                                                    <span className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Security Score</span>
                                                    <span className="text-4xl font-bold text-white glow-text">{currentScan.riskAnalysis.aiRiskScore}<span className="text-lg text-muted-foreground">/100</span></span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                                {currentScan.riskAnalysis && (
                                    <SecurityGradeBadge grade={currentScan.riskAnalysis.securityGrade} />
                                )}
                            </div>
                            <AnalysisCharts data={currentScan} />
                        </TabsContent>

                        {/* ──── RISK ANALYSIS TAB (NEW) ──── */}
                        <TabsContent value="risk">
                            {currentScan.riskAnalysis ? (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    <h2 className="text-2xl font-bold text-white glow-text mb-6 flex items-center gap-3">
                                        <ShieldAlert className="w-7 h-7 text-primary" /> AI Risk Exposure Analysis
                                    </h2>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <RiskScoreCard score={currentScan.riskAnalysis.aiRiskScore} exposureLevel={currentScan.riskAnalysis.exposureLevel} />
                                        <SecurityGradeBadge grade={currentScan.riskAnalysis.securityGrade} />
                                        {/* Exposure Summary */}
                                        <div className="glass-card p-6 flex flex-col gap-3">
                                            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Exposure Level</h3>
                                            <div className={`text-3xl font-extrabold ${currentScan.riskAnalysis.exposureLevel === 'Critical' ? 'text-red-500' :
                                                currentScan.riskAnalysis.exposureLevel === 'High' ? 'text-orange-500' :
                                                    currentScan.riskAnalysis.exposureLevel === 'Medium' ? 'text-yellow-400' :
                                                        currentScan.riskAnalysis.exposureLevel === 'Low' ? 'text-green-400' : 'text-green-500'
                                                }`}>
                                                {currentScan.riskAnalysis.exposureLevel}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-2 space-y-1">
                                                <p>🔴 {currentScan.riskAnalysis.findings.filter(f => f.type === 'critical').length} Critical Issues</p>
                                                <p>🟠 {currentScan.riskAnalysis.findings.filter(f => f.type === 'warning').length} Warnings</p>
                                                <p>🟢 {currentScan.riskAnalysis.findings.filter(f => f.type === 'safe').length} Passed Checks</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <RiskFindingsPanel findings={currentScan.riskAnalysis.findings} />
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="glass-card p-8 text-center text-muted-foreground">
                                    <ShieldAlert className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                                    <h3 className="text-lg font-bold mb-2">Limited Risk Analysis</h3>
                                    <p>Risk analysis data is unavailable for this scan. Headers may not have been fully accessible.</p>
                                </div>
                            )}
                        </TabsContent>

                        {/* ──── TECHNOLOGIES TAB ──── */}
                        <TabsContent value="tech">
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Cpu className="w-5 h-5 text-primary" /> Detected Stack</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {currentScan.detected.length === 0 ? (
                                            <div className="col-span-full py-10 text-center text-muted-foreground">No recognized technologies detected.</div>
                                        ) : (currentScan.detected.map((tech, idx) => (
                                            <div key={idx} className="flex flex-col p-4 bg-secondary/5 border border-secondary/20 rounded-xl hover:bg-secondary/10 transition-colors group">
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="font-bold text-lg text-white group-hover:glow-text transition-all">{tech.name}</span>
                                                    <Badge variant="outline" className="border-primary/50 text-primary">{tech.category}</Badge>
                                                </div>
                                                <div className="flex justify-between items-center text-xs text-muted-foreground mt-auto">
                                                    <span>Confidence</span>
                                                    <span className="text-green-400 font-mono">{tech.confidence}%</span>
                                                </div>
                                                <Progress value={tech.confidence} className="h-1 mt-2 bg-background" />
                                            </div>
                                        )))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* ──── HEADERS TAB ──── */}
                        <TabsContent value="headers">
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Network className="w-5 h-5 text-secondary" /> Raw Header Intercept</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-[400px] w-full rounded-md border border-primary/20 bg-black/50 p-4 font-mono text-sm text-green-400">
                                        {Object.entries(currentScan.headers).map(([key, value]) => (
                                            <div key={key} className="flex border-b border-white/5 py-2 hover:bg-white/5">
                                                <span className="w-1/3 text-primary/80 shrink-0 font-bold">{key}:</span>
                                                <span className="w-2/3 break-all">{value}</span>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* ──── SECURITY TAB ──── */}
                        <TabsContent value="security">
                            {currentScan.riskAnalysis ? (
                                <RiskFindingsPanel findings={currentScan.riskAnalysis.findings} />
                            ) : currentScan.riskData ? (
                                <Card className="glass-card">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-red-400" /> Vulnerability Assessment</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {currentScan.riskData.vulnerabilities.length === 0 ? (
                                            <div className="flex items-center gap-3 text-green-500 p-6 bg-green-500/10 rounded-xl border border-green-500/30">
                                                <CheckCircle2 className="w-8 h-8" />
                                                <div>
                                                    <h4 className="font-bold text-lg">No Critical Surface Vulnerabilities</h4>
                                                    <p className="text-sm opacity-80">Security headers and framework versions appear satisfactory.</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {currentScan.riskData.vulnerabilities.map((vuln, i) => (
                                                    <div key={i} className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200">
                                                        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                                        <span>{vuln}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="glass-card p-8 text-center text-muted-foreground">No security data available.</div>
                            )}
                        </TabsContent>
                    </Tabs>
                </motion.div>
            )
            }

            {/* Empty State */}
            {
                !currentScan && !isScanning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center opacity-60"
                    >
                        <div className="relative mb-6">
                            <Radar className="w-20 h-20 text-primary/20 animate-pulse" />
                            <ShieldAlert className="w-8 h-8 text-secondary absolute bottom-0 right-0" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">No Target Selected</h2>
                        <p className="max-w-md text-muted-foreground">Enter a URL above and initiate an intelligence sweep to analyze technologies, risk exposure, and infrastructure.</p>
                    </motion.div>
                )
            }

        </div >
    );
}

