export async function fetchHealthStatus() {
  try {
    const res = await fetch("/api/health");
    return await res.json();
  } catch (err) {
    console.error("Health check error:", err);
    return null;
  }
}
export async function fetchSiteSettingsApi() {
  try {
    const res = await fetch("/api/settings");
    return await res.json();
  } catch (err) {
    console.error("Error fetching site settings from API:", err);
    return null;
  }
}
export async function sendContactInquiryApi(formData) {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    return await res.json();
  } catch (err) {
    console.error("Error submitting contact form to API:", err);
    return { success: false, error: "Network error submitting inquiry." };
  }
}
export async function sendFeedbackApi(reviewData) {
  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData)
    });
    return await res.json();
  } catch (err) {
    console.error("Error submitting review to API:", err);
    return { success: false, error: "Network error submitting review." };
  }
}
