import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';
import Magic from '@/store/magic';

const ls = new SecureLS({ encodingType: 'rc4', isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Magic,
  },
  strict: true,
  plugins: process.env.NODE_ENV === 'production' ? [
    createPersistedState({
      storage: {
        setItem: (key, value) => ls.set(key, value),
        getItem: (key) => ls.get(key),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ] : [createPersistedState()],
});
