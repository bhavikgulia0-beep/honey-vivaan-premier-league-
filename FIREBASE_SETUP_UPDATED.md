# 🔧 Updated Firebase Setup Guide (2026)

Firebase Console has been updated. Here's the current process:

## Step-by-Step Firebase Setup

### 1. Create a Firebase Project

1. Go to https://console.firebase.google.com
2. Click **"+ Create a project"**
3. Enter project name: `Honey Vivaan Premier League`
4. Click "Continue"
5. Disable Google Analytics (optional) → "Create project"
6. Wait for project to be created (30 seconds)

### 2. Enable Realtime Database

1. In left sidebar, click **"Build"**
2. Scroll down and click **"Realtime Database"**
3. Click **"Create Database"**
4. Select region closest to you
5. Choose **"Start in test mode"** (for development)
6. Click "Enable"
7. Database is now ready!

### 3. Get Your Firebase Credentials

There are TWO ways to get credentials now:

#### **Method A: Web App Registration (Recommended)**

1. In left sidebar under "Build", look for **"Authentication"**
2. Or click the **"Project Settings"** (gear icon top-right)
3. Click the **"Your apps"** section (might be under a different tab)
4. Look for **"Web apps"** section
5. If no app exists, click **"<> "** (web icon) to add a web app
6. Name it: `Honey Vivaan Game`
7. Click "Register app"
8. **Copy the entire config object** that appears - this is what you need!

Example config you'll see:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789000",
  appId: "1:123456789000:web:abc123xyz"
};
```

#### **Method B: From Project Settings (If Method A doesn't work)**

1. Click **Settings** (gear icon, top-right)
2. Go to **"Project settings"** tab
3. Scroll down to find **"Your apps"** or **"Web app configuration"**
4. If you don't see it, you need to create a web app first:
   - Click **"+ Add app"**
   - Select **"Web"** platform
   - Give it a name
   - Continue
5. Copy the config that appears

#### **Method C: From Realtime Database Rules**

1. Go to **"Build" → "Realtime Database"**
2. Click the **"Rules"** tab
3. At the top, you might see your database URL
4. The URL format is: `https://PROJECT_ID-default-rtdb.firebaseio.com`
5. Your `projectId` is the part before `-default-rtdb`

### 4. Set Database Rules

1. Go to **"Build" → "Realtime Database"**
2. Click **"Rules"** tab
3. Replace the existing rules with:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

4. Click **"Publish"**

### 5. Manually Extract Your Credentials

If you still can't find the web app config, you can manually extract it:

From your Firebase URL, the format is: `https://CONSOLE.firebase.google.com/project/PROJECT-ID/...`

Extract:
- **projectId**: The PROJECT-ID from the URL
- **databaseURL**: `https://PROJECT-ID-default-rtdb.firebaseio.com`
- **authDomain**: `PROJECT-ID.firebaseapp.com`

For the other fields, you need to find the web app config page.

## If You're Still Stuck

Here's an **alternative approach** - Use the game WITHOUT pre-configured credentials:

1. Deploy the game as-is (it works without credentials)
2. Open the deployed game in your browser
3. Click **"Configure Firebase"** button
4. The form will guide you through entering credentials manually
5. Credentials get saved in browser (localStorage)

This way you don't need to figure out the Firebase Console now - just focus on deployment!

## Quick Checklist

- [ ] Firebase project created
- [ ] Realtime Database enabled (Test Mode)
- [ ] Database rules set (allow read/write to /rooms)
- [ ] Web app registered and config copied
- [ ] You have the firebaseConfig object

## If credentials are still confusing:

**Try this approach:**
1. Just deploy the game first (without Firebase config)
2. Open deployed game
3. Click "Configure Firebase"
4. Then go back to Firebase Console and find credentials
5. Paste them in the game
6. Done!

---

## Minimum Required Fields

You need AT LEAST these values:

```
- apiKey: Your API key from Firebase
- projectId: Your project ID
- databaseURL: https://your-project-default-rtdb.firebaseio.com
- authDomain: your-project.firebaseapp.com
```

The other fields (storageBucket, messagingSenderId, appId) can sometimes be left empty if not found.

---

## Contact Firebase Support

If you're still having trouble:
1. Click **"Help"** (?) icon in Firebase Console
2. Select **"Get help"**
3. Ask specifically: "Where do I find my Firebase web app configuration?"

---

**Alternative: Use a Demo Config**

While setting up Firebase, you can test the game locally with:
```javascript
const firebaseConfig = {
  apiKey: "placeholder",
  projectId: "placeholder",
  databaseURL: "https://placeholder-default-rtdb.firebaseio.com",
  authDomain: "placeholder.firebaseapp.com"
};
```

This won't work for multiplayer, but you can see the UI and game flow!

---

Need more help? Let me know which step you're stuck on!
