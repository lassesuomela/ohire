import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
        role: null,
        uuid: null,
      }
    },
    mutations: {
        normalUser (state) {
          state.role = 1;
        },
        corporateUser (state) {
          state.role = 2;
        },
        changeUuid (state, newUuid) {
          state.uuid = newUuid;
        },
    }
})

export default store;
