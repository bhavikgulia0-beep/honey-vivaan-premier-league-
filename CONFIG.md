# Configuration Reference

## Firebase Setup Checklist

- [ ] Firebase project created
- [ ] Realtime Database enabled (Test Mode)
- [ ] Credentials copied from Project Settings
- [ ] Database rules set (see below)
- [ ] Credentials saved in the game

## Database Rules to Paste in Firebase Console

Navigate to: Firebase Console → Realtime Database → Rules

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

## Environment Variables

If using with environment variables (optional):

```env
VITE_FIREBASE_API_KEY=your_actual_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789000
VITE_FIREBASE_APP_ID=1:123456789000:web:abc123xyz
```

## Hosting Recommendations

### Development
- Python: `python -m http.server 8000`
- Node: `npx http-server`
- Direct: Open `index.html` in browser

### Production (Free Options)
1. **Netlify** - Recommended, easiest
2. **Vercel** - Also great, very fast
3. **GitHub Pages** - Simple, zero cost
4. **Firebase Hosting** - Integrated with Firebase
5. **Replit** - Super easy, no git needed

## File Structure

```
honey-vivaan-premier-league/
├── index.html          # Main HTML file with styles
├── index.js            # Complete game logic
├── package.json        # Dependencies (optional)
├── netlify.toml        # Netlify deployment config
├── vercel.json         # Vercel deployment config
├── README.md           # Full documentation
├── DEPLOYMENT.md       # Deployment guide
├── QUICKSTART.md       # 5-minute quick start
└── CONFIG.md           # This file
```

## Game Data Structure (Firebase)

```
rooms/
  ├── ABC123/
  │   ├── created: "2026-05-16T..."
  │   ├── gameState: "playing" | "waiting" | "completed"
  │   ├── winner: "Player A" | "Player B" | "TIE"
  │   ├── currentInning: "player1" | "player2"
  │   ├── currentTurn: "player1" | "player2"
  │   ├── moves: [
  │   │   {
  │   │     round: 1,
  │   │     player: 0 | 1,
  │   │     number: 1-6,
  │   │     timestamp: "..."
  │   │   }
  │   ├── player1: {
  │   │   id: "abc123...",
  │   │   score: 0-999,
  │   │   innings: 0 | 1
  │   │ }
  │   └── player2: {
  │       id: "xyz789..." | null,
  │       score: 0-999,
  │       innings: 0 | 1
  │     }
```

## Browser Compatibility

✅ Chrome/Chromium (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- **First Load**: ~2-3 seconds (Firebase init)
- **Real-time Updates**: <100ms
- **Data Per Game**: ~5-10 KB
- **Concurrent Games**: ~50-100 with free Firebase

## Security Considerations

⚠️ Current Firebase rules allow anyone to read/write. For production, consider:

1. Add authentication (Firebase Auth)
2. Restrict write access to owners
3. Add server-side validation
4. Rate limiting

For now, "Test Mode" is fine for casual play.

## Customization

### Change Theme Colors
Edit the CSS in `index.html`:
- Primary: `#ffd700` (gold)
- Secondary: `#ffed4e` (light gold)
- Change to any hex color

### Change Game Rules
Edit functions in `index.js`:
- `checkOutcome()` - OUT/RUN logic
- `calculateWinner()` - Win calculation
- Game timing/rounds

### Add Features
- Leaderboard: Add to Realtime DB
- Chat: Add `messages` node to room
- Stats: Store in separate collection
- Replay: Store moves, add replay UI

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Blank page | Check browser console for errors |
| Firebase not connecting | Verify credentials are correct |
| Room codes not syncing | Check database rules and connection |
| Slow updates | Check internet speed, Firebase region |
| Can't create room | Ensure Realtime Database is enabled |

## Support

For issues or questions:
1. Check browser console (F12)
2. Verify Firebase setup
3. Try clearing browser cache
4. Check Firebase quota (might be rate-limited)

## Cost Estimate

| Item | Cost |
|------|------|
| Game | $0 |
| Hosting | $0 |
| Firebase DB | $0 (free tier) |
| Custom Domain | $0-12/year |
| Total Monthly | $0 |

Firebase free tier includes:
- 100 concurrent connections
- 1GB storage
- 10GB download/month
- Sufficient for thousands of games

---

Last updated: 2026
