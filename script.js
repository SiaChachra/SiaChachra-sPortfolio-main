// Contact form handler (works on both index.html and contact.html)
// - waits for DOM to load
// - only runs if #contact-form exists
// - uses same-origin POST /submit-contact (works on Render when the Express server serves the site)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return; // page doesn't have the form

  // Ensure we have somewhere to show feedback
  let feedback = document.getElementById("feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.id = "feedback";
    form.insertAdjacentElement("afterend", feedback);
  }

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: form.querySelector('input[name="name"]')?.value?.trim(),
      email: form.querySelector('input[name="email"]')?.value?.trim(),
      message: form.querySelector('textarea[name="message"]')?.value?.trim(),
    };

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      feedback.textContent = "Please fill out all fields.";
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    feedback.textContent = "Sending...";

    try {
      const res = await fetch("/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let payload = null;
      try {
        payload = await res.json();
      } catch {
        // ignore JSON parse failure; we'll handle below
      }

      if (!res.ok) {
        feedback.textContent = payload?.message || "Error submitting form.";
        return;
      }

      feedback.textContent = payload?.message || "Form submitted successfully!";
      form.reset();
    } catch (err) {
      feedback.textContent = "Network error submitting form.";
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});
