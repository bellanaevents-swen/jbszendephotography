import { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { useLanguage } from "../context/LanguageContext";
import { X, FolderPlus, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export const AddAlbumModal = ({ isOpen, onClose }) => {
  const { addAlbum } = useCMS();
  const { t } = useLanguage();
  const [nameEn, setNameEn] = useState("");
  const [nameRo, setNameRo] = useState("");
  const [nameHu, setNameHu] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descRo, setDescRo] = useState("");
  const [descHu, setDescHu] = useState("");
  const [coverImage, setCoverImage] = useState("");
  if (!isOpen) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameEn.trim()) return;
    const slug = nameEn.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
    addAlbum({
      slug,
      name: {
        en: nameEn.trim(),
        ro: nameRo.trim() || nameEn.trim(),
        hu: nameHu.trim() || nameEn.trim()
      },
      description: {
        en: descEn.trim() || "Curated photography collection.",
        ro: descRo.trim() || descEn.trim() || "Colec\u021Bie fotografic\u0103 selectat\u0103.",
        hu: descHu.trim() || descEn.trim() || "V\xE1logatott fot\xF3m\u0171v\xE9szeti gy\u0171jtem\xE9ny."
      },
      coverImage: coverImage.trim() || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
    });
    setNameEn("");
    setNameRo("");
    setNameHu("");
    setDescEn("");
    setDescRo("");
    setDescHu("");
    setCoverImage("");
    onClose();
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
    className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-100 my-8"
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
              <FolderPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-sans">
                {t("album_create_title", "Create New Album")}
              </h3>
              <p className="text-xs text-zinc-400">
                {t("album_modal_subtitle", "Organize your photography collection across English, Romanian, and Hungarian.")}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                {t("album_name_label", "Album Name (English)")} *
              </label>
              <input
    type="text"
    required
    value={nameEn}
    onChange={(e) => setNameEn(e.target.value)}
    placeholder="e.g. Mountain Expedition"
    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
  />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  {t("album_name_ro_label", "Album Name (Romanian)")}
                </label>
                <input
    type="text"
    value={nameRo}
    onChange={(e) => setNameRo(e.target.value)}
    placeholder="e.g. Expediție Montană"
    className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
  />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  {t("album_name_hu_label", "Album Name (Hungarian)")}
                </label>
                <input
    type="text"
    value={nameHu}
    onChange={(e) => setNameHu(e.target.value)}
    placeholder="e.g. Hegyi Expedíció"
    className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
  />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                {t("album_desc_label", "Description (English)")}
              </label>
              <textarea
    rows={2}
    value={descEn}
    onChange={(e) => setDescEn(e.target.value)}
    placeholder="Brief summary of album themes and subjects..."
    className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
  />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                {t("album_cover_label", "Cover Image URL")}
              </label>
              <div className="flex gap-2">
                <input
    type="text"
    value={coverImage}
    onChange={(e) => setCoverImage(e.target.value)}
    placeholder="https://images.unsplash.com/..."
    className="flex-1 px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-400"
  />
                <label className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>Upload</span>
                  <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) setCoverImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }}
  />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <button
    type="button"
    onClick={onClose}
    className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold uppercase"
  >
                {t("album_cancel", "Cancel")}
              </button>
              <button
    type="submit"
    className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-lg"
  >
                {t("album_save_btn", "Save Album")}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>;
};
