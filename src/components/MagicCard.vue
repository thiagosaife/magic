<template>
  <b-card
    no-body
    class="rounded-card image-shadow">
    <b-card-header class="text-left pb-0">
      <b-row>
        <b-col cols="6">
          <strong>
            {{ cardInfo.name }}
          </strong>
        </b-col>
        <b-col cols="6">
          <p class="float-right text-right">
            <small>{{ cardInfo.type }}</small>
          </p>
          <img
            class="float-right symbol-icon mr-2 image-shadow"
            :src="getTypeSymbol()" />
        </b-col>
      </b-row>
    </b-card-header>
    <b-card-body class="p-1">
      <b-row no-gutters>
        <b-col md="6">
          <div id="card-image" />
          <b-spinner
            v-if="loadingImage"
            class="ml-2 image-loader"
            variant="primary"
            label="Spinning" />
        </b-col>
        <b-col md="6" class="pt-3 pr-3">
          <b-card-text v-html="htmlText" />
          <p class="text-left flavor">
            <small>{{ cardInfo.flavor }}</small>
          </p>
          <b-list-group>
            <b-list-group-item
              v-for="(item, index) in getInfoItems"
              :key="index"
              class="p-1 pl-3 group-item text-left"
              href="#">
                <strong><i>{{ item.label }}: </i></strong>
                {{ item.value }}
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-card-body>
    <b-card-footer>
      <b-row>
        <b-col cols="6">
          <div v-if="isLand">
            <p
              class="text-left mb-1">
              <strong>
                {{ cardInfo.type }}
              </strong>
            </p>
          </div>
          <div v-else>
            <b-row>
              <b-col cols="12">
                <p
                  class="text-left mb-1">
                  <small>
                    <strong>Mana Cost: </strong>{{ cardInfo.cmc }}
                  </small>
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
                  class="mana-icon ml-1 image-shadow"
                  :src="require(`@/assets/mana/${color}.png`)" />
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col cols="6">
          <div v-if="getPowerToughness">
            <p class="text-right pt-label">
              <small>
                <strong>Power/Toughness</strong>
              </small>
            </p>
            <p class="text-right pt-info">
              <strong>{{ getPowerToughness }}</strong>
            </p>
          </div>
        </b-col>
      </b-row>
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
    getInfoItems() {
      const infoTypes = [
        {
          label: 'Rarity',
          value: this.cardInfo.rarity,
        },
        {
          label: 'Artist',
          value: this.cardInfo.artist,
        },
        {
          label: 'Number',
          value: this.cardInfo.number,
        },
        {
          label: 'Set name',
          value: this.cardInfo.setName,
        },
        {
          label: 'Multiverse ID',
          value: this.cardInfo.multiverseid,
        },
      ];
      const validInfos = infoTypes.filter((item) => item.value);
      return validInfos;
    },
    getInfoTypes() {
      return this.cardInfo.types;
    },
    getPowerToughness() {
      if (!this.cardInfo.power || !this.cardInfo.toughness) {
        return false;
      }
      return `${this.cardInfo.power}/${this.cardInfo.toughness}`;
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
    getTypeSymbol() {
      const symbol = `${this.cardInfo.types[0]}_symbol`;
      return require(`@/assets/mana/${symbol}.png`);
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
        return `<img class="text-icon image-shadow" src="${src}" />`;
      });
    },
  },
};
</script>
