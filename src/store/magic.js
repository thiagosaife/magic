const path = 'https://api.magicthegathering.io/v1/';
const axios = require('axios');

export default {
  state: {
    cardsData: false,
    cardInfo: {},
    isTree: false,
  },
  getters: {
    getCardInfo: (state) => state.cardInfo,
    isCardsData: (state) => state.cardsData,
    isTree: (state) => state.isTree,
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
    setCardsData(state, status) {
      state.cardsData = status;
    },
    setCardInfo(state, cardInfo) {
      state.cardInfo = cardInfo;
    },
    setEmptyCardInfo(state) {
      state.cardInfo = {};
    },
    setTreeOrCollapsible(state) {
      state.isTree = !state.isTree;
    },
  },
};
