import { useState, useEffect } from "react";
import { useCMS } from "../context/CMSContext";
import { useLanguage } from "../context/LanguageContext";
import { X, Star, Save, Trash2, CheckCircle2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export const EditFeedbackModal = ({
  feedback,
  isOpen,
  onClose
}) => {
  const { updateFeedback, deleteFeedback } = useCMS();
  const { t } = useLanguage();
  const [clientName, setClientName] = useState("");
  const [rating, setRating] = useState(5);
  const [sessionType, setSessionType] = useState("Portrait Session");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  useEffect(() => {
    if (feedback) {
      setClientName(feedback.clientName || "");
      setRating(feedback.rating || 5);
      setSessionType(feedback.sessionType || "Portrait Session");
      setComment(feedback.comment || "");
      setDate(feedback.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
      setShowDeleteConfirm(false);
    }
  }, [feedback, isOpen]);
  if (!isOpen || !feedback) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !comment.trim()) return;
    updateFeedback(feedback.id, {
      clientName: clientName.trim(),
      rating,
      sessionType,
      comment: comment.trim(),
      date: date.trim() || feedback.date
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 700);
  };
  const handleDelete = () => {
    deleteFeedback(feedback.id);
    onClose();
  };
  return <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    className="bg-[#0f0722] border border-violet-800/80 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative my-8"
  >
          {
    /* Close Button */
  }
          <button
    type="button"
    onClick={onClose}
    className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900/80 hover:bg-zinc-800 transition-colors cursor-pointer"
  >
            <X className="w-5 h-5" />
          </button>

          {
    /* Modal Header */
  }
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-violet-900/50">
            <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl text-amber-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Edit Client Review</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  Admin
                </span>
              </h3>
              <p className="text-xs text-violet-300">
                Modify review details, rating score, or remove unwanted feedback.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {
    /* Client Name & Date */
  }
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-violet-300 mb-1.5">
                  Client Name *
                </label>
                <input
    type="text"
    required
    value={clientName}
    onChange={(e) => setClientName(e.target.value)}
    placeholder="e.g. Maria Popa"
    className="w-full px-3.5 py-2.5 bg-[#0a0416] border border-violet-800/80 rounded-xl text-sm text-white placeholder-violet-400/40 focus:outline-none focus:border-amber-400"
  />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-violet-300 mb-1.5">
                  Review Date
                </label>
                <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="w-full px-3.5 py-2.5 bg-[#0a0416] border border-violet-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
  />
              </div>
            </div>

            {
    /* Session Type */
  }
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-violet-300 mb-1.5">
                Session Type
              </label>
              <select
    value={sessionType}
    onChange={(e) => setSessionType(e.target.value)}
    className="w-full px-3.5 py-2.5 bg-[#0a0416] border border-violet-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
  >
                <option value="Portrait Session">Portrait Session</option>
                <option value="Family Photography">Family Photography</option>
                <option value="Outdoor & Action">Outdoor & Action</option>
                <option value="Event Coverage">Event Coverage</option>
                <option value="Landscape Fine Art">Landscape Fine Art</option>
                <option value="Commercial Photography">Commercial Photography</option>
              </select>
            </div>

            {
    /* Rating Stars */
  }
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-violet-300 mb-1.5">
                Star Rating
              </label>
              <div className="flex items-center gap-2 p-2 bg-[#0a0416] border border-violet-800/80 rounded-xl">
                {[1, 2, 3, 4, 5].map((star) => <button
    key={star}
    type="button"
    onClick={() => setRating(star)}
    className="p-1 hover:scale-125 transition-transform cursor-pointer"
  >
                    <Star
    className={`w-6 h-6 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-zinc-700 fill-zinc-800"}`}
  />
                  </button>)}
                <span className="text-xs font-bold text-amber-400 font-mono ml-3">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            {
    /* Comment Text */
  }
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-violet-300 mb-1.5">
                Client Review / Feedback *
              </label>
              <textarea
    required
    rows={4}
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Client comments and review..."
    className="w-full px-3.5 py-2.5 bg-[#0a0416] border border-violet-800/80 rounded-xl text-sm text-white placeholder-violet-400/40 focus:outline-none focus:border-amber-400"
  />
            </div>

            {
    /* Delete Confirmation Box */
  }
            {showDeleteConfirm && <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-3 bg-red-950/70 border border-red-800/90 rounded-xl text-xs text-red-200 flex items-center justify-between gap-3"
  >
                <span>Are you sure you want to delete this review permanently?</span>
                <div className="flex items-center gap-2">
                  <button
    type="button"
    onClick={() => setShowDeleteConfirm(false)}
    className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg font-semibold cursor-pointer"
  >
                    Cancel
                  </button>
                  <button
    type="button"
    onClick={handleDelete}
    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold cursor-pointer"
  >
                    Yes, Delete
                  </button>
                </div>
              </motion.div>}

            {
    /* Actions */
  }
            <div className="pt-4 flex items-center justify-between gap-3 border-t border-violet-900/50">
              {!showDeleteConfirm ? <button
    type="button"
    onClick={() => setShowDeleteConfirm(true)}
    className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
  >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove Review</span>
                </button> : <div />}

              <div className="flex items-center gap-2">
                <button
    type="button"
    onClick={onClose}
    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer"
  >
                  Cancel
                </button>
                <button
    type="submit"
    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-400/20 flex items-center gap-2 cursor-pointer"
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
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>;
};
