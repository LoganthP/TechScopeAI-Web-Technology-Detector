export interface DetectionRule {
    name: string;
    category: 'Frontend' | 'Backend' | 'CMS' | 'Server' | 'Analytics' | 'UI' | 'Security' | 'CDN' | 'Other';
    icon?: string;
    match: {
        headers?: Record<string, string | RegExp>;
        html?: RegExp[];
        scripts?: RegExp[];
        meta?: Record<string, string | RegExp>;
        cookies?: string[];
        globalVars?: string[];
    };
}

export type DetectedTech = {
    name: string;
    category: string;
    confidence: number;
    icon?: string;
};
