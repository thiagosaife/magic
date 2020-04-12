import * as d3 from 'd3';

const dx = 10;
const width = 954;
const dy = 350;
const diagonal = d3.linkHorizontal().x((d) => d.y).y((d) => d.x);
const tree = d3.tree()
  .nodeSize([dx, dy])
  .separation((a, b) => (a.depth === 1 ? 2 : a.parent === b.parent ? 1 : 2));
const margin = ({
  top: 10, right: 120, bottom: 10, left: 40,
});

export function CollapsibleTree(data, element) {
  const root = d3.hierarchy(data);

  root.x0 = dy / 2;
  root.y0 = 0;
  root.descendants().forEach((d, i) => {
    d.id = i;
    d._children = d.children;
    if (d.depth && d.data.name.length !== 7) d.children = null;
  });

  d3.select(element).selectAll('svg').remove();
  const svg = d3.select(element)
    .append('svg')
    .attr('viewBox', [-margin.left, -margin.top, width, dx])
    .attr('style', 'background-color:#e9ecef')
    .style('font', '10px sans-serif')
    .style('user-select', 'none');

  const gLink = svg.append('g')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5);

  const gNode = svg.append('g')
    .attr('cursor', 'pointer')
    .attr('pointer-events', 'all');

  function update(source) {
    const duration = d3.event && d3.event.altKey ? 2500 : 250;
    const nodes = root.descendants().reverse();
    const links = root.links();

    // cluster(root);
    tree(root);

    let left = root;
    let right = root;
    root.eachBefore((node) => {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
    });

    const height = right.x - left.x + margin.top + margin.bottom;

    const transition = svg.transition()
      .duration(duration)
      .attr('viewBox', [-margin.left, left.x - margin.top, width, height])
      .tween('resize', window.ResizeObserver ? null : () => () => svg.dispatch('toggle'));

    const node = gNode.selectAll('g')
      .data(nodes, (d) => d.id);

    const nodeEnter = node.enter().append('g')
      .attr('transform', () => `translate(${source.y0},${source.x0})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .on('click', (d) => {
        d.children = d.children ? null : d._children;
        update(d);
      });
    nodeEnter.append('image')
      .attr('xlink:href', (d) => (d.depth === 1
        ? `${require(`@/assets/mana/${d.data.name}.png`)}` : ''))
      .attr('x', -8)
      .attr('y', -8)
      .attr('width', 16)
      .attr('height', 16);
    nodeEnter.append('circle')
      .attr('r', 2.5)
      .attr('fill', (d) => (d._children ? '#555' : '#999'))
      .attr('fill-opacity', (d) => (d.depth === 1 ? '0' : '1'))
      .attr('stroke-width', 10);
    nodeEnter.append('text')
      .attr('dy', '0.31em')
      .attr('x', (d) => (d._children ? -6 : 6))
      .attr('text-anchor', (d) => (d._children ? 'end' : 'start'))
      .text((d) => (d.depth === 1 ? '' : d.data.name))
      .clone(true)
      .lower()
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .attr('stroke', 'white');
    nodeEnter.append('text')
      .attr('dy', '0.31em')
      .attr('x', (d) => (d._children ? -80 : 80))
      .attr('text-anchor', (d) => (d._children ? 'end' : 'start'))
      .text((d) => (d.depth === 2 ? `(${d.data.value})` : ''))
      .clone(true)
      .lower()
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .attr('stroke', 'white');

    node.merge(nodeEnter).transition(transition)
      .attr('transform', (d) => `translate(${d.y},${d.x})`)
      .attr('fill-opacity', 1)
      .attr('stroke-opacity', 1);

    node.exit().transition(transition).remove()
      .attr('transform', () => `translate(${source.y},${source.x})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0);

    const link = gLink.selectAll('path')
      .data(links, (d) => d.target.id);

    const linkEnter = link.enter().append('path')
      .attr('d', () => {
        const o = { x: source.x0, y: source.y0 };
        return diagonal({ source: o, target: o });
      });

    link.merge(linkEnter).transition(transition)
      .attr('d', diagonal);

    link.exit().transition(transition).remove()
      .attr('d', () => {
        const o = { x: source.x, y: source.y };
        return diagonal({ source: o, target: o });
      });

    root.eachBefore((d) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  update(root);

  return svg.node();
}
