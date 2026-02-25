import { motion } from 'framer-motion';

interface Props {
    grade: string;
}

export default function SecurityGradeBadge({ grade }: Props) {
    const getGradeStyle = () => {
        switch (grade) {
            case 'A+': return { bg: 'bg-green-500/15', border: 'border-green-500/50', text: 'text-green-400', glow: '0 0 20px rgba(34,197,94,0.4)' };
            case 'A': return { bg: 'bg-green-500/10', border: 'border-green-500/40', text: 'text-green-400', glow: '0 0 15px rgba(34,197,94,0.3)' };
            case 'B': return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/40', text: 'text-yellow-400', glow: '0 0 15px rgba(234,179,8,0.3)' };
            case 'C': return { bg: 'bg-orange-500/10', border: 'border-orange-500/40', text: 'text-orange-400', glow: '0 0 15px rgba(249,115,22,0.3)' };
            case 'D': return { bg: 'bg-red-500/10', border: 'border-red-500/40', text: 'text-red-400', glow: '0 0 15px rgba(239,68,68,0.3)' };
            default: return { bg: 'bg-red-600/15', border: 'border-red-600/50', text: 'text-red-500', glow: '0 0 20px rgba(239,68,68,0.5)' };
        }
    };

    const style = getGradeStyle();

    return (
        <div className="glass-card p-6 flex flex-col items-center justify-center gap-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Security Grade</h3>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className={`w-24 h-24 rounded-2xl border-2 ${style.bg} ${style.border} flex items-center justify-center`}
                style={{ boxShadow: style.glow }}
            >
                <span className={`text-4xl font-black ${style.text}`}>{grade}</span>
            </motion.div>
            <span className="text-xs text-muted-foreground">
                {grade === 'A+' || grade === 'A' ? 'Excellent Security' :
                    grade === 'B' ? 'Good Security' :
                        grade === 'C' ? 'Fair Security' :
                            grade === 'D' ? 'Poor Security' : 'Critical Risk'}
            </span>
        </div>
    );
}
