<script lang="ts">
import RegisterUser from '@/components/RegisterUser.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {    
    RegisterUser
  },
});
</script>

<template>
 
  <main>
    <RegisterUser />
  </main>

</template>



<style>
</style>
