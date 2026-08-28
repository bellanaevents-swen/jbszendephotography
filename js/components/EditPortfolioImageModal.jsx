import { useState, useEffect, useRef } from "react";
import { useCMS } from "../context/CMSContext";
import { useLanguage } from "../context/LanguageContext";
import { X, Upload, CheckCircle2, Save, Camera, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export const EditPortfolioImageModal = ({
  isOpen,
  onClose
}) => {
  const { siteSettings, updateSiteSettings } = useCMS();
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  const bgFileInputRef = useRef(null);
  const defaultPhotographerImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80";
  const [photographerImage, setPhotographerImage] = useState(
    siteSettings.photographerImage || defaultPhotographerImage
  );
  const [photographerName, setPhotographerName] = useState(
    siteSettings.photographerName || "JB Szende"
  );
  const [activeBackground, setActiveBackground] = useState(
    siteSettings.activeBackground || "/images/fashion_photo_bg.jpg"
  );
  const [isDragging, setIsDragging] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (siteSettings) {
      setPhotographerImage(siteSettings.photographerImage || defaultPhotographerImage);
      setPhotographerName(siteSettings.photographerName || "JB Szende");
      setActiveBackground(siteSettings.activeBackground || "/images/fashion_photo_bg.jpg");
    }
  }, [siteSettings, isOpen]);
  if (!isOpen) return null;
  const handleFileUpload = (file, target) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        if (target === "portrait") {
          setPhotographerImage(e.target.result);
        } else {
          setActiveBackground(e.target.result);
        }
      }
    };
    reader.readAsDataURL(file);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], "portrait");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateSiteSettings({
      photographerImage: photographerImage.trim() || defaultPhotographerImage,
      photographerName: photographerName.trim() || "JB Szende",
      activeBackground: activeBackground.trim() || "/images/fashion_photo_bg.jpg"
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 900);
  };
  const presets = [
    {
      label: "Studio Portrait (Classic)",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
    },
    {
      label: "Outdoor Camera Artist",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      label: "Fine Art Silhouette",
      url: "/images/fashion_photo_bg.jpg"
    },
    {
      label: "Mountain Explorer",
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80"
    }
  ];
  return <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    className="bg-[#0f0722] border border-violet-800/80 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl relative my-8"
  >
          {
    /* Close Button */
  }
          <button
    onClick={onClose}
    className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900/80 hover:bg-zinc-800 transition-colors cursor-pointer"
  >
            <X className="w-5 h-5" />
          </button>

          {
    /* Modal Header */
  }
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-violet-900/50">
            <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl text-amber-400">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Edit Portfolio & Photographer Image</span>
                <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  Live
                </span>
              </h3>
              <p className="text-xs text-violet-300">
                Upload your portrait photo from your computer or choose an editorial background image.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {
    /* Main Portfolio Portrait Image Section */
  }
            <div
    onDragOver={(e) => {
      e.preventDefault();
      setIsDragging(true);
    }}
    onDragLeave={() => setIsDragging(false)}
    onDrop={handleDrop}
    className={`p-4 bg-zinc-950 rounded-xl border transition-all ${isDragging ? "border-amber-400 bg-amber-400/5 ring-2 ring-amber-400/30" : "border-violet-900/60"}`}
  >
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Upload className="w-4 h-4" />
                  <span>Photographer Portrait Image (About & Profile) *</span>
                </label>
                <span className="text-[11px] text-zinc-400 font-normal">Drag & drop supported</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                {
    /* Image Preview Box */
  }
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center relative group">
                  {photographerImage ? <img
    src={photographerImage}
    alt="Photographer Preview"
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  /> : <ImageIcon className="w-8 h-8 text-zinc-600" />}
                  <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-amber-300 text-xs font-bold transition-opacity cursor-pointer p-2 text-center"
  >
                    <Upload className="w-5 h-5 mb-1" />
                    <span>Upload from PC</span>
                  </button>
                </div>

                {
    /* Upload Buttons & URL Input */
  }
                <div className="sm:col-span-2 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
  >
                      <Upload className="w-4 h-4" />
                      <span>Choose from Computer</span>
                    </button>
                    <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) handleFileUpload(file, "portrait");
    }}
  />
                    <span className="text-xs text-zinc-400 font-mono">or paste web URL</span>
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Direct Image URL</label>
                    <input
    type="text"
    required
    value={photographerImage}
    onChange={(e) => setPhotographerImage(e.target.value)}
    placeholder="https://images.unsplash.com/... or data:image/..."
    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
  />
                  </div>

                  {
    /* Presets Quick Pick */
  }
                  <div className="pt-2">
                    <label className="text-[11px] text-zinc-400 block mb-1.5">Or Choose Quick Preset:</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {presets.map((preset, idx) => <button
    key={idx}
    type="button"
    onClick={() => setPhotographerImage(preset.url)}
    className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] truncate border transition-colors cursor-pointer ${photographerImage === preset.url ? "bg-amber-400/10 border-amber-400 text-amber-300 font-bold" : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"}`}
  >
                          {preset.label}
                        </button>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {
    /* Photographer Name Setting */
  }
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Photographer Display Name
              </label>
              <input
    type="text"
    required
    value={photographerName}
    onChange={(e) => setPhotographerName(e.target.value)}
    placeholder="JB Szende"
    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
  />
            </div>

            {
    /* Actions */
  }
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-violet-900/50">
              <button
    type="button"
    onClick={onClose}
    className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer"
  >
                Cancel
              </button>
              <button
    type="submit"
    className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-400/20 flex items-center gap-2 cursor-pointer"
  >
                {saved ? <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                    <span>Saved!</span>
                  </> : <>
                    <Save className="w-4 h-4" />
                    <span>Save Portfolio Image</span>
                  </>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>;
};
