import SecurityGradeDuelCard from './SecurityGradeDuelCard';
import RiskComparisonCard from './RiskComparisonCard';
import TechDiffTable from './TechDiffTable';
import AnalysisCharts from '../analysis/AnalysisCharts';
import { Target } from 'lucide-react';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

export default function CompareResultGrid({ data }: Props) {
    if (!data || !data.targetA) return null;

    const { targetA, targetB, comparison } = data;

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Top row targets */}
            <div className="flex justify-between items-center bg-black/40 p-4 border border-primary/20 rounded-xl mb-2">
                <div className="flex-1 flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded border border-primary/40"><Target className="w-4 h-4 text-primary" /></div>
                    <span className="font-mono text-sm tracking-widest text-[#00F2FF] truncate max-w-[250px]">{targetA.url}</span>
                </div>
                <div className="px-6 text-xs text-muted-foreground uppercase tracking-widest font-bold">VS</div>
                <div className="flex-1 flex items-center justify-end gap-3 text-right">
                    <span className="font-mono text-sm tracking-widest text-secondary truncate max-w-[250px]">{targetB.url}</span>
                    <div className="p-2 bg-secondary/20 rounded border border-secondary/40"><Target className="w-4 h-4 text-secondary" /></div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <SecurityGradeDuelCard
                    gradeA={targetA.grade}
                    gradeB={targetB.grade}
                    saferTarget={comparison.saferTarget}
                />
                <RiskComparisonCard
                    scoreA={targetA.riskScore}
                    scoreB={targetB.riskScore}
                    riskDifference={comparison.riskDifference}
                />
            </div>

            <TechDiffTable
                techDifferences={comparison.techDifferences}
                headerGaps={comparison.headerGaps}
            />

            <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-[#00F2FF] text-center uppercase tracking-widest bg-black/40 py-2 border border-[#00F2FF]/20 rounded-lg">Target A Analysis</h3>
                    <AnalysisCharts data={{
                        detected: targetA.techStack || [],
                        riskAnalysis: {
                            aiRiskScore: targetA.riskScore,
                            findings: [] // Full findings aren't forwarded in the compare API currently, but radar uses score/complexity
                        }
                    }} />
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-secondary text-center uppercase tracking-widest bg-black/40 py-2 border border-secondary/20 rounded-lg">Target B Analysis</h3>
                    <AnalysisCharts data={{
                        detected: targetB.techStack || [],
                        riskAnalysis: {
                            aiRiskScore: targetB.riskScore,
                            findings: []
                        }
                    }} />
                </div>
            </div>
        </div>
    );
}
