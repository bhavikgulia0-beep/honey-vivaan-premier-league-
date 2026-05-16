// Honey Vivaan Premier League - Hand Cricket Game
// Complete vanilla JavaScript implementation

// Firebase configuration
const firebaseConfig = {
  apiKey: localStorage.getItem('FIREBASE_API_KEY') || "AIzaSyCLrBr3xRv8VAdpD69Yl-h9DbKbLQrqKmY",
  authDomain: localStorage.getItem('FIREBASE_AUTH_DOMAIN') || "honey-vivaan-priemere-league.firebaseapp.com",
  projectId: localStorage.getItem('FIREBASE_PROJECT_ID') || "honey-vivaan-priemere-league",
  databaseURL: localStorage.getItem('FIREBASE_DATABASE_URL') || "https://honey-vivaan-priemere-league-default-rtdb.firebaseio.com",
  storageBucket: localStorage.getItem('FIREBASE_STORAGE_BUCKET') || "honey-vivaan-priemere-league.firebasestorage.app",
  messagingSenderId: localStorage.getItem('FIREBASE_MESSAGING_SENDER_ID') || "817223940245",
  appId: localStorage.getItem('FIREBASE_APP_ID') || "1:817223940245:web:9b2181a027bbeb1ad9039c",
  measurementId: localStorage.getItem('FIREBASE_MEASUREMENT_ID') || "G-X8BPFBHEF6"
};

// Initialize Firebase
let firebaseDb = null;
let currentPage = 'home';
let roomCode = '';
let playerId = '';
let playerIndex = 0;
let gameData = null;
let selectedNumber = null;
let unsubscribe = null;

// Initialize Firebase
function initFirebase() {
  try {
    const app = firebase.initializeApp(firebaseConfig);
    firebaseDb = firebase.database(app);
    console.log('Firebase initialized');
  } catch (error) {
    console.error('Firebase init error:', error);
  }
}

// Utility functions
function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function generatePlayerId() {
  return Math.random().toString(36).substring(2, 10);
}

function checkOutcome(batterNumber, bowlerNumber) {
  if (batterNumber === bowlerNumber) {
    return { type: 'OUT', runs: 0 };
  }
  return { type: 'RUN', runs: batterNumber };
}

function calculateWinner(player1Score, player2Score) {
  if (player1Score > player2Score) return 'Player A';
  if (player2Score > player1Score) return 'Player B';
  return 'TIE';
}

