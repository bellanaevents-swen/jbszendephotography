import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";
import { Camera, ArrowRight, Sparkles, Image as ImageIcon, Edit3 } from "lucide-react";
import { motion } from "motion/react";
import { EditPortfolioImageModal } from "./EditPortfolioImageModal";
export const Hero = ({ onExploreGallery, onBookSession, onOpenEditBg }) => {
  const { language, t } = useLanguage();
  const { siteSettings, photos, albums, isAdminLoggedIn } = useCMS();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const getMultilingualText = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[language] || field["en"] || Object.values(field)[0] || "";
  };
  const headline = getMultilingualText(siteSettings.heroHeadline);
  const subheadline = getMultilingualText(siteSettings.heroSubheadline);
  return <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-transparent">

      {
    /* Hero Content */
  }
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        {
    /* Photographer Badge & Quick Edit Portfolio Image Action (Admin Only) */
  }
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#180b33]/90 border border-amber-400/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-2xl backdrop-blur-md"
  >
            <Camera className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{t("hero_badge", "Portfolio & Fine Art Photography")}</span>
          </motion.div>

          {isAdminLoggedIn && <>
              <motion.button
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    type="button"
    onClick={() => setIsEditModalOpen(true)}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#180b33]/90 hover:bg-[#25104f] border border-violet-700/80 hover:border-amber-400/80 text-violet-200 hover:text-amber-300 text-xs font-semibold tracking-wider transition-all shadow-lg cursor-pointer"
    title="Edit Portfolio & Profile Image"
  >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit Profile Image</span>
              </motion.button>

              {onOpenEditBg && <motion.button
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.25 }}
    type="button"
    onClick={onOpenEditBg}
    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-extrabold tracking-wider transition-all shadow-lg cursor-pointer"
    title="Edit Website Background Image"
  >
                  <ImageIcon className="w-3.5 h-3.5 text-zinc-950" />
                  <span>Edit Background Image</span>
                </motion.button>}
            </>}
        </div>

        {
    /* Photographer Name Title with Animation */
  }
        <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-center justify-center gap-2 mb-3"
  >
          <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-amber-400/80" />
          <h2 className="text-xs sm:text-sm font-mono tracking-[0.35em] uppercase text-violet-300 font-bold">
            {siteSettings.photographerName}
          </h2>
          <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-amber-400/80" />
        </motion.div>

        {
    /* Main Animated Headline with Word-by-Word Reveal */
  }
        <motion.h1
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.18,
          delayChildren: 0.35
        }
      }
    }}
    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 drop-shadow-2xl font-sans max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5"
  >
          {headline.split(" ").map((word, i) => <motion.span
    key={`${word}-${i}`}
    variants={{
      hidden: {
        opacity: 0,
        y: 40,
        rotateX: -45,
        filter: "blur(10px)"
      },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1]
        }
      }
    }}
    className="inline-block transform-gpu"
  >
              {word}
            </motion.span>)}
        </motion.h1>

        {
    /* Subheadline description with smooth fade-up */
  }
        <motion.p
    initial={{ opacity: 0, y: 25, filter: "blur(5px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 1.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
    className="text-base sm:text-lg md:text-xl text-violet-200/90 font-light max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow"
  >
          {subheadline}
        </motion.p>

        {
    /* Action Buttons */
  }
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
  >
          <button
    onClick={onExploreGallery}
    className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-sm uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-amber-400/20 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 group"
  >
            <span>{t("hero_cta_gallery", "Explore Portfolio")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
    onClick={onBookSession}
    className="w-full sm:w-auto px-8 py-4 bg-[#180b33]/90 hover:bg-[#221045] text-white font-bold text-sm uppercase tracking-widest rounded-full border border-violet-700/80 transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 hover:border-amber-400/50"
  >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t("hero_cta_contact", "Book Session")}</span>
          </button>
        </motion.div>

        {
    /* Quick Stats Grid */
  }
        <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.5 }}
    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-violet-900/60 bg-[#140a2b]/70 backdrop-blur-md rounded-2xl p-6 shadow-2xl"
  >
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">12+</span>
            <span className="text-xs text-violet-300 font-medium uppercase tracking-wider mt-1">
              {t("hero_stat_exp", "Years Exp")}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{photos.length}+</span>
            <span className="text-xs text-violet-300 font-medium uppercase tracking-wider mt-1">
              {t("hero_stat_photos", "Master Shots")}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">{albums.length}</span>
            <span className="text-xs text-violet-300 font-medium uppercase tracking-wider mt-1">
              {t("gallery_subtitle", "Photo Albums")}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</span>
            <span className="text-xs text-violet-300 font-medium uppercase tracking-wider mt-1">
              {t("hero_stat_awards", "Client Smiles")}
            </span>
          </div>
        </motion.div>
      </div>

      {
    /* Edit Portfolio Image Modal */
  }
      <EditPortfolioImageModal
    isOpen={isEditModalOpen}
    onClose={() => setIsEditModalOpen(false)}
  />
    </section>;
};
