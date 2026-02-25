import {
    PieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface AnalysisChartsProps {
    data: {
        detected: Array<{ name: string; category: string; confidence: number }>;
        riskAnalysis?: {
            aiRiskScore: number;
            findings: Array<{ type: string; message: string }>;
        };
    } | null;
}

const COLORS = ['#00F2FF', '#7000FF', '#FF00C8', '#00FF90', '#FFB800'];

export default function AnalysisCharts({ data }: AnalysisChartsProps) {
    if (!data) return null;

    // 1. Technology Category Distribution
    const categoryCounts = data.detected.reduce((acc: Record<string, number>, tech) => {
        acc[tech.category] = (acc[tech.category] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.keys(categoryCounts).map(cat => ({
        name: cat,
        value: categoryCounts[cat]
    }));

    // 2. Risk Vector Analysis (Radar Data)
    const findingsByType = data.riskAnalysis?.findings.reduce((acc: Record<string, number>, f) => {
        acc[f.type] = (acc[f.type] || 0) + 1;
        return acc;
    }, {}) || {};

    const radarData = [
        { subject: 'Critical', A: findingsByType.critical || 0, fullMark: 5 },
        { subject: 'Warning', A: findingsByType.warning || 0, fullMark: 5 },
        { subject: 'Safe', A: findingsByType.safe || 0, fullMark: 5 },
        { subject: 'Headers', A: data.riskAnalysis?.aiRiskScore ? Math.floor(data.riskAnalysis.aiRiskScore / 20) : 0, fullMark: 5 },
        { subject: 'Complexity', A: Math.min(5, data.detected.length / 2), fullMark: 5 },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-background/40 border-primary/20 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                        Stack Composition
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] w-full flex items-center justify-center">
                    {pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A0F1F', border: '1px solid #00F2FF', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-muted-foreground flex h-full items-center justify-center">No categories found</div>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-background/40 border-primary/20 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary">
                        Exposure Mapping
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={250}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="#ffffff20" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff80', fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                            <Radar
                                name="Risk"
                                dataKey="A"
                                stroke="#7000FF"
                                fill="#7000FF"
                                fillOpacity={0.6}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0A0F1F', border: '1px solid #7000FF', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
