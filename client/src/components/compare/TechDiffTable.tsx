import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Cpu, Network, MinusCircle } from 'lucide-react';

interface TechDiff { name: string; uniqueTo: string; }
interface HeaderGap { header: string; missingIn: string; }

interface Props {
    techDifferences: TechDiff[];
    headerGaps: HeaderGap[];
}

export default function TechDiffTable({ techDifferences, headerGaps }: Props) {
    return (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card className="glass-card">
                <CardHeader className="pb-3 border-b border-white/5">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-gray-300">
                        <Cpu className="w-4 h-4 text-primary" /> Stack Inconsistencies
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 max-h-[300px] overflow-y-auto pr-2">
                    {techDifferences.length === 0 ? (
                        <p className="text-sm italic text-muted-foreground text-center py-4">Identical technology stacks</p>
                    ) : (
                        <div className="space-y-2">
                            {techDifferences.map((td, i) => (
                                <div key={i} className={`flex items-center justify-between p-3 rounded-lg border text-sm ${td.uniqueTo === 'A' ? 'border-primary/30 bg-primary/5 text-primary' : 'border-secondary/30 bg-secondary/5 text-secondary'}`}>
                                    <span className="font-bold">{td.name}</span>
                                    <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-black/40">Only in {td.uniqueTo}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="glass-card">
                <CardHeader className="pb-3 border-b border-white/5">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-gray-300">
                        <Network className="w-4 h-4 text-primary" /> Header Discrepancies
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 max-h-[300px] overflow-y-auto pr-2">
                    {headerGaps.length === 0 ? (
                        <p className="text-sm italic text-muted-foreground text-center py-4">Identical security headers</p>
                    ) : (
                        <div className="space-y-2">
                            {headerGaps.map((hg, i) => (
                                <div key={i} className={`flex items-center justify-between p-3 rounded-lg border text-sm border-white/10 bg-white/5 text-gray-300`}>
                                    <span className="font-mono text-xs max-w-[180px] truncate">{hg.header}</span>
                                    <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded text-red-400 bg-red-500/10 flex items-center gap-1">
                                        <MinusCircle className="w-3 h-3" /> Missing {hg.missingIn}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
