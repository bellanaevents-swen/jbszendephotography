import { useState, useEffect, useRef } from "react";
import { useCMS } from "../context/CMSContext";
import { X, Upload, CheckCircle2, Save, Image as ImageIcon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
const fashionPhotoBg = "/images/fashion_photo_bg_1787814406350.jpg";
export const EditBackgroundModal = ({
  isOpen,
  onClose
}) => {
  const { siteSettings, updateSiteSettings } = useCMS();
  const fileInputRef = useRef(null);
  const defaultBackground = fashionPhotoBg;
  const [backgroundUrl, setBackgroundUrl] = useState(
    siteSettings.activeBackground || defaultBackground
  );
  const [isDragging, setIsDragging] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (siteSettings) {
      setBackgroundUrl(siteSettings.activeBackground || defaultBackground);
    }
  }, [siteSettings, isOpen]);
  if (!isOpen) return null;
  const handleFileUpload = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setBackgroundUrl(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateSiteSettings({
      activeBackground: backgroundUrl.trim() || defaultBackground
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 900);
  };
  const presets = [
    {
      label: "Editorial Fashion Shoot (Default)",
      url: fashionPhotoBg,
      preview: fashionPhotoBg
    },
    {
      label: "Vintage Film Camera & Gear",
      url: "/images/camera_fixed_bg_1786097380616.jpg",
      preview: "/images/camera_fixed_bg_1786097380616.jpg"
    },
    {
      label: "Macro 50mm Lens & Bokeh",
      url: "/images/camera_macro_bg_1786090472295.jpg",
      preview: "/images/camera_macro_bg_1786090472295.jpg"
    },
    {
      label: "Atmospheric Dark Studio",
      url: "/images/dark_studio_bg_1787814211505.jpg",
      preview: "/images/dark_studio_bg_1787814211505.jpg"
    },
    {
      label: "Urban Golden Hour Mood",
      url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1920&q=80",
      preview: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80"
    },
    {
      label: "Dramatic Alpine Sunset",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
      preview: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    },
    {
      label: "Moody Studio Spotlight",
      url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80",
      preview: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=80"
    }
  ];
  return <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
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
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Edit Fixed Background Photo</span>
                <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  Admin Only
                </span>
              </h3>
              <p className="text-xs text-violet-300">
                Upload your custom full-page fixed background image from your PC or choose a curated aesthetic preset.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {
    /* Background Image Uploader & Preview Box */
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
                  <span>Full-Page Background Photo *</span>
                </label>
                <span className="text-[11px] text-zinc-400 font-normal">Drag & drop supported</span>
              </div>

              {
    /* Large Background Preview Banner */
  }
              <div className="w-full h-44 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 relative group mb-4">
                {backgroundUrl ? <img
    src={backgroundUrl}
    alt="Background Preview"
    className="w-full h-full object-cover object-center"
    referrerPolicy="no-referrer"
  /> : <div className="w-full h-full flex items-center justify-center text-zinc-600">
                    <ImageIcon className="w-8 h-8" />
                  </div>}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs text-amber-300 font-mono drop-shadow">
                    Active Background Preview
                  </span>
                </div>

                <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-amber-300 text-xs font-bold transition-opacity cursor-pointer p-2 text-center"
  >
                  <Upload className="w-6 h-6 mb-1 text-amber-400" />
                  <span>Upload Background from PC</span>
                </button>
              </div>

              {
    /* Upload Controls & URL Input */
  }
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Image from PC</span>
                  </button>
                  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) handleFileUpload(file);
    }}
  />
                  <span className="text-xs text-zinc-400 font-mono">or enter direct URL</span>
                </div>

                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Direct Background Image URL / Base64</label>
                  <input
    type="text"
    required
    value={backgroundUrl}
    onChange={(e) => setBackgroundUrl(e.target.value)}
    placeholder="/images/fashion_photo_bg.jpg or https://..."
    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
  />
                </div>
              </div>
            </div>

            {
    /* Presets Gallery Grid */
  }
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Or Choose Curated Background Preset</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {presets.map((preset, idx) => <button
    key={idx}
    type="button"
    onClick={() => setBackgroundUrl(preset.url)}
    className={`relative rounded-xl overflow-hidden border text-left transition-all p-1.5 flex flex-col gap-1.5 cursor-pointer ${backgroundUrl === preset.url ? "border-amber-400 bg-amber-400/10 ring-2 ring-amber-400/40" : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"}`}
  >
                    <div className="w-full h-16 rounded-lg overflow-hidden bg-zinc-900">
                      <img
    src={preset.preview}
    alt={preset.label}
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
                    </div>
                    <span className="text-[11px] font-medium text-zinc-200 line-clamp-1">
                      {preset.label}
                    </span>
                  </button>)}
              </div>
            </div>

            {
    /* Modal Actions */
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
                    <span>Background Saved!</span>
                  </> : <>
                    <Save className="w-4 h-4" />
                    <span>Apply Background</span>
                  </>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>;
};
