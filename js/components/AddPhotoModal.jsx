import { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { useLanguage } from "../context/LanguageContext";
import { X, Upload, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export const AddPhotoModal = ({
  isOpen,
  onClose,
  onPhotoAdded
}) => {
  const { albums, addPhoto } = useCMS();
  const { t } = useLanguage();
  const [titleEn, setTitleEn] = useState("");
  const [titleRo, setTitleRo] = useState("");
  const [titleHu, setTitleHu] = useState("");
  const [descEn, setDescEn] = useState("");
  const [albumId, setAlbumId] = useState(albums[0]?.id || "nature");
  const [imageSrc, setImageSrc] = useState("");
  const [camera, setCamera] = useState("Nikon D850");
  const [lens, setLens] = useState("AF-S NIKKOR 24-70mm f/2.8");
  const [aperture, setAperture] = useState("f/2.8");
  const [shutterSpeed, setShutterSpeed] = useState("1/500s");
  const [iso, setIso] = useState("ISO 200");
  const [location, setLocation] = useState("Harghita, Romania");
  const [tags, setTags] = useState("Portfolio, Showcase");
  const [featured, setFeatured] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  if (!isOpen) return null;
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
    const newId = `photo-${Date.now()}`;
    const parsedTags = tags.split(",").map((t2) => t2.trim()).filter(Boolean);
    addPhoto({
      id: newId,
      albumId,
      src: imageSrc.trim(),
      title: {
        en: titleEn.trim(),
        ro: titleRo.trim() || titleEn.trim(),
        hu: titleHu.trim() || titleEn.trim()
      },
      description: {
        en: descEn.trim() || titleEn.trim(),
        ro: descEn.trim() || titleEn.trim(),
        hu: descEn.trim() || titleEn.trim()
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
      featured,
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setTitleEn("");
      setTitleRo("");
      setTitleHu("");
      setDescEn("");
      setImageSrc("");
      if (onPhotoAdded) onPhotoAdded(newId);
      onClose();
    }, 1200);
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
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-sans">
                {t("photo_modal_title", "Upload / Add New Picture")}
              </h3>
              <p className="text-xs text-zinc-400">
                {t("photo_modal_subtitle", "Add a new photograph to JB Szende Photography gallery.")}
              </p>
            </div>
          </div>

          {success ? <div className="py-12 text-center space-y-3">
              <div className="inline-flex p-3 bg-amber-400/20 rounded-full text-amber-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">
                {t("photo_success_msg", "Success! Photograph added to portfolio.")}
              </h4>
            </div> : <form onSubmit={handleSubmit} className="space-y-4">
              {
    /* Photo Image Source */
  }
              <div
    onDragOver={(e) => {
      e.preventDefault();
      setIsDragging(true);
    }}
    onDragLeave={() => setIsDragging(false)}
    onDrop={handleDrop}
    className={`p-4 bg-zinc-950 border rounded-xl space-y-3 transition-all ${isDragging ? "border-amber-400 bg-amber-400/5 ring-2 ring-amber-400/30" : "border-zinc-800"}`}
  >
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>{t("photo_step_image", "1. Photo Image File (from PC) or Web URL")} *</span>
                  </span>
                  <span className="text-[11px] text-zinc-400 font-normal">Drag & drop supported</span>
                </label>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <label className="w-full sm:w-auto px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md">
                    <Upload className="w-4 h-4 text-zinc-950" />
                    <span>{t("photo_choose_file", "Upload from Local PC")}</span>
                    <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) handleFileUpload(file);
    }}
  />
                  </label>
                  <span className="text-xs text-zinc-500 font-mono">or</span>
                  <input
    type="text"
    required
    value={imageSrc}
    onChange={(e) => setImageSrc(e.target.value)}
    placeholder={t("photo_or_url", "Or paste direct image URL / data:image/...")}
    className="flex-1 w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-400"
  />
                </div>

                {imageSrc && <div className="mt-2 flex items-center gap-3 p-2 bg-zinc-900/80 rounded-lg border border-zinc-800">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden border border-zinc-700 flex-shrink-0">
                      <img src={imageSrc} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xs space-y-1 overflow-hidden">
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Image loaded ready</span>
                      </span>
                      <p className="text-zinc-400 text-[11px] truncate max-w-sm">
                        {imageSrc.startsWith("data:") ? "Local file ready (Base64 data format)" : imageSrc}
                      </p>
                    </div>
                  </div>}
              </div>

              {
    /* Title Inputs */
  }
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
                  {t("photo_title_label", "Photo Title")} (English) *
                </label>
                <input
    type="text"
    required
    value={titleEn}
    onChange={(e) => setTitleEn(e.target.value)}
    placeholder="e.g. Autumn Sunrise over Bucin Pass"
    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
  />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Title (Romanian)
                  </label>
                  <input
    type="text"
    value={titleRo}
    onChange={(e) => setTitleRo(e.target.value)}
    placeholder="e.g. Răsărit de Toamnă pe Pasul Bucin"
    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Title (Hungarian)
                  </label>
                  <input
    type="text"
    value={titleHu}
    onChange={(e) => setTitleHu(e.target.value)}
    placeholder="e.g. Őszi Napkelte a Bucsin-tetőn"
    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    {t("photo_assign_album", "Assign to Album")}
                  </label>
                  <select
    value={albumId}
    onChange={(e) => setAlbumId(e.target.value)}
    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
  >
                    {albums.map((a) => <option key={a.id} value={a.id}>
                        {typeof a.name === "string" ? a.name : a.name.en}
                      </option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    {t("photo_location_label", "Location")}
                  </label>
                  <input
    type="text"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    placeholder="e.g. Odorheiu Secuiesc, Harghita"
    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
  />
                </div>
              </div>

              {
    /* Technical EXIF */
  }
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">
                    {t("photo_camera_label", "Camera Model")}
                  </label>
                  <input
    type="text"
    value={camera}
    onChange={(e) => setCamera(e.target.value)}
    className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white"
  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">
                    {t("photo_lens_label", "Lens")}
                  </label>
                  <input
    type="text"
    value={lens}
    onChange={(e) => setLens(e.target.value)}
    className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white"
  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Aperture</label>
                  <input
    type="text"
    value={aperture}
    onChange={(e) => setAperture(e.target.value)}
    className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white"
  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Shutter / ISO</label>
                  <input
    type="text"
    value={`${shutterSpeed} \u2022 ${iso}`}
    onChange={(e) => {
      const parts = e.target.value.split("\u2022");
      if (parts[0]) setShutterSpeed(parts[0].trim());
      if (parts[1]) setIso(parts[1].trim());
    }}
    className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white"
  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  {t("photo_tags_label", "Tags (comma separated)")}
                </label>
                <input
    type="text"
    value={tags}
    onChange={(e) => setTags(e.target.value)}
    placeholder="Landscape, Mountains, Winter, Golden Hour"
    className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
  />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                  <input
    type="checkbox"
    checked={featured}
    onChange={(e) => setFeatured(e.target.checked)}
    className="w-4 h-4 accent-amber-400 rounded"
  />
                  <span>Feature on Homepage Highlights</span>
                </label>

                <div className="flex items-center gap-3">
                  <button
    type="button"
    onClick={onClose}
    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold uppercase"
  >
                    {t("feedback_cancel", "Cancel")}
                  </button>
                  <button
    type="submit"
    className="px-6 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-lg"
  >
                    {t("photo_add_btn", "Add Photograph")}
                  </button>
                </div>
              </div>
            </form>}
        </motion.div>
      </div>
    </AnimatePresence>;
};
