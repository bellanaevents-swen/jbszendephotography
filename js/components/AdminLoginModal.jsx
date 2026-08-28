import { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { useLanguage } from "../context/LanguageContext";
import { X, Lock, Key, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export const AdminLoginModal = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { siteSettings, loginAdmin } = useCMS();
  const { t } = useLanguage();
  const defaultAdminEmail = siteSettings.adminEmail || "baraszende89@gmail.com";
  const [email, setEmail] = useState(defaultAdminEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  if (!isOpen) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your photographer admin email.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }
    const success = loginAdmin(email.trim(), password.trim());
    if (success) {
      setError("");
      setPassword("");
      onClose();
      onSuccess();
    } else {
      setError("Invalid admin credentials. Check your email or password.");
    }
  };
  return <AnimatePresence>
      <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-md p-4"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}
  >
        <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 15 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 15 }}
    transition={{ duration: 0.25 }}
    className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-100 overflow-hidden"
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
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-sans">
                {t("cms_admin_auth", "Photographer Admin Sign-In")}
              </h3>
              <p className="text-xs text-zinc-400">
                Sign in with your email to manage portfolio, albums, & settings
              </p>
            </div>
          </div>

          {
    /* Form */
  }
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Photographer Email (Username)</span>
              </label>
              <input
    type="email"
    required
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);
      if (error) setError("");
    }}
    placeholder="baraszende89@gmail.com"
    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
    autoFocus
  />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Password</span>
              </label>
              <div className="relative">
                <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => {
      setPassword(e.target.value);
      if (error) setError("");
    }}
    placeholder="Enter administrator password..."
    className="w-full pl-3.5 pr-10 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
  />
                <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
  >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <div className="flex items-center gap-2 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-300">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{error}</span>
              </div>}

            <button
    type="submit"
    className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-400/20 cursor-pointer"
  >
              Sign In as Photographer
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>;
};
