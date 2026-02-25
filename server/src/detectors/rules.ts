import { DetectionRule } from './types';

export const rules: DetectionRule[] = [
    // Frontend Frameworks
    {
        name: 'React',
        category: 'Frontend',
        match: {
            html: [/<[^>]+data-reactroot/i, /<[^>]+data-reactid/i, /<div id="root">/i],
            scripts: [/react[\.-].*\.js/i],
            globalVars: ['React', 'ReactDOM']
        }
    },
    {
        name: 'Vue.js',
        category: 'Frontend',
        match: {
            html: [/<[^>]+data-v-[a-z0-9]+/i, /<[^>]+data-vue-meta/i, /<div id="app">/i],
            globalVars: ['Vue']
        }
    },
    {
        name: 'Angular',
        category: 'Frontend',
        match: {
            html: [/<[^>]+ng-version/i, /<[^>]+ng-app/i, /<app-root/i],
            globalVars: ['angular']
        }
    },
    {
        name: 'Svelte',
        category: 'Frontend',
        match: {
            html: [/<[^>]+svelte-/i, /class="[^"]*svelte-[a-z0-9]{6}/i]
        }
    },
    {
        name: 'Next.js',
        category: 'Frontend',
        match: {
            html: [/<div id="__next">/i, /<script[^>]+__NEXT_DATA__/i],
            headers: { 'x-powered-by': /Next\.js/i },
            globalVars: ['__NEXT_DATA__']
        }
    },
    {
        name: 'Nuxt.js',
        category: 'Frontend',
        match: {
            html: [/<div id="__nuxt">/i, /<script[^>]+__NUXT__/i],
            globalVars: ['__NUXT__']
        }
    },

    // Backend & Servers
    { name: 'Node.js', category: 'Backend', match: { headers: { 'x-powered-by': /Express/i, 'server': /node/i } } },
    { name: 'PHP', category: 'Backend', match: { headers: { 'x-powered-by': /PHP/i }, html: [/\.php\b/i] } },
    { name: 'Django', category: 'Backend', match: { html: [/csrfmiddlewaretoken/i], cookies: ['csrftoken'] } },
    { name: 'Laravel', category: 'Backend', match: { cookies: ['laravel_session', 'XSRF-TOKEN'] } },
    { name: 'Nginx', category: 'Server', match: { headers: { 'server': /nginx/i } } },
    { name: 'Apache', category: 'Server', match: { headers: { 'server': /apache/i } } },
    { name: 'Cloudflare', category: 'Server', match: { headers: { 'server': /cloudflare/i, 'cf-ray': /.*/i } } },

    // CMS
    {
        name: 'WordPress',
        category: 'CMS',
        match: {
            html: [/<link rel=["']https:\/\/api\.w\.org\/["']/i, /wp-content\/themes/i, /wp-includes/i],
            headers: { 'link': /wp-json/i, 'x-pingback': /xmlrpc\.php/i }
        }
    },
    { name: 'Shopify', category: 'CMS', match: { html: [/cdn\.shopify\.com/i, /var Shopify =/i], headers: { 'x-shopify-stage': /.*/i } } },
    { name: 'Wix', category: 'CMS', match: { html: [/wix-style-processor/i], headers: { 'x-wix-request-id': /.*/i } } },
    { name: 'HubSpot', category: 'CMS', match: { html: [/hs-script-loader/i, /js\.hs-scripts\.com/i] } },
    { name: 'Squarespace', category: 'CMS', match: { html: [/static1\.squarespace\.com/i], headers: { 'x-squarespace-source': /.*/i } } },

    // Analytics & Marketing
    { name: 'Google Analytics', category: 'Analytics', match: { scripts: [/google-analytics\.com\/analytics\.js/i, /googletagmanager\.com\/gtag\/js/i], globalVars: ['ga', 'gtag'] } },
    { name: 'Meta Pixel', category: 'Analytics', match: { scripts: [/connect\.facebook\.net\/en_US\/fbevents\.js/i], globalVars: ['fbq'] } },
    { name: 'Mixpanel', category: 'Analytics', match: { scripts: [/cdn\.mxpnl\.com\/libs\/mixpanel/i], globalVars: ['mixpanel'] } },
    { name: 'Hotjar', category: 'Analytics', match: { scripts: [/static\.hotjar\.com/i], globalVars: ['hj'] } },

    // UI Frameworks 
    { name: 'Bootstrap', category: 'UI', match: { html: [/<link[^>]+bootstrap(\.min)?\.css/i], scripts: [/bootstrap(\.min)?\.js/i] } },
    {
        name: 'Tailwind CSS',
        category: 'UI',
        match: {
            html: [
                /class="[^"]*(?:\s|^)(?:tw-|bg-|text-|flex|grid|hidden|block|rounded-|shadow-)[^"]*"/i,
                /tailwind/i
            ]
        }
    },
    { name: 'Material UI', category: 'UI', match: { html: [/Mui[A-Z][a-zA-Z]+-root/i] } },

    // CDNs
    { name: 'Amazon CloudFront', category: 'CDN', match: { headers: { 'x-amz-cf-id': /.*/i, 'via': /cloudfront/i } } },
    { name: 'Fastly', category: 'CDN', match: { headers: { 'fastly-debug': /.*/i, 'x-fastly-request-id': /.*/i } } },
    { name: 'Akamai', category: 'CDN', match: { headers: { 'x-akamai-transformed': /.*/i, 'x-cache': /akamai/i } } }
];
