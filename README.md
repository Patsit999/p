# Loy Krathong for Two

A static site, no build step.
`index.html` is her page. `admin.html` is your private wish timeline. `shared.js`, `style.css`, `firebase-config.js` and `firestore.rules` support them.

## 1. Firebase setup (about 5 minutes)
1. Go to console.firebase.google.com and **Add project**.
2. **Project settings → Your apps → Web (`</>`)**: register an app and copy the config into `firebase-config.js`.
3. **Build → Firestore Database → Create database** (production mode).
4. **Build → Authentication → Sign-in method**: enable **Email/Password**. Then **Users → Add user** with your own email and a strong password, and copy that user's **User UID**.
5. **Firestore → Rules**: paste `firestore.rules`, replace `PASTE_ADMIN_UID` with your UID, and **Publish**.

## 2. Deploy and get your public link
**GitHub Pages**
1. Create a repo and upload all files.
2. **Settings → Pages → Deploy from a branch → main / (root)**.
3. Your link is `https://USERNAME.github.io/REPO/`.

**Firebase Hosting**
```
npm i -g firebase-tools
firebase login
firebase init hosting   # public directory: .   single-page app: No   don't overwrite index.html
firebase deploy         # → https://PROJECT.web.app
```

Send her the main link. Open `/admin.html` on your own device and sign in to read her wishes live.

## Notes
- To test locally, use a server (`npx serve`). ES modules don't load from `file://`.
- The Firebase `apiKey` is public by design. The rules protect the data:
  - Anyone with the link can **create** a wish that matches the schema (name up to 40 characters, wish up to 1000, flower/candle whitelist, server timestamp).
  - Only your UID can **read or delete** wishes. Nobody can update them.
- If sign-in is blocked, add your domain under Authentication → Settings → Authorized domains.
- To reduce spam from the public link, enable App Check later.
