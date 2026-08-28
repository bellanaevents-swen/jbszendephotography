import { useState, useEffect, useRef } from "react";
import { Logo } from "./Logo";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";
import { Globe, Menu, X, PhoneCall, LayoutDashboard, Lock, LogOut, ChevronDown, Check } from "lucide-react";
export const Header = ({ activeSection, setActiveSection, onOpenCMS, onOpenEditBackground }) => {
  const { language, setLanguage, direction, setDirection, t } = useLanguage();
  const { isAdminLoggedIn, logoutAdmin, openAuthModal } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const navItems = [
    { id: "hero", label: t("nav_home", "Home") },
    { id: "gallery", label: t("nav_gallery", "Gallery & Albums") },
    { id: "about", label: t("nav_about", "About JB Szende") },
    { id: "feedback", label: t("nav_feedback", "Client Reviews") }
  ];
  const languagesList = [
    { code: "en", name: "English", flag: "\u{1F1EC}\u{1F1E7}", label: "EN" },
    { code: "ro", name: "Rom\xE2n\u0103", flag: "\u{1F1F7}\u{1F1F4}", label: "RO" },
    { code: "hu", name: "Magyar", flag: "\u{1F1ED}\u{1F1FA}", label: "HU" }
  ];
  const currentLangObj = languagesList.find((l) => l.code === language) || languagesList[0];
  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return <header
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#090316]/95 backdrop-blur-md border-b border-violet-900/60 shadow-2xl" : "bg-gradient-to-b from-[#0e071e]/95 via-[#0e071e]/90 to-[#0e071e]/75 border-b border-violet-900/40"}`}
  >
      {
    /* Line 1: Top Brand & Utility Header */
  }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        {
    /* Brand Logo Zone */
  }
        <div className="flex items-center gap-4">
          <button
    onClick={() => handleNavClick("hero")}
    className="text-left focus:outline-none group flex items-center cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
    title="JB Szende Photography"
  >
            <Logo variant="dark" size="md" />
          </button>
        </div>

        {
    /* Right Utility Actions */
  }
        <div className="hidden md:flex items-center gap-2.5">
          {
    /* Public Language Selector Dropdown - available for every visitor */
  }
          <div className="relative" ref={langDropdownRef}>
            <button
    type="button"
    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
    className="flex items-center gap-2 px-3 py-1.5 bg-[#15092e] hover:bg-[#200e42] border border-violet-800/80 hover:border-amber-400/60 rounded-full text-xs font-semibold text-violet-200 transition-all shadow-sm cursor-pointer"
    title="Select Website Language"
  >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="flex items-center gap-1.5 font-bold text-amber-300">
                <span>{currentLangObj.flag}</span>
                <span>{currentLangObj.name}</span>
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-violet-400 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {
    /* Dropdown Menu Popup */
  }
            {langDropdownOpen && <div className="absolute right-0 mt-2 w-48 bg-[#120728] border border-violet-800/90 rounded-2xl p-1.5 shadow-2xl z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-violet-400 border-b border-violet-900/60 mb-1 flex items-center justify-between">
                  <span>Language / Nyelv</span>
                  <span className="text-[9px] text-amber-400/80 font-mono">3 Options</span>
                </div>
                <div className="space-y-1">
                  {languagesList.map((lang) => {
    const isSelected = language === lang.code;
    return <button
      key={lang.code}
      type="button"
      onClick={() => {
        setLanguage(lang.code);
        setLangDropdownOpen(false);
      }}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${isSelected ? "bg-amber-400/15 text-amber-300 border border-amber-400/40 font-bold" : "text-violet-200 hover:text-white hover:bg-violet-900/50 border border-transparent"}`}
    >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </button>;
  })}
                </div>
              </div>}
          </div>

          {
    /* Admin Logged In: CMS Dashboard & Sign Out */
  }
          {isAdminLoggedIn ? <>
              {
    /* CMS Dashboard Button */
  }
              <button
    onClick={onOpenCMS}
    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#170a33] hover:bg-[#220f47] text-violet-200 hover:text-white border border-violet-700/80 rounded-full text-xs font-semibold tracking-wider transition-all shadow-md group cursor-pointer"
  >
                <LayoutDashboard className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>{t("nav_cms", "CMS")}</span>
              </button>

              {
    /* Logout Button */
  }
              <button
    onClick={logoutAdmin}
    title="Sign Out Admin"
    className="p-1.5 bg-[#170a33] hover:bg-red-500/20 text-violet-300 hover:text-red-400 border border-violet-800/80 hover:border-red-500/40 rounded-full transition-all cursor-pointer"
  >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </> : (
    /* Visitor View: Photographer Admin Sign In Button */
    <button
      onClick={openAuthModal}
      title="Photographer Admin Sign In"
      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#170a33] hover:bg-[#230f4a] text-violet-200 hover:text-amber-300 border border-violet-700/80 hover:border-amber-400/60 rounded-full text-xs font-semibold tracking-wider transition-all shadow-md group cursor-pointer"
    >
              <Lock className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Admin Sign In</span>
            </button>
  )}

          {
    /* Book Session CTA */
  }
          <button
    onClick={() => handleNavClick("contact")}
    className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider rounded-full transition-all shadow-lg shadow-amber-400/20 active:scale-95 cursor-pointer"
  >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t("nav_contact", "Book a Session")}</span>
          </button>
        </div>

        {
    /* Mobile Controls */
  }
        <div className="flex items-center gap-2 md:hidden">
          {
    /* Public Language Selector Toggle on Mobile */
  }
          <button
    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#180a33] border border-violet-700/80 rounded-xl text-amber-400 text-xs font-bold"
    title="Language Options"
  >
            <span>{currentLangObj.flag}</span>
            <span className="text-[11px] uppercase tracking-wider">{currentLangObj.label}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {!isAdminLoggedIn && <button
    onClick={openAuthModal}
    className="p-2 bg-[#180a33] border border-violet-700/80 rounded-xl text-amber-400"
    title="Admin Sign In"
  >
              <Lock className="w-4 h-4" />
            </button>}

          <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="p-2 bg-[#180a33] border border-violet-700/80 rounded-xl text-zinc-200 focus:outline-none"
    aria-label="Toggle Menu"
  >
            {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {
    /* Line 2: Dedicated Sub-Nav Line for Section Links */
  }
      <div className="hidden md:block bg-[#0e051e]/90 border-t border-violet-900/40 py-1.5 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <nav className="flex items-center gap-2 lg:gap-3 w-full justify-start overflow-x-auto no-scrollbar">
            {navItems.map((item) => <button
    key={item.id}
    onClick={() => handleNavClick(item.id)}
    className={`px-4 py-1.5 text-xs font-bold tracking-wider uppercase transition-all rounded-lg whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${activeSection === item.id ? "text-amber-400 bg-amber-400/10 border border-amber-400/40 shadow-sm" : "text-violet-200/90 hover:text-white hover:bg-violet-900/40"}`}
  >
                <span>{item.label}</span>
              </button>)}
          </nav>
        </div>
      </div>

      {
    /* Language Popup Mobile - available for all visitors */
  }
      {langDropdownOpen && <div className="md:hidden px-4 pt-3 pb-3 bg-[#0d051c] border-b border-violet-800 text-zinc-200">
          <div className="flex items-center justify-between mb-2 text-xs font-semibold uppercase tracking-wider text-violet-300">
            <span>Select Language / Válassz nyelvet</span>
            <button
    onClick={() => setDirection(direction === "ltr" ? "rtl" : "ltr")}
    className="text-[10px] px-2 py-0.5 bg-violet-900/80 rounded text-amber-400"
  >
              Dir: {direction.toUpperCase()}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {languagesList.map((lang) => <button
    key={lang.code}
    onClick={() => {
      setLanguage(lang.code);
      setLangDropdownOpen(false);
    }}
    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${language === lang.code ? "bg-amber-400 text-zinc-950 border-amber-400 font-extrabold shadow-md" : "bg-[#180a33] text-violet-200 border-violet-800"}`}
  >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>)}
          </div>
        </div>}

      {
    /* Mobile Drawer Navigation */
  }
      {mobileMenuOpen && <div className="md:hidden bg-[#0d051c] border-b border-violet-800 px-4 py-6 space-y-3">
          {navItems.map((item) => <button
    key={item.id}
    onClick={() => handleNavClick(item.id)}
    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors ${activeSection === item.id ? "bg-amber-400 text-zinc-950 font-extrabold" : "bg-[#160a30] text-violet-100 hover:bg-violet-900/60"}`}
  >
              {item.label}
            </button>)}

          <div className="pt-4 border-t border-violet-900/60 flex flex-col gap-2">
            {isAdminLoggedIn ? <>
                <button
    onClick={() => {
      setMobileMenuOpen(false);
      onOpenCMS();
    }}
    className="w-full flex items-center justify-center gap-2 py-3 bg-[#180a33] border border-violet-700/80 text-violet-200 rounded-xl text-xs font-bold uppercase tracking-wider"
  >
                  <LayoutDashboard className="w-4 h-4 text-amber-400" />
                  <span>{t("nav_cms", "CMS & Translations")}</span>
                </button>

                <button
    onClick={() => {
      setMobileMenuOpen(false);
      logoutAdmin();
    }}
    className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-950/40 border border-red-900/60 text-red-300 rounded-xl text-xs font-bold uppercase tracking-wider"
  >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </> : <button
    onClick={() => {
      setMobileMenuOpen(false);
      openAuthModal();
    }}
    className="w-full flex items-center justify-center gap-2 py-3 bg-[#180a33] border border-violet-700/80 text-amber-400 rounded-xl text-xs font-bold uppercase tracking-wider"
  >
                <Lock className="w-4 h-4" />
                <span>Photographer Admin Sign In</span>
              </button>}

            <button
    onClick={() => handleNavClick("contact")}
    className="w-full flex items-center justify-center gap-2 py-3 bg-amber-400 text-zinc-950 font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-400/20"
  >
              <PhoneCall className="w-4 h-4" />
              <span>{t("nav_contact", "Book a Session")}</span>
            </button>
          </div>
        </div>}
    </header>;
};
