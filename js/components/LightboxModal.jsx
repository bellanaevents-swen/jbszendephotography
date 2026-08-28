import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";
import { X, Download, Share2, ChevronLeft, ChevronRight, Edit3 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export const LightboxModal = ({
  photo,
  photosList,
  onClose,
  onSelectPhoto,
  onEditPhoto
}) => {
  const { language, t } = useLanguage();
  const { isAdminLoggedIn } = useCMS();
  const [copied, setCopied] = React.useState(false);
  if (!photo) return null;
  const currentIndex = photosList.findIndex((p) => p.id === photo.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < photosList.length - 1;
  const handlePrev = () => {
    if (hasPrev) onSelectPhoto(photosList[currentIndex - 1]);
  };
  const handleNext = () => {
    if (hasNext) onSelectPhoto(photosList[currentIndex + 1]);
  };
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) handlePrev();
      if (e.key === "ArrowRight" && hasNext) handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, hasPrev, hasNext]);
  const getMultilingualText = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[language] || field["en"] || Object.values(field)[0] || "";
  };
  const titleText = getMultilingualText(photo.title);
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    }
  };
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = photo.src;
    link.download = `${photo.id}-szende-photography.jpg`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return <AnimatePresence>
      <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-4 select-none overflow-hidden"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}
  >
        {
    /* Top Control Bar */
  }
        <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 bg-zinc-950/70 backdrop-blur-md border border-zinc-800/80 px-4 py-2 rounded-full shadow-2xl">
            <span className="text-xs sm:text-sm font-bold text-white font-sans max-w-[200px] sm:max-w-md truncate">
              {titleText}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono pl-2 border-l border-zinc-700">
              {currentIndex + 1} / {photosList.length}
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            {isAdminLoggedIn && onEditPhoto && <button
    type="button"
    onClick={() => {
      onClose();
      onEditPhoto(photo);
    }}
    title="Edit Photo Details"
    className="flex items-center gap-1.5 px-3 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xl transition-all cursor-pointer"
  >
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">Edit Photo</span>
              </button>}

            <button
    type="button"
    onClick={handleShare}
    title={copied ? t("lightbox_link_copied", "Link Copied!") : t("lightbox_share", "Share Photo")}
    className="p-2.5 bg-zinc-950/70 hover:bg-zinc-800/90 text-zinc-300 hover:text-amber-400 rounded-full border border-zinc-800/80 transition-all shadow-xl backdrop-blur-md cursor-pointer"
  >
              <Share2 className="w-5 h-5" />
            </button>

            <button
    type="button"
    onClick={handleDownload}
    title={t("lightbox_download", "Download High-Res")}
    className="p-2.5 bg-zinc-950/70 hover:bg-zinc-800/90 text-zinc-300 hover:text-amber-400 rounded-full border border-zinc-800/80 transition-all shadow-xl backdrop-blur-md cursor-pointer"
  >
              <Download className="w-5 h-5" />
            </button>

            <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }}
    title="Close"
    className="p-2.5 bg-zinc-950/70 hover:bg-zinc-800/90 text-zinc-300 hover:text-white rounded-full border border-zinc-800/80 transition-all shadow-xl backdrop-blur-md cursor-pointer"
  >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {
    /* Previous Button */
  }
        {hasPrev && <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      handlePrev();
    }}
    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-3.5 bg-zinc-950/80 hover:bg-zinc-900 text-amber-400 hover:text-amber-300 rounded-full border border-zinc-800/90 transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
    aria-label="Previous Photo"
  >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>}

        {
    /* Next Button */
  }
        {hasNext && <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      handleNext();
    }}
    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-3.5 bg-zinc-950/80 hover:bg-zinc-900 text-amber-400 hover:text-amber-300 rounded-full border border-zinc-800/90 transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
    aria-label="Next Photo"
  >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>}

        {
    /* Fullscreen Photo Container */
  }
        <div
    className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-8"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}
  >
          <motion.img
    key={photo.id}
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    src={photo.src}
    alt={titleText}
    className="max-h-[92vh] max-w-[94vw] w-auto h-auto object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] select-none border border-zinc-900"
    referrerPolicy="no-referrer"
  />
        </div>
      </div>
    </AnimatePresence>;
};
