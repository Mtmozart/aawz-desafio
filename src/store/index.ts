import { IUser, IUserCreate } from '@/interface/user'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { DELETE_USER_API, GET_USERS_API, REGISTRAR_USER_API } from './actions-type'
import clientHttp from '@/http'
import { DEFINE_USER, EXCLUDE_USER, REGISTER_USER } from './mutations-type'

interface State {
  users: IUser[],
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    users: []
  },
  getters: {
  },
  mutations: {
    [REGISTER_USER](state, userDto: IUserCreate) {
      const user: IUser = {
        id: new Date().toISOString(),
        name: userDto.name,
        email: userDto.email,
        address: {
          street: userDto.address.street,
          number: userDto.address.number,
          neighborhood: userDto.address.neighborhood,
          city: userDto.address.city,
          country: userDto.address.country,
          postalCode: userDto.address.postalCode,
          state: userDto.address.state,
          region: userDto.address.region,
          complement: userDto.address.complement,
        }
      }
      state.users.push(user)
      console.log(state.users)
    },
    [DEFINE_USER](state, users: IUser[]) {
      state.users = users;
    },
    [EXCLUDE_USER](state, id: string) {
      state.users = state.users.filter(u => u.id != id);
    }
  },
  actions: {
    [REGISTRAR_USER_API](context, user: IUserCreate) {
      clientHttp.post('/users', { ...user })
        .then(response => console.log(response.data))
    },
    [GET_USERS_API]({ commit }) {
      clientHttp.get('/users')
        .then(response => commit(DEFINE_USER, response.data))
    },
    [DELETE_USER_API]({ commit }, id: string) {
      return clientHttp.delete(`users/${id}`)
        .then(() => commit(EXCLUDE_USER, id))
    }
  },
  modules: {
  }
})


export function useStore(): Store<State> {
  return vuexUseStore(key);
}