<script lang="ts">
import { useStore } from '@/store';
import { DELETE_USER_API, GET_USERS_API } from '@/store/actions-type';
import { computed, defineComponent } from 'vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';


export default defineComponent({
  name: 'TableUser',
  components: { 
    DeleteIcon   
  },
  methods: {
    async deleteUser (id: string){
      if (!id) {
        console.log('ID inválido');
        return;
      }
      
      try {
       
        await this.store.dispatch(DELETE_USER_API, id);
        console.log(`Usuário com ID ${id} deletado com sucesso.`);
      } catch (error) {
        console.error('Erro ao deletar o usuário:', error);
      }
    }
  },
  setup(){
    const store = useStore();
    store.dispatch(GET_USERS_API)
    return {
      users: computed(() =>store.state.users),
      store
    }

  }
});
</script>

<template>
  <section class="user-table">
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Rua</th>
          <th>Número</th>
          <th>Bairro</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>CEP</th>
          <th>Complemento</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address.street }}</td>
          <td>{{ user.address.number }}</td>
          <td>{{ user.address.neighborhood }}</td>
          <td>{{ user.address.city }}</td>
          <td>{{ user.address.state }}</td>
          <td>{{ user.address.postalCode }}</td>
          <td>{{ user.address.complement || 'N/A' }}</td>
          <td class="button-delete">
            <button @click="deleteUser(user.id)">
              <DeleteIcon />
            </button>
          </td>  </tr>
        
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.user-table {
  width: 80%;
  margin: 20px auto;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  
}

th, td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

thead th {
  background-color: var(--verde);
  font-weight: bold;
}

tbody tr {
  background-color: var(--branco);
}
th {
  text-transform: uppercase;
  font-size: 0.875rem;
  color: var(--preto);
}

td {
  font-size: 0.875rem;
  color: var(--preto);
}

section {
  padding: 16px;
}
.button-delete {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-delete button {
 cursor: pointer;
}
</style>
