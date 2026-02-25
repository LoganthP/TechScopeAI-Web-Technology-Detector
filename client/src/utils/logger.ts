export const logger = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug: (message: string, ...optionalParams: any[]) => {
        if (import.meta.env.DEV) {
            console.log(`[TechScope Debug] ${message}`, ...optionalParams);
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: (message: string, ...optionalParams: any[]) => {
        console.error(`[TechScope Error] ${message}`, ...optionalParams);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn: (message: string, ...optionalParams: any[]) => {
        console.warn(`[TechScope Warn] ${message}`, ...optionalParams);
    }
};
