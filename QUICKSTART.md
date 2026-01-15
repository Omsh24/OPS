# Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies

```bash
# Backend
cd OPS/Backend
npm install

# Frontend (new terminal)
cd OPS/Frontend
npm install
```

### 2. Start Servers

```bash
# Terminal 1: Start Backend
cd OPS/Backend
npm run dev
# Backend runs on http://localhost:3000

# Terminal 2: Start Frontend
cd OPS/Frontend
npm run dev
# Frontend runs on http://localhost:5173
```

### 3. Play!

1. Open `http://localhost:5173` in your browser
2. Enter your name
3. Click **"Create Room"** or **"Join Room"**
4. Share room code with friends
5. Host clicks **"Start Game"**
6. Move with **WASD** or **Arrow Keys**
7. Press **ESC** to leave game

## Testing Multiplayer

### Option 1: Multiple Browser Windows
1. Open 2-3 browser windows side by side
2. Create room in first window
3. Join with the others using room code
4. Start game and see players move!

### Option 2: Incognito/Different Browsers
1. Normal window: Create room
2. Incognito window: Join room
3. Start playing!

## Features

✅ **Real-time Multiplayer** - See other players move instantly
✅ **Room System** - Create/join with 6-character codes
✅ **Smooth Movement** - Fluid player animation
✅ **Player Names** - See who's who
✅ **Auto Sync** - Positions synchronized automatically
✅ **Rate Limited** - Optimized for performance (60 updates/sec)

## Controls

- **WASD** or **Arrow Keys**: Move
- **ESC**: Leave game

## Architecture

```
Frontend (React + Vite + Socket.IO Client)
    ↕ WebSocket Connection
Backend (Express + Socket.IO Server)
    ↕ Room & Game State Management
Database (In-Memory Maps)
```

## Troubleshooting

**Can't connect?**
- Check both servers are running
- Backend should be on port 3000
- Frontend should be on port 5173

**Room not working?**
- Check browser console for errors
- Verify socket connection (green indicator)
- Try refreshing the page

**Players not syncing?**
- Ensure game has started
- Check network tab for socket events
- Verify both players are in the same room

## Next Steps

See `INTEGRATION_GUIDE.md` for detailed documentation.

Happy gaming! 🎮
