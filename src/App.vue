<script lang="ts">
import { defineComponent } from 'vue';
import HeaderApp from './components/HeaderApp.vue';
import NotificationUser from './components/NotificationUser.vue';

export default defineComponent({
  name: 'App',
  components: {
    HeaderApp, NotificationUser
  },
});
</script>

<template>
  <HeaderApp />
  <main>
    <NotificationUser />
    <router-view></router-view>    
  </main>

</template>



<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600&display=swap');

:root {
  --verde: #b7e1a7;
  --cinza: #e7e7e2;
  --preto: #22221f;
  --branco: #FFF;

  --font-family-padrao: "Plus Jakarta Sans", sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

ul,
li {
  list-style: none;
}

button {
  border: 0;
  background-color: inherit;
  font: inherit;
}

body {
  min-height: 100vh;
  color: var(--branco);
  font-family: var(--font-family-padrao);
  font-size: 1rem;
  font-weight: 400;
  font-style: normal;
  background: var(--preto);
}

.titulo {
  font-size: 1.9375em;
  line-height: 150%;

}

.paragrafo {
  font-size: 1.375em;
  line-height: 150%;

}

.paragrafo {
  font-size: 1.125em;
  line-height: 150%;

}

@media only screen and (max-width: 767px) {


  .titulo {
    font-size: 1.625em;
  }
}
</style>