// Render functions
function renderHome() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="container">
      <div class="header">
        <h1>🏏 Honey Vivaan Premier League</h1>
        <p>Hand Cricket Game</p>
      </div>

      <div id="errorHome" class="error hidden"></div>

      <div class="card">
        <h2 style="margin-bottom: 20px; color: #333;">Create New Game</h2>
        <button class="button button-primary" id="createBtn" onclick="createRoom()">
          ✨ Create Room
        </button>
      </div>

      <div class="card">
        <h2 style="margin-bottom: 20px; color: #333;">Join Existing Game</h2>
        <div class="input-group">
          <label>Room Code</label>
          <input 
            type="text"
            id="joinCodeInput"
            placeholder="Enter room code (e.g., ABC123)"
            style="text-transform: uppercase;"
            onkeypress="if(event.key === 'Enter') joinRoom()"
          />
        </div>
        <button class="button button-primary" id="joinBtn" onclick="joinRoom()">
          🔗 Join Room
        </button>
      </div>

      <div class="info">
        <strong>How to play:</strong> Create a room and share the code with a friend. 
        You'll play hand cricket where both players take turns batting and bowling. 
        Matching numbers = OUT, different numbers = runs scored!
      </div>

      <div class="card" style="background: #f9f9f9; margin-top: 20px;">
        <h3 style="color: #333; margin-bottom: 10px;">⚙️ Setup Instructions</h3>
        <p style="font-size: 0.9em; color: #666; line-height: 1.6;">
          <strong>To enable online multiplayer:</strong><br>
          1. Visit <a href="https://console.firebase.google.com" target="_blank" style="color: #ffd700; text-decoration: underline;">Firebase Console</a><br>
          2. Create a new project<br>
          3. Enable Realtime Database<br>
          4. Copy your credentials<br>
          5. Paste them below:
        </p>
        <button class="button button-secondary" onclick="showSetup()" style="margin-top: 10px;">
          📋 Configure Firebase
        </button>
      </div>
    </div>
  `;
}

function renderSetupModal() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="container">
      <div class="header">
        <h1>⚙️ Firebase Setup</h1>
      </div>

      <div class="card">
        <h3 style="margin-bottom: 15px; color: #333;">Enter Your Firebase Credentials</h3>
        
        <div class="input-group">
          <label>API Key</label>
          <input type="text" id="apiKey" placeholder="apiKey">
        </div>
        
        <div class="input-group">
          <label>Auth Domain</label>
          <input type="text" id="authDomain" placeholder="project.firebaseapp.com">
        </div>
        
        <div class="input-group">
          <label>Project ID</label>
          <input type="text" id="projectId" placeholder="project-id">
        </div>
        
        <div class="input-group">
          <label>Database URL</label>
          <input type="text" id="databaseURL" placeholder="https://project-default-rtdb.firebaseio.com">
        </div>
        
        <div class="input-group">
          <label>Storage Bucket</label>
          <input type="text" id="storageBucket" placeholder="project.appspot.com">
        </div>
        
        <div class="input-group">
          <label>Messaging Sender ID</label>
          <input type="text" id="messagingSenderId" placeholder="123456789">
        </div>
        
        <div class="input-group">
          <label>App ID</label>
          <input type="text" id="appId" placeholder="1:123456789:web:abc">
        </div>

        <button class="button button-primary" onclick="saveFirebaseConfig()">
          ✅ Save Configuration
        </button>
        
        <button class="button button-secondary" onclick="renderHome()">
          ← Back
        </button>
      </div>

      <div class="info" style="margin-top: 20px;">
        <strong>Where to find these values:</strong><br>
        Go to Firebase Console → Your Project → Project Settings → Copy the credentials from the Config section.
      </div>
    </div>
  `;

  // Populate with saved values
  document.getElementById('apiKey').value = localStorage.getItem('FIREBASE_API_KEY') || '';
  document.getElementById('authDomain').value = localStorage.getItem('FIREBASE_AUTH_DOMAIN') || '';
  document.getElementById('projectId').value = localStorage.getItem('FIREBASE_PROJECT_ID') || '';
  document.getElementById('databaseURL').value = localStorage.getItem('FIREBASE_DATABASE_URL') || '';
  document.getElementById('storageBucket').value = localStorage.getItem('FIREBASE_STORAGE_BUCKET') || '';
  document.getElementById('messagingSenderId').value = localStorage.getItem('FIREBASE_MESSAGING_SENDER_ID') || '';
  document.getElementById('appId').value = localStorage.getItem('FIREBASE_APP_ID') || '';
}

function showSetup() {
  renderSetupModal();
}

function saveFirebaseConfig() {
  localStorage.setItem('FIREBASE_API_KEY', document.getElementById('apiKey').value);
  localStorage.setItem('FIREBASE_AUTH_DOMAIN', document.getElementById('authDomain').value);
  localStorage.setItem('FIREBASE_PROJECT_ID', document.getElementById('projectId').value);
  localStorage.setItem('FIREBASE_DATABASE_URL', document.getElementById('databaseURL').value);
  localStorage.setItem('FIREBASE_STORAGE_BUCKET', document.getElementById('storageBucket').value);
  localStorage.setItem('FIREBASE_MESSAGING_SENDER_ID', document.getElementById('messagingSenderId').value);
  localStorage.setItem('FIREBASE_APP_ID', document.getElementById('appId').value);

  alert('Configuration saved! Reloading app...');
  location.reload();
}

