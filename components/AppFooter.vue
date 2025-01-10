<template>
  <footer class="bg-white w-full p-4">
    <client-only>
      <Vue3Lottie
          animationLink="https://assets10.lottiefiles.com/packages/lf20_soCRuE.json"
          :height="200"
          :width="200"
          :pauseOnHover="true"
      />

      <!-- Affichage du message WebSocket -->
      <div v-if="messages.length" class="mt-4">
        <div v-for="(msg, index) in messages" :key="index">
          <p>{{ msg }}</p>
        </div>
      </div>

      <!-- Clavardage -->
      <input v-model="userMessage" type="text" placeholder="Tapez un message" />
      <button @click="sendMessage">Envoyer</button>
    </client-only>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';

const userMessage = ref('');
const messages = ref([]);

// Connexion au WebSocket lorsque le composant est monté
onMounted(() => {
  const socket = useNuxtApp().$socket;

  // Écouter les messages venant du serveur
  socket.on('message', (data) => {
    messages.value.push(data); // Ajouter le message dans la liste
  });
});

// Fonction pour envoyer le message
const sendMessage = () => {
  const socket = useNuxtApp().$socket;
  // Envoyer le message au serveur WebSocket
  socket.emit('message', userMessage.value);
  messages.value.push('Vous : ' + userMessage.value); // Ajouter le message de l'utilisateur
  userMessage.value = ''; // Réinitialiser le champ de texte
}
</script>
