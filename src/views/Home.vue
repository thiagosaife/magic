<template>
  <div class="home">
    <b-row>
      <b-col cols="12">
        <MainControls />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="mt-3">
        <MagicCard
          v-if="getCardInfo.id"
          :cardInfo="getCardInfo" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MagicCard from '@/components/MagicCard.vue';
import MainControls from '@/components/MainControls.vue';

export default {
  name: 'Home',
  created() {
    this.EventBus.$on('cardsList', (cardsList) => {
      this.cardsList = cardsList;
    });
  },
  data() {
    return {
      cardsList: [],
    };
  },
  components: {
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
