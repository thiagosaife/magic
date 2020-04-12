<template>
  <b-card
    no-body
    class="rounded-card image-shadow">
    <b-card-header class="text-left">
      <strong>
        {{ cardInfo.name }}
      </strong>
    </b-card-header>
    <b-row no-gutters>
      <b-col md="6">
        <div id="card-image" />
        <b-spinner
          v-if="loadingImage"
          class="ml-2 image-loader"
          variant="primary"
          label="Spinning" />
      </b-col>
      <b-col md="6">
        <b-card-body>
          <b-card-text v-html="htmlText">
          </b-card-text>
          <p class="text-left flavor">
            <small>{{ cardInfo.flavor }}</small>
          </p>
        </b-card-body>
      </b-col>
    </b-row>
    <b-card-footer>
      <b-row v-if="isLand">
        <b-col cols="12">
          <p
            class="text-left mb-1">
            <strong>
              {{ cardInfo.type }}
            </strong>
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
              class="svg-icon image-shadow"
              height="30"
              width="30"
              v-if="color.number">
              <g>
                <circle
                  cx="15"
                  cy="15"
                  r="10"
                  stroke="#CBC2BF"
                  stroke-width="1"
                  fill="#CBC2BF" />
                <text
                  class="number-icon"
                  x="50%"
                  y="50%"
                  text-anchor="middle"
                  dy=".4em">{{ color.number }}</text>
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
      loadingImage: true,
    };
  },
  mounted() {
    this.getManaCostText(this.cardInfo.text);
    const img = document.createElement('img');
    img.src = this.cardInfo.imageUrl;
    img.onload = () => {
      this.loadingImage = false;
    };
    const imageContainer = document.getElementById('card-image');
    imageContainer.setAttribute('class', 'mt-3 card-image');
    imageContainer.appendChild(img);
  },
  computed: {
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
      const text = this.cardInfo.text || this.cardInfo.flavor;
      this.htmlText = text.replace(regex, (item) => {
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
