import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";
import { LightboxModal } from "./LightboxModal";
import { AddAlbumModal } from "./AddAlbumModal";
import { AddPhotoModal } from "./AddPhotoModal";
import { EditPhotoModal } from "./EditPhotoModal";
import { EditAlbumModal } from "./EditAlbumModal";
import {
  Search,
  FolderPlus,
  Grid,
  Layers,
  Eye,
  Camera,
  Filter,
  Sparkles,
  Folder,
  Upload,
  Edit,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export const Gallery = () => {
  const { language, t } = useLanguage();
  const { photos, albums, isAdminLoggedIn, deletePhoto, deleteAlbum } = useCMS();
  const [selectedAlbumId, setSelectedAlbumId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("photos");
  const [activePhoto, setActivePhoto] = useState(null);
  const [isAddAlbumOpen, setIsAddAlbumOpen] = useState(false);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [visiblePhotoCount, setVisiblePhotoCount] = useState(10);
  const [visibleAlbumCount, setVisibleAlbumCount] = useState(6);
  const albumNavRef = React.useRef(null);
  const sortedAlbums = React.useMemo(() => {
    return [...albums].sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });
  }, [albums]);
  const scrollAlbumNav = (direction) => {
    if (albumNavRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      albumNavRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  React.useEffect(() => {
    setVisiblePhotoCount(10);
    setVisibleAlbumCount(6);
  }, [selectedAlbumId, searchQuery, viewMode]);
  const filteredAlbums = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return sortedAlbums;
    return sortedAlbums.filter((album) => {
      const name = getMultilingualText(album.name).toLowerCase();
      const desc = getMultilingualText(album.description).toLowerCase();
      const albumPhotos = photos.filter((p) => p.albumId === album.id);
      const photoMatch = albumPhotos.some((photo) => {
        const pTitle = getMultilingualText(photo.title).toLowerCase();
        const pTags = (photo.tags || []).join(" ").toLowerCase();
        return pTitle.includes(q) || pTags.includes(q);
      });
      return name.includes(q) || desc.includes(q) || photoMatch;
    });
  }, [sortedAlbums, searchQuery, photos, language]);
  const getMultilingualText = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[language] || field["en"] || Object.values(field)[0] || "";
  };
  const handleDeletePhoto = (e, photoId, title) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete photograph "${title}"?`)) {
      deletePhoto(photoId);
    }
  };
  const handleDeleteAlbum = (e, albumId, name) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove album "${name}" and unassign its photos?`)) {
      deleteAlbum(albumId);
      if (selectedAlbumId === albumId) {
        setSelectedAlbumId("all");
      }
    }
  };
  const filteredPhotos = photos.filter((photo) => {
    const matchesAlbum = selectedAlbumId === "all" || photo.albumId === selectedAlbumId;
    const title = getMultilingualText(photo.title).toLowerCase();
    const desc = getMultilingualText(photo.description).toLowerCase();
    const tags = (photo.tags || []).join(" ").toLowerCase();
    const camera = (photo.exif?.camera || "").toLowerCase();
    const location = (photo.exif?.location || "").toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || title.includes(q) || desc.includes(q) || tags.includes(q) || camera.includes(q) || location.includes(q);
    return matchesAlbum && matchesSearch;
  });
  return <section id="gallery" className="relative py-24 bg-transparent text-white overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {
    /* Gallery Section Header */
  }
        <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-violet-900/60 pb-8"
  >
          <div>
            <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3"
  >
              <Camera className="w-3.5 h-3.5" />
              <span>{t("gallery_title", "Photography Portfolio")}</span>
            </motion.div>

            <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-white"
  >
              {t("gallery_title", "Photography Portfolio")}
            </motion.h2>

            <motion.p
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="text-sm sm:text-base text-violet-300 font-light mt-2 max-w-xl"
  >
              {t("gallery_subtitle", "Explore curated albums, individual shots, and timeless collections.")}
            </motion.p>
          </div>

          {
    /* View Mode Toggle & Admin-Only Add Photo / Add Album Buttons */
  }
          <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.35 }}
    className="flex flex-wrap items-center gap-3"
  >
            <div className="bg-[#180a33] border border-violet-800/80 p-1 rounded-xl flex items-center">
              <button
    onClick={() => setViewMode("photos")}
    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${viewMode === "photos" ? "bg-amber-400 text-zinc-950 font-bold shadow-md" : "text-violet-300 hover:text-white"}`}
  >
                <Grid className="w-3.5 h-3.5" />
                <span>{t("gallery_all_photos", "Photos")} ({photos.length})</span>
              </button>

              <button
    onClick={() => setViewMode("albums")}
    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${viewMode === "albums" ? "bg-amber-400 text-zinc-950 font-bold shadow-md" : "text-violet-300 hover:text-white"}`}
  >
                <Layers className="w-3.5 h-3.5" />
                <span>{t("gallery_albums", "Albums")} ({albums.length})</span>
              </button>
            </div>

            {
    /* Direct Upload / Add Photo & Create Album Buttons - ONLY FOR LOGGED-IN ADMIN */
  }
            {isAdminLoggedIn && <>
                <button
    onClick={() => setIsAddPhotoOpen(true)}
    className="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
  >
                  <Upload className="w-4 h-4" />
                  <span>➕ {t("gallery_add_photo", "Add Photo")}</span>
                </button>

                <button
    onClick={() => setIsAddAlbumOpen(true)}
    className="flex items-center gap-2 px-4 py-2 bg-[#180a33] hover:bg-[#220d47] border border-amber-400/40 text-amber-400 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
  >
                  <FolderPlus className="w-4 h-4" />
                  <span>{t("gallery_add_album", "Create New Album")}</span>
                </button>
              </>}
          </motion.div>
        </motion.div>

        {
    /* Filter Controls Bar */
  }
        <div className="space-y-6 mb-10">
          {
    /* Search Input Bar & Album Quick Selector Dropdown */
  }
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-3xl w-full">
              {
    /* Search Bar */
  }
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400" />
                <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder={t("gallery_search_placeholder", "Filter albums or search photos...")}
    className="w-full pl-11 pr-16 py-3 bg-[#160b2b]/90 border border-violet-800/80 rounded-xl text-sm text-zinc-100 placeholder-violet-400/60 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
  />
                {searchQuery && <button
    onClick={() => setSearchQuery("")}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-amber-400 hover:text-amber-300 cursor-pointer font-bold uppercase tracking-wider"
  >
                    {t("gallery_clear_search", "Clear")}
                  </button>}
              </div>

              {
    /* Direct Album Dropdown Jump Selector */
  }
              <div className="relative w-full sm:w-64 flex-shrink-0">
                <select
    value={selectedAlbumId}
    onChange={(e) => {
      setSelectedAlbumId(e.target.value);
      if (e.target.value !== "all") {
        setViewMode("photos");
      }
    }}
    className="w-full appearance-none px-4 py-3 bg-[#180a33] border border-violet-700/80 rounded-xl text-xs font-semibold text-amber-300 focus:outline-none focus:border-amber-400 transition-colors cursor-pointer pr-10 shadow-lg"
  >
                  <option value="all" className="bg-[#140726] text-white">
                    📂 {t("gallery_all_albums_option", "All Albums")} ({albums.length})
                  </option>
                  {sortedAlbums.map((album) => {
    const count = photos.filter((p) => p.albumId === album.id).length;
    const name = getMultilingualText(album.name);
    return <option key={album.id} value={album.id} className="bg-[#140726] text-white">
                        📁 {name} ({count} photos)
                      </option>;
  })}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-300/90 font-mono bg-[#180a33]/80 border border-violet-800/60 px-3.5 py-2.5 rounded-xl self-start lg:self-auto shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>
                {searchQuery ? `Filtered: ${filteredAlbums.length} albums, ${filteredPhotos.length} photos` : `${albums.length} Albums \u2022 ${photos.length} Photographs`}
              </span>
            </div>
          </div>

          {
    /* Album Pills Navigation with Left / Right Scroll Controls */
  }
          <div className="relative flex items-center gap-1.5 bg-[#120724]/90 p-1.5 rounded-2xl border border-violet-800/80 shadow-xl">
            <button
    type="button"
    onClick={() => scrollAlbumNav("left")}
    className="p-2 bg-[#1a0c33] hover:bg-amber-400 hover:text-zinc-950 text-amber-300 rounded-xl transition-all cursor-pointer flex-shrink-0 border border-violet-700/60 shadow active:scale-90"
    title="Scroll Left"
  >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
    ref={albumNavRef}
    className="flex items-center gap-2 overflow-x-auto py-1 px-1 scrollbar-none scroll-smooth flex-1"
  >
              <button
    onClick={() => {
      setSelectedAlbumId("all");
      setViewMode("photos");
    }}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wider uppercase whitespace-nowrap transition-all border cursor-pointer ${selectedAlbumId === "all" ? "bg-amber-400 text-zinc-950 border-amber-400 shadow-md" : "bg-[#180a33] text-violet-300 border-violet-800/80 hover:border-violet-600 hover:text-zinc-100"}`}
  >
                <Filter className="w-3.5 h-3.5" />
                <span>{t("gallery_filter_all", "All Work")} ({photos.length})</span>
              </button>

              {filteredAlbums.map((album) => {
    const count = photos.filter((p) => p.albumId === album.id).length;
    const name = getMultilingualText(album.name);
    return <button
      key={album.id}
      onClick={() => {
        setSelectedAlbumId(album.id);
        setViewMode("photos");
      }}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap transition-all border cursor-pointer ${selectedAlbumId === album.id ? "bg-amber-400 text-zinc-950 border-amber-400 font-bold shadow-md" : "bg-[#180a33] text-violet-300 border-violet-800/80 hover:border-violet-600 hover:text-zinc-100"}`}
    >
                    <Folder className="w-3.5 h-3.5 text-amber-400" />
                    <span>{name}</span>
                    <span className="text-[10px] font-mono bg-violet-950/80 px-1.5 py-0.5 rounded border border-violet-700/50 opacity-90">
                      {count}
                    </span>
                  </button>;
  })}
            </div>

            <button
    type="button"
    onClick={() => scrollAlbumNav("right")}
    className="p-2 bg-[#1a0c33] hover:bg-amber-400 hover:text-zinc-950 text-amber-300 rounded-xl transition-all cursor-pointer flex-shrink-0 border border-violet-700/60 shadow active:scale-90"
    title="Scroll Right"
  >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {
    /* VIEW MODE: ALBUMS DYNAMIC GRID STACK */
  }
        {viewMode === "albums" && <div>
            {filteredAlbums.length === 0 ? <div className="text-center py-20 bg-[#160b2b]/60 rounded-2xl border border-violet-800/60 p-8">
                <Folder className="w-12 h-12 text-violet-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-zinc-200">
                  {searchQuery ? `No albums matching "${searchQuery}"` : "No albums created yet."}
                </h3>
                {searchQuery && <button
    onClick={() => setSearchQuery("")}
    className="mt-4 px-4 py-2 bg-amber-400 text-zinc-950 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
  >
                    Clear Filter
                  </button>}
              </div> : <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredAlbums.slice(0, visibleAlbumCount).map((album) => {
    const albumPhotos = photos.filter((p) => p.albumId === album.id);
    const name = getMultilingualText(album.name);
    const desc = getMultilingualText(album.description);
    const cover = album.coverImage || albumPhotos[0]?.src || "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80";
    const backCover1 = albumPhotos[1]?.src || cover;
    const backCover2 = albumPhotos[2]?.src || cover;
    return <motion.div
      key={album.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group relative cursor-pointer"
      onClick={() => {
        setSelectedAlbumId(album.id);
        setViewMode("photos");
      }}
    >
                        {
      /* DYNAMIC GRID STACK: Layer 3 (Deepest card) */
    }
                        <div className="absolute inset-0 bg-[#140628] border border-violet-800/40 rounded-2xl overflow-hidden shadow-md transform rotate-[-6deg] translate-y-[-4px] group-hover:rotate-[-10deg] group-hover:translate-x-[-12px] group-hover:translate-y-[-6deg] transition-all duration-500 opacity-75">
                          <img
      src={backCover2}
      alt=""
      className="w-full h-full object-cover brightness-50"
      referrerPolicy="no-referrer"
    />
                        </div>

                        {
      /* DYNAMIC GRID STACK: Layer 2 (Middle card) */
    }
                        <div className="absolute inset-0 bg-[#1a0a35] border border-violet-700/50 rounded-2xl overflow-hidden shadow-lg transform rotate-[4deg] translate-y-[-2px] group-hover:rotate-[8deg] group-hover:translate-x-[12px] group-hover:translate-y-[-4deg] transition-all duration-500 opacity-85">
                          <img
      src={backCover1}
      alt=""
      className="w-full h-full object-cover brightness-70"
      referrerPolicy="no-referrer"
    />
                        </div>

                        {
      /* DYNAMIC GRID STACK: Main Front Card */
    }
                        <div className="relative bg-[#160b2b] border border-violet-800/70 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group-hover:border-amber-400/80 transition-all duration-500 z-10">
                          <div className="relative aspect-[4/3] overflow-hidden bg-[#0d051a]">
                            <img
      src={cover}
      alt={name}
      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-105"
      referrerPolicy="no-referrer"
    />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#160b2b] via-[#160b2b]/30 to-transparent opacity-90" />

                            {
      /* Admin Action Overlay Buttons for Album */
    }
                            {isAdminLoggedIn && <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
                                <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setEditingAlbum(album);
      }}
      title="Edit Album"
      className="p-2 bg-zinc-950/80 hover:bg-amber-400 text-amber-400 hover:text-zinc-950 border border-amber-400/40 rounded-xl shadow-lg transition-colors cursor-pointer"
    >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
      type="button"
      onClick={(e) => handleDeleteAlbum(e, album.id, name)}
      title="Delete Album"
      className="p-2 bg-zinc-950/80 hover:bg-red-500 text-zinc-300 hover:text-white border border-red-500/40 rounded-xl shadow-lg transition-colors cursor-pointer"
    >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>}

                            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-10">
                              <span className="px-3 py-1 bg-amber-400 text-zinc-950 font-extrabold text-[10px] uppercase tracking-widest rounded-full shadow flex items-center gap-1.5">
                                <Layers className="w-3 h-3 text-zinc-950" />
                                {albumPhotos.length} {t("gallery_photo_count", "photos")}
                              </span>
                              <span className="text-xs text-zinc-100 font-mono flex items-center gap-1 bg-[#180a33]/90 px-3 py-1 rounded-full border border-violet-600/60 shadow-lg group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors">
                                <Eye className="w-3.5 h-3.5" />
                                View Stack
                              </span>
                            </div>
                          </div>

                          <div className="p-6">
                            <h3 className="text-xl font-bold text-white tracking-tight mb-2 font-sans group-hover:text-amber-400 transition-colors">
                              {name}
                            </h3>
                            <p className="text-xs text-violet-300 font-light leading-relaxed line-clamp-2">{desc}</p>
                          </div>
                        </div>
                      </motion.div>;
  })}
                </div>

                {filteredAlbums.length > visibleAlbumCount && <div className="mt-12 text-center flex flex-col items-center justify-center gap-3">
                    <p className="text-xs text-violet-300 font-mono">
                      Showing {Math.min(visibleAlbumCount, filteredAlbums.length)} of {filteredAlbums.length} albums
                    </p>
                    <button
    onClick={() => setVisibleAlbumCount((prev) => prev + 6)}
    className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs tracking-widest uppercase rounded-xl transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
  >
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                      <span>Show Next 6 Albums</span>
                    </button>
                  </div>}
              </>}
          </div>}

        {
    /* VIEW MODE: PHOTOS HIGH-CONTRAST GRID (MAX 10 AT ONCE WITH LOAD MORE) */
  }
        {viewMode === "photos" && <div>
            {filteredPhotos.length === 0 ? <div className="text-center py-20 bg-[#160b2b]/60 rounded-2xl border border-violet-800/60 p-8">
                <Camera className="w-12 h-12 text-violet-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-zinc-200">
                  {t("gallery_no_photos", "No photographs found matching your criteria.")}
                </h3>
                <p className="text-xs text-violet-300 mt-2">Try clearing search filters or choosing a different album.</p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
    onClick={() => {
      setSelectedAlbumId("all");
      setSearchQuery("");
    }}
    className="px-4 py-2 bg-[#180a33] text-amber-400 border border-violet-700 rounded-lg text-xs font-semibold uppercase cursor-pointer"
  >
                    Reset Filters
                  </button>
                  {isAdminLoggedIn && <button
    onClick={() => setIsAddPhotoOpen(true)}
    className="px-4 py-2 bg-amber-400 text-zinc-950 font-bold rounded-lg text-xs uppercase cursor-pointer"
  >
                      ➕ Add Photo
                    </button>}
                </div>
              </div> : <>
                <motion.div
    layout
    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
  >
                  <AnimatePresence>
                    {filteredPhotos.slice(0, visiblePhotoCount).map((photo, idx) => {
    const title = getMultilingualText(photo.title);
    return <motion.div
      key={photo.id}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.3) }}
      onClick={() => setActivePhoto(photo)}
      className="group relative bg-[#160b2b] border border-violet-800/70 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:border-amber-400/80 transition-all duration-300 hover:-translate-y-1"
    >
                          {
      /* High resolution photo thumbnail */
    }
                          <div className="aspect-[4/5] overflow-hidden bg-[#0a0416] relative">
                            <img
      src={photo.src}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 brightness-95 group-hover:brightness-105"
      referrerPolicy="no-referrer"
      loading="lazy"
    />

                            {
      /* Admin Edit & Delete Quick Icons Overlay */
    }
                            {isAdminLoggedIn && <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
                                <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setEditingPhoto(photo);
      }}
      title="Edit Photo"
      className="p-1.5 sm:p-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-lg shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer flex items-center gap-1 text-[10px]"
    >
                                  <Edit className="w-3.5 h-3.5" />
                                  <span className="hidden xl:inline font-semibold">Edit</span>
                                </button>
                                <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleDeletePhoto(e, photo.id, title);
      }}
      title="Delete Photo"
      className="p-1.5 sm:p-2 bg-zinc-950/85 hover:bg-red-500 text-zinc-300 hover:text-white border border-red-500/40 rounded-lg shadow transition-colors cursor-pointer"
    >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>}

                            {
      /* Subtle dark vignette on hover */
    }
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0416]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                              <span className="text-[11px] font-medium text-amber-300 truncate drop-shadow">
                                {title}
                              </span>
                            </div>
                          </div>

                          {
      /* Card bottom strip */
    }
                          <div className="px-2.5 py-1.5 bg-[#110624] flex items-center justify-between border-t border-violet-900/60 text-[11px] text-violet-300">
                            <span className="font-sans font-medium text-zinc-200 truncate pr-1.5">{title}</span>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              {isAdminLoggedIn && <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setEditingPhoto(photo);
      }}
      title="Edit Photo"
      className="p-1 text-amber-400 hover:text-white hover:bg-amber-400/20 rounded-full transition-colors cursor-pointer"
    >
                                  <Edit className="w-3 h-3" />
                                </button>}
                              <span className="p-1 bg-[#1c0e3a] group-hover:bg-amber-400 group-hover:text-zinc-950 text-amber-400 rounded-full transition-colors">
                                <Eye className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </motion.div>;
  })}
                  </AnimatePresence>
                </motion.div>

                {
    /* MAX 10 AT ONCE: Load More Button */
  }
                {filteredPhotos.length > visiblePhotoCount && <div className="mt-12 text-center flex flex-col items-center justify-center gap-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#160b2b] border border-violet-800/80 text-violet-300 text-xs font-mono">
                      <span>Showing {Math.min(visiblePhotoCount, filteredPhotos.length)} of {filteredPhotos.length} photographs</span>
                    </div>
                    <button
    onClick={() => setVisiblePhotoCount((prev) => prev + 10)}
    className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs tracking-widest uppercase rounded-xl transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
  >
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                      <span>{t("gallery_load_more", "Load More Photos")} ({filteredPhotos.length - visiblePhotoCount} remaining)</span>
                    </button>
                  </div>}
              </>}
          </div>}
      </div>

      {
    /* Lightbox Modal */
  }
      {activePhoto && <LightboxModal
    photo={activePhoto}
    photosList={filteredPhotos}
    onClose={() => setActivePhoto(null)}
    onSelectPhoto={(p) => setActivePhoto(p)}
    onEditPhoto={(p) => setEditingPhoto(p)}
  />}

      {
    /* Add Album Modal (Admin Only) */
  }
      <AddAlbumModal isOpen={isAddAlbumOpen} onClose={() => setIsAddAlbumOpen(false)} />

      {
    /* Add Photo Modal (Admin Only) */
  }
      <AddPhotoModal
    isOpen={isAddPhotoOpen}
    onClose={() => setIsAddPhotoOpen(false)}
    onPhotoAdded={(photoId) => {
      setSelectedAlbumId("all");
      setViewMode("photos");
    }}
  />

      {
    /* Edit Photo Modal (Admin Only) */
  }
      <EditPhotoModal
    photo={editingPhoto}
    isOpen={!!editingPhoto}
    onClose={() => setEditingPhoto(null)}
  />

      {
    /* Edit Album Modal (Admin Only) */
  }
      <EditAlbumModal
    album={editingAlbum}
    isOpen={!!editingAlbum}
    onClose={() => setEditingAlbum(null)}
  />
    </section>;
};
