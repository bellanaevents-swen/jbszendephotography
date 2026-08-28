import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";
import { EditPhotoModal } from "./EditPhotoModal";
import { EditFeedbackModal } from "./EditFeedbackModal";
import {
  X,
  Languages,
  Layers,
  Image as ImageIcon,
  Settings,
  Plus,
  Trash2,
  RotateCcw,
  Globe,
  Mail,
  Search,
  Edit3,
  Camera,
  Upload,
  Star,
  MessageSquare
} from "lucide-react";
export const CMSDashboard = ({ isOpen, onClose, onOpenEditBackground }) => {
  const {
    language,
    direction,
    setDirection,
    translations,
    updateTranslationKey,
    addTranslationKey,
    resetTranslations,
    t
  } = useLanguage();
  const {
    siteSettings,
    updateSiteSettings,
    albums,
    addAlbum,
    updateAlbum,
    deleteAlbum,
    photos,
    addPhoto,
    deletePhoto,
    feedbacks,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    inquiries,
    resetCMSData
  } = useCMS();
  const [activeTab, setActiveTab] = useState("translations");
  const [translationSearch, setTranslationSearch] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newValEn, setNewValEn] = useState("");
  const [newValRo, setNewValRo] = useState("");
  const [newValHu, setNewValHu] = useState("");
  const [photoTitleEn, setPhotoTitleEn] = useState("");
  const [photoTitleRo, setPhotoTitleRo] = useState("");
  const [photoTitleHu, setPhotoTitleHu] = useState("");
  const [photoSrc, setPhotoSrc] = useState("");
  const [photoAlbumId, setPhotoAlbumId] = useState(albums[0]?.id || "nature");
  const [photoCamera, setPhotoCamera] = useState("Nikon D850");
  const [photoLens, setPhotoLens] = useState("24-70mm f/2.8");
  const [copiedLink, setCopiedLink] = useState("");
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [editingFeedbackItem, setEditingFeedbackItem] = useState(null);
  const [feedbackSearch, setFeedbackSearch] = useState("");
  const [newFbClient, setNewFbClient] = useState("");
  const [newFbRating, setNewFbRating] = useState(5);
  const [newFbType, setNewFbType] = useState("Portrait Session");
  const [newFbComment, setNewFbComment] = useState("");
  if (!isOpen) return null;
  const allKeys = Array.from(
    /* @__PURE__ */ new Set([
      ...Object.keys(translations.en || {}),
      ...Object.keys(translations.ro || {}),
      ...Object.keys(translations.hu || {})
    ])
  );
  const filteredKeys = allKeys.filter(
    (key) => key.toLowerCase().includes(translationSearch.toLowerCase()) || (translations.en?.[key] || "").toLowerCase().includes(translationSearch.toLowerCase()) || (translations.ro?.[key] || "").toLowerCase().includes(translationSearch.toLowerCase()) || (translations.hu?.[key] || "").toLowerCase().includes(translationSearch.toLowerCase())
  );
  const handleAddNewKey = (e) => {
    e.preventDefault();
    if (!newKey.trim() || !newValEn.trim()) return;
    const sanitizedKey = newKey.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_");
    addTranslationKey(sanitizedKey, newValEn.trim(), newValRo.trim() || newValEn.trim(), newValHu.trim() || newValEn.trim());
    setNewKey("");
    setNewValEn("");
    setNewValRo("");
    setNewValHu("");
  };
  const handleAddPhotoSubmit = (e) => {
    e.preventDefault();
    if (!photoTitleEn || !photoSrc) return;
    addPhoto({
      title: {
        en: photoTitleEn,
        ro: photoTitleRo || photoTitleEn,
        hu: photoTitleHu || photoTitleEn
      },
      albumId: photoAlbumId,
      src: photoSrc,
      exif: {
        camera: photoCamera,
        lens: photoLens,
        aperture: "f/2.8",
        iso: "ISO 200",
        shutterSpeed: "1/500s"
      },
      tags: ["Portfolio", "CMS Upload"]
    });
    setPhotoTitleEn("");
    setPhotoTitleRo("");
    setPhotoTitleHu("");
    setPhotoSrc("");
  };
  const handleCopyLink = (url) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(url);
      setTimeout(() => setCopiedLink(""), 2e3);
    }
  };
  return <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-xl p-2 sm:p-4 overflow-hidden"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}
  >
      <div className="relative w-full max-w-6xl h-[92vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-100">
        {
    /* CMS Header */
  }
        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400/10 border border-amber-400/30 rounded-xl text-amber-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                <span>{t("cms_title", "CMS & Multi-Language Dashboard")}</span>
                <span className="px-2 py-0.5 bg-amber-400 text-zinc-950 text-[10px] font-extrabold uppercase rounded-full">
                  Live
                </span>
              </h2>
              <p className="text-xs text-zinc-400">{t("cms_subtitle", "Manage translations, albums, photos, and site settings.")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {
    /* Quick Edit Background Modal Launcher */
  }
            {onOpenEditBackground && <button
    type="button"
    onClick={onOpenEditBackground}
    className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
    title="Open Website Background Image Editor"
  >
                <ImageIcon className="w-3.5 h-3.5 text-zinc-950" />
                <span>Change Background</span>
              </button>}

            {
    /* RTL Mode Switcher */
  }
            <button
    onClick={() => setDirection(direction === "ltr" ? "rtl" : "ltr")}
    className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 border transition-all ${direction === "rtl" ? "bg-amber-400 text-zinc-950 font-bold border-amber-400" : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white"}`}
  >
              <span>{t("cms_rtl_toggle", "RTL Mode")}</span>
              <span className="text-[10px] uppercase font-bold">({direction})</span>
            </button>

            {
    /* Close Button */
  }
            <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }}
    className="px-3 py-1.5 text-xs font-bold uppercase text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
  >
              <X className="w-4 h-4 text-amber-400" />
              <span>Close CMS</span>
            </button>
          </div>
        </div>

        {
    /* CMS Tabs Navigation */
  }
        <div className="px-6 py-2 bg-zinc-950/60 border-b border-zinc-800 flex items-center gap-2 overflow-x-auto">
          <button
    onClick={() => setActiveTab("translations")}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "translations" ? "bg-amber-400 text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"}`}
  >
            <Languages className="w-4 h-4" />
            <span>{t("cms_tab_translations", "Translations")}</span>
          </button>

          <button
    onClick={() => setActiveTab("albums")}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "albums" ? "bg-amber-400 text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"}`}
  >
            <Layers className="w-4 h-4" />
            <span>Albums ({albums.length})</span>
          </button>

          <button
    onClick={() => setActiveTab("photos")}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "photos" ? "bg-amber-400 text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"}`}
  >
            <ImageIcon className="w-4 h-4" />
            <span>Photos ({photos.length})</span>
          </button>

          <button
    onClick={() => setActiveTab("feedbacks")}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "feedbacks" ? "bg-amber-400 text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"}`}
  >
            <MessageSquare className="w-4 h-4" />
            <span>Reviews ({feedbacks.length})</span>
          </button>

          <button
    onClick={() => setActiveTab("settings")}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "settings" ? "bg-amber-400 text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"}`}
  >
            <Settings className="w-4 h-4" />
            <span>Site Settings</span>
          </button>

          <button
    onClick={() => setActiveTab("inquiries")}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all relative ${activeTab === "inquiries" ? "bg-amber-400 text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"}`}
  >
            <Mail className="w-4 h-4" />
            <span>Inquiries ({inquiries.length})</span>
            {inquiries.length > 0 && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
          </button>
        </div>

        {
    /* CMS Tab Body */
  }
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {
    /* TAB 1: TRANSLATIONS MANAGER */
  }
          {activeTab === "translations" && <div className="space-y-6">
              {
    /* Add New Translation Key Form */
  }
              <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>{t("cms_add_translation_key", "Add Translation Key")}</span>
                </h3>

                <form onSubmit={handleAddNewKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <input
    type="text"
    required
    placeholder="key_identifier (e.g. hero_banner_cta)"
    value={newKey}
    onChange={(e) => setNewKey(e.target.value)}
    className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-amber-400"
  />
                  <input
    type="text"
    required
    placeholder="English string"
    value={newValEn}
    onChange={(e) => setNewValEn(e.target.value)}
    className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
  />
                  <input
    type="text"
    placeholder="Romanian translation"
    value={newValRo}
    onChange={(e) => setNewValRo(e.target.value)}
    className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
  />
                  <input
    type="text"
    placeholder="Hungarian translation"
    value={newValHu}
    onChange={(e) => setNewValHu(e.target.value)}
    className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
  />
                  <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
                    <button
    type="submit"
    className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
  >
                      <Plus className="w-4 h-4" />
                      <span>Add Key</span>
                    </button>
                  </div>
                </form>
              </div>

              {
    /* Translation Keys Search */
  }
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
    type="text"
    value={translationSearch}
    onChange={(e) => setTranslationSearch(e.target.value)}
    placeholder="Filter translation keys..."
    className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
  />
                </div>

                <button
    onClick={resetTranslations}
    className="px-3.5 py-2 bg-zinc-800 hover:bg-red-950/60 hover:text-red-400 text-zinc-400 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
  >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t("cms_reset", "Reset Defaults")}</span>
                </button>
              </div>

              {
    /* Translation Matrix Table */
  }
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-x-auto shadow-inner">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-900 border-b border-zinc-800 text-amber-400 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4 w-1/4">Key Identifier</th>
                      <th className="py-3 px-4 w-1/4">🇬🇧 English (EN)</th>
                      <th className="py-3 px-4 w-1/4">🇷🇴 Română (RO)</th>
                      <th className="py-3 px-4 w-1/4">🇭🇺 Magyar (HU)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {filteredKeys.map((key) => <tr key={key} className="hover:bg-zinc-900/40">
                        <td className="py-2.5 px-4 font-mono text-amber-400/90 font-semibold text-[11px] select-all">
                          {key}
                        </td>
                        <td className="py-2 px-3">
                          <input
    type="text"
    value={translations.en?.[key] || ""}
    onChange={(e) => updateTranslationKey("en", key, e.target.value)}
    className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800/80 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
  />
                        </td>
                        <td className="py-2 px-3">
                          <input
    type="text"
    value={translations.ro?.[key] || ""}
    onChange={(e) => updateTranslationKey("ro", key, e.target.value)}
    className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800/80 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
  />
                        </td>
                        <td className="py-2 px-3">
                          <input
    type="text"
    value={translations.hu?.[key] || ""}
    onChange={(e) => updateTranslationKey("hu", key, e.target.value)}
    className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800/80 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
  />
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>}

          {
    /* TAB 2: ALBUMS MANAGER */
  }
          {activeTab === "albums" && <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {albums.map((album) => <div key={album.id} className="p-5 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-amber-400 uppercase font-bold">ID: {album.id}</span>
                      <button
    onClick={() => deleteAlbum(album.id)}
    className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-900 rounded-lg"
    title="Delete Album"
  >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">
                          Album Name (EN)
                        </label>
                        <input
    type="text"
    value={album.name.en}
    onChange={(e) => updateAlbum(album.id, {
      name: { ...album.name, en: e.target.value }
    })}
    className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white"
  />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">
                            Album Name (RO)
                          </label>
                          <input
    type="text"
    value={album.name.ro}
    onChange={(e) => updateAlbum(album.id, {
      name: { ...album.name, ro: e.target.value }
    })}
    className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white"
  />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">
                            Album Name (HU)
                          </label>
                          <input
    type="text"
    value={album.name.hu}
    onChange={(e) => updateAlbum(album.id, {
      name: { ...album.name, hu: e.target.value }
    })}
    className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white"
  />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">Cover Image</label>
                        <input
    type="text"
    value={album.coverImage}
    onChange={(e) => updateAlbum(album.id, { coverImage: e.target.value })}
    className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white font-mono"
  />
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}

          {
    /* TAB 3: PHOTOS MANAGER */
  }
          {activeTab === "photos" && <div className="space-y-6">
              {
    /* Add New Photo Form */
  }
              <form onSubmit={handleAddPhotoSubmit} className="p-5 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>{t("cms_add_photo", "Upload / Add Photo")}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
    type="text"
    required
    placeholder="Title (English)"
    value={photoTitleEn}
    onChange={(e) => setPhotoTitleEn(e.target.value)}
    className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
  />
                  <input
    type="text"
    placeholder="Title (Romanian)"
    value={photoTitleRo}
    onChange={(e) => setPhotoTitleRo(e.target.value)}
    className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
  />
                  <input
    type="text"
    placeholder="Title (Hungarian)"
    value={photoTitleHu}
    onChange={(e) => setPhotoTitleHu(e.target.value)}
    className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
  />
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="w-full sm:w-auto px-4 py-2 bg-violet-900/60 hover:bg-violet-800 border border-violet-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors">
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      <span>Upload Local PC Image</span>
                      <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) setPhotoSrc(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }}
    className="hidden"
  />
                    </label>
                    <span className="text-xs text-violet-400 font-mono">or paste web URL below</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
    type="text"
    required
    placeholder="Image URL or Base64 (from PC)"
    value={photoSrc}
    onChange={(e) => setPhotoSrc(e.target.value)}
    className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white font-mono"
  />
                    <select
    value={photoAlbumId}
    onChange={(e) => setPhotoAlbumId(e.target.value)}
    className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
  >
                      {albums.map((a) => <option key={a.id} value={a.id}>
                          Album: {typeof a.name === "string" ? a.name : a.name.en}
                        </option>)}
                    </select>
                    <input
    type="text"
    placeholder="Camera (e.g. Nikon D850)"
    value={photoCamera}
    onChange={(e) => setPhotoCamera(e.target.value)}
    className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
  />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
    type="submit"
    className="px-6 py-2.5 bg-amber-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider rounded-xl"
  >
                    Save Photo to Catalog
                  </button>
                </div>
              </form>

              {
    /* Photo Collection Grid */
  }
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => <div key={photo.id} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden p-2 relative group hover:border-zinc-700 transition-colors">
                    <img
    src={photo.src}
    alt={typeof photo.title === "string" ? photo.title : photo.title.en}
    className="w-full aspect-[4/3] object-cover rounded-lg"
    referrerPolicy="no-referrer"
  />
                    <div className="p-2 space-y-1">
                      <span className="text-xs font-bold text-white block truncate">
                        {typeof photo.title === "string" ? photo.title : photo.title.en}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono block">Album: {photo.albumId}</span>
                    </div>

                    {
    /* Action buttons */
  }
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
    onClick={() => setEditingPhoto(photo)}
    className="p-1.5 bg-amber-400 text-zinc-950 hover:bg-amber-300 rounded-lg shadow-md transition-colors"
    title="Edit / Replace photo from PC"
  >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
    onClick={() => deletePhoto(photo.id)}
    className="p-1.5 bg-zinc-950/85 text-zinc-400 hover:text-red-400 rounded-lg shadow-md transition-colors"
    title="Delete Photo"
  >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>)}
              </div>
            </div>}

          {
    /* TAB 4: SITE SETTINGS & SEO MANAGER */
  }
          {activeTab === "settings" && <div className="space-y-6">
              {
    /* Site Content Settings Form */
  }
              <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Site Content & Photographer Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-400 block mb-1">Photographer Name</label>
                    <input
    type="text"
    value={siteSettings.photographerName}
    onChange={(e) => updateSiteSettings({ photographerName: e.target.value })}
    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white font-bold"
  />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-400 block mb-1">Contact Email</label>
                    <input
    type="email"
    value={siteSettings.contactEmail}
    onChange={(e) => updateSiteSettings({ contactEmail: e.target.value })}
    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
  />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-400 block mb-1">Contact Phone</label>
                    <input
    type="text"
    value={siteSettings.contactPhone}
    onChange={(e) => updateSiteSettings({ contactPhone: e.target.value })}
    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
  />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-400 block mb-1">Location Hubs</label>
                    <input
    type="text"
    value={siteSettings.location}
    onChange={(e) => updateSiteSettings({ location: e.target.value })}
    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
  />
                  </div>
                </div>

                {
    /* Photographer Portfolio Image Setting */
  }
                <div className="pt-4 border-t border-zinc-850 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Camera className="w-4 h-4" />
                      <span>Photographer Portfolio Image (About & Profile)</span>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
                      <img
    src={siteSettings.photographerImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"}
    alt="Photographer Portrait"
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
                    </div>
                    <div className="space-y-2 flex-1 w-full">
                      <div className="flex items-center gap-2">
                        <label className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Choose from Computer</span>
                          <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) {
            updateSiteSettings({ photographerImage: ev.target.result });
          }
        };
        reader.readAsDataURL(file);
      }
    }}
  />
                        </label>
                        <span className="text-[11px] text-zinc-400">or enter direct URL</span>
                      </div>
                      <input
    type="text"
    value={siteSettings.photographerImage || ""}
    placeholder="https://images.unsplash.com/... or /images/..."
    onChange={(e) => updateSiteSettings({ photographerImage: e.target.value })}
    className="w-full px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white font-mono"
  />
                    </div>
                  </div>
                </div>

                {
    /* Site Background Photo Preset & Custom URL */
  }
                <div className="pt-4 border-t border-zinc-850 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      Global Fixed Background Photography
                    </label>
                    {onOpenEditBackground && <button
    type="button"
    onClick={onOpenEditBackground}
    className="px-3 py-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/50 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
  >
                        <ImageIcon className="w-3 h-3 text-amber-400" />
                        <span>Launch Full Background Editor Modal</span>
                      </button>}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <button
    type="button"
    onClick={() => updateSiteSettings({ activeBackground: "/images/fashion_photo_bg_1787814406350.jpg" })}
    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${(siteSettings.activeBackground || "").includes("fashion_photo_bg") ? "border-amber-400 bg-amber-400/10" : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"}`}
  >
                      <div className="w-full h-20 rounded-lg overflow-hidden mb-2 bg-zinc-800">
                        <img
    src="/images/fashion_photo_bg_1787814406350.jpg"
    alt="Fashion Studio"
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
                      </div>
                      <span className="text-xs font-bold text-white block">Fashion & Editorial</span>
                      <span className="text-[10px] text-zinc-400 block">Haute couture studio lighting</span>
                    </button>

                    <button
    type="button"
    onClick={() => updateSiteSettings({ activeBackground: "/images/camera_fixed_bg_1786097380616.jpg" })}
    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${(siteSettings.activeBackground || "").includes("camera_fixed_bg") ? "border-amber-400 bg-amber-400/10" : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"}`}
  >
                      <div className="w-full h-20 rounded-lg overflow-hidden mb-2 bg-zinc-800">
                        <img
    src="/images/camera_fixed_bg_1786097380616.jpg"
    alt="Camera Lens"
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
                      </div>
                      <span className="text-xs font-bold text-white block">Nikon Lens Classic</span>
                      <span className="text-[10px] text-zinc-400 block">Mechanical camera optic</span>
                    </button>

                    <button
    type="button"
    onClick={() => updateSiteSettings({ activeBackground: "/images/camera_macro_bg_1786090472295.jpg" })}
    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${(siteSettings.activeBackground || "").includes("camera_macro_bg") ? "border-amber-400 bg-amber-400/10" : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"}`}
  >
                      <div className="w-full h-20 rounded-lg overflow-hidden mb-2 bg-zinc-800">
                        <img
    src="/images/camera_macro_bg_1786090472295.jpg"
    alt="Camera Macro"
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
                      </div>
                      <span className="text-xs font-bold text-white block">Macro Shutter</span>
                      <span className="text-[10px] text-zinc-400 block">Close-up precision gear</span>
                    </button>

                    <button
    type="button"
    onClick={() => updateSiteSettings({ activeBackground: "/images/dark_studio_bg_1787814211505.jpg" })}
    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${(siteSettings.activeBackground || "").includes("dark_studio_bg") ? "border-amber-400 bg-amber-400/10" : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"}`}
  >
                      <div className="w-full h-20 rounded-lg overflow-hidden mb-2 bg-zinc-800">
                        <img
    src="/images/dark_studio_bg_1787814211505.jpg"
    alt="Dark Studio"
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
                      </div>
                      <span className="text-xs font-bold text-white block">Dark Studio Atmospheric</span>
                      <span className="text-[10px] text-zinc-400 block">Moody ambient shadows</span>
                    </button>
                  </div>

                  <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <label className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose Background from PC</span>
                      <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) {
            updateSiteSettings({ activeBackground: ev.target.result });
          }
        };
        reader.readAsDataURL(file);
      }
    }}
  />
                    </label>
                    <input
    type="text"
    value={siteSettings.activeBackground || ""}
    placeholder="Or enter direct custom background URL..."
    onChange={(e) => updateSiteSettings({ activeBackground: e.target.value })}
    className="flex-1 px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white font-mono"
  />
                  </div>
                </div>

                {
    /* Photographer Admin Sign-In Credentials */
  }
                <div className="pt-4 border-t border-zinc-850 space-y-3">
                  <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Photographer CMS Login Credentials
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-400 block mb-1">Admin Email (Username)</label>
                      <input
    type="email"
    value={siteSettings.adminEmail || "baraszende89@gmail.com"}
    onChange={(e) => updateSiteSettings({ adminEmail: e.target.value })}
    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
  />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-400 block mb-1">Admin Password</label>
                      <input
    type="text"
    value={siteSettings.adminPassword || "Ajtofelfa1234"}
    onChange={(e) => updateSiteSettings({ adminPassword: e.target.value })}
    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white font-mono"
  />
                    </div>
                  </div>
                </div>
              </div>
            </div>}

          {
    /* TAB 4: REVIEWS & FEEDBACK MODERATION */
  }
          {activeTab === "feedbacks" && <div className="space-y-6">
              {
    /* Add New Feedback / Review */
  }
              <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New Client Review</span>
                </h3>

                <form
    onSubmit={(e) => {
      e.preventDefault();
      if (!newFbClient.trim() || !newFbComment.trim()) return;
      addFeedback({
        clientName: newFbClient.trim(),
        rating: newFbRating,
        sessionType: newFbType,
        comment: newFbComment.trim(),
        approved: true
      });
      setNewFbClient("");
      setNewFbComment("");
      setNewFbRating(5);
    }}
    className="space-y-4"
  >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-400 block mb-1">Client Name *</label>
                      <input
    type="text"
    required
    value={newFbClient}
    onChange={(e) => setNewFbClient(e.target.value)}
    placeholder="e.g. Maria Popa"
    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
  />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-400 block mb-1">Session Type</label>
                      <select
    value={newFbType}
    onChange={(e) => setNewFbType(e.target.value)}
    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
  >
                        <option value="Portrait Session">Portrait Session</option>
                        <option value="Family Photography">Family Photography</option>
                        <option value="Outdoor & Action">Outdoor & Action</option>
                        <option value="Event Coverage">Event Coverage</option>
                        <option value="Landscape Fine Art">Landscape Fine Art</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-400 block mb-1">Rating</label>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl">
                        {[1, 2, 3, 4, 5].map((star) => <button
    key={star}
    type="button"
    onClick={() => setNewFbRating(star)}
    className="p-0.5 hover:scale-125 transition-transform cursor-pointer"
  >
                            <Star
    className={`w-4 h-4 ${star <= newFbRating ? "fill-amber-400 text-amber-400" : "text-zinc-700 fill-zinc-800"}`}
  />
                          </button>)}
                        <span className="text-xs font-bold text-amber-400 font-mono ml-2">
                          {newFbRating} / 5
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-400 block mb-1">Review Comment *</label>
                    <textarea
    required
    rows={3}
    value={newFbComment}
    onChange={(e) => setNewFbComment(e.target.value)}
    placeholder="Enter client praise or testimony..."
    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
  />
                  </div>

                  <div className="flex justify-end">
                    <button
    type="submit"
    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
  >
                      <Plus className="w-4 h-4" />
                      <span>Add Review</span>
                    </button>
                  </div>
                </form>
              </div>

              {
    /* Feedbacks List & Search */
  }
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
    type="text"
    value={feedbackSearch}
    onChange={(e) => setFeedbackSearch(e.target.value)}
    placeholder="Search reviews by client name or keywords..."
    className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
  />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 shrink-0">
                    Total: {feedbacks.length} Reviews
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {feedbacks.filter(
    (fb) => fb.clientName.toLowerCase().includes(feedbackSearch.toLowerCase()) || fb.comment.toLowerCase().includes(feedbackSearch.toLowerCase()) || fb.sessionType.toLowerCase().includes(feedbackSearch.toLowerCase())
  ).map((fb) => <div
    key={fb.id}
    className="p-4 bg-zinc-950 border border-zinc-800 hover:border-amber-400/40 rounded-2xl flex flex-col justify-between space-y-3 transition-colors"
  >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                {[1, 2, 3, 4, 5].map((s) => <Star
    key={s}
    className={`w-3.5 h-3.5 ${s <= fb.rating ? "fill-amber-400 text-amber-400" : "text-zinc-700 fill-zinc-800"}`}
  />)}
                              </div>
                              <h4 className="text-sm font-bold text-white">{fb.clientName}</h4>
                              <span className="text-[11px] text-amber-400 font-mono">{fb.sessionType}</span>
                            </div>

                            {
    /* Actions */
  }
                            <div className="flex items-center gap-1.5">
                              <button
    type="button"
    onClick={() => setEditingFeedbackItem(fb)}
    className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs rounded-lg flex items-center gap-1 shadow-sm transition-transform active:scale-95 cursor-pointer"
    title="Edit Review"
  >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
    type="button"
    onClick={() => {
      if (window.confirm(`Are you sure you want to remove the review from "${fb.clientName}"?`)) {
        deleteFeedback(fb.id);
      }
    }}
    className="p-1.5 bg-zinc-900 hover:bg-red-600 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer border border-zinc-800"
    title="Remove Review"
  >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-zinc-300 italic bg-zinc-900/60 p-3 rounded-xl border border-zinc-850">
                            &ldquo;{fb.comment}&rdquo;
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-2 border-t border-zinc-900">
                          <span>ID: {fb.id}</span>
                          <span>{fb.date}</span>
                        </div>
                      </div>)}
                </div>
              </div>
            </div>}

          {
    /* TAB 5: INQUIRIES REVIEW */
  }
          {activeTab === "inquiries" && <div className="space-y-4">
              {inquiries.length === 0 ? <div className="text-center py-16 bg-zinc-950 rounded-2xl border border-zinc-800 p-6">
                  <Mail className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                  <p className="text-sm text-zinc-400">No booking inquiries received yet.</p>
                </div> : inquiries.map((inq) => <div key={inq.id} className="p-5 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{inq.name}</span>
                      <span className="text-xs font-mono text-zinc-500">{inq.submittedAt}</span>
                    </div>
                    <div className="text-xs text-amber-400 font-semibold">{inq.email} • {inq.phone || "No Phone"}</div>
                    <div className="text-xs text-zinc-300 bg-zinc-900 p-3 rounded-xl">{inq.message}</div>
                  </div>)}
            </div>}
        </div>
      </div>

      {
    /* Edit Photo Modal */
  }
      {editingPhoto && <EditPhotoModal
    photo={editingPhoto}
    isOpen={!!editingPhoto}
    onClose={() => setEditingPhoto(null)}
  />}

      {
    /* Edit Feedback Modal */
  }
      {editingFeedbackItem && <EditFeedbackModal
    feedback={editingFeedbackItem}
    isOpen={!!editingFeedbackItem}
    onClose={() => setEditingFeedbackItem(null)}
  />}
    </div>;
};
