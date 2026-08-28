import { useState, useEffect, useRef } from "react";
import { useCMS } from "../context/CMSContext";
import { useLanguage } from "../context/LanguageContext";
import { X, Edit3, Image as ImageIcon, Camera, CheckCircle2, Save, Upload, FolderUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export const EditPhotoModal = ({
  photo,
  isOpen,
  onClose
}) => {
  const { albums, updatePhoto } = useCMS();
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  const [titleEn, setTitleEn] = useState("");
  const [titleRo, setTitleRo] = useState("");
  const [titleHu, setTitleHu] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descRo, setDescRo] = useState("");
  const [descHu, setDescHu] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [camera, setCamera] = useState("");
  const [lens, setLens] = useState("");
  const [aperture, setAperture] = useState("");
  const [shutterSpeed, setShutterSpeed] = useState("");
  const [iso, setIso] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    if (photo) {
      setTitleEn(photo.title?.en || (typeof photo.title === "string" ? photo.title : ""));
      setTitleRo(photo.title?.ro || (typeof photo.title === "string" ? photo.title : ""));
      setTitleHu(photo.title?.hu || (typeof photo.title === "string" ? photo.title : ""));
      setDescEn(photo.description?.en || (typeof photo.description === "string" ? photo.description : ""));
      setDescRo(photo.description?.ro || (typeof photo.description === "string" ? photo.description : ""));
      setDescHu(photo.description?.hu || (typeof photo.description === "string" ? photo.description : ""));
      setAlbumId(photo.albumId || albums[0]?.id || "nature");
      setImageSrc(photo.src || "");
      setCamera(photo.exif?.camera || "Nikon D850");
      setLens(photo.exif?.lens || "24-70mm f/2.8");
      setAperture(photo.exif?.aperture || "f/2.8");
      setShutterSpeed(photo.exif?.shutterSpeed || "1/500s");
      setIso(photo.exif?.iso || "ISO 200");
      setLocation(photo.exif?.location || "Harghita, Romania");
      setTags((photo.tags || []).join(", "));
      setFeatured(!!photo.featured);
    }
  }, [photo, albums]);
  if (!isOpen || !photo) return null;
  const handleFileUpload = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageSrc(e.target.result);
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
    if (!titleEn.trim() || !imageSrc.trim()) return;
    const parsedTags = tags.split(",").map((t2) => t2.trim()).filter(Boolean);
    updatePhoto(photo.id, {
      albumId,
      src: imageSrc.trim(),
      title: {
        en: titleEn.trim(),
        ro: titleRo.trim() || titleEn.trim(),
        hu: titleHu.trim() || titleEn.trim()
      },
      description: {
        en: descEn.trim() || titleEn.trim(),
        ro: descRo.trim() || descEn.trim() || titleEn.trim(),
        hu: descHu.trim() || descEn.trim() || titleEn.trim()
      },
      exif: {
        camera,
        lens,
        aperture,
        shutterSpeed,
        iso,
        location
      },
      tags: parsedTags,
      featured
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };
  return <AnimatePresence>
      <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/85 backdrop-blur-md p-4 overflow-y-auto"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}
  >
        <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-100 my-8 max-h-[90vh] overflow-y-auto"
  >
          {
    /* Close button */
  }
          <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }}
    className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 rounded-full transition-colors cursor-pointer"
    aria-label="Close"
  >
            <X className="w-4 h-4" />
          </button>

          {
    /* Header */
  }
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl text-amber-400">
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-sans">
                Edit Photograph
              </h3>
              <p className="text-xs text-zinc-400">
                Replace photo from your PC, update details, or switch album categories.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {
    /* Local PC Upload / Drag & Drop Image Section */
  }
            <div
    onDragOver={(e) => {
      e.preventDefault();
      setIsDragging(true);
    }}
    onDragLeave={() => setIsDragging(false)}
    onDrop={handleDrop}
    className={`p-4 bg-zinc-950 rounded-xl border transition-all ${isDragging ? "border-amber-400 bg-amber-400/5 ring-2 ring-amber-400/30" : "border-zinc-800"}`}
  >
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5">
                  <Upload className="w-4 h-4" />
                  <span>Change Photo from Local PC or URL *</span>
                </span>
                <span className="text-[11px] text-zinc-400 font-normal">Drag & drop supported</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                {
    /* Photo Preview Thumbnail */
  }
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center relative group">
                  {imageSrc ? <img
    src={imageSrc}
    alt="Preview"
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  /> : <ImageIcon className="w-8 h-8 text-zinc-600" />}
                  <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-amber-300 text-xs font-bold transition-opacity cursor-pointer p-2 text-center"
  >
                    <FolderUp className="w-5 h-5 mb-1" />
                    <span>Change Image</span>
                  </button>
                </div>

                {
    /* File picker & URL input */
  }
                <div className="sm:col-span-2 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
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
      if (file) handleFileUpload(file);
    }}
  />
                    <span className="text-xs text-zinc-500 font-mono">or paste web URL</span>
                  </div>

                  <input
    type="text"
    required
    value={imageSrc}
    onChange={(e) => setImageSrc(e.target.value)}
    placeholder="https://images.unsplash.com/... or data:image/..."
    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
  />
                </div>
              </div>
            </div>

            {
    /* Target Album */
  }
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Assign to Album
              </label>
              <select
    value={albumId}
    onChange={(e) => setAlbumId(e.target.value)}
    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
  >
                {albums.map((alb) => <option key={alb.id} value={alb.id}>
                    {typeof alb.name === "string" ? alb.name : alb.name.en} ({alb.id})
                  </option>)}
              </select>
            </div>

            {
    /* Title (Multi-language) */
  }
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  🇬🇧 Title (EN) *
                </label>
                <input
    type="text"
    required
    value={titleEn}
    onChange={(e) => setTitleEn(e.target.value)}
    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
  />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  🇷🇴 Title (RO)
                </label>
                <input
    type="text"
    value={titleRo}
    onChange={(e) => setTitleRo(e.target.value)}
    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
  />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  🇭🇺 Title (HU)
                </label>
                <input
    type="text"
    value={titleHu}
    onChange={(e) => setTitleHu(e.target.value)}
    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
  />
              </div>
            </div>

            {
    /* Technical EXIF Info */
  }
            <div className="p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-xl space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" />
                <span>EXIF Camera & Location</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">Camera Body</label>
                  <input
    type="text"
    value={camera}
    onChange={(e) => setCamera(e.target.value)}
    className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Lens</label>
                  <input
    type="text"
    value={lens}
    onChange={(e) => setLens(e.target.value)}
    className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Location</label>
                  <input
    type="text"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
  />
                </div>
              </div>
            </div>

            {
    /* Tags & Featured */
  }
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="w-full sm:flex-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
    type="text"
    value={tags}
    onChange={(e) => setTags(e.target.value)}
    className="w-full px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
  />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-zinc-200 cursor-pointer pt-4 sm:pt-0">
                <input
    type="checkbox"
    checked={featured}
    onChange={(e) => setFeatured(e.target.checked)}
    className="w-4 h-4 rounded text-amber-400 focus:ring-0 bg-zinc-950 border-zinc-800"
  />
                <span>Featured Photo</span>
              </label>
            </div>

            {
    /* Submit Action */
  }
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
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
                    <span>Save Changes</span>
                  </>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>;
};
