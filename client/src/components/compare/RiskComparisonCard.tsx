import { Card, CardContent } from '../ui/card';
import { Activity } from 'lucide-react';
import { Progress } from '../ui/progress';

interface Props {
    scoreA: number;
    scoreB: number;
    riskDifference: number;
}

export default function RiskComparisonCard({ scoreA, scoreB, riskDifference }: Props) {
    const getFillColor = (score: number) => {
        if (score < 30) return 'bg-green-500';
        if (score < 70) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <Card className="glass-card">
            <CardContent className="p-6">
                <div className="flex border-b border-primary/10 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg"><Activity className="w-5 h-5 text-primary" /></div>
                        <div>
                            <h3 className="font-bold uppercase tracking-widest text-sm text-white">Risk Meter</h3>
                            <p className="text-xs text-muted-foreground">AI computed exposure score (Lower is better)</p>
                        </div>
                    </div>
                    <div className="ml-auto text-right">
                        <p className="text-[10px] uppercase text-gray-500 tracking-wider">Risk Gap</p>
                        <p className="text-xl font-bold text-primary font-mono glow-text">{riskDifference} PTS</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2 text-sm font-mono tracking-wider">
                            <span className="text-muted-foreground">TARGET A</span>
                            <span className="font-bold">{scoreA} / 100</span>
                        </div>
                        <Progress value={scoreA} max={100} className="h-4 bg-black/40" indicatorClassName={getFillColor(scoreA)} />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2 text-sm font-mono tracking-wider">
                            <span className="text-muted-foreground">TARGET B</span>
                            <span className="font-bold">{scoreB} / 100</span>
                        </div>
                        <Progress value={scoreB} max={100} className="h-4 bg-black/40" indicatorClassName={getFillColor(scoreB)} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
