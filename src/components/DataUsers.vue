<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'DataUsers',
  
  setup() {
    const store = useStore();
    const users = computed(() => store.state.users);   
    const userCount = computed(() => store.state.users.length);
    const digitalUsers = store.state.users.filter(user => user.origin === 'digital').length;
    const physicalUsers = store.state.users.filter(user => user.origin === 'física').length;

    return {
      users,
      userCount,
      digitalUsers,
      physicalUsers
    };
  }
});
</script>
<template>
  <main>
    <table class="user-data-table">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total de usuários registrados</td>
          <td>{{ userCount }}</td>
        </tr>
        <tr>
          <td>Total de usuários de origem física</td>
          <td>{{ physicalUsers }}</td>
        </tr>
        <tr>
          <td>Total de usuários de origem digital</td>
          <td>{{ digitalUsers }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style>
.user-data-table {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  border-collapse: collapse;
}

.user-data-table th,
.user-data-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
}

.user-data-table thead {
  background-color: var(--verde);
  color: var(--branco);
}

.user-data-table th {
  font-size: 18px;
}

.user-data-table td {
  font-size: 16px;
}
</style>