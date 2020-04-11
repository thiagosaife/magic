const path = 'https://api.magicthegathering.io/v1/';
const axios = require('axios');

export default {
  state: {
    cardInfo: {},
  },
  getters: {
    getCardInfo: (state) => state.cardInfo,
  },
  actions: {
    GetCardById({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${path}cards/${id}`)
          .then((res) => {
            commit('setCardInfo', res.data.card);
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  mutations: {
    setCardInfo(state, cardInfo) {
      state.cardInfo = cardInfo;
    },
    setEmptyCardInfo(state) {
      state.cardInfo = {};
    },
  },
};
