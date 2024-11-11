<script lang="ts">

import { findByCep } from '@/http/cep';
import { useStore } from '@/store';
import { REGISTRAR_USER_API } from '@/store/actions-type';
import { zipCodeMask } from '@/util';
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import { computed, defineComponent, reactive, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { StateEnum } from '@/interface/user';
import { toast } from 'vue3-toastify';

export default defineComponent({
  name: "FormRegisterUser",

  methods: {
    zipCodeMask() {
      this.data.postalCode = zipCodeMask(this.data.postalCode);
      if(this.data.postalCode.length == 9){
        this.findAddressByCep(this.data.postalCode)
      }
      
    },
    async findAddressByCep(cep: string) {
      try {         
        const addressData = await findByCep(cep);
        if (addressData) {
          this.data.street = addressData.data.logradouro;
          this.data.number = addressData.data.numero;
          this.data.neighborhood = addressData.data.bairro;
          this.data.city = addressData.data.localidade;
          this.data.state = Object.keys(StateEnum).find(
          key => StateEnum[key as keyof typeof StateEnum] === addressData.data.estado
          ) || '';
          this.data.country = addressData.data.pais;
          this.data.complement = addressData.data.complemento;
          this.data.country = 'Brasil'
          this.data.region = addressData.data.regiao;
          toast.success('Dados buscado com sucesso.')
        } 
      } catch (error) {
        toast.error('Erro ao buscar o endereço.')
      }
    },
  },
  setup() {
    const store = useStore();
    const stateOptions = computed(() => StateEnum);
    const resetForm = () => {
      data.name = '';
      data.email = '';
      data.origin = ''
      data.street = '';
      data.number = '';
      data.complement = '';
      data.neighborhood = '';
      data.city = '';
      data.state = '';
      data.postalCode = '';
      data.country = '';
      data.region = ''; 
      v.value.$reset(); 
      submitted.value = false; 
    };

    const data = reactive({
      name: '',
      email: '',
      origin: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      region: ''
    });

    const rules = {
      name: { required, minLength: minLength(3) },
      email: { required, email },
      origin: { required },
      street: { required },
      number: { required },
      neighborhood: { required },
      city: { required },
      state: { required },
      postalCode: { required },
      country: { required }
    };

    const v = useVuelidate(rules, data);
    const onBlur = (field: keyof typeof data) => {
      v.value[field].$touch();
    };
    const submitted = ref(false);


    const submitForm = () => {
      submitted.value = true;
      if (!v.value.$invalid) {
        const newUser = {
          id: uuidv4(),
          name: data.name,
          email: data.email,
          origin: data.origin,
          address: {            
            street: data.street,
            number: data.number,
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            country: data.country,
            complement: data.complement,
            region: data.region 
          }
        };
        store.dispatch(REGISTRAR_USER_API, newUser)
        resetForm()
        toast.success("Usuário registrado com sucesso.")
      } else {
        toast.error("Formulário inválido, verifique os campos.")       
      }
    };

    return {
      data,
      v,
      store,
      stateOptions,
      users: computed(() => store.state.users),
      submitForm,
      onBlur,
    };
  },
});
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="data.name" placeholder="Digite o nome" 
         @blur="onBlur('name')"  
        />
        <div  v-if="v.name.$dirty && v.name.$invalid" class="error">
          Nome é obrigatório e deve ter no mínimo 3 caracteres.
        </div>
      </div>

      <div>
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="data.email" placeholder="Digite o e-mail" @blur="onBlur('email')"  />
        <div v-if="!v.$pending && v.email.$dirty && !v.email.$pending && v.email.$invalid" class="error">
          E-mail é obrigatório e inválido.
        </div>
      </div>
      <div>
         <label for="origin">Origem do usuário:</label>
         <select id="origin" v-model="data.origin" @blur="onBlur('origin')">
              <option value="" disabled>Selecione a origem</option>
              <option value="digital">Digital</option>
              <option value="física">Física</option>
          </select>
           <div v-if="!v.$pending && v.origin.$dirty && !v.origin.$pending && v.origin.$invalid" class="error">
              Origem é obrigatória.
           </div>
      </div>
      <div>
        <label for="postalCode">CEP:</label>
        <input type="text" id="postalCode" v-model="data.postalCode" placeholder="Digite o CEP" 
        @blur="onBlur('postalCode')"
        @input="zipCodeMask"
       
        />
        <div v-if="!v.$pending && v.postalCode.$dirty && !v.postalCode.$pending && v.postalCode.$invalid" class="error">
          CEP é obrigatório.
        </div>
      </div>
      <div>
        <label for="street">Rua:</label>
        <input type="text" id="street" v-model="data.street" placeholder="Digite a rua" @blur="onBlur('street')"/>
        <div v-if="!v.$pending && v.street.$dirty && !v.street.$pending && v.street.$invalid" class="error">
          Rua é obrigatória.
        </div>
      </div>
      <div>
        <label for="number">Número:</label>
        <input type="text" id="number" v-model="data.number" placeholder="Digite o número" @blur="onBlur('number')"/>
        <div v-if="!v.$pending && v.number.$dirty && !v.number.$pending && v.number.$invalid" class="error">
          Número é obrigatório.
        </div>
      </div>
      <div>
        <label for="complement">Complemento:</label>
        <input type="text" id="complement" v-model="data.complement" placeholder="Digite o complemento"/>
      </div>
     <div>
        <label for="neighborhood">Bairro:</label>
        <input type="text" id="neighborhood" v-model="data.neighborhood" placeholder="Digite o bairro" @blur="onBlur('neighborhood')"/>
        <div v-if="!v.$pending && v.neighborhood.$dirty && !v.neighborhood.$pending && v.neighborhood.$invalid" class="error">
          Bairro é obrigatório.
        </div>
      </div>
      <div>
        <label for="city">Cidade:</label>
        <input type="text" id="city" v-model="data.city" placeholder="Digite a cidade" @blur="onBlur('city')"/>
        <div v-if="!v.$pending && v.city.$dirty && !v.city.$pending && v.city.$invalid" class="error">
          Cidade é obrigatória.
        </div>
      </div>
      <div>
      <label for="state">Estado:</label>
      <select id="state" v-model="data.state" @blur="onBlur('state')">
          <option value="" disabled>Selecione o estado</option>
          <option v-for="(name, code) in stateOptions" :key="code" :value="code">
            {{ name }}
          </option>
      </select>
      <div v-if="!v.$pending && v.state.$dirty && !v.state.$pending && v.state.$invalid" class="error">
        Estado é obrigatório.
      </div>
      </div>
      <div>
        <label for="country">País:</label>
        <input type="text" id="country" v-model="data.country" placeholder="Digite o país" @blur="onBlur('country')"/>
        <div v-if="!v.$pending && v.country.$dirty && !v.country.$pending && v.country.$invalid" class="error">
          País é obrigatório.
        </div>
      </div>
      <div class="button__container">
        <button type="submit">Registrar Usuário</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--cinza);
  border-radius: 8px;
  color: var(--preto);
}

form div {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: var(--branco);
  color: var(--preto);
  transition: border-color 0.3s ease;
}

input:focus, select:focus {
  border-color: #4CAF50;
  outline: none;
}

.button__container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

button {  
  padding: 10px 20px;
  background-color: #4CAF50;
  color: var(--branco);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: var(--branco);
  border: 1px solid var(--preto);
  color: var(--preto);
}

button:disabled {
  background-color: #ddd;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>