// Game functions
async function createRoom() {
  const btn = document.getElementById('createBtn');
  btn.disabled = true;
  btn.textContent = '⏳ Creating...';

  try {
    roomCode = generateRoomCode();
    playerId = generatePlayerId();
    playerIndex = 0;

    const roomData = {
      created: new Date().toISOString(),
      player1: {
        id: playerId,
        score: 0,
        innings: 0
      },
      player2: null,
      currentInning: 'player1',
      currentTurn: 'player1',
      gameState: 'waiting',
      moves: []
    };

    await firebaseDb.ref(`rooms/${roomCode}`).set(roomData);
    currentPage = 'game';
    renderGameWaiting();
  } catch (error) {
    console.error(error);
    const errorEl = document.getElementById('errorHome');
    if (errorEl) {
      errorEl.textContent = 'Failed to create room: ' + error.message;
      errorEl.classList.remove('hidden');
    }
    btn.disabled = false;
    btn.textContent = '✨ Create Room';
  }
}

async function joinRoom() {
  const code = document.getElementById('joinCodeInput')?.value?.toUpperCase();
  if (!code) {
    alert('Please enter a room code');
    return;
  }

  const btn = document.getElementById('joinBtn');
  btn.disabled = true;
  btn.textContent = '⏳ Joining...';

  try {
    const snapshot = await firebaseDb.ref(`rooms/${code}`).once('value');

    if (!snapshot.exists()) {
      alert('Room not found');
      btn.disabled = false;
      btn.textContent = '🔗 Join Room';
      return;
    }

    const roomData = snapshot.val();
    if (roomData.player2 !== null) {
      alert('Room is full');
      btn.disabled = false;
      btn.textContent = '🔗 Join Room';
      return;
    }

    roomCode = code;
    playerId = generatePlayerId();
    playerIndex = 1;

    const updatedRoom = {
      ...roomData,
      player2: {
        id: playerId,
        score: 0,
        innings: 0
      },
      gameState: 'playing'
    };

    await firebaseDb.ref(`rooms/${code}`).set(updatedRoom);
    currentPage = 'game';
    renderGame();
  } catch (error) {
    console.error(error);
    alert('Failed to join room: ' + error.message);
    btn.disabled = false;
    btn.textContent = '🔗 Join Room';
  }
}

