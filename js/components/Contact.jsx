import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";
import { Mail, Phone, MapPin, Send, CheckCircle2, Calendar, User, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "motion/react";
export const Contact = () => {
  const { language, t } = useLanguage();
  const { siteSettings, submitInquiry } = useCMS();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("type_portrait");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    submitInquiry({
      name,
      email,
      phone,
      eventType: t(eventType, eventType),
      date,
      message,
      language
    });
    setSubmitted(true);
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setMessage("");
    setTimeout(() => {
      setSubmitted(false);
    }, 6e3);
  };
  return <section id="contact" className="py-24 bg-transparent text-white relative overflow-hidden border-t border-violet-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8 }}
    className="text-center max-w-3xl mx-auto mb-16"
  >
          <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3"
  >
            <Mail className="w-3.5 h-3.5" />
            <span>{t("nav_contact", "Book a Session")}</span>
          </motion.div>

          <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans"
  >
            {t("contact_title", "Get In Touch & Bookings")}
          </motion.h2>

          <motion.p
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="text-sm sm:text-base text-violet-300 font-light mt-3"
  >
            {t("contact_subtitle", "Interested in portraits, family sessions, or event photography? Send a direct inquiry below.")}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {
    /* Direct Studio Information Sidebar */
  }
          <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.2 }}
    className="lg:col-span-5 bg-[#14082b]/90 border border-violet-800/80 rounded-2xl p-8 space-y-8 shadow-2xl"
  >
            <div>
              <h3 className="text-xl font-bold text-white mb-2 font-sans">{siteSettings.photographerName} Photography</h3>
              <p className="text-xs text-violet-300 leading-relaxed font-light">
                Available for local sessions in Odorheiu Secuiesc, Harghita, Romania and travel commissions.
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#0a0416] border border-violet-800/80 rounded-xl text-amber-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-violet-400 block">{t("contact_direct_email", "Direct Email")}</span>
                  <a href={`mailto:${siteSettings.contactEmail}`} className="text-zinc-200 font-medium hover:text-amber-400 transition-colors">
                    {siteSettings.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#0a0416] border border-violet-800/80 rounded-xl text-amber-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-violet-400 block">{t("contact_phone_whatsapp", "Phone & WhatsApp")}</span>
                  <a href={`tel:${siteSettings.contactPhone}`} className="text-zinc-200 font-medium hover:text-amber-400 transition-colors">
                    {siteSettings.contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#0a0416] border border-violet-800/80 rounded-xl text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-violet-400 block">{t("contact_location_label", "Location")}</span>
                  <span className="text-zinc-200 font-medium">{siteSettings.location}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#0a0416] border border-violet-800/80 rounded-xl text-xs text-violet-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{t("contact_guarantee_title", "Response Guarantee")}</span>
              </div>
              <p className="leading-relaxed">
                {t("contact_guarantee_desc", "All booking messages receive a response within 24 hours with package details and availability calendar.")}
              </p>
            </div>
          </motion.div>

          {
    /* High-Contrast Interactive Form */
  }
          <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.3 }}
    className="lg:col-span-7 bg-[#14082b] border border-violet-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl"
  >
            {submitted ? <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="py-12 text-center space-y-4"
  >
                <div className="w-16 h-16 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-400/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
                <p className="text-sm text-violet-200 max-w-md mx-auto leading-relaxed">
                  {t("contact_success", "Thank you! Your message has been sent to JB Szende Photography.")}
                </p>
              </motion.div> : <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {t("contact_name", "Your Full Name")} *
                    </label>
                    <input
    type="text"
    required
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="e.g. Elena Popescu"
    className="w-full px-4 py-3 bg-[#0a0416] border border-violet-800/80 rounded-xl text-sm text-white placeholder-violet-400/60 focus:outline-none focus:border-amber-400"
  />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      {t("contact_email", "Email Address")} *
                    </label>
                    <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="e.g. elena@example.com"
    className="w-full px-4 py-3 bg-[#0a0416] border border-violet-800/80 rounded-xl text-sm text-white placeholder-violet-400/60 focus:outline-none focus:border-amber-400"
  />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-violet-300 mb-2 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-violet-300" />
                      {t("contact_phone", "Phone Number")}
                    </label>
                    <input
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="+40 700 000 000"
    className="w-full px-4 py-3 bg-[#0a0416] border border-violet-800/80 rounded-xl text-sm text-white placeholder-violet-400/60 focus:outline-none focus:border-amber-400"
  />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {t("contact_event_type", "Session Type")}
                    </label>
                    <select
    value={eventType}
    onChange={(e) => setEventType(e.target.value)}
    className="w-full px-4 py-3 bg-[#0a0416] border border-violet-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
  >
                      <option value="type_portrait">{t("type_portrait", "Portrait & Headshots")}</option>
                      <option value="type_family">{t("type_family", "Family & Newborn")}</option>
                      <option value="type_action">{t("type_action", "Action & Fitness")}</option>
                      <option value="type_event">{t("type_event", "Events & Celebrations")}</option>
                      <option value="type_nature">{t("type_nature", "Nature & Landscape")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-violet-300 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {t("contact_date", "Preferred Date")}
                  </label>
                  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="w-full px-4 py-3 bg-[#0a0416] border border-violet-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {t("contact_message", "Tell me about your session ideas...")} *
                  </label>
                  <textarea
    required
    rows={4}
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Describe your session goals, locations, or vision..."
    className="w-full px-4 py-3 bg-[#0a0416] border border-violet-800/80 rounded-xl text-sm text-white placeholder-violet-400/60 focus:outline-none focus:border-amber-400"
  />
                </div>

                <button
    type="submit"
    className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95"
  >
                  <Send className="w-4 h-4" />
                  <span>{t("contact_send", "Send Inquiry")}</span>
                </button>
              </form>}
          </motion.div>
        </div>
      </div>
    </section>;
};
