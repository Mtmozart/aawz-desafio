<script lang="ts">
import { useStore } from '@/store';
import { DELETE_USER_API, GET_USERS_API } from '@/store/actions-type';
import { computed, defineComponent, ref } from 'vue';
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
    const users = computed(() => store.state.users);
    const currentPage = ref(1);
    const itemsPerPage = 10;

    const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage));

    const paginatedUsers = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return users.value.slice(start, end);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };
    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    return {
      paginatedUsers,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
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
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address.street }}</td>
          <td>{{ user.address.number }}</td>
          <td>{{ user.address.neighborhood }}</td>
          <td>{{ user.address.city }}</td>
          <td>{{ user.address.state }}</td>
          <td>{{ user.address.postalCode }}</td>
          <td>{{ user.address.complement || 'N/A' }}</td>
          <td>
            <button @click="deleteUser(user.id)">
              <DeleteIcon />
            </button>
          </td>
        </tr>        
      </tbody>
      
    </table>
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1"><strong>Anterior</strong></button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"><strong>Próxima</strong></button>
    </div>  
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

td button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent; 
  border: none;
  cursor: pointer;
  padding: 8px;
}

td button:hover {
  background-color: rgba(0, 0, 0, 0.1); 
  border-radius: 4px; 
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

.pagination-controls {  
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--verde);
}

.pagination-controls button {
  margin: 0 5px;
  padding: 8px 12px;
  cursor: pointer;
}

.pagination-controls button:hover {
  text-decoration: underline;
}
</style>
