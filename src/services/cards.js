const path = 'https://api.magicthegathering.io/v1/';
const axios = require('axios');

export function Cards(page) {
  return new Promise((resolve, reject) => {
    axios.get(`${path}cards?page=${page || ''}`)
      .then((res) => {
        resolve(res.data.cards);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
