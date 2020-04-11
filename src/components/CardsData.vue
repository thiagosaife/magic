<template>
  <b-card
    no-body>
    <b-card-body id="data-card" />
  </b-card>
</template>

<script>
import * as d3 from 'd3';
import Data from '@/data/stats.json';

export default {
  name: 'CardsData',
  data() {
    return {
      Data,
      width: 954,
    };
  },
  mounted() {
    this.createGraph();
  },
  methods: {
    createGraph() {
      const root = this.tree(this.Data);
      let x0 = Infinity;
      let x1 = -x0;
      root.each((d) => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
      });
      const svg = d3.select('#data-card')
        .append('svg')
        .attr('viewBox', [0, 0, this.width, x1 - x0 + root.dx * 2]);

      const g = svg.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('transform', `translate(${root.dy / 3},${root.dx - x0})`);
      g.append('g')
        .attr('fill', 'none')
        .attr('stroke-opacity', 0.4)
        .attr('stroke-width', 1.5)
        .selectAll('path')
        .data(root.links())
        .join('path')
        .attr('d', d3.linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x))
        .attr('stroke', (d) => (d.source.depth === 1 ? d.source.data.color : '#555'));

      const node = g.append('g')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-width', 3)
        .selectAll('g')
        .data(root.descendants())
        .join('g')
        .attr('transform', (d) => `translate(${d.y},${d.x})`);
      node.append('image')
        .attr('xlink:href', (d) => (d.depth === 1
          ? `${require(`@/assets/mana/${d.data.name}.png`)}` : ''))
        .attr('x', -8)
        .attr('y', -8)
        .attr('width', 16)
        .attr('height', 16);
      node.append('circle')
        .attr('fill', (d) => (d.depth === 2 ? d.parent.data.color : '#999'))
        .attr('fill-opacity', (d) => (d.depth === 1 ? '0' : '1'))
        .attr('r', 2.5);
      node.append('text')
        .attr('dy', '0.31em')
        .attr('x', (d) => (d.children ? -6 : 6))
        .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
        .text((d) => (d.depth === 1 ? '' : d.data.name))
        .clone(true)
        .lower()
        .attr('stroke', 'white');
      node.append('text')
        .attr('dy', '0.31em')
        .attr('x', (d) => (d.children ? -80 : 80))
        .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
        .text((d) => (d.depth === 2 ? `(${d.data.value})` : ''))
        .clone(true)
        .lower()
        .attr('stroke', 'white');

      return svg.node();
    },
    tree(data) {
      const root = d3.hierarchy(data);
      root.dx = 10;
      root.dy = this.width / (root.height + 1);
      return d3.tree().nodeSize([root.dx, root.dy])(root);
    },
  },
};
</script>
