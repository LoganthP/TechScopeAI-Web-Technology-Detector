import { useState, FormEvent } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { compareWebsites } from '../../services/api';
import { GitCompare, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onCompareResult: (data: any) => void;
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
}

export default function CompareInputPanel({ onCompareResult, isLoading, setIsLoading }: Props) {
    const [url1, setUrl1] = useState('');
    const [url2, setUrl2] = useState('');
    const [error, setError] = useState('');

    const validateUrl = (value: string) => {
        if (!value) return null;
        const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
        return regex.test(value);
    };

    const isValidUrl1 = validateUrl(url1);
    const isValidUrl2 = validateUrl(url2);

    const handleCompare = async (e?: FormEvent) => {
        if (e) e.preventDefault();
        if (!url1 || !url2 || isValidUrl1 === false || isValidUrl2 === false) return;

        setIsLoading(true);
        setError('');

        try {
            const data = await compareWebsites(url1, url2);
            if (data.success) {
                onCompareResult(data);
            } else {
                setError(data.error || 'Comparison failed');
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Comparison failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center glass-card p-10 mt-6 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <form onSubmit={handleCompare} className="w-full max-w-4xl relative flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full relative flex-1">
                    <Input
                        placeholder="Target A (e.g. apple.com)" value={url1} onChange={(e) => setUrl1(e.target.value)}
                        className={`h-14 bg-background/50 text-lg px-6 rounded-xl transition-all w-full ${isValidUrl1 === false ? 'border-red-500 focus-visible:ring-red-500 shadow-red-500/20' :
                            isValidUrl1 === true ? 'border-green-500 focus-visible:ring-green-500 shadow-green-500/20' :
                                'border-secondary/30 focus-visible:ring-secondary'
                            }`}
                        required disabled={isLoading}
                    />
                    {isValidUrl1 === false && <span className="absolute -bottom-5 left-2 text-xs text-red-400">Invalid URL</span>}
                    {isValidUrl1 === true && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />}
                    {isValidUrl1 === false && <AlertTriangle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />}
                </div>

                <div className="shrink-0 flex items-center justify-center bg-black/40 w-16 h-16 rounded-full border border-primary/30 z-10 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                    <span className="font-bold text-primary text-sm glow-text">VS</span>
                </div>

                <div className="w-full relative flex-1">
                    <Input
                        placeholder="Target B (e.g. microsoft.com)" value={url2} onChange={(e) => setUrl2(e.target.value)}
                        className={`h-14 bg-background/50 text-lg px-6 rounded-xl transition-all w-full ${isValidUrl2 === false ? 'border-red-500 focus-visible:ring-red-500 shadow-red-500/20' :
                            isValidUrl2 === true ? 'border-green-500 focus-visible:ring-green-500 shadow-green-500/20' :
                                'border-secondary/30 focus-visible:ring-secondary'
                            }`}
                        required disabled={isLoading}
                    />
                    {isValidUrl2 === false && <span className="absolute -bottom-5 left-2 text-xs text-red-400">Invalid URL</span>}
                    {isValidUrl2 === true && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />}
                    {isValidUrl2 === false && <AlertTriangle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />}
                </div>
            </form>

            <Button
                onClick={() => handleCompare()}
                disabled={isLoading || !url1 || !url2 || isValidUrl1 === false || isValidUrl2 === false}
                className="mt-10 h-14 px-14 rounded-full bg-primary hover:bg-primary/90 text-black font-extrabold tracking-widest transition-all text-sm group"
            >
                {isLoading ? <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> ANALYZING...</> : <><GitCompare className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" /> INITIATE COMPARISON</>}
            </Button>

            {error && <p className="text-red-400 mt-6 font-mono text-sm border flex items-center gap-2 border-red-500/30 bg-red-500/10 py-2 px-4 rounded-lg"><AlertTriangle className="w-4 h-4" /> {error}</p>}
        </div>
    );
}
