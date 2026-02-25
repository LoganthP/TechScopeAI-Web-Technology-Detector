import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { History, TableIcon, Calendar, ActivitySquare, Server, AlertCircle } from 'lucide-react';
import { fetchHistory } from '../services/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';

export default function HistoryPage() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory().then(res => {
            if (res.success) {
                setHistory(res.history);
            }
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-10">
                <History className="w-16 h-16 text-primary mb-4" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Telemetry Logs</h1>
                <p className="text-muted-foreground mt-2">Historical database of previous target scans.</p>
            </motion.div>

            <Card className="glass-card overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-primary animate-pulse">Retrieving archived data blocks...</div>
                ) : history.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-4">
                        <TableIcon className="w-12 h-12 opacity-20" />
                        <p>No scans found in database.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader className="bg-primary/5">
                            <TableRow className="border-primary/20 hover:bg-transparent">
                                <TableHead className="text-primary font-bold"><Calendar className="inline w-4 h-4 mr-2" /> Timestamp</TableHead>
                                <TableHead className="text-primary font-bold"><ActivitySquare className="inline w-4 h-4 mr-2" /> Target URL</TableHead>
                                <TableHead className="text-primary font-bold"><Server className="inline w-4 h-4 mr-2" /> Tech Count</TableHead>
                                <TableHead className="text-primary font-bold"><AlertCircle className="inline w-4 h-4 mr-2" /> Risk</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {history.map((h) => (
                                <TableRow key={h.id} className="border-primary/10 hover:bg-primary/5 transition-colors">
                                    <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                                        {new Date(h.createdAt).toLocaleString()}
                                    </TableCell>
                                    <TableCell className="font-bold text-white glow-text max-w-xs truncate">{h.url}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="border-secondary/40 text-secondary">{h.technologies?.length || 0} assets</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            h.riskScore === 'High' ? 'border-red-500 text-red-500' :
                                                h.riskScore === 'Medium' ? 'border-yellow-500 text-yellow-500' :
                                                    'border-green-500 text-green-500'
                                        }>{h.riskScore}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Card>
        </div>
    );
}
