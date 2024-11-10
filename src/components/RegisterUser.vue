<script lang="ts">
import { defineComponent } from 'vue';
import FormRegisterUser from './FormRegisterUser.vue';



export default defineComponent({
  name: 'RegisterUser',
  components: { FormRegisterUser},
});
</script>
<template>
  <div class="registerContainer">
 <FormRegisterUser />
 </div>
</template>


<style scoped>
.registerContainer{
  padding: 40px;
}
</style>
