import { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { useLanguage } from "../context/LanguageContext";
import { EditFeedbackModal } from "./EditFeedbackModal";
import {
  Star,
  MessageSquarePlus,
  CheckCircle2,
  Sparkles,
  Quote,
  Edit3,
  Trash2,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export const Feedback = () => {
  const { feedbacks, addFeedback, deleteFeedback, isAdminLoggedIn } = useCMS();
  const { t } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [rating, setRating] = useState(5);
  const [sessionType, setSessionType] = useState("Portrait Session");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !comment.trim()) return;
    addFeedback({
      clientName: clientName.trim(),
      rating,
      sessionType,
      comment: comment.trim(),
      approved: true
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsFormOpen(false);
      setClientName("");
      setComment("");
      setRating(5);
    }, 2500);
  };
  return <section id="feedback" className="py-24 bg-transparent text-white relative overflow-hidden border-t border-violet-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8 }}
    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
  >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold tracking-widest uppercase"
  >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{t("feedback_badge", "Client Experiences & Reviews")}</span>
              </motion.div>
              {isAdminLoggedIn && <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Admin Moderation Active</span>
                </div>}
            </div>

            <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans"
  >
              {t("feedback_title", "Client Words & Feedback")}
            </motion.h2>

            <motion.p
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="text-sm sm:text-base text-violet-300 font-light mt-2 max-w-xl"
  >
              {t("feedback_subtitle", "Authentic stories and reviews from photo sessions across Harghita, Transylvania, and abroad.")}
            </motion.p>
          </div>

          <motion.button
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.35 }}
    onClick={() => setIsFormOpen(!isFormOpen)}
    className="flex items-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
  >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{isFormOpen ? t("feedback_btn_close", "Close Review Form") : t("feedback_btn_leave", "Leave a Feedback")}</span>
          </motion.button>
        </motion.div>

        {
    /* Submit Review Collapsible Form */
  }
        <AnimatePresence>
          {isFormOpen && <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    className="mb-16 overflow-hidden"
  >
              <div className="bg-[#14082b] border border-amber-400/40 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-3xl mx-auto relative">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>{t("feedback_share_title", "Share Your Experience")}</span>
                </div>

                {submitted ? <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="py-12 text-center space-y-3"
  >
                    <div className="inline-flex p-3 bg-amber-400/20 rounded-full text-amber-400 mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold">{t("feedback_submitted_title", "Thank You for Your Feedback!")}</h3>
                    <p className="text-xs text-violet-300">{t("feedback_submitted_desc", "Your review has been saved and published live on the gallery.")}</p>
                  </motion.div> : <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-violet-300 mb-2">
                          {t("feedback_your_name", "Your Name")}
                        </label>
                        <input
    type="text"
    required
    value={clientName}
    onChange={(e) => setClientName(e.target.value)}
    placeholder="e.g. Maria Popa"
    className="w-full px-4 py-3 bg-[#0a0416] border border-violet-800/80 rounded-xl text-sm text-white placeholder-violet-400/50 focus:outline-none focus:border-amber-400"
  />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-violet-300 mb-2">
                          {t("feedback_session_type", "Session Type")}
                        </label>
                        <select
    value={sessionType}
    onChange={(e) => setSessionType(e.target.value)}
    className="w-full px-4 py-3 bg-[#0a0416] border border-violet-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
  >
                          <option value="Portrait Session">{t("type_portrait", "Portrait Session")}</option>
                          <option value="Family Photography">{t("type_family", "Family Photography")}</option>
                          <option value="Outdoor & Action">{t("type_action", "Outdoor & Action")}</option>
                          <option value="Event Coverage">{t("type_event", "Event Coverage")}</option>
                          <option value="Landscape Fine Art">{t("type_nature", "Landscape Fine Art")}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-violet-300 mb-2">
                        {t("feedback_rating", "Rating")}
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => <button
    key={star}
    type="button"
    onClick={() => setRating(star)}
    className="p-1 hover:scale-125 transition-transform"
  >
                            <Star
    className={`w-7 h-7 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-violet-900 fill-violet-950"}`}
  />
                          </button>)}
                        <span className="text-xs font-bold text-amber-400 font-mono ml-2">
                          {rating} / 5 {t("feedback_stars", "Stars")}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-violet-300 mb-2">
                        {t("feedback_your_review", "Your Feedback / Review")}
                      </label>
                      <textarea
    required
    rows={4}
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Tell us about your experience working with JB Szende..."
    className="w-full px-4 py-3 bg-[#0a0416] border border-violet-800/80 rounded-xl text-sm text-white placeholder-violet-400/50 focus:outline-none focus:border-amber-400"
  />
                    </div>

                    <div className="flex items-center justify-end gap-3">
                      <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsFormOpen(false);
      setClientName("");
      setComment("");
      setRating(5);
    }}
    className="px-5 py-2.5 text-xs font-bold uppercase text-violet-300 hover:text-white bg-violet-950/60 hover:bg-violet-900/80 rounded-xl transition-colors cursor-pointer"
  >
                        {t("feedback_cancel", "Cancel")}
                      </button>
                      <button
    type="submit"
    className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg"
  >
                        {t("feedback_submit", "Submit Feedback")}
                      </button>
                    </div>
                  </form>}
              </div>
            </motion.div>}
        </AnimatePresence>

        {
    /* Feedback Cards Grid */
  }
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedbacks.map((fb, idx) => <motion.div
    key={fb.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: idx * 0.1 }}
    viewport={{ once: true }}
    className="bg-[#14082b] border border-violet-800/60 rounded-2xl p-6 shadow-xl relative flex flex-col justify-between hover:border-amber-400/50 transition-all group"
  >
              {
    /* Top Bar: Admin Controls or Quote Icon */
  }
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => <Star
    key={s}
    className={`w-4 h-4 ${s <= fb.rating ? "fill-amber-400 text-amber-400" : "text-violet-900 fill-violet-950"}`}
  />)}
                </div>

                {isAdminLoggedIn ? <div className="flex items-center gap-1.5 z-10">
                    <button
    type="button"
    onClick={() => setEditingFeedback(fb)}
    className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-lg text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
    title="Edit this client review"
  >
                      <Edit3 className="w-3 h-3 text-zinc-950" />
                      <span>Edit</span>
                    </button>
                    <button
    type="button"
    onClick={() => {
      if (window.confirm(`Delete review from "${fb.clientName}"?`)) {
        deleteFeedback(fb.id);
      }
    }}
    className="p-1 bg-zinc-900/90 hover:bg-red-600 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer border border-zinc-800"
    title="Remove this client review"
  >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div> : <Quote className="w-7 h-7 text-violet-800/40" />}
              </div>

              <div>
                <p className="text-sm text-violet-200 font-light leading-relaxed mb-6 italic">
                  &ldquo;{fb.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-violet-900/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-xs uppercase font-mono">
                    {fb.clientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{fb.clientName}</h4>
                    <span className="text-[10px] text-violet-400 font-mono">{fb.sessionType}</span>
                  </div>
                </div>
                <span className="text-[10px] text-violet-400 font-mono">{fb.date}</span>
              </div>
            </motion.div>)}
        </div>
      </div>

      {
    /* Edit Feedback Modal */
  }
      {editingFeedback && <EditFeedbackModal
    feedback={editingFeedback}
    isOpen={!!editingFeedback}
    onClose={() => setEditingFeedback(null)}
  />}
    </section>;
};
