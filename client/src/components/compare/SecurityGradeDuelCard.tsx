import { Card, CardContent } from '../ui/card';
import { Shield, Trophy } from 'lucide-react';

interface Props {
    gradeA: string;
    gradeB: string;
    saferTarget: string;
}

export default function SecurityGradeDuelCard({ gradeA, gradeB, saferTarget }: Props) {
    const getGradeColor = (grade: string) => {
        if (grade.startsWith('A')) return 'text-green-400 border-green-500/50 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)]';
        if (grade.startsWith('B')) return 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.3)]';
        if (grade.startsWith('C')) return 'text-orange-400 border-orange-500/50 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.3)]';
        return 'text-red-500 border-red-500/50 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
    };

    return (
        <Card className="glass-card">
            <CardContent className="p-6 flex items-center justify-between">
                <div className="flex-1 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Target A Grade</p>
                    <div className={`inline-block px-6 py-2 rounded-xl border text-4xl font-black ${getGradeColor(gradeA)}`}>
                        {gradeA}
                    </div>
                </div>

                <div className="px-8 flex flex-col items-center border-x border-primary/20">
                    <Shield className="w-8 h-8 text-primary mb-2 opacity-80" />
                    <span className="text-[10px] uppercase font-bold text-primary tracking-widest">Duel</span>
                    {saferTarget !== 'Tie' ? (
                        <div className="mt-4 flex items-center gap-1 text-[10px] uppercase text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">
                            <Trophy className="w-3 h-3" /> Winner: {saferTarget}
                        </div>
                    ) : (
                        <div className="mt-4 text-[10px] uppercase text-gray-400 font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                            Draw
                        </div>
                    )}
                </div>

                <div className="flex-1 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Target B Grade</p>
                    <div className={`inline-block px-6 py-2 rounded-xl border text-4xl font-black ${getGradeColor(gradeB)}`}>
                        {gradeB}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
