<template>
  <b-card>
    <b-card-body id="tree-card" />
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { TreeMap } from '@/services/treemap';
import { CollapsibleTree } from '@/services/collapsibleTree';
import Data from '@/data/stats.json';

export default {
  name: 'CardsData',
  data() {
    return {
      Data,
    };
  },
  computed: {
    ...mapGetters([
      'isTree',
    ]),
  },
  mounted() {
    this.selectD3();
  },
  methods: {
    selectD3() {
      const data = this.Data;
      const element = '#tree-card';
      if (this.isTree) {
        TreeMap(data, element);
        return;
      }
      CollapsibleTree(data, element);
    },
  },
  watch: {
    isTree() {
      this.selectD3();
    },
  },
};
</script>
