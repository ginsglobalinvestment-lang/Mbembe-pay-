// MBEMBE PAY - Application Logic

document.addEventListener("DOMContentLoaded", () => {
const authPanel = document.getElementById("authPanel");
const dashboard = document.getElementById("dashboard");
const authForm = document.getElementById("authForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authSubmit = document.getElementById("authSubmit");
const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");
const authMessage = document.getElementById("authMessage");
const signOutBtn = document.getElementById("signOutBtn");
const userEmail = document.getElementById("userEmail");
const dashboardMessage = document.getElementById("dashboardMessage");
const tabs = document.querySelectorAll(".tab");
const demoButtons = document.querySelectorAll(".demoAction");

let mode = "signin";
let client;

document.getElementById("year").textContent =
new Date().getFullYear();

function showAuthMessage(text) {
if (authMessage) authMessage.textContent = text;
}

function showDashboardMessage(text) {
if (dashboardMessage) dashboardMessage.textContent = text;
}

function setMode(newMode) {
mode = newMode;

tabs.forEach((tab) => {
  tab.classList.toggle("active", tab.dataset.mode === mode);
});

authTitle.textContent =
  mode === "signin" ? "Welcome back" : "Create your account";

authSubtitle.textContent =
  mode === "signin"
    ? "Sign in to your MBEMBE PAY account."
    : "Register for your MBEMBE PAY account.";

authSubmit.textContent =
  mode === "signin" ? "Sign in" : "Create account";

passwordInput.autocomplete =
  mode === "signin" ? "current-password" : "new-password";

showAuthMessage("");

}

tabs.forEach((tab) => {
tab.addEventListener("click", () => setMode(tab.dataset.mode));
});

if (
!window.supabase ||
typeof SUPABASE_URL === "undefined" ||
typeof SUPABASE_ANON_KEY === "undefined" ||
!SUPABASE_URL ||
!SUPABASE_ANON_KEY
) {
showAuthMessage(
"Setup error: check config.js and your Supabase configuration."
);
return;
}

client = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);

async function updatePage() {
const { data, error } = await client.auth.getSession();

if (error) {
  showAuthMessage("Could not check your session: " + error.message);
  return;
}

const session = data.session;

if (session) {
  authPanel.classList.add("hidden");
  dashboard.classList.remove("hidden");
  signOutBtn.classList.remove("hidden");
  userEmail.textContent = session.user.email || "";
} else {
  authPanel.classList.remove("hidden");
  dashboard.classList.add("hidden");
  signOutBtn.classList.add("hidden");
}

}

authForm.addEventListener("submit", async (event) => {
event.preventDefault();

const email = emailInput.value.trim();
const password = passwordInput.value;

if (!email || !password) {
  showAuthMessage("Please enter your email and password.");
  return;
}

if (password.length < 6) {
  showAuthMessage("Your password must contain at least 6 characters.");
  return;
}

authSubmit.disabled = true;

try {
  if (mode === "signup") {
    showAuthMessage("Creating your account...");

    const { data, error } = await client.auth.signUp({
      email,
      password
    });

    if (error) throw error;

    if (data.session) {
      showAuthMessage("Account created successfully!");
      await updatePage();
    } else {
      showAuthMessage(
        "Registration submitted. Check your email to confirm your account if required."
      );
    }
  } else {
    showAuthMessage("Signing in...");

    const { error } = await client.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    showAuthMessage("Login successful!");
    await updatePage();
  }
} catch (error) {
  showAuthMessage(error.message || "Something went wrong.");
} finally {
  authSubmit.disabled = false;
}

});

signOutBtn.addEventListener("click", async () => {
signOutBtn.disabled = true;

const { error } = await client.auth.signOut();

signOutBtn.disabled = false;

if (error) {
  showAuthMessage("Sign-out failed: " + error.message);
  return;
}

showAuthMessage("You have signed out.");
await updatePage();

});

demoButtons.forEach((button) => {
button.addEventListener("click", () => {
showDashboardMessage(
button.dataset.action +
" is not enabled yet. This is a starter demo."
);
});
});

client.auth.onAuthStateChange(() => {
updatePage();
});

updatePage();
});
