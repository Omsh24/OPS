# Frontend-Backend Integration Guide

## Overview

The frontend (React + Vite) has been fully integrated with the backend (Express + Socket.IO) to support real-time multiplayer maze game functionality.

## Integration Architecture

```
Frontend (React)
    ├── SocketProvider (Context)
    │   ├── Manages socket connection
    │   ├── Handles room state
    │   └── Listens to server events
    │
    ├── HomePage
    │   ├── Create Room
    │   ├── Join Room
    │   └── Start Game
    │
    └── StartGame
        ├── Send position updates
        ├── Receive other players' positions
        └── Render all players

Backend (Node.js)
    ├── Socket.IO Server
    ├── RoomManager Service
    ├── GameStateManager Service
    └── Event Handlers
        ├── Room events
        ├── Game events
        └── Connection events
```

## Setup Instructions

### 1. Install Dependencies

#### Backend
```bash
cd OPS/Backend
npm install
```

#### Frontend
```bash
cd OPS/Frontend
npm install
```

### 2. Start Servers

#### Backend (Terminal 1)
```bash
cd OPS/Backend
npm run dev
```
Server will run on `http://localhost:3000`

#### Frontend (Terminal 2)
```bash
cd OPS/Frontend
npm run dev
```
Frontend will run on `http://localhost:5173` (or next available port)

## Complete Flow

### 1. Create Room Flow

```
User enters name → Clicks "Create Room"
    ↓
Frontend: socketService.createRoom(name, maxPlayers)
    ↓
Backend: Handles 'create_room' event
    ↓
Backend: RoomManager.createRoom()
    ↓
Backend: Emits 'room_created' with room code
    ↓
Frontend: Displays room code and player list
    ↓
Host clicks "Start Game"
    ↓
Backend: Changes room status to 'playing'
    ↓
Backend: Emits 'game_started' to all players
    ↓
Frontend: Navigates to /startgame
```

### 2. Join Room Flow

```
User enters name → Clicks "Join Room"
    ↓
User enters room code → Clicks "Join Room"
    ↓
Frontend: socketService.joinRoom(roomCode, name)
    ↓
Backend: Validates room exists and is not full
    ↓
Backend: Adds player to room
    ↓
Backend: Emits 'room_joined' to joiner
    ↓
Backend: Emits 'player_joined' to other players
    ↓
Frontend: Displays updated player list
    ↓
Wait for host to start game
```

### 3. Game Play Flow

```
Game starts → Player moves in maze
    ↓
Frontend: Detects keyboard input (WASD/Arrows)
    ↓
Frontend: Updates local player position
    ↓
Frontend: socketService.updatePosition({ x, y })
    ↓
Backend: GameStateManager validates position
    ↓
Backend: Rate limits updates (60/second)
    ↓
Backend: Emits 'player_position_update' to other players
    ↓
Frontend: Receives position updates
    ↓
Frontend: Renders remote players at new positions
```

## Socket Events Reference

### Client → Server Events

| Event | Payload | Description |
|-------|---------|-------------|
| `create_room` | `{ name, maxPlayers }` | Create new room |
| `join_room` | `{ roomCode, playerName }` | Join existing room |
| `leave_room` | None | Leave current room |
| `start_game` | None | Start game (host only) |
| `update_position` | `{ x, y }` | Send position update |
| `get_room_info` | None | Get room information |
| `get_game_state` | None | Get full game state |

### Server → Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `room_created` | `{ roomCode, room }` | Room created successfully |
| `room_joined` | `{ roomCode, room }` | Joined room successfully |
| `player_joined` | `{ player, room }` | Another player joined |
| `player_left` | `{ playerId, room }` | Player left room |
| `room_update` | `{ room }` | Room state updated |
| `game_started` | `{ room, gameState }` | Game started |
| `player_position_update` | `{ playerId, position }` | Player moved |
| `game_state_sync` | `{ gameState }` | Full game state |
| `host_transferred` | `{ room }` | Host changed |
| `join_error` | `{ message }` | Join failed |
| `start_error` | `{ message }` | Start failed |

## Key Features Implemented

### ✅ Room Management
- Create room with unique 6-character code
- Join room by code
- Real-time player list updates
- Host detection and UI changes
- Auto cleanup when players leave

### ✅ Game State
- Position tracking for all players
- Rate-limited position updates (60/sec)
- Position validation and bounds checking
- Smooth player movement using requestAnimationFrame
- Multiplayer synchronization

### ✅ Multiplayer Rendering
- Local player (yellow, highlighted)
- Remote players (green)
- Player names above avatars
- Real-time position updates
- Smooth interpolation

