import { Logo } from "./Logo";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";
import { ArrowUp, MapPin, Lock } from "lucide-react";
import { motion } from "motion/react";
export const Footer = () => {
  const { t } = useLanguage();
  const { siteSettings, isAdminLoggedIn, openAuthModal } = useCMS();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return <footer className="relative bg-[#0c051d]/75 backdrop-blur-2xl border-t border-violet-500/30 text-zinc-100 py-16 overflow-hidden shadow-[0_-15px_40px_rgba(0,0,0,0.6)]">
      {
    /* Glass Top Highlight Line */
  }
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400/40 to-transparent pointer-events-none" />

      {
    /* Subtle Background Radial Glow */
  }
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-violet-900/40"
  >
          {
    /* Brand & Logo Column */
  }
          <div className="space-y-4 text-center md:text-left">
            <div>
              <Logo variant="dark" size="md" />
            </div>
            <motion.p
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-xs text-violet-300/80 leading-relaxed font-light max-w-md"
  >
              {t("footer_tagline", "Capturing timeless moments, family stories, and raw landscapes across Odorheiu Secuiesc, Harghita, and Europe.")}
            </motion.p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-zinc-200 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{siteSettings.location}</span>
            </div>
          </div>

          {
    /* Scroll to Top */
  }
          <div className="flex items-center">
            <button
    onClick={scrollToTop}
    className="p-3 bg-[#130829] hover:bg-[#1c0d3a] text-amber-400 border border-violet-800/80 rounded-full transition-all hover:scale-110 active:scale-95 shadow-xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 cursor-pointer"
  >
              <span>{t("footer_back_to_top", "Back to Top")}</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {
    /* Bottom Copyright Bar */
  }
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-violet-300 font-medium">{t("footer_copyright", siteSettings.copyrightText || "\xA9 2026 SwenTech. All rights reserved.")}</p>
          <div className="flex items-center gap-3 text-violet-400 font-mono">
            <span>JB Szende Photography</span>
            {!isAdminLoggedIn && <button
    onClick={openAuthModal}
    title="Photographer Admin Login"
    className="text-violet-500 hover:text-amber-400 transition-colors p-1"
  >
                <Lock className="w-3 h-3" />
              </button>}
          </div>
        </div>
      </div>
    </footer>;
};
