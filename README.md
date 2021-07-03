# D3-challenge
Week 16 D3 Homework

> Created by Dale Currigan  
> June 2021  
  
![D3](/Images/Capture2.png)  

## Table of contents  
* [Project Intro](#Project-Intro)  
* [Project Structure](#Project-Structure)  
* [Setup](#Setup)  
* [Design](#Design) 
* [Sources](#Sources)  
* [Contributors](#Contributors)  
* [Status](#Status)  

# Project Intro
This project involved using D3 to create a scatter plot between variable in from the <a href="https://data.census.gov/cedsci/">US Census Bureau</a> 2014 dataset. The briefing for the project was as follows: 

*Welcome to the newsroom! You've just accepted a data visualization position for a major metro paper. You're tasked with analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers understand your findings.*  
  
*The editor wants to run a series of feature stories about the health risks facing particular demographics. She's counting on you to sniff out the first story idea by sifting through information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.*  
  
*The data set included with the assignment is based on 2014 ACS 1-year estimates*  

  
# Project Structure  
```
D3-challenge   
|  
|    
|__ index.html                          # The site landing page html doc
|__ README.md                           # This file
|
|__ static/                              
|   |__css/                             # Directory for css stylesheets
|   |  |__ d3Style.css                              
|   |  |__ style.css                              
|   |
|   |__data/                            # Directory for the census data
|   |  |__ data.csv
|   | 
|   |__js/                              # Directory for javscript code
|      |__ app.js
|      |__ eslintrc.json
|      
|__ Images/                             # Directory for image files
|   |__ d3.gif
|   |__ capture.png
|   |__ giphy.gif
|   |__ newspaper.svg
|
``` 
  
# Setup 
  
* The site is can be accessed at: https://dcurrigan.github.io/D3-challenge/
* The html for the site is all contained in index.html
* All styles are contained within static/css/D3style.css and style.css
* The javascript code enabling the functionality of the site is can be found within static/js/app.js
* The base dataset is found within data.csv   

# Design 
I've created an interactive web visualisation using D3 to explore the US Census Bureau data. <a href="https://data.census.gov/cedsci/">US Census Bureau data</a>. An interactive scatter plot has been generated with the data, allowing the user to investigate the data further by changing axes or the colour scale for the chart (see below).  
  
![D3](/Images/d3.gif)  
  
  
Example code sourced <a href="https://bl.ocks.org/starcalibre/6cccfa843ed254aa0a0d">here</a> provided the basis for the colour scaling and legend. The data points are coloured based upon the scale generated with scaleQuantize(), which allows scaling of a numerical value in the domain to a string (the colour hex value) in the range.    
  
**Example Code:** Creating a colour scale 
```
  function colour_scaler(data) {
    return d3.scaleQuantize()
      .domain([(d3.min(censusData, d => d[data])), (d3.max(censusData, d => d[data]))])  
      .range(['#E7F1D7', '#D0E7BD', '#B2DDA3', '#8FD28A', '#71C67B', '#59BA76', '#41ae76', '#379A7C', '#2E857E', '#256770', '#1D465B'])

  };
```
  
  
# Sources
|No|Source|Link|
|-|-|-|
|1|United States Census Beureau            |https://data.census.gov/cedsci/| 
|2|Dynamic Colour Scale Legend             |https://bl.ocks.org/starcalibre/6cccfa843ed254aa0a0d|

   
# Contributors  
Dale Currigan  
[@dcurrigan](https://github.com/dcurrigan)  
<dcurrigan@gmail.com>


## Status
Project is: 
````diff 
+ Completed
````

