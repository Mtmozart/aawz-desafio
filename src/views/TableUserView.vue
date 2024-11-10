<script lang="ts">
import { defineComponent } from 'vue';
import TableUser from '@/components/TableUser.vue';

export default defineComponent({
  name: 'TableUserView',
  components: {  
    TableUser  
  },
});
</script>

<template>
  <TableUser />
</template>