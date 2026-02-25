import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface Props {
    score: number;
    exposureLevel: string;
}

export default function RiskScoreCard({ score, exposureLevel }: Props) {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const getColor = () => {
        if (score >= 80) return '#22c55e';
        if (score >= 60) return '#eab308';
        if (score >= 40) return '#f97316';
        return '#ef4444';
    };

    return (
        <div className="glass-card p-6 flex flex-col items-center justify-center gap-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">AI Risk Score</h3>

            <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                    <motion.circle
                        cx="70" cy="70" r={radius} fill="none"
                        stroke={getColor()}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        style={{ filter: `drop-shadow(0 0 8px ${getColor()})` }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        className="text-4xl font-extrabold text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {score}
                    </motion.span>
                    <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4" style={{ color: getColor() }} />
                <span style={{ color: getColor() }} className="font-semibold">{exposureLevel} Risk</span>
            </div>
        </div>
    );
}
