<script setup>

defineProps({
  isOpen: Boolean,
  title: String
});

defineEmits(['close']);
</script>

<template>
  <!-- Sfruttiamo le transizioni native di Vue per gestire l'animazione di entrata/uscita -->
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay" @click="$emit('close')">
      <div class="modal-content" @click.stop>
        <h3 class="title">{{ title }}</h3>
        <slot></slot>
        <span class="btn-close" @click="$emit('close')">x</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  min-height: 200px;
  width: 100%;
}

/* Classi di Transizione di Vue 3 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease;
}

.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
}

/* Stato Iniziale (quando entra) e Stato Finale (quando esce) */
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: scale(0.8);
}

.title{
  margin-bottom: 10px;
}

.btn-close{
  font: 1.8em sans-serif;
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;
}
</style>
