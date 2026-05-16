# 🏏 Honey Vivaan Premier League

A simple, free, web-based hand cricket game where two players can join a room and play online in real-time.

## Features

- **Completely Free**: No charges, no signup required
- **Simple Gameplay**: Hand cricket with basic mechanics
- **Real-time Multiplayer**: Play with a friend using Firebase
- **Room-based**: Create or join games using room codes
- **Mobile-Friendly**: Works on desktop and mobile browsers
- **Easy Deployment**: Deploys to free hosting platforms

## Game Rules

1. Two players join a room
2. Each player takes turns batting and bowling
3. In each round:
   - Both players select a number (1-6)
   - If numbers match → Batter is OUT
   - If numbers differ → Batter scores runs equal to their number
4. After one inning (OUT), players switch roles
5. After both have batted once, the higher score wins!

## Deployment Options

### Option 1: Netlify (Recommended - Easiest)

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repo
5. Deploy!

### Option 2: Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repo
5. Deploy!

### Option 3: GitHub Pages

1. Push code to GitHub
2. Go to repo → Settings → Pages
3. Set source to `main` branch
4. Your site will be live at `https://username.github.io/repo-name`

### Option 4: Replit (Super Easy - No GitHub needed)

1. Go to [replit.com](https://replit.com)
2. Click "Create Repl" → "Import from GitHub"
3. Paste this repo URL
4. Click "Import"
5. It will deploy automatically!

## Setup Instructions

### 📖 Firebase Setup Guide

**The Firebase Console has been updated recently.** For the latest step-by-step guide, see:
- **[FIREBASE_SIMPLE_GUIDE.md](./FIREBASE_SIMPLE_GUIDE.md)** - Easy visual guide (start here!)
- **[FIREBASE_SETUP_UPDATED.md](./FIREBASE_SETUP_UPDATED.md)** - Detailed current process

### Quick Summary

1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Realtime Database (Test Mode)
3. Register a Web App to get credentials
4. Configure the game with those credentials

### Configure the Game

**Option A: In the Web App (Easiest)**
1. Deploy the game first (to Netlify/Vercel)
2. Open the deployed app in browser
3. Click **"Configure Firebase"** button
4. The game will show you which values to enter
5. Go to Firebase Console, find those values, paste them
6. Done!

**Option B: Using Environment Variables (Advanced)**

Create a `.env` file in the root with:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Set Database Rules (Important for Security)

In Firebase Console → Realtime Database → Rules, paste:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".validate": "newData.hasChildren(['created', 'player1', 'gameState'])"
      }
    }
  }
}
```

## How to Play

1. **Create a Game**
   - Click "Create Room" on the home page
   - Share the room code with a friend

2. **Join a Game**
   - Enter the room code
   - Click "Join Room"

3. **Play**
   - When it's your turn, select a number 1-6
   - Click "Submit"
   - Wait for opponent's move
   - See the result (OUT or RUNS)
   - Continue until both innings complete

4. **See Results**
   - Final scores displayed
   - Click "Play Again" for rematch
   - Click "Exit" to return to home

## Local Development

To run locally:

```bash
# Install dependencies
npm install

# Start local server (requires a simple HTTP server)
# Using Python 3
python -m http.server 8000

# Or using Node.js
npx http-server .

# Open http://localhost:8000 in your browser
```

## Technologies Used

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Firebase Realtime Database
- **Hosting**: Static site (Netlify, Vercel, GitHub Pages, etc.)

## Cost

- **Development**: FREE (uses Firebase Free Tier)
- **Hosting**: FREE (Netlify/Vercel/GitHub Pages)
- **Game**: FREE
- **Storage**: Minimal data usage
- **Scalability**: Firebase Free Tier covers ~100GB/month

## Firebase Free Tier Limits

- 100 concurrent connections
- 1GB storage (more than enough for this game)
- 10GB download per month
- Realtime Database queries limited but sufficient for ~50 simultaneous games

## Features to Add (Optional)

- Leaderboard
- Player statistics
- Chat during game
- Sound effects
- Different game modes
- Customizable difficulty
- Replay feature

## Troubleshooting

**"Room not found" error**
- Check room code spelling
- Make sure room creator is still in the waiting screen

**Firebase credentials not working**
- Verify API key is correct
- Check database URL format
- Ensure Realtime Database is enabled in Firebase

**Real-time updates not working**
- Check browser console for errors
- Verify Firebase Rules are correct
- Ensure internet connection is stable

## License

Free to use, modify, and deploy!

## Feedback

Have issues or ideas? Open an issue on GitHub!

---

Enjoy the game! 🎉