function renderGameWaiting() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="container">
      <div class="header">
        <h1>🏏 Honey Vivaan Premier League</h1>
        <p>Waiting for opponent...</p>
      </div>

      <div class="card">
        <h2>Room Code</h2>
        <div class="room-code">${roomCode}</div>
        <p style="text-align: center; color: #666; margin-bottom: 20px;">
          Share this code with your friend to join the game
        </p>

        <div class="loading">
          <div class="spinner"></div>
          <p class="waiting-message">Waiting for Player B...</p>
        </div>

        <button class="button button-secondary" onclick="exitGame()">
          Exit
        </button>
      </div>
    </div>
  `;

  // Listen for game start
  const roomRef = firebaseDb.ref(`rooms/${roomCode}`);
  unsubscribe = roomRef.on('value', (snapshot) => {
    gameData = snapshot.val();
    if (gameData && gameData.gameState === 'playing') {
      renderGame();
    }
  });
}

function renderGame() {
  if (!gameData) return;

  const isCurrentPlayer = playerIndex === 0 
    ? gameData.currentTurn === 'player1' 
    : gameData.currentTurn === 'player2';

  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="container">
      <div class="header">
        <h1>🏏 Honey Vivaan Premier League</h1>
        <p>Room: ${roomCode}</p>
      </div>

      <div class="card">
        <div class="score-display">
          <div class="player-score ${gameData.currentInning === 'player1' ? 'active' : ''}">
            <h3>Player A</h3>
            <div class="score">${gameData.player1?.score || 0}</div>
            <div class="status">
              ${gameData.player1?.innings === 1 ? '✓ Innings Over' : 'Batting'}
            </div>
          </div>
          <div class="player-score ${gameData.currentInning === 'player2' ? 'active' : ''}">
            <h3>Player B</h3>
            <div class="score">${gameData.player2?.score || 0}</div>
            <div class="status">
              ${gameData.player2?.innings === 1 ? '✓ Innings Over' : 'Batting'}
            </div>
          </div>
        </div>

        ${gameData.lastResult ? `
          <div class="ball-result ${gameData.lastResult.type === 'OUT' ? 'out' : 'runs'}">
            ${gameData.lastResult.type === 'OUT' 
              ? '🔴 OUT! Switching innings...' 
              : `✅ ${gameData.lastResult.runs} Runs!`}
          </div>
        ` : ''}

        <div class="turn-indicator">
          🏏 ${gameData.currentInning === 'player1' ? 'Player A' : 'Player B'} is Batting
        </div>

        ${isCurrentPlayer ? `
          <p style="text-align: center; margin-bottom: 20px; color: #333;">
            👉 Your turn! Choose a number (1-6)
          </p>

          <div class="number-pad">
            ${[1, 2, 3, 4, 5, 6].map(num => `
              <button
                class="number-btn ${selectedNumber === num ? 'selected' : ''}"
                onclick="selectNumber(${num})"
              >
                ${num}
              </button>
            `).join('')}
          </div>

          <button
            class="button button-primary"
            id="submitBtn"
            onclick="submitNumber()"
            ${selectedNumber === null ? 'disabled' : ''}
            style="margin-top: 20px;"
          >
            🎯 Submit
          </button>
        ` : `
          <div class="loading">
            <div class="spinner"></div>
            <p>Waiting for ${gameData.currentInning === 'player1' ? 'Player A' : 'Player B'} to choose...</p>
          </div>
        `}

        <button 
          class="button button-secondary" 
          onclick="exitGame()"
          style="margin-top: 20px;"
        >
          Exit Game
        </button>
      </div>
    </div>
  `;

  selectedNumber = null;
}

function selectNumber(num) {
  selectedNumber = num;
  document.querySelectorAll('.number-btn').forEach(btn => {
    btn.classList.remove('selected');
  });
  event.target.classList.add('selected');

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) submitBtn.disabled = false;
}

async function submitNumber() {
  if (selectedNumber === null) {
    alert('Please select a number');
    return;
  }

  try {
    const snapshot = await firebaseDb.ref(`rooms/${roomCode}`).once('value');
    const currentGame = snapshot.val();

    const newMoves = [...(currentGame.moves || [])];
    newMoves.push({
      round: newMoves.length + 1,
      player: playerIndex,
      number: selectedNumber,
      timestamp: new Date().toISOString()
    });

    if (newMoves.length % 2 === 0) {
      const lastTwoMoves = newMoves.slice(-2);
      const outcome = checkOutcome(
        lastTwoMoves[0].number,
        lastTwoMoves[1].number
      );

      let updatedGame = { ...currentGame, moves: newMoves };
      updatedGame.lastResult = outcome;

      if (outcome.type === 'OUT') {
        const currentInning = currentGame.currentInning;
        const nextInning = currentInning === 'player1' ? 'player2' : 'player1';

        // Update innings
        if (currentInning === 'player1') {
          updatedGame.player1 = { ...currentGame.player1, innings: 1 };
        } else {
          updatedGame.player2 = { ...currentGame.player2, innings: 1 };
        }

        // Check if game over
        if (currentGame.player1?.innings === 1 && currentGame.player2?.innings === 1) {
          const winner = calculateWinner(
            currentGame.player1?.score || 0,
            currentGame.player2?.score || 0
          );
          updatedGame.gameState = 'completed';
          updatedGame.winner = winner;
          updatedGame.currentInning = currentInning;
        } else {
          updatedGame.currentInning = nextInning;
          updatedGame.currentTurn = nextInning;
        }
      } else {
        // Add runs
        if (playerIndex === 0) {
          updatedGame.player1 = {
            ...currentGame.player1,
            score: (currentGame.player1?.score || 0) + outcome.runs
          };
          updatedGame.currentTurn = 'player2';
        } else {
          updatedGame.player2 = {
            ...currentGame.player2,
            score: (currentGame.player2?.score || 0) + outcome.runs
          };
          updatedGame.currentTurn = 'player1';
        }
      }

      await firebaseDb.ref(`rooms/${roomCode}`).set(updatedGame);
    } else {
      const newGame = { ...currentGame, moves: newMoves };
      newGame.currentTurn = playerIndex === 0 ? 'player2' : 'player1';
      await firebaseDb.ref(`rooms/${roomCode}`).set(newGame);
    }

    selectedNumber = null;
  } catch (error) {
    console.error(error);
    alert('Failed to submit move: ' + error.message);
  }
}

