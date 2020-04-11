<template>
  <b-card
    no-body
    class="rounded-card image-shadow">
    <b-card-header>
      {{ cardInfo.name }}
    </b-card-header>
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img
          :src="cardInfo.imageUrl"
          class="card-image"/>
      </b-col>
      <b-col md="6">
        <b-card-body>
          <b-card-text v-html="htmlText">
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
    <b-card-footer>
      <b-row v-if="isLand">
        <b-col cols="12">
          <p
            class="text-left mb-1">
            {{ cardInfo.type }}
          </p>
        </b-col>
      </b-row>
      <div v-else>
        <b-row>
          <b-col cols="12">
            <p
              class="text-left mb-1">
              Mana Cost: {{ cardInfo.cmc }}
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            cols="1"
            class="icon-column"
            v-for="(color, index) in getManaCostIcon(cardInfo.manaCost)"
            :key="index">
            <svg
              class="image-shadow"
              height="30"
              width="30"
              v-if="color.number">
              <g>
                <circle
                  cx="15"
                  cy="15"
                  r="11"
                  stroke="#CBC2BF"
                  stroke-width="1"
                  fill="#CBC2BF" />
                <text
                  class="number-icon"
                  x="50%"
                  y="50%"
                  text-anchor="middle"
                  dy=".3em">{{ color.number }}</text>
              </g>
            </svg>
            <img
              v-else
              class="mana-icon ml-1 mt-1 image-shadow"
              :src="require(`@/assets/mana/${color}.png`)" />
          </b-col>
        </b-row>
      </div>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  name: 'MagicCard',
  props: {
    cardInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      htmlText: '',
    };
  },
  created() {
    this.getManaCostText(this.cardInfo.text);
  },
  computed: {
    getInfoColors() {
      return this.cardInfo.colors;
    },
    getInfoTypes() {
      return this.cardInfo.types;
    },
    isLand() {
      const regex = /land/gi;
      return this.cardInfo.type.match(regex);
    },
  },
  methods: {
    getManaCostIcon(text) {
      const regex = /\{.*?\}/g;
      return text.match(regex)
        .map((item) => item.replace(/\{|\}/gi, ''))
        .map((item) => {
          if (!isNaN(item)) return { number: item };
          return item;
        });
    },
    getManaCostText() {
      const regex = /{([^}]+)}/g;
      this.htmlText = this.cardInfo.text.replace(regex, (item) => {
        const matched = item.replace(/\{|\}/gi, '');
        if (!isNaN(matched)) {
          return `<svg
            class="image-shadow"
            height="30"
            width="30">
            <g>
              <circle
                cx="15"
                cy="15"
                r="11"
                stroke="#CBC2BF"
                stroke-width="1"
                fill="#CBC2BF"/>
              <text
                class="number-icon"
                x="50%"
                y="50%"
                text-anchor="middle"
                dy=".3em">${matched}</text>
            </g>
          </svg>`;
        }
        const src = require(`@/assets/mana/${matched}.png`);
        return `<img class="mana-icon image-shadow" src="${src}" />`;
      });
    },
  },
};
</script>
