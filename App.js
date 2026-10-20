// MBEMBE PAY - Application Logic

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const logoutButton = document.getElementById("logout-button");
  const message = document.getElementById("auth-message");

  function showMessage(text) {
    if (message) message.textContent = text;
  }

  // Check that the Supabase library and configuration exist.
  if (
    typeof window.supabase === "undefined" ||
    typeof SUPABASE_URL === "undefined" ||
    typeof SUPABASE_ANON_KEY === "undefined" ||
    SUPABASE_URL.startsWith("YOUR_") ||
    SUPABASE_ANON_KEY.startsWith("YOUR_")
  ) {
    showMessage(
      "Setup required: connect your Supabase project before using authentication."
    );
    return;
  }

  const client = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = signupForm.querySelector('[name="email"]')?.value.trim();
      const password = signupForm.querySelector('[name="password"]')?.value;

      if (!email || !password) {
        showMessage("Please enter your email and password.");
        return;
      }

      if (password.length < 8) {
        showMessage("Your password must contain at least 8 characters.");
        return;
      }

      showMessage("Creating your account...");

      const { error } = await client.auth.signUp({
        email,
        password
      });

      if (error) {
        showMessage(error.message);
        return;
      }

      showMessage(
        "Registration submitted. Check your email if confirmation is required."
      );
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = loginForm.querySelector('[name="email"]')?.value.trim();
      const password = loginForm.querySelector('[name="password"]')?.value;

      if (!email || !password) {
        showMessage("Please enter your email and password.");
        return;
      }

      showMessage("Signing in...");

      const { error } = await client.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        showMessage("Login failed: " + error.message);
        return;
      }

      showMessage("Login successful!");

      // Refresh the page so the dashboard can display the session.
      window.location.reload();
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      const { error } = await client.auth.signOut();

      if (error) {
        showMessage("Logout failed: " + error.message);
        return;
      }

      window.location.reload();
    });
  }

  client.auth.onAuthStateChange((_event, session) => {
    document.body.dataset.authenticated = session ? "true" : "false";
  });
});
