document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const feedback = document.getElementById("feedback");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.querySelector('input[name="name"]').value,
      email: document.querySelector('input[name="email"]').value,
      message: document.querySelector('textarea[name="message"]').value,
    };

    if (feedback) feedback.textContent = "Sending...";

    try {
      const res = await fetch("/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (feedback) feedback.textContent = data.message;

      if (res.ok) form.reset();
    } catch (err) {
      if (feedback) feedback.textContent = "Error submitting form.";
    }
  });
});
