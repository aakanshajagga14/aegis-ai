import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, AlertTriangle, XCircle, ChevronRight, Fingerprint, Lock, Eye, Users, FileText } from 'lucide-react';
import { VELA_POLICY_ANALYSIS, SCANNING_MESSAGES, VELA_RAW_POLICY } from './data';
import { BenefitBar } from './components/BenefitBar';

export default function App() {
    const [url, setUrl] = useState('vela.social/privacy');
    const [phase, setPhase] = useState<'idle' | 'scanning' | 'results'>('idle');
    const [isOpen, setIsOpen] = useState(false);
    const [scanIndex, setScanIndex] = useState(0);
    const [revealedItems, setRevealedItems] = useState<{
        lose: number;
        unclear: number;
        safe: number;
        redFlags: boolean;
        benefit: boolean;
    }>({
        lose: 0,
        unclear: 0,
        safe: 0,
        redFlags: false,
        benefit: false
    });

    const scrollRef = useRef<HTMLDivElement>(null);

    const startAnalysis = () => {
        if (phase !== 'idle') return;
        setPhase('scanning');
        setScanIndex(0);
    };

    // Scanning Phase Effect
    useEffect(() => {
        if (phase === 'scanning') {
            const interval = setInterval(() => {
                setScanIndex(prev => {
                    if (prev >= SCANNING_MESSAGES.length - 1) {
                        clearInterval(interval);
                        setTimeout(() => setPhase('results'), 500);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 300); // Cycle messages every 300ms to hit ~1.5s total
            return () => clearInterval(interval);
        }
    }, [phase]);

    // Revelation Phase Effect
    useEffect(() => {
        if (phase === 'results') {
            const stagger = 300;

            // Reveal 'lose' items
            VELA_POLICY_ANALYSIS.you_lose.forEach((_, i) => {
                setTimeout(() => {
                    setRevealedItems(prev => ({ ...prev, lose: i + 1 }));
                    scrollToBottom();
                }, i * stagger);
            });

            const loseDelay = VELA_POLICY_ANALYSIS.you_lose.length * stagger;

            // Reveal 'unclear' items
            VELA_POLICY_ANALYSIS.unclear.forEach((_, i) => {
                setTimeout(() => {
                    setRevealedItems(prev => ({ ...prev, unclear: i + 1 }));
                    scrollToBottom();
                }, loseDelay + i * stagger);
            });

            const unclearDelay = loseDelay + VELA_POLICY_ANALYSIS.unclear.length * stagger;

            // Reveal 'safe' items
            VELA_POLICY_ANALYSIS.safe.forEach((_, i) => {
                setTimeout(() => {
                    setRevealedItems(prev => ({ ...prev, safe: i + 1 }));
                    scrollToBottom();
                }, unclearDelay + i * stagger);
            });

            const safeDelay = unclearDelay + VELA_POLICY_ANALYSIS.safe.length * stagger;

            // Reveal Red Flags
            setTimeout(() => {
                setRevealedItems(prev => ({ ...prev, redFlags: true }));
                scrollToBottom();
            }, safeDelay);

            // Final Benefit Bar
            setTimeout(() => {
                setRevealedItems(prev => ({ ...prev, benefit: true }));
                scrollToBottom();
            }, safeDelay + 600);
        }
    }, [phase]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#050505] selection:bg-white selection:text-black font-sans relative">
            {/* Background Demo Page (Simulated Vela Social) */}
            <div className={`flex-1 flex flex-col transition-all duration-1000 ease-in-out ${isOpen ? 'opacity-20 grayscale' : 'opacity-100 grayscale-0'}`}>
                <header className="px-12 py-10 border-b border-white/5 flex justify-between items-center bg-[#050505]">
                    <div className="flex items-center gap-12">
                        <div className="text-3xl font-black tracking-tighter uppercase">Vela</div>
                        <nav className={`flex gap-12 text-[11px] uppercase tracking-widest transition-colors duration-500 ${isOpen ? 'text-white/20' : 'text-white/40'}`}>
                            <span className="cursor-not-allowed">Feed</span>
                            <span className="cursor-not-allowed">Community</span>
                            <span className="cursor-not-allowed">Market</span>
                            <span className="text-white border-b border-white cursor-not-allowed">Legal</span>
                        </nav>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="text-[10px] text-white/30 uppercase tracking-tighter">Vela ID: 0921-X</div>
                        <button
                            className={`w-10 h-10 rounded-full bg-white/10 border border-white/10 transition-all hover:bg-white/20 active:scale-95 ${isOpen ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                            onClick={() => !isOpen && setIsOpen(true)}
                        />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <main className="p-20 max-w-4xl mx-auto space-y-12">
                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-6xl font-black tracking-tight mb-16"
                            >
                                Privacy Policy
                            </motion.h1>
                            {VELA_RAW_POLICY.split('\n\n').map((paragraph, i) => {
                                if (paragraph.startsWith('# ')) return null;
                                if (paragraph.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-16 mb-4 text-white hover:text-white/80 transition-colors">{paragraph.replace('## ', '')}</h2>;
                                if (paragraph.startsWith('### ')) return <h3 key={i} className="text-[10px] font-bold mt-8 mb-4 uppercase tracking-[0.3em] text-white/50">{paragraph.replace('### ', '')}</h3>;
                                return (
                                    <p key={i} className={`text-lg leading-relaxed font-mono transition-colors duration-700 ${isOpen ? 'text-white/30' : 'text-white/60'}`}>
                                        {paragraph}
                                    </p>
                                );
                            })}
                        </div>
                    </main>
                </div>
            </div>

            {/* Simulated Chrome Extension Icon Trigger */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 1)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-10 right-10 w-20 h-20 bg-white text-black flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)] z-[100] group overflow-hidden"
                >
                    <Search className="group-hover:rotate-90 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[8px] font-bold uppercase tracking-tighter">Analyze</span>
                    </div>
                </motion.button>
            )}

            {/* Extension UI (Floating Panel) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: 500, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 500, opacity: 0 }}
                        transition={{ duration: 0.8, type: "spring", damping: 20 }}
                        className="fixed right-6 top-6 bottom-6 w-[480px] bg-[#111111] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col z-[150] rounded-sm overflow-hidden"
                    >
                        {/* Panel Header */}
                        <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#0D0D0D]">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-lose animate-pulse" />
                                <span className="text-[10px] tracking-[0.4em] font-black uppercase">Consent Layer 1.0</span>
                            </div>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setPhase('idle');
                                }}
                                className="p-1 hover:bg-white/10 transition-colors"
                            >
                                <XCircle size={16} className="text-white/50 hover:text-white" />
                            </button>
                        </div>

                        {/* Input Area */}
                        <div className="p-8 bg-[#161616] border-b border-white/5">
                            <div className="relative mb-6">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted">
                                    <Search size={14} />
                                </div>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full bg-black border border-white/10 py-3 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-white/30 transition-colors"
                                />
                            </div>

                            <button
                                onClick={startAnalysis}
                                disabled={phase !== 'idle'}
                                className="w-full btn-primary relative group flex items-center justify-center gap-2"
                            >
                                <span>{phase === 'idle' ? 'Analyze Consent' : 'Analyzing...'}</span>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />

                                {phase === 'idle' && (
                                    <motion.div
                                        layoutId="btn-glimmer"
                                        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                )}
                            </button>
                        </div>

                        {/* Dynamic Content Area */}
                        <div className="flex-1 overflow-y-auto px-8 py-4 scroll-smooth" ref={scrollRef}>
                            <AnimatePresence mode="wait">
                                {phase === 'scanning' && (
                                    <motion.div
                                        key="scanning"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-full flex flex-col items-center justify-center space-y-6 pt-12"
                                    >
                                        <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden">
                                            <motion.div
                                                animate={{ x: [-48, 48] }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                className="absolute inset-0 w-1/2 bg-white"
                                            />
                                        </div>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={scanIndex}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                className="text-[11px] font-mono uppercase tracking-[0.1em] text-center max-w-[200px]"
                                            >
                                                {SCANNING_MESSAGES[scanIndex]}
                                            </motion.div>
                                        </AnimatePresence>
                                    </motion.div>
                                )}

                                {phase === 'results' && (
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-10 pb-12"
                                    >
                                        {/* Category: YOU LOSE */}
                                        <section>
                                            <div className="flex items-center gap-2 mb-4">
                                                <XCircle size={14} className="text-lose" />
                                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-lose">What You Lose</h3>
                                            </div>
                                            <div className="space-y-3">
                                                {VELA_POLICY_ANALYSIS.you_lose.map((item, i) => (
                                                    i < revealedItems.lose && (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="group flex gap-3 p-3 bg-white/[0.02] border-l border-lose/30 hover:bg-white/[0.04] transition-colors"
                                                        >
                                                            <div className="mt-1"><AlertTriangle size={12} className="text-lose/50" /></div>
                                                            <span className="text-xs leading-relaxed text-brand-light">{item}</span>
                                                        </motion.div>
                                                    )
                                                ))}
                                            </div>
                                        </section>

                                        {/* Category: UNCLEAR */}
                                        <section>
                                            <div className="flex items-center gap-2 mb-4">
                                                <Eye size={14} className="text-unclear" />
                                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-unclear">What's Unclear</h3>
                                            </div>
                                            <div className="space-y-3">
                                                {VELA_POLICY_ANALYSIS.unclear.map((item, i) => (
                                                    i < revealedItems.unclear && (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="group flex gap-3 p-3 bg-white/[0.02] border-l border-unclear/30 hover:bg-white/[0.04] transition-colors"
                                                        >
                                                            <div className="mt-1"><Search size={12} className="text-unclear/50" /></div>
                                                            <span className="text-xs leading-relaxed text-brand-light">{item}</span>
                                                        </motion.div>
                                                    )
                                                ))}
                                            </div>
                                        </section>

                                        {/* Category: SAFE */}
                                        <section>
                                            <div className="flex items-center gap-2 mb-4">
                                                <Shield size={14} className="text-safe" />
                                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-safe">What's Safe</h3>
                                            </div>
                                            <div className="space-y-3">
                                                {VELA_POLICY_ANALYSIS.safe.map((item, i) => (
                                                    i < revealedItems.safe && (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="group flex gap-3 p-3 bg-white/[0.02] border-l border-safe/30 hover:bg-white/[0.04] transition-colors"
                                                        >
                                                            <div className="mt-1"><Lock size={12} className="text-safe/50" /></div>
                                                            <span className="text-xs leading-relaxed text-brand-light">{item}</span>
                                                        </motion.div>
                                                    )
                                                ))}
                                            </div>
                                        </section>

                                        {/* Red Flag Callouts */}
                                        {revealedItems.redFlags && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="space-y-6 pt-6 border-t border-white/5"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <FileText size={14} className="text-lose" />
                                                    <h3 className="text-[10px] font-bold uppercase tracking-widest">Critical Red Flags</h3>
                                                </div>
                                                {VELA_POLICY_ANALYSIS.red_flags.map((flag, i) => (
                                                    <div key={i} className="pl-4 border-l-2 border-lose py-1">
                                                        <span className="block text-[9px] uppercase tracking-tighter text-lose font-bold mb-2">{flag.label}</span>
                                                        <blockquote className="text-[11px] font-mono leading-relaxed text-brand-muted bg-white/[0.02] p-2">
                                                            "{flag.quote}"
                                                        </blockquote>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}

                                        {/* Final Score Section */}
                                        {revealedItems.benefit && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <BenefitBar
                                                    userScore={VELA_POLICY_ANALYSIS.benefit_score.user}
                                                    companyScore={VELA_POLICY_ANALYSIS.benefit_score.company}
                                                    isVisible={revealedItems.benefit}
                                                />

                                                <div className="mt-10 p-6 bg-lose/10 border border-lose/20 text-center">
                                                    <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-lose mb-1">Final Verdict</div>
                                                    <div className="text-lg font-bold tracking-tight mb-4">"This is what you actually agreed to."</div>
                                                    <div className="text-[10px] text-brand-muted">Vela Social Media Privacy Policy Analysis</div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-black border-t border-white/5 text-center">
                            <p className="text-[9px] text-brand-muted uppercase tracking-[0.2em]">Designed for Transparency</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
