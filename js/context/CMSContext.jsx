import { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_SITE_SETTINGS,
  INITIAL_ALBUMS,
  INITIAL_PHOTOS,
  INITIAL_FEEDBACKS
} from "../data/initialData";
import { sendContactInquiryApi, sendFeedbackApi } from "../api";
const CMSContext = createContext(void 0);
export const CMSProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("jb_admin_logged_in") === "true";
    }
    return false;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const [siteSettings, setSiteSettings] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_site_settings");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          let bg = parsed.activeBackground;
          if (!bg || bg === "/images/fashion_photo_bg.jpg") {
            bg = INITIAL_SITE_SETTINGS.activeBackground;
          } else if (bg === "/images/camera_fixed_bg.jpg") {
            bg = "/images/camera_fixed_bg_1786097380616.jpg";
          } else if (bg === "/images/camera_macro_bg.jpg") {
            bg = "/images/camera_macro_bg_1786090472295.jpg";
          } else if (bg === "/images/dark_studio_bg.jpg") {
            bg = "/images/dark_studio_bg_1787814211505.jpg";
          }
          parsed.activeBackground = bg;
          return { ...INITIAL_SITE_SETTINGS, ...parsed };
        } catch (e) {
          console.error("Failed to parse saved site settings", e);
        }
      }
    }
    return INITIAL_SITE_SETTINGS;
  });
  useEffect(() => {
    localStorage.setItem("jb_site_settings", JSON.stringify(siteSettings));
  }, [siteSettings]);
  const updateSiteSettings = (newSettings) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
  };
  const loginAdmin = (emailOrUsername, password) => {
    const cleanEmail = emailOrUsername.trim().toLowerCase();
    const cleanPass = password.trim();
    const configuredEmail = (siteSettings.adminEmail || "baraszende89@gmail.com").toLowerCase();
    const allowedEmails = [
      configuredEmail,
      "baraszende89@gmail.com",
      "baraszende@gmail.com",
      "bellaakarki@gmail.com",
      "contact@szendephotography.com",
      "szende.photography@gmail.com",
      "jbszende@gmail.com",
      "admin"
    ];
    const configuredPass = siteSettings.adminPassword || "Ajtofelfa1234";
    const allowedPasswords = [
      configuredPass,
      "Ajtofelfa1234",
      "ajtofelfa1234",
      "szende2026",
      "admin",
      "photography",
      "bella2026"
    ];
    const isEmailValid = allowedEmails.includes(cleanEmail);
    const isPasswordValid = allowedPasswords.includes(cleanPass);
    if (isEmailValid && isPasswordValid) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem("jb_admin_logged_in", "true");
      sessionStorage.setItem("jb_admin_user", cleanEmail);
      return true;
    }
    return false;
  };
  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem("jb_admin_logged_in");
    sessionStorage.removeItem("jb_admin_user");
  };
  const [albums, setAlbums] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_albums");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse saved albums", e);
        }
      }
    }
    return INITIAL_ALBUMS;
  });
  useEffect(() => {
    localStorage.setItem("jb_albums", JSON.stringify(albums));
  }, [albums]);
  const addAlbum = (newAlbum) => {
    const id = newAlbum.id || `album-${Date.now()}`;
    const slug = newAlbum.slug || id;
    const createdAt = newAlbum.createdAt || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const album = {
      ...newAlbum,
      id,
      slug,
      createdAt
    };
    setAlbums((prev) => [album, ...prev]);
  };
  const updateAlbum = (id, updatedFields) => {
    setAlbums(
      (prev) => prev.map((a) => a.id === id ? { ...a, ...updatedFields } : a)
    );
  };
  const deleteAlbum = (id) => {
    setAlbums((prev) => prev.filter((a) => a.id !== id));
  };
  const [photos, setPhotos] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_photos");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse saved photos", e);
        }
      }
    }
    return INITIAL_PHOTOS;
  });
  useEffect(() => {
    localStorage.setItem("jb_photos", JSON.stringify(photos));
  }, [photos]);
  const addPhoto = (newPhoto) => {
    const photo = {
      ...newPhoto,
      id: newPhoto.id || `photo-${Date.now()}`,
      date: newPhoto.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    setPhotos((prev) => [photo, ...prev]);
  };
  const updatePhoto = (id, updatedFields) => {
    setPhotos(
      (prev) => prev.map((p) => p.id === id ? { ...p, ...updatedFields } : p)
    );
  };
  const deletePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };
  const [feedbacks, setFeedbacks] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_feedbacks");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse saved feedbacks", e);
        }
      }
    }
    return INITIAL_FEEDBACKS;
  });
  useEffect(() => {
    localStorage.setItem("jb_feedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);
  const addFeedback = (newFeedback) => {
    const feedback = {
      ...newFeedback,
      id: newFeedback.id || `fb-${Date.now()}`,
      date: newFeedback.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      approved: true
    };
    setFeedbacks((prev) => [feedback, ...prev]);
    sendFeedbackApi({
      clientName: feedback.clientName,
      comment: feedback.comment,
      rating: feedback.rating,
      sessionType: feedback.sessionType
    }).catch((err) => console.error("API sync error for feedback", err));
  };
  const updateFeedback = (id, updatedFields) => {
    setFeedbacks(
      (prev) => prev.map((fb) => fb.id === id ? { ...fb, ...updatedFields } : fb)
    );
  };
  const deleteFeedback = (id) => {
    setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
  };
  const [inquiries, setInquiries] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_inquiries");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse saved inquiries", e);
        }
      }
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem("jb_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);
  const submitInquiry = (newInquiry) => {
    const inquiry = {
      ...newInquiry,
      id: `inq-${Date.now()}`,
      submittedAt: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 19)
    };
    setInquiries((prev) => [inquiry, ...prev]);
    sendContactInquiryApi({
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      sessionType: inquiry.eventType,
      preferredDate: inquiry.date,
      message: inquiry.message
    }).catch((err) => console.error("API sync error for contact inquiry", err));
  };
  const resetCMSData = () => {
    setSiteSettings(INITIAL_SITE_SETTINGS);
    setAlbums(INITIAL_ALBUMS);
    setPhotos(INITIAL_PHOTOS);
    setFeedbacks(INITIAL_FEEDBACKS);
    setInquiries([]);
    localStorage.removeItem("jb_site_settings");
    localStorage.removeItem("jb_albums");
    localStorage.removeItem("jb_photos");
    localStorage.removeItem("jb_feedbacks");
    localStorage.removeItem("jb_inquiries");
  };
  return <CMSContext.Provider
    value={{
      siteSettings,
      updateSiteSettings,
      albums,
      addAlbum,
      updateAlbum,
      deleteAlbum,
      photos,
      addPhoto,
      updatePhoto,
      deletePhoto,
      feedbacks,
      addFeedback,
      updateFeedback,
      deleteFeedback,
      inquiries,
      submitInquiry,
      resetCMSData,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal
    }}
  >
      {children}
    </CMSContext.Provider>;
};
export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
};
