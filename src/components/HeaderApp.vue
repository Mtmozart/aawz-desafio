<template>
  <header class="header">
    <div class="logo">
      <h1>Registro de usuário</h1>
    </div>
    <nav>
      <ul>
        <li> <router-link to="/">Registrar</router-link></li>
        <li> <router-link to="/users-table">Dados</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderApp',
});
</script>

<style scoped>
.header {
  display: flex;
  height: 90px;
  border-bottom: 1px solid var(--branco);
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--preto);
  color: var(--branco);
}

.logo h1 {
  font-size: 1.5rem;
  margin: 0;
}

nav ul {
  display: flex;
  gap: 1rem;
}

nav ul li a {
  color: var(--branco);
  text-decoration: none;
  font-size: 1.2rem;
}

nav ul li a:hover {
  cursor: pointer;
  text-decoration: underline;
  color: var(--cinza);
}
</style>
