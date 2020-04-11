<template>
  <b-card
    no-body
    class="image-shadow data-container">
    <b-card-body id="card-body">
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'CardsData',
  props: {
    cardListInfo: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.reducedCardsList = this.reduceCardsList(this.cardListInfo);
    this.createChart();
  },
  data() {
    return {
      keysToKeep: [
        'cmc',
        'name',
        'rarity',
        'artist',
        'power',
        'subtypes',
        'types',
        'toughness',
      ],
      reducedCardsList: [],
    };
  },
  methods: {
    reduceCardsList(cards) {
      return cards.map((item) => this.keysToKeep
        .reduce((acc, card) => {
          acc[card] = item[card];
          return acc;
        }, {}));
    },
    createChart() {
      // const data = this.reducedCardsList;
    },
  },
};
</script>
