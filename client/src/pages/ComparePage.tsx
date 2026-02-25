import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, GitCompare } from 'lucide-react';
import CompareInputPanel from '../components/compare/CompareInputPanel';
import CompareResultGrid from '../components/compare/CompareResultGrid';

export default function ComparePage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [comparisonData, setComparisonData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in relative z-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                    <div className="bg-background/80 p-3 rounded-2xl border border-primary/20 relative flex items-center justify-center">
                        <GitCompare className="w-8 h-8 text-primary shadow-cyber" />
                    </div>
                </div>
                <div>
                    <h1 className="text-4xl font-black tracking-widest text-white uppercase glow-text m-0">COMPARE <span className="text-primary font-light">INTELLIGENCE</span></h1>
                    <p className="text-muted-foreground font-mono mt-2 flex items-center flex-row gap-2 m-0 text-sm">
                        <Shield className="w-4 h-4 text-primary" /> CROSS-TARGET SECURITY & EXPOSURE ANALYSIS
                    </p>
                </div>
            </div>

            <CompareInputPanel
                onCompareResult={(data) => setComparisonData(data)}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />

            {/* Results Grid */}
            <AnimatePresence>
                {comparisonData && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mt-12"
                    >
                        <CompareResultGrid data={comparisonData} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