function renderResult() {
  if (!gameData || !gameData.winner) return;

  const isWinner = gameData.winner === (playerIndex === 0 ? 'Player A' : 'Player B');

  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="container">
      <div class="header">
        <h1>🏏 Honey Vivaan Premier League</h1>
        <p>Game Over!</p>
      </div>

      <div class="card">
        <div class="result-display">
          <h2>${isWinner ? '🎉 YOU WON!' : '😢 You Lost'}</h2>
          <div class="winner">${gameData.winner} Wins!</div>

          <div class="score-display" style="margin-top: 20px;">
            <div class="player-score">
              <h3>Player A</h3>
              <div class="score">${gameData.player1?.score || 0}</div>
            </div>
            <div class="player-score">
              <h3>Player B</h3>
              <div class="score">${gameData.player2?.score || 0}</div>
            </div>
          </div>
        </div>

        <button class="button button-primary" onclick="rematch()">
          🔄 Play Again
        </button>
        <button class="button button-secondary" onclick="exitGame()">
          Exit to Home
        </button>
      </div>
    </div>
  `;
}

async function rematch() {
  try {
    const newGame = {
      player1: { id: gameData.player1.id, score: 0, innings: 0 },
      player2: { id: gameData.player2.id, score: 0, innings: 0 },
      currentTurn: 'player1',
      currentInning: 'player1',
      gameState: 'playing',
      moves: [],
      created: new Date().toISOString()
    };

    await firebaseDb.ref(`rooms/${roomCode}`).set(newGame);
    renderGame();
  } catch (error) {
    console.error(error);
    alert('Failed to start rematch');
  }
}

async function exitGame() {
  try {
    if (unsubscribe) unsubscribe();
    await firebaseDb.ref(`rooms/${roomCode}`).remove();
  } catch (error) {
    console.error(error);
  }
  roomCode = '';
  playerId = '';
  playerIndex = 0;
  gameData = null;
  selectedNumber = null;
  currentPage = 'home';
  renderHome();
}

// Real-time listener setup
function setupGameListener() {
  if (!roomCode || !firebaseDb) return;

  if (unsubscribe) unsubscribe();

  const roomRef = firebaseDb.ref(`rooms/${roomCode}`);
  unsubscribe = roomRef.on('value', (snapshot) => {
    if (snapshot.exists()) {
      gameData = snapshot.val();
      
      if (gameData.gameState === 'completed') {
        renderResult();
      } else if (gameData.gameState === 'playing') {
        renderGame();
      } else if (gameData.gameState === 'waiting') {
        if (currentPage !== 'game') {
          renderGameWaiting();
        } else {
          renderGame();
        }
      }
    }
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
  initFirebase();
  renderHome();
  
  // Set up periodic listener refresh
  setInterval(() => {
    if (currentPage === 'game') {
      setupGameListener();
    }
  }, 1000);
});
