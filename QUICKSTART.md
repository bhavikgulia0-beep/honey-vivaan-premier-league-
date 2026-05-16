# 🚀 Quick Start Guide - 5 Minutes to Play!

## Step 1: Get Firebase Credentials (2 min)

1. Go to https://console.firebase.google.com
2. Click "Create Project" → Name it → Create
3. Click "Build" → "Realtime Database" → "Create Database"
4. Choose "Test Mode" → Create
5. Click Settings (gear icon) → "Project Settings"
6. Scroll to "Your apps" → Copy the config

## Step 2: Deploy the Game (2 min)

### Option A: Deploy to Netlify (Easiest)
```bash
# 1. Fork or clone this repo
git clone https://github.com/YOUR_USERNAME/honey-vivaan-premier-league.git
cd honey-vivaan-premier-league

# 2. Push to your GitHub
git push origin main

# 3. Go to netlify.com → New site from Git
# Select your repo → Deploy!
```

### Option B: Deploy to GitHub Pages
```bash
git push origin main
# Then: Go to repo → Settings → Pages → Select main branch
```

### Option C: Try Locally
```bash
# No deployment needed!
# Just open index.html in your browser
# Or run: python -m http.server 8000
# Then open http://localhost:8000
```

## Step 3: Configure Firebase (1 min)

1. Open your deployed game (or localhost)
2. Click "Configure Firebase" button
3. Paste your Firebase credentials
4. Save!

## Step 4: Play! (0 min)

1. **Create a Game**: Click "Create Room" → Share code with friend
2. **Join a Game**: Enter code → Click "Join Room"
3. **Play**: Select numbers 1-6 each turn
4. **Win**: Highest score after both innings!

---

## That's it! 🎉

Your game is now live and playable!

### Share with Friends
- Send them the deployed URL
- They can create or join rooms instantly
- No signup, no downloads needed

### Game Rules Recap
- Both pick 1-6 each round
- Same number = OUT (switch roles)
- Different = runs scored
- After both bat once = winner is determined

---

## Need Help?

- **Setup issues?** Check DEPLOYMENT.md
- **Game rules unclear?** Check README.md
- **Code questions?** The code is well-commented!

## What's Included

✅ Complete game logic  
✅ Real-time multiplayer via Firebase  
✅ Mobile responsive UI  
✅ Beautiful honey/gold theme  
✅ Room-based gameplay  
✅ Zero cost (Firebase free tier)  
✅ Easy deployment  

## Optional: Add Environment Variables

For zero-config deployment, ask your hosting to add these env vars:
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_DATABASE_URL
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID

Then the credentials load automatically!

---

Enjoy! Have fun playing hand cricket! 🏏
