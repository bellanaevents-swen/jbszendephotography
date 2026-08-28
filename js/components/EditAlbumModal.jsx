import { useState, useEffect } from "react";
import { useCMS } from "../context/CMSContext";
import { useLanguage } from "../context/LanguageContext";
import { X, Edit3, Folder, Save, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export const EditAlbumModal = ({
  album,
  isOpen,
  onClose
}) => {
  const { updateAlbum } = useCMS();
  const { t } = useLanguage();
  const [nameEn, setNameEn] = useState("");
  const [nameRo, setNameRo] = useState("");
  const [nameHu, setNameHu] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descRo, setDescRo] = useState("");
  const [descHu, setDescHu] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (album) {
      setNameEn(album.name?.en || (typeof album.name === "string" ? album.name : ""));
      setNameRo(album.name?.ro || (typeof album.name === "string" ? album.name : ""));
      setNameHu(album.name?.hu || (typeof album.name === "string" ? album.name : ""));
      setDescEn(album.description?.en || (typeof album.description === "string" ? album.description : ""));
      setDescRo(album.description?.ro || (typeof album.description === "string" ? album.description : ""));
      setDescHu(album.description?.hu || (typeof album.description === "string" ? album.description : ""));
      setCoverImage(album.coverImage || "");
    }
  }, [album]);
  if (!isOpen || !album) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameEn.trim()) return;
    updateAlbum(album.id, {
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
      coverImage: coverImage.trim() || album.coverImage
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
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-sans">
                Edit Album
              </h3>
              <p className="text-xs text-zinc-400">
                Update album names, multi-language descriptions, and cover image.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {
    /* Multi-language Album Name */
  }
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  🇬🇧 Album Name (EN) *
                </label>
                <input
    type="text"
    required
    value={nameEn}
    onChange={(e) => setNameEn(e.target.value)}
    className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
  />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    🇷🇴 Name (RO)
                  </label>
                  <input
    type="text"
    value={nameRo}
    onChange={(e) => setNameRo(e.target.value)}
    className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    🇭🇺 Name (HU)
                  </label>
                  <input
    type="text"
    value={nameHu}
    onChange={(e) => setNameHu(e.target.value)}
    className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
  />
                </div>
              </div>
            </div>

            {
    /* Cover Image Upload & URL */
  }
            <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Album Cover Image (from Local PC or URL)
              </label>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <label className="w-full sm:w-auto px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-400 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors flex-shrink-0">
                  <Folder className="w-4 h-4" />
                  <span>Choose from PC</span>
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
                <input
    type="text"
    value={coverImage}
    onChange={(e) => setCoverImage(e.target.value)}
    placeholder="https://images.unsplash.com/... or local data URL"
    className="flex-1 w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
  />
              </div>
              {coverImage && <div className="w-16 h-12 rounded-lg overflow-hidden border border-zinc-700 mt-2">
                  <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                </div>}
            </div>

            {
    /* Description (EN) */
  }
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                Description (EN)
              </label>
              <textarea
    rows={2}
    value={descEn}
    onChange={(e) => setDescEn(e.target.value)}
    className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
  />
            </div>

            {
    /* Submit Action */
  }
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
              <button
    type="button"
    onClick={onClose}
    className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
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
