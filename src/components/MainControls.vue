<template>
  <b-form
    @submit.prevent="getCardById"
    inline>
    <label
      class="sr-only"
      for="inline-form-input-card-id">
        Card
    </label>
    <b-input-group
      prepend="ID"
      class="mb-2 mr-sm-2 mb-sm-0">
      <b-input
        id="inline-form-input-card-id"
        placeholder="Card"
        v-model="id"/>
    </b-input-group>
    <b-button
      type="submit"
      variant="primary">
        Procurar
    </b-button>
    <b-button
      @click="createData"
      class="ml-2"
      type="button"
      variant="primary">
        Criar dados
    </b-button>
    <b-spinner
      v-if="loadingCard"
      class="ml-2"
      variant="primary"
      label="Spinning" />
  </b-form>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { Cards } from '@/services/cards';

export default {
  name: 'MainControls',
  data() {
    return {
      id: null,
      loadingCard: false,
    };
  },
  methods: {
    ...mapActions([
      'GetCardById',
    ]),
    ...mapMutations([
      'setEmptyCardInfo',
    ]),
    createData() {
      this.setEmptyCardInfo();
      this.loadingCard = true;
      Cards()
        .then((res) => {
          this.loadingCard = false;
          this.EventBus.$emit('cardsList', res);
        })
        .catch((err) => console.log('err =>', err));
    },
    getCardById() {
      this.setEmptyCardInfo();
      this.loadingCard = true;
      this.GetCardById(this.id)
        .then((res) => {
          console.log('res =>', res);
          this.loadingCard = false;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
