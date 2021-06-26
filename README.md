# D3-challenge
Week 16 D3 Homework

> Created by Dale Currigan  
> June 2021  
  
![D3](/Images/microbes.jpg)  

## Table of contents  
* [Project Intro](#Project-Intro)  
* [Project Structure](#Project-Structure)  
* [Setup](#Setup)  
* [Design](#Design) 
* [Sources](#Sources)  
* [Contributors](#Contributors)  
* [Status](#Status)  

# Project Intro
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
|__ samples.json                        # The Bellybutton Biodiversity dataset 
|
|__ static/                              
|   |__css/                             # Directory for css stylesheets
|   |  |__ styles.css                              
|   |    
|   |__js/                              # Directory for javscript code
|      |__ app.js
|      
|__ Images/                             # Directory for image files
|   |__ microbes.jpg
|   |__ capture.jpg
|   |__ polar_coordinates.gif
|
``` 
  
# Setup 
  
* The site is can be accessed at: https://dcurrigan.github.io/plotly-challenge/
* The html for the site is all contained in index.html
* All styles are contained within static/css/style.css
* The javascript code enabling the functionality of the site is can be found within static/js/app.js
* The base dataset is found within samples.json   

# Design 
I've created an interactive dashboard that allows the user to explore the <a href="http://robdunnlab.com/projects/belly-button-biodiversity/">Bellybutton Biodiversity dataset. </a>. The user can select one of the test subject from the drop down menu and see that subjects data displayed in various visualisation.  
  
![D3](/Images/Capture.png)  
  
D3 and plotly were used to select and re-render page elements on chnage of dropdown menu item. D3.json() method was used to fetch the data, after which it could be filtered, mapped and sliced as required for Demographics Box, Bar Chart, Bubble Chart and Guage Chart.    
  
**Example:** Filter, Slice and Map to obtain the Top 10 sample_values, OTU_ID's and OTU_labels for the Bar chart
```
samples = baseData.samples.filter(subject => subject.id == selected)[0];
        
        sample_values  = samples.sample_values.slice(0, 10);
        otu_ids = samples.otu_ids.slice(0,10)
        otu_ids = otu_ids.map(id => "OTU-"+id)
        otu_labels = samples.otu_labels.slice(0,10)
```
  
The guage chart used the in-build Plotly Guage-mode indicator chart, but with the addition of a needle plotted as a second trace. This required application of some basic principles of trigonometry to determine the x and y coordinates of of the needle for each point on the guage. 
  
![D3](/Images/polar_coordinates.gif)  

  
Using the principle above:
```
x coordinate = radius x cos θ
y coordinate = radius x sin θ

where the radius is the needle length
```

# Sources
|No|Source|Link|
|-|-|-|
|1|Belly Button Biodiversity                |http://robdunnlab.com/projects/belly-button-biodiversity/| 
|2|Calculus - Polar Coordinates             |https://tutorial.math.lamar.edu/classes/calcii/polarcoordinates.aspx|

   
# Contributors  
Dale Currigan  
[@dcurrigan](https://github.com/dcurrigan)  
<dcurrigan@gmail.com>


## Status
Project is: 
````diff 
+ Completed
````

