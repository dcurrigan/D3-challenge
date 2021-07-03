
function makeResponsive() {


    // clear svg if not empty
    var svgArea = d3.select("body").select("svg");
      
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    // SET SVG DIMENSIONS
    // SVG wrapper dimensions determined by current width/height of browser window.
    var svgWidth = (window.innerWidth / 1.75);
    var svgHeight = (window.innerHeight / 1.75);
  
    var margin = {
      top: 50,
      bottom: 100,
      right: 100,
      left: 100
    };
  
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    // Append SVG element
    var svg = d3.select("#scatter") 
      .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth); 
  
    // Append group element
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
      

    // SET LENGEND DIMENSIONS
    var legendFullHeight = height;
    var legendFullWidth = 50;
    var legendMargin = { top: 20, bottom: 20, left: 5, right: 20 };

    var legendWidth = legendFullWidth - legendMargin.left - legendMargin.right;
    var legendHeight = legendFullHeight - legendMargin.top - legendMargin.bottom;



    // READ CSV FROM FILE
    d3.csv("assets/data/data.csv").then(function(censusData) {
   
        // Convert the data to numerical 
        censusData.forEach(function(data) {
         data.healthcare = +data.healthcare;
         data.poverty = +data.poverty;
         data.age = +data.age;
         data.income = +data.income;
         data.obesity = +data.obesity;
         data.smokes = +data.smokes;
        });

  
        // CREATE SCALES
        // returns scale for x-axes
        function x_scaler(data) {
          var dataRange =  d3.max(censusData.map(d => d[data])) - d3.min(censusData.map(d => d[data]))
          var buffer = dataRange/8
          return d3.scaleLinear()
            .domain([(d3.min(censusData, d => d[data]))- buffer, (d3.max(censusData, d => d[data]))+buffer])
            .range([0, width]);
        };
        // returns scale for y-axes
        function y_scaler(data) {
          var dataRange =  d3.max(censusData.map(d => d[data])) - d3.min(censusData.map(d => d[data]))
          var buffer = dataRange/8
          return d3.scaleLinear()
            .domain([(d3.min(censusData, d => d[data]))- buffer, (d3.max(censusData, d => d[data]))+buffer])
            .range([height, 0]);
        };

        // returns scale for scatter colours
        function colour_scaler(data) {
          return d3.scaleQuantize()
            .domain([(d3.min(censusData, d => d[data])), (d3.max(censusData, d => d[data]))])  
            .range(['#E7F1D7', '#D0E7BD', '#B2DDA3', '#8FD28A', '#71C67B', '#59BA76', '#41ae76', '#379A7C', '#2E857E', '#256770', '#1D465B'])

        };
        
        // returns scale for the legend colourbar
        function legend_scaler(data) {
          return d3.scaleLinear()
          .domain([(d3.min(censusData, d => d[data])), (d3.max(censusData, d => d[data]))])
          .range([legendHeight, 0]);
        }
      

        // Set variables and default datasets to display
        var x_data = "poverty"
        var y_data = "healthcare"
        var units = "%"
        
        dropDown = d3.selectAll("#scale-select")
        var selected = dropDown.property("value")    // the value of 'selected' determines the colour of the circles 
    
        // Set event listener for the dropdown menu
        dropDown.on("change", function() {
          selected = d3.select(this).node().value;
          updateColourScale(selected);    // call the function to update scale of legend
        });
        
        
        // SET THE SCALES
        var x_scale = x_scaler(x_data)
        var y_scale = y_scaler(y_data)
        var colour_scale = colour_scaler(selected)     


        // CREATE THE AXES
        // x-axes
        var poverty_axis = d3.axisBottom(x_scaler("poverty")).ticks(12);
        var age_axis = d3.axisBottom(x_scaler("age")).ticks(10);
        var income_axis = d3.axisBottom(x_scaler("income")).ticks(10);

        // y-axes
        var healthcare_axis = d3.axisLeft(y_scaler("healthcare")).ticks(9);
        var smokes_axis = d3.axisLeft(y_scaler("smokes")).ticks(7);
        var obesity_axis = d3.axisLeft(y_scaler("obesity")).ticks(7);

        // legend axes
        updateColourScale("income")  // generate gradient
        var legendScale = legend_scaler("income")
        var legendAxis = d3.axisRight(legendScale)
          .tickFormat(d3.format("d"));

        
        // APPEND THE DEAFUALT STARTING AXES
        // x-axes
        chartGroup.append("g")
          .attr("transform", `translate(0, ${height})`)
          .attr("class", "x-axis")
          .call(poverty_axis)
        
        // y-axis 
        chartGroup.append("g")
          .attr("class", "y-axis")
          .call(healthcare_axis)

        // legend-axis
        chartGroup.append("g")
        .attr("class", "legend-axis")
        .attr("transform", "translate("+ width +", 0)")
        .call(legendAxis);

  
        // APPEND THE AXES LABELS
        chartGroup.append("text")
          .attr("transform", `translate(${width / 2}, ${height + 40 })`)   
          .attr("class", "axis-label x-label selected")
          .text("Poverty (%)")  

          chartGroup.append("text")
          .attr("transform", `translate(${width / 2}, ${height + 65 })`)  
          .attr("class", "axis-label x-label")
          .text("Age (median)")

          chartGroup.append("text")
          .attr("transform", `translate(${width / 2}, ${height + 90})`)   
          .attr("class", "axis-label x-label")
          .text("Household Income (median)");

          chartGroup.append("text")
          .attr("transform", `translate(-30, ${height / 2 }) rotate(-90)`)
          .attr("class", "axis-label y-label selected")
          .text("Lacking Healthcare (%)");

          chartGroup.append("text")
          .attr("transform", `translate(-55, ${height / 2 }) rotate(-90)`)
          .attr("class", "axis-label y-label")
          .text("Smokes (%)");

          chartGroup.append("text")
          .attr("transform", `translate(-80, ${height / 2 }) rotate(-90)`)
          .attr("class", "axis-label y-label")
          .text("Obese (%)");

        // Variable containing all the axis label properties
        var axis_labels = d3.selectAll('.axis-label')
          .attr("font-size", "16px")
          .style("font-weight", 300)
          .attr("fill", function(d) {
            if (d3.select(this).classed("selected")) {   // if classed 'selected' change font-color to black
              return "black"
            } else {                                     // else, font-color gray
              return "#979595f8"
            }})
          .attr("text-anchor", "middle")

        
        // Event listener for click on axis labels (hover effects styled with css)
        // 'i' is the index of the axis clicked on 
        axis_labels.on("click", function(d, i) {
               // if y-axis clicked
               // first reset the y-axis label classes, then change the selected axis class to 'selected', then run transition function
            if (d3.select(this).classed("y-label")){
              d3.selectAll(".y-label").attr("class", "axis-label y-label").attr("fill", "#979595f8")
              d3.select(this).attr("class", "axis-label y-label selected").attr("fill", "black")
              transistionChart(i)
               // if x-axis clicked
               // first reset the x-axis label classes, then change the selected axis class to 'selected', then run transition function  
            } else if (d3.select(this).classed("x-label")){
              d3.selectAll(".x-label").attr("class", "axis-label x-label").attr("fill", "#979595f8")
              d3.select(this).attr("class", "axis-label x-label selected").attr("fill", "black")
              transistionChart(i)
            }
        });

        function transistionChart(index) {
          
          // Detrmine which axis clicked on, and update the data accordingly
          if (index == 0) { 
            x_axis = poverty_axis;
            x_data = "poverty";
            units = "%" ;
          } else if (index == 1 ) { 
            x_axis = age_axis;
            x_data = "age";
            units = "" ;
          } else if (index == 2 ) { 
            x_axis = income_axis;
            x_data = "income";
            units = "" ;
          } else if (index == 3 ) { 
            y_axis = healthcare_axis;
            y_data = "healthcare"; 
          } else if (index == 4 ) { 
            y_axis = smokes_axis;
            y_data = "smokes"; 
          } else if (index == 5 ) { 
            y_axis = obesity_axis;
            y_data = "obesity"; 
          }; 
      
          // Update scale
          var x_scale = x_scaler(x_data)
          var y_scale = y_scaler(y_data)
          
          // Create a trasition object for the svg
          chartTransition = chartGroup.transition();
          
          // Transition axes
          if (index < 3) {
            chartTransition.select(".x-axis")
              .duration(400)
              .call(x_axis)
          } else {
            chartTransition.select(".y-axis")
            .duration(400)
            .call(y_axis)
          }
          
          // Transition circles and text 
          chartTransition.selectAll("circle")
            .duration(400)
            .attr("cx", d => x_scale(d[x_data]))
            .attr("cy", d => y_scale(d[y_data]))

          chartTransition.selectAll(".text")
            .duration(400)
            .attr("dx", d => x_scale(d[x_data]))
            .attr("dy", d => y_scale(d[y_data]) + 5)
        
        };
            
            
        
        // Append the CIRCLES to the chart 
        var circlesGroup = chartGroup.selectAll("circle")
          .data(censusData)
          .enter().append("circle")
            .attr("cx", d => x_scale(d[x_data]))
            .attr("cy", d => y_scale(d[y_data]))
            .attr("r", "8")
            .attr("fill", d => colour_scale(d[selected]))
            .attr("stroke-width", "28px")
            .attr("stroke", d => colour_scale(d[selected]))
          
          
        // Append the STATE LABELS to the chart
        chartGroup.selectAll(".text")
          .data(censusData)
          .enter().append("text") 
            .attr("class", "text")
            .attr("text-anchor", "middle")
            .attr("font-size", "16px")
            .attr("dx", d => x_scale(d[x_data]))
            .attr("dy", d => y_scale(d[y_data])+5)
            .text(d => d.abbr);          


        // UPDATE COLOURS
        // Updates the legend and colours after dropdown selection changed
        function updateColourScale(selected) {

          // re-calculate the colour scale for selected item
          var colour_scale = colour_scaler(selected)

          // update the circle colours
          d3.selectAll('circle')
            .data(censusData)    
            .transition()
            .duration(400)
              .attr('fill', d => colour_scale(d[selected]))
              .attr("stroke-width", "28px")
              .attr("stroke",  d => colour_scale(d[ selected]))
             
          // append the gradient color bar
          var gradient = chartGroup.append('defs')
              .append('linearGradient')
              .attr('id', 'gradient')
              .attr('x1', '0%') // bottom
              .attr('y1', '0%')
              .attr('x2', '0%') // to top
              .attr('y2', '100%')
              .attr('spreadMethod', 'pad');
    
          // Generate the gradient for the legend by creating an array of 
          // [pct, colour] pairs as stop values for legend (pct = percent)
          var colours = ['#1D465B', '#256770', '#2E857E', '#379A7C', '#41ae76', '#59BA76', '#71C67B', '#8FD28A', '#B2DDA3', '#D0E7BD', '#E7F1D7']
          
          // Creats an array of % values between 0-100 to match the colours above
          var pct = linspace(0, 100, colours.length).map(function(d) {
              return Math.round(d) + '%';
          });
    
          // Combine the colour and pct values into pairs in a single variable
          var colourPct = d3.zip(pct, colours);

          // Create the gradient
          colourPct.forEach(function(d) {
              gradient.append('stop')
                  .attr('offset', d[0])
                  .attr('stop-color', d[1])
                  .attr('stop-opacity', 1);
          });
          
          // Create a rectangle with the gradient and append it to the id created above
          chartGroup.append('rect')
              .attr('x', width - legendWidth)
              .attr('y', 0)
              .attr('width', legendWidth)
              .attr('height', legendHeight)
              .style('fill', 'url(#gradient');
    
          // Create a scale and axis for the legend
          var legendScale = legend_scaler(selected)
          
          // Create the legend axis
          var legendAxis = d3.axisRight(legendScale)
              .tickFormat(d3.format("d"));
    
          // Add a transition for the legend axis change
          chartGroup.select(".legend-axis")
              .transition()
              .duration(400)
              .call(legendAxis);

        };


        // TOOL-TIP 
        // Initialize the Tooltip
        var toolTip = d3.tip()
          .attr("class", "d3-tip")
          .direction('w') 
          .html(function(d) {
                return (`<strong><center>${(d.state)}</center></strong>
                         <hr>${y_data}: ${d[y_data]}%
                         <hr>${x_data}: ${d[x_data]}${units} <hr>
                         <ht>${selected}: ${d[selected]}<hr>`)
          });

        // Call the tooltip on the chartGroup visualisation
        chartGroup.call(toolTip);
  
        // Create event listener to display/hide/move the tooltip
        circlesGroup.on("mouseover", d => toolTip.show(d, this).style("display", null))
          .on('mouseout', function() {
              d3.select(".d3-tip")
              .transition()
                .duration(300)
                .style("opacity",0)
                .style('pointer-events', 'none')
              })
            // follow the cursor if still over item  
          .on("mousemove",  function(d) { 
                   toolTip.show(d, this)
                   .html(
                  `<strong><center>${(d.state)}</center></strong>
                   <hr>${y_data}: ${d[y_data]}%
                   <hr>${x_data}: ${d[x_data]}${units} <hr>
                   <ht>${selected}: ${d[selected]}<hr>`)
                   .style("left", d3.event.pageX - 150 + "px") 
                   .style("top", d3.event.pageY - 40 + "px")
                  });
        
        // Function to evenly space gradient values (see updateColourScale() )          
        function linspace(start, end, n) {
          var out = [];
          var delta = (end - start) / (n - 1);
          var i = 0;
          while(i < (n - 1)) {
              out.push(start + (i * delta));
              i++;
          }
  
          out.push(end);
          return out;
      }          
      
        }).catch(function(error) { 
        console.log(error);
      });
  
    }
  
  // When the browser loads, makeResponsive() is called.
  makeResponsive();
  
  // When the browser window is resized, makeResponsive() is called.
  d3.select(window).on("resize", makeResponsive);