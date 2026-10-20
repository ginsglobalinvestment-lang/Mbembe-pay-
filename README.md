# MBEMBE PAY — Starter Project

This starter provides a responsive landing page, email/password sign-up and sign-in using Supabase Auth, and a demo dashboard for wallet, transfers, airtime, data, bills, and transaction history.

## Important safety note

This is a frontend starter, not a production payment system. It does **not** store or move real money, execute transfers, or buy airtime/data. Before handling real payments, integrate a reputable licensed payment provider, build server-side transaction logic, apply Supabase Row Level Security (RLS), add audit logs and fraud controls, and meet applicable Nigerian regulatory and data-protection requirements. Never store payment card details or secret/service-role keys in browser code.

## 1. Configure Supabase

1. Open your Supabase project.
2. Go to **Authentication → URL Configuration** and set your site URL when you know where the app will be hosted. Add any local/deployment callback URLs you use to the allowed redirect URLs.
3. Under **Authentication → Providers**, ensure Email is enabled.
4. Open **Project Settings → API** (or the project's API keys page).
5. Copy the Project URL and the publishable key (or legacy anon key).
6. Open `config.js` and replace the two placeholder strings:
   - `PASTE_YOUR_SUPABASE_PROJECT_URL_HERE`
   - `PASTE_YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY_HERE`

Use only the publishable/anon key in this browser app. Never use `service_role` or any secret key here.

## 2. Run or host the project

This is a static website. You can test it using a local static server or deploy it to a static hosting provider such as GitHub Pages. If using GitHub Pages, enable Pages in the repository settings and use the repository's published URL as the Supabase site URL / allowed redirect URL as appropriate.

## 3. Upload through GitHub on a phone

GitHub's web uploader may not preserve a folder tree when uploading multiple files. Upload the files in the repository root:
- `index.html`
- `styles.css`
- `config.js`
- `app.js`
- `README.md`

On the repository page choose **Add file → Upload files** (or use the Quick setup upload link), select these files, then tap **Commit changes**. Do not upload the ZIP itself as a substitute for the individual source files.

## 4. Suggested next milestones

- Confirm authentication and email verification work.
- Add profile and transaction tables with Row Level Security policies.
- Choose a payment provider and integrate its API only through a secure server-side backend.
- Implement transaction status verification, idempotency, limits, reconciliation, receipts, logging, and support flows.
- Add tests, monitoring, backups, privacy policy, and terms before public launch.
