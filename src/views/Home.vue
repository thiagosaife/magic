<template>
  <div class="home">
    <b-row>
      <b-col cols="12">
        <MainControls />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="mt-3">
        <CardsData v-if="cardsData" />
        <MagicCard
          v-if="getCardInfo.id && !cardsData"
          :cardInfo="getCardInfo" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardsData from '@/components/CardsData.vue';
import MagicCard from '@/components/MagicCard.vue';
import MainControls from '@/components/MainControls.vue';

export default {
  name: 'Home',
  created() {
    this.EventBus.$on('cardInfo', () => {
      this.cardsData = false;
    });
    this.EventBus.$on('magicStats', () => {
      this.cardsData = true;
    });
  },
  data() {
    return {
      cardsData: false,
    };
  },
  components: {
    CardsData,
    MagicCard,
    MainControls,
  },
  computed: {
    ...mapGetters([
      'getCardInfo',
    ]),
  },
};
</script>
