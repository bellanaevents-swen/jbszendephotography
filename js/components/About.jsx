import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";
import { Camera, Award, Heart, ShieldCheck, MapPin, Sparkles, Edit3, Upload } from "lucide-react";
import { motion } from "motion/react";
import { EditPortfolioImageModal } from "./EditPortfolioImageModal";
export const About = () => {
  const { language, t } = useLanguage();
  const { siteSettings, isAdminLoggedIn } = useCMS();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const getMultilingualText = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[language] || field["en"] || Object.values(field)[0] || "";
  };
  const bio = getMultilingualText(siteSettings.bioText);
  const photographerImage = siteSettings.photographerImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80";
  return <section id="about" className="py-24 bg-transparent border-t border-violet-900/40 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {
    /* Photographer Image Frame with Edit Action */
  }
          <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="lg:col-span-5 relative"
  >
            <div className="relative mx-auto max-w-md lg:max-w-none aspect-[4/5] rounded-2xl overflow-hidden border border-violet-800/80 shadow-2xl bg-[#14082b] group">
              <img
    src={photographerImage}
    alt={`${siteSettings.photographerName} Portfolio`}
    className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
    referrerPolicy="no-referrer"
  />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e071e] via-transparent to-transparent opacity-90" />

              {
    /* Edit Portfolio Image Quick Action Badge - Admin Only */
  }
              {isAdminLoggedIn && <>
                  <div className="absolute top-4 right-4 z-20">
                    <button
    type="button"
    onClick={() => setIsEditModalOpen(true)}
    className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-xl shadow-amber-400/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
    title="Edit Portfolio / Profile Image from PC"
  >
                      <Edit3 className="w-4 h-4 text-zinc-950" />
                      <span>Edit Photo</span>
                    </button>
                  </div>

                  {
    /* Hover Overlay Button to change portfolio image */
  }
                  <button
    type="button"
    onClick={() => setIsEditModalOpen(true)}
    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-amber-300 font-bold transition-all duration-300 cursor-pointer z-10 p-6 text-center"
  >
                    <div className="p-3 bg-amber-400 text-zinc-950 rounded-full mb-2 shadow-lg scale-90 group-hover:scale-100 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-sm uppercase tracking-wider text-white font-extrabold">
                      Change Portfolio Image
                    </span>
                    <span className="text-xs text-amber-300 font-normal mt-1">
                      Upload from PC or Web
                    </span>
                  </button>
                </>}

              <div className="absolute bottom-6 left-6 right-6 bg-[#0e071e]/90 border border-violet-800/80 p-4 rounded-xl backdrop-blur-md z-20">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
                  {t("about_role", "Photographer")}
                </span>
                <h3 className="text-xl font-bold text-white font-sans">{siteSettings.photographerName}</h3>
                <span className="text-xs text-violet-300 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {siteSettings.location}
                </span>
              </div>
            </div>
          </motion.div>

          {
    /* Photographer Bio & Craft Philosophy */
  }
          <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="lg:col-span-7 space-y-6"
  >
            <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold tracking-widest uppercase"
  >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("about_badge", "About Photographer")}</span>
            </motion.div>

            <motion.h2
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.15 }}
    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans"
  >
              {t("about_title", "Framing Life's Purest Light & Unspoken Stories")}
            </motion.h2>

            <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.25 }}
    className="text-base sm:text-lg text-violet-200/90 font-light leading-relaxed"
  >
              {bio}
            </motion.p>

            {
    /* Philosophy Features */
  }
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="p-4 bg-[#160b2b]/90 border border-violet-800/80 rounded-xl space-y-2 hover:border-amber-400/50 transition-colors"
  >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                  <Camera className="w-4 h-4" />
                  <span>{t("about_feature1_title", "Cinematic Quality")}</span>
                </div>
                <p className="text-xs text-violet-300 leading-relaxed">
                  {t("about_feature1_desc", "High-resolution prime lenses and calibrated sensor profiles delivering fine art clarity.")}
                </p>
              </motion.div>

              <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.4 }}
    className="p-4 bg-[#160b2b]/90 border border-violet-800/80 rounded-xl space-y-2 hover:border-amber-400/50 transition-colors"
  >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                  <Heart className="w-4 h-4" />
                  <span>{t("about_feature2_title", "Authentic Connection")}</span>
                </div>
                <p className="text-xs text-violet-300 leading-relaxed">
                  {t("about_feature2_desc", "Creating relaxed, unprompted environments where raw family and portrait emotion shines.")}
                </p>
              </motion.div>

              <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.5 }}
    className="p-4 bg-[#160b2b]/90 border border-violet-800/80 rounded-xl space-y-2 hover:border-amber-400/50 transition-colors"
  >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>{t("about_feature3_title", "Tailored Direction")}</span>
                </div>
                <p className="text-xs text-violet-300 leading-relaxed">
                  {t("about_feature3_desc", "Personalized concept planning for outdoor adventure, studio lighting, or cultural events.")}
                </p>
              </motion.div>

              <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.6 }}
    className="p-4 bg-[#160b2b]/90 border border-violet-800/80 rounded-xl space-y-2 hover:border-amber-400/50 transition-colors"
  >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t("about_feature4_title", "Full Rights Delivery")}</span>
                </div>
                <p className="text-xs text-violet-300 leading-relaxed">
                  {t("about_feature4_desc", "Private digital galleries with full-resolution downloads and print licensing included.")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {
    /* Edit Portfolio & Photographer Image Modal */
  }
      <EditPortfolioImageModal
    isOpen={isEditModalOpen}
    onClose={() => setIsEditModalOpen(false)}
  />
    </section>;
};
