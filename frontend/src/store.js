import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
        role: null
      }
    },
    mutations: {
        normalUser (state) {
          state.role = 1;
        },
        corporateUser (state) {
          state.role = 2;
        }
    }
})

export default store;
