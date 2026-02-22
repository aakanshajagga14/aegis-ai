import { motion } from 'framer-motion';

interface BenefitBarProps {
    userScore: number;
    companyScore: number;
    isVisible: boolean;
}

export const BenefitBar = ({ userScore, companyScore, isVisible }: BenefitBarProps) => {
    return (
        <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex justify-between items-end mb-4">
                <div className="text-left">
                    <span className="text-[10px] uppercase tracking-widest text-brand-muted">Benefit: You</span>
                    <div className="text-2xl font-bold text-safe">{userScore}%</div>
                </div>
                <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-brand-muted">Benefit: Company</span>
                    <div className="text-2xl font-bold text-lose">{companyScore}%</div>
                </div>
            </div>

            <div className="relative h-3 w-full bg-brand-dark flex overflow-hidden">
                {/* User side - animates from center to left */}
                <div className="flex-1 flex justify-end">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: `${userScore}%` } : { width: 0 }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                        className="h-full bg-safe"
                    />
                </div>

                {/* Center divider */}
                <div className="w-[1px] h-full bg-white/20 z-10" />

                {/* Company side - animates from center to right */}
                <div className="flex-1 flex justify-start">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: `${companyScore}%` } : { width: 0 }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                        className="h-full bg-lose"
                    />
                </div>
            </div>

            <div className="mt-6 text-center">
                <p className="text-[11px] text-brand-muted italic uppercase tracking-tighter">
                    Analysis complete based on "Vela" standard privacy policy API v2.1
                </p>
            </div>
        </div>
    );
};
