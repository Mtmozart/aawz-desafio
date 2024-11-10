<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'DataUsers',
  
  setup() {
    const store = useStore();
    const users = computed(() => store.state.users);

   
    const userCount = computed(() => store.state.users.length);

    return {
      users,
      userCount
    };
  }
});
</script>

<template>
  <main>
    <p>Total de usuários registrados: {{ userCount }}</p>
  </main>
</template>

<style>
/* Estilos aqui */
</style>