### ✅ UI/UX
- Player name input
- Room code display with copy button
- Player list with host indicator
- "Start Game" button (host only)
- "Waiting for host" message (non-hosts)
- Game HUD showing room info
- ESC to leave game

## File Structure

### Frontend

```
src/
├── services/
│   └── socket.js              # Socket.IO service wrapper
├── context/
│   └── SocketContext.jsx      # React context for socket
├── components/
│   ├── homepage.jsx           # Room creation/joining
│   ├── homepage.css           # Homepage styles
│   └── StartGame.jsx          # Game component
├── App.jsx                    # Router setup
└── main.jsx                   # App entry with SocketProvider
```

### Backend

```
Backend/
├── config/
│   └── constants.js           # All constants
├── services/
│   ├── RoomManager.js         # Room management logic
│   └── GameStateManager.js    # Game state/position tracking
├── handlers/
│   ├── roomHandlers.js        # Room event handlers
│   ├── gameHandlers.js        # Game event handlers
│   └── connectionHandlers.js  # Connection handlers
├── socket/
│   └── socketSetup.js         # Socket.IO initialization
└── server.js                  # Main entry point
```

## Testing the Integration

### Test Scenario 1: Create and Join

1. Open two browser windows side by side
2. Window 1: Enter name "Player1", click "Create Room"
3. Copy the room code
4. Window 2: Enter name "Player2", click "Join Room", paste code
5. Verify both players appear in the list
6. Window 1 (host): Click "Start Game"
7. Verify both windows navigate to game

### Test Scenario 2: Multiplayer Movement

1. After starting game with 2+ players
2. Move using WASD or arrow keys
3. Verify your player (yellow) moves
4. Verify other players (green) appear and move
5. Verify player names show above avatars
6. Press ESC to leave game

### Test Scenario 3: Host Transfer

1. Create room with Player1
2. Player2 joins
3. Player1 (host) leaves
4. Verify Player2 becomes host
5. Verify "Start Game" button appears for Player2

## Troubleshooting

### Connection Issues

**Problem**: Frontend can't connect to backend
- **Solution**: Check backend is running on port 3000
- **Check**: `http://localhost:3000` should show something
- **Fix**: Make sure CORS is enabled in backend

### Room Code Not Generated

**Problem**: Room code shows as loading forever
- **Solution**: Check backend console for errors
- **Check**: Socket connection status
- **Fix**: Ensure socket event listeners are registered

### Players Not Syncing

**Problem**: Can't see other players
- **Solution**: Check browser console for socket errors
- **Check**: Verify game_started event fires
- **Fix**: Call `socketService.getGameState()` on game start

### Position Not Updating

**Problem**: Player movement not syncing
- **Solution**: Check rate limiting isn't too aggressive
- **Check**: Backend logs for position updates
- **Fix**: Verify `update_position` event is firing

## Performance Considerations

### Rate Limiting
- Position updates: Max 60/second per player
- Automatic throttling prevents spam
- Only sends when position changes

### Optimization Tips
1. Use `requestAnimationFrame` for smooth rendering
2. Interpolate remote player positions
3. Debounce non-critical updates
4. Clean up event listeners on unmount

## Security Notes

### Current Implementation
- No authentication (add JWT tokens for production)
- No input sanitization (add validation)
- No room passwords (add optional passwords)
- Open CORS (restrict in production)

### Recommendations for Production
1. Add user authentication
2. Validate all inputs
3. Rate limit socket events
4. Add room passwords
5. Implement anti-cheat for positions
6. Add SSL/TLS (wss://)

## Next Steps

### Potential Enhancements
1. Add game objectives (collect items, reach goal)
2. Implement chat system
3. Add spectator mode
4. Track scores/leaderboard
5. Add power-ups
6. Implement collision detection
7. Add sound effects
8. Mobile touch controls
9. Reconnection handling
10. Game replay system

## Success Criteria

✅ Backend server running on port 3000
✅ Frontend running on port 5173
✅ Socket connection established
✅ Room creation works
✅ Room joining works
✅ Player list updates in real-time
✅ Game starts for all players
✅ Position updates broadcast
✅ Multiple players visible in maze
✅ Smooth player movement
✅ Leave/disconnect handled gracefully

## Summary

The integration is complete and functional. Players can:
1. Create or join rooms
2. See other players in lobby
3. Start games (host)
4. Move in maze with multiplayer synchronization
5. See other players moving in real-time
6. Leave gracefully

The system uses Socket.IO for real-time bidirectional communication, React Context for state management, and modular backend architecture for scalability.
