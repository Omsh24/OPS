/**
 * Socket Context for React
 * Provides socket connection and game state to all components
 */

import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import socketService from '../services/socket';

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Connect to socket server
    const socketInstance = socketService.connect();
    setSocket(socketInstance);

    // Handle connection events
    socketInstance.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    // Room events
    socketService.onRoomUpdate((data) => {
      console.log('Room updated:', data);
      setRoomData(data.room);
      if (data.room && data.room.players) {
        setPlayers(data.room.players);
      }
    });

    socketService.onPlayerJoined((data) => {
      console.log('Player joined:', data.player);
      setRoomData(data.room);
      if (data.room && data.room.players) {
        setPlayers(data.room.players);
      }
    });

    socketService.onPlayerLeft((data) => {
      console.log('Player left:', data.playerId);
      setRoomData(data.room);
      if (data.room && data.room.players) {
        setPlayers(data.room.players);
      }
    });

    socketService.onGameStarted((data) => {
      console.log('Game started:', data);
      setRoomData(data.room);
      setGameState(data.gameState);
      
      // Navigate to game screen
      if (location.pathname !== '/startgame') {
        navigate('/startgame');
      }
    });

    socketService.onHostTransferred((data) => {
      console.log('Host transferred:', data);
      setRoomData(data.room);
    });

    // Cleanup on unmount
    return () => {
      socketService.removeAllListeners('room_update');
      socketService.removeAllListeners('player_joined');
      socketService.removeAllListeners('player_left');
      socketService.removeAllListeners('game_started');
      socketService.removeAllListeners('host_transferred');
    };
  }, []);

  const value = {
    socket,
    connected,
    roomData,
    setRoomData,
    gameState,
    setGameState,
    players,
    setPlayers,
    socketService
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
