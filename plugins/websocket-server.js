import { io } from 'socket.io-client';

export default defineNuxtPlugin(nuxtApp => {
  const socket = io('http://localhost:8080'); // Connexion au serveur WebSocket

  // Fournir le socket à l'application
  nuxtApp.provide('socket', socket);
});
