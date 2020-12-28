# dsc106-hw4
For this homework, you have to build the graphs with two different ways: Using D3, and using Highcharts. Please have two HTML files: One named d3_chart.html and the other named highchart_chart.html. You also need to create two JavaScript files: One name d3_chart.js and the other named highchart_chart.js.

 

Please use the discussion section code as reference material, start early!

Doing it in HighCharts should take you ~60 minutes, but your mileage with D3 will vary.

Please do stop, and understand what your code (especially with D3!) is doing, otherwise you might find it very difficult to debug.

The rest of the specifications carry over from the previous HW.

 

Visually

- Two charts (described below) that replace the dummy charts from HW2
- Each chart occupies 50% of the available screen width
- The charts themselves are responsive to changing dimensions (i.e. like HW2, it should render correctly regardless of the size of the device it’s being displayed on.)
- The charts are responsive, and dynamic i.e. if a new order is placed, the chart is updated to reflect that
 

Chart #1: Pie Chart

A pie chart is a type of graph in which a circle is divided into sectors that each represent a proportion of the whole.

The data being represented here is the total number of Knives sold vs total number of Forks sold.

 

Requirements

- The chart has basic components - Appropriate numeric cues on segments, and a legend.
- The chart has a caption associated with it.
 

Chart #2: Stacked Bar Chart

A stacked bar chart is a chart that uses bars to show comparisons between categories of data, but with the ability to break down and compare parts of a whole. Each bar in the chart represents a whole, and segments in the bar represent different parts or categories of that whole.

The data that we will be breaking down here is the number of Knives and Forks sold per order.

 

Requirements

- The chart has basic components - labels on both axes, appropriate visual cues for scale, and a legend.
- The chart has a caption associated with it.


Questions:

1. What is the most important attribute to draw the pie chart in the demo video? 
- stroke-dasharray

2. Write down one line of code to construct a quarter circle shown below:
- <circle stroke-dasharray="7.85 100" cx=10 cy=10 r=5 fill=none stroke-width=10 stroke=red />

3. Write down one line of code to construct a continuous line shown below:
- <polyline points="20 20, 100 200, 200 20, 300 200" style="fill: none; stroke: blue; stroke: width 8;"></polyline>
