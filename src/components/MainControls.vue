<template>
  <b-form
    @submit.prevent="id ? getCardById() : null"
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
        Mana Stats
    </b-button>
    <b-spinner
      v-if="loadingCard"
      class="ml-2"
      variant="primary"
      label="Spinning" />
    <div v-if="isCardsData">
      <b-form-checkbox
        class="ml-2"
        v-model="treeStatus"
        name="check-button"
        switch>
        {{ isTree ?  'TreeMap' : 'Collapsible'}}
      </b-form-checkbox>
    </div>
  </b-form>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'MainControls',
  data() {
    return {
      id: null,
      loadingCard: false,
    };
  },
  computed: {
    ...mapGetters([
      'isCardsData',
      'isTree',
    ]),
    treeStatus: {
      get() {
        return this.isTree;
      },
      set() {
        this.setTreeOrCollapsible();
      },
    },
  },
  methods: {
    ...mapActions([
      'GetCardById',
    ]),
    ...mapMutations([
      'setEmptyCardInfo',
      'setTreeOrCollapsible',
    ]),
    createData() {
      this.setEmptyCardInfo();
      this.EventBus.$emit('hideAlert');
      this.EventBus.$emit('magicStats');
    },
    getCardById() {
      this.setEmptyCardInfo();
      this.EventBus.$emit('hideAlert');
      this.EventBus.$emit('cardInfo');
      this.loadingCard = true;
      this.GetCardById(this.id)
        .then((res) => {
          console.log('res =>', res);
          this.loadingCard = false;
        })
        .catch(() => {
          this.loadingCard = false;
          this.EventBus.$emit('showAlert', this.id);
        });
    },
  },
};
</script>
