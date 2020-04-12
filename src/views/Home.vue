<template>
  <div class="home">
    <b-row>
      <b-col cols="12">
        <MainControls />
      </b-col>
    </b-row>
    <d-row v-if="showAlert">
      <b-col cols="12" class="mt-3">
        <Alert
          :alertMessage="alertMessage"/>
      </b-col>
    </d-row>
    <b-row>
      <b-col cols="12" class="mt-3">
        <CardsData v-if="isCardsData" />
        <MagicCard
          v-if="getCardInfo.id && !isCardsData"
          :cardInfo="getCardInfo" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Alert from '@/components/Alert.vue';
import CardsData from '@/components/CardsData.vue';
import MagicCard from '@/components/MagicCard.vue';
import MainControls from '@/components/MainControls.vue';

export default {
  name: 'Home',
  created() {
    this.EventBus.$on('cardInfo', () => {
      this.setCardsData(false);
    });
    this.EventBus.$on('hideAlert', () => {
      this.showAlert = false;
    });
    this.EventBus.$on('magicStats', () => {
      this.setCardsData(true);
    });
    this.EventBus.$on('showAlert', (id) => {
      this.alertMessage = id;
      this.showAlert = true;
    });
  },
  data() {
    return {
      alertMessage: '',
      showAlert: false,
    };
  },
  components: {
    Alert,
    CardsData,
    MagicCard,
    MainControls,
  },
  computed: {
    ...mapGetters([
      'getCardInfo',
      'isCardsData',
    ]),
  },
  methods: {
    ...mapMutations([
      'setCardsData',
    ]),
  },
};
</script>
