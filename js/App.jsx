import { useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { CMSProvider, useCMS } from "./context/CMSContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Gallery } from "./components/Gallery";
import { About } from "./components/About";
import { Feedback } from "./components/Feedback";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CMSDashboard } from "./components/CMSDashboard";
import { AdminLoginModal } from "./components/AdminLoginModal";
import { EditBackgroundModal } from "./components/EditBackgroundModal";
import { fashionPhotoBgImage } from "./data/initialData";
function MainApp() {
  const { siteSettings, isAdminLoggedIn, isAuthModalOpen, openAuthModal, closeAuthModal } = useCMS();
  const [activeSection, setActiveSection] = useState("hero");
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [isEditBgOpen, setIsEditBgOpen] = useState(false);
  const handleOpenCMS = () => {
    if (isAdminLoggedIn) {
      setIsCMSOpen(true);
    } else {
      openAuthModal();
    }
  };
  const handleOpenEditBackground = () => {
    if (isAdminLoggedIn) {
      setIsEditBgOpen(true);
    } else {
      openAuthModal();
    }
  };
  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  let currentBg = siteSettings.activeBackground || fashionPhotoBgImage;
if (!currentBg || currentBg === "/images/fashion_photo_bg.jpg" || 
  currentBg === "/images/fashion_photo_bg_1787752513248.jpg" 
  || currentBg.includes("photos.fife.usercontent.google.com")) {
    currentBg = fashionPhotoBgImage;
  } else if (currentBg === "/images/camera_fixed_bg.jpg") {
    currentBg = "/images/camera_fixed_bg_1786097380616.jpg";
  } else if (currentBg === "/images/camera_macro_bg.jpg") {
    currentBg = "/images/camera_macro_bg_1786090472295.jpg";
  } else if (currentBg === "/images/dark_studio_bg.jpg") {
    currentBg = "/images/dark_studio_bg_1787814211505.jpg";
  }
  return <div className="min-h-screen bg-[#0e071e] text-zinc-100 font-sans selection:bg-amber-400 selection:text-zinc-950 relative">
      {
    /* Global Non-Scrolling Fixed Background Photo */
  }
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {
    /* Ultra-clear fixed editorial background image */
  }
<img 
    src={currentBg} 
    alt="Editorial Fashion Photography Background"
    className="w-full h-full object-cover object-center transition-all duration-700 filter brightness-110 contrast-105"
    referrerPolicy="no-referrer"
  />

        {
    /* Minimal atmospheric gradient overlay to ensure photo remains maximum visible while keeping text readable */
  }
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0314]/15 via-transparent to-[#0a0314]/25 pointer-events-none" />
      </div>

      {
    /* Navigation Header */
  }
      <div className="relative z-20">
        <Header
    activeSection={activeSection}
    setActiveSection={setActiveSection}
    onOpenCMS={handleOpenCMS}
    onOpenEditBackground={handleOpenEditBackground}
  />
      </div>

      {
    /* Main Content Sections */
  }
      <main className="relative z-10">
        <Hero
    onExploreGallery={() => scrollToSection("gallery")}
    onBookSession={() => scrollToSection("contact")}
    onOpenEditBg={handleOpenEditBackground}
  />
        <Gallery />
        <About />
        <Feedback />
        <Contact />
      </main>

      {
    /* Floating Quick Action for Logged-In Admin */
  }
      {isAdminLoggedIn && <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#180a33]/95 border-2 border-amber-400/80 p-1.5 rounded-full shadow-2xl backdrop-blur-md">
          <button
    onClick={handleOpenEditBackground}
    className="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider rounded-full transition-all shadow-lg active:scale-95 cursor-pointer"
    title="Edit Website Background Image"
  >
            <span className="text-sm">🖼️</span>
            <span>Edit Background</span>
          </button>
          <button
    onClick={handleOpenCMS}
    className="flex items-center gap-1.5 px-3 py-2 bg-[#230f4a] hover:bg-[#311568] text-amber-300 font-bold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer"
    title="Open Full CMS Dashboard"
  >
            <span>CMS</span>
          </button>
        </div>}

      {
    /* Footer */
  }
      <Footer />

      {
    /* Admin Login Modal */
  }
      <AdminLoginModal
    isOpen={isAuthModalOpen}
    onClose={closeAuthModal}
    onSuccess={() => {
      setIsCMSOpen(true);
    }}
  />

      {
    /* Dedicated Background Photo Edit Modal */
  }
      <EditBackgroundModal
    isOpen={isEditBgOpen}
    onClose={() => setIsEditBgOpen(false)}
  />

      {
    /* CMS & Translation Dashboard Modal */
  }
      <CMSDashboard
    isOpen={isCMSOpen}
    onClose={() => setIsCMSOpen(false)}
    onOpenEditBackground={handleOpenEditBackground}
  />
    </div>;
}
export default function App() {
  return <CMSProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </CMSProvider>;
}
