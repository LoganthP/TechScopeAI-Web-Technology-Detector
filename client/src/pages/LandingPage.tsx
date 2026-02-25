import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Radar, Zap, ActivitySquare, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function LandingPage() {
    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">

            {/* Hero Section */}
            <section className="flex flex-col items-center text-center space-y-8 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full"></div>
                    <Globe className="w-24 h-24 text-primary relative z-10 animate-[spin_10s_linear_infinite]" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        <span className="text-white">Discover the </span>
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Hidden Stack
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Advanced cybersecurity intelligence platform. Instantly analyze any website's technology stack, detect frameworks, servers, and expose vulnerabilities.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="pt-4"
                >
                    <Link to="/detector">
                        <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-cyber-lg hover:shadow-cyber-xl transition-all rounded-full overflow-hidden relative group">
                            <span className="relative z-10 flex items-center gap-2">START SCAN <Radar className="w-5 h-5 group-hover:animate-pulse" /></span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureCard
                    icon={<Zap className="w-8 h-8 text-primary" />}
                    title="Deep Stack Detection"
                    description="Identify frontend frameworks, CMS, backend tech, and analytics tools underlying any target URL."
                    delay={0.6}
                />
                <FeatureCard
                    icon={<Shield className="w-8 h-8 text-secondary" />}
                    title="Security Insights"
                    description="Uncover missing security headers and known vulnerabilities in outdated stacks."
                    delay={0.7}
                />
                <FeatureCard
                    icon={<ActivitySquare className="w-8 h-8 text-primary" />}
                    title="Comparison Engine"
                    description="Side-by-side technical teardown of two competitors to reveal technological advantages."
                    delay={0.8}
                />
                <FeatureCard
                    icon={<Radar className="w-8 h-8 text-secondary" />}
                    title="Live Analysis"
                    description="Real-time terminal-style scanning logs powered by standard HTTP & headless browser fallbacks."
                    delay={0.9}
                />
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="glass-card p-6 flex flex-col gap-4 relative overflow-hidden group"
        >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
            <div className="p-3 bg-secondary/10 rounded-xl w-fit border border-secondary/20">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </motion.div>
    );
}
