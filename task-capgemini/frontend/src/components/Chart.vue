<template>
  <svg ref="svgRef" width="450" height="400" class="svg"></svg>
</template>

<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue';
import * as d3 from 'd3';

const props = defineProps({
  chartData: Array,
  selectedItem: Object
});

const svgRef = ref(null);
const emit = defineEmits(['select-item']);


// Update Node Classes Method
const updateNodeClasses = () => {
  if (!svgRef.value) return;
  const svg = d3.select(svgRef.value);
  svg.selectAll(".node")
    .attr("class", d => `node${props.selectedItem && props.selectedItem.name === d.data.name ? ' selected' : ''}`);
};

// Add Chart Method
const addChart = () => {
  const data = props.chartData;

  if (!data) return;

  // Convert data to hierarchy
  const rootData = d3.hierarchy(data[0], d => d.children);

  const svg = d3.select(svgRef.value),
        width = +svg.attr("width"),
        height = +svg.attr("height");

  const g = svg.append("g")
    .attr("transform", "translate(50,0)");

  const tree = d3.tree().size([height, width - 100]);

  const root = tree(rootData);

  // Connections
  const link = g.selectAll(".link")
    .data(root.descendants().slice(1))
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d => `
        M${d.parent.y},${d.parent.x} h 80 V ${d.x}
        L${d.y},${d.x}
    `);

  // Nodes
  const node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("class", d => `node${props.selectedItem && props.selectedItem.name === d.data.name ? ' selected' : ''}`)
    .attr("transform", d => `translate(${d.y},${d.x})`)
    .on("click", (event, d) => {
      emit('select-item', d.data); // Send data on click of the node
    });

  // Rectangles in Nodes
  node.append("rect")
    .attr("width", 80)
    .attr("height", 40)
    .attr("x", -40)
    .attr("y", -20)
    .attr("rx", 4)
    .attr("ry", 4);

  // Text in Nodes
  node.append("text")
    .attr("dy", ".35em")
    .attr("x", 0)
    .attr("y", 0)
    .style("text-anchor", "middle")
    .text(d => d.data.name);

  // Watch on change of selected item
  watch(() => props.selectedItem, () => {
    updateNodeClasses();
  });
};


onMounted(() => {
  addChart();
});
</script>
