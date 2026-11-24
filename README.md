# Couple site (part 1: login, home, gallery)

1. **Supabase:** create a free project. Authentication: turn off new user signups, then add the two users (email + password, auto-confirm).
2. **Database:** SQL Editor, paste `supabase/schema.sql`, run it. It ends by registering both users as members.
3. **Keys:** Project Settings > API. Copy the Project URL and anon/publishable key into `js/config.js`. Never use the service_role key.
4. **Personalize:** edit names, dates, tagline and notes in `js/config.js`. Add photos `1.jpg` to `6.jpg` to `assets/images/sample/`.
5. **Test locally:** run `python -m http.server 8000` in this folder, open http://localhost:8000 (ES modules need http, not file://).
6. **Publish:** push to GitHub, then Settings > Pages > Deploy from branch `main` / root. Your site is at `https://USERNAME.github.io/REPO/`.

Free GitHub accounts publish Pages from public repos, so files in `assets/` are public. Private photos belong in the Gallery upload.
