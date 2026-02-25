import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Finding {
    type: 'critical' | 'warning' | 'safe';
    message: string;
}

interface Props {
    findings: Finding[];
}

export default function RiskFindingsPanel({ findings }: Props) {
    const criticals = findings.filter(f => f.type === 'critical');
    const warnings = findings.filter(f => f.type === 'warning');
    const safes = findings.filter(f => f.type === 'safe');
    const sorted = [...criticals, ...warnings, ...safes];

    const getIcon = (type: Finding['type']) => {
        switch (type) {
            case 'critical': return <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />;
            case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />;
            case 'safe': return <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />;
        }
    };

    const getRowStyle = (type: Finding['type']) => {
        switch (type) {
            case 'critical': return 'border-red-500/30 bg-red-500/5';
            case 'warning': return 'border-yellow-500/30 bg-yellow-500/5';
            case 'safe': return 'border-green-500/30 bg-green-500/5';
        }
    };

    return (
        <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Security Findings</h3>

            <div className="flex gap-3 mb-5 text-xs font-semibold">
                <span className="flex items-center gap-1 text-red-400"><AlertCircle className="w-3.5 h-3.5" /> {criticals.length} Critical</span>
                <span className="flex items-center gap-1 text-yellow-400"><AlertTriangle className="w-3.5 h-3.5" /> {warnings.length} Warnings</span>
                <span className="flex items-center gap-1 text-green-400"><CheckCircle2 className="w-3.5 h-3.5" /> {safes.length} Passed</span>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {sorted.map((finding, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex items-start gap-3 p-3 rounded-lg border ${getRowStyle(finding.type)}`}
                    >
                        {getIcon(finding.type)}
                        <span className="text-sm text-white/90">{finding.message}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
