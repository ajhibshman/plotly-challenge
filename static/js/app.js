

d3.json("../static/samples.json").then((importedData) => {
    var data = importedData;
    console.log(data);

    //create dropdown list
    // select list of names
    
    //var names = data.map(x => x.names);
    //console.log(names);
    var ids = data[0].names;
    console.log(ids);

    //add list to html as selct options
    var id_select=d3.select("#selDataset")
    ids.forEach((id) => {
        var item = id_select.append("option");
        item.text(id);
    });
    // get selection as var
    var inputElement = d3.select("#selDataset");
    var inputValue = inputElement.property("value");
    console.log(inputValue);

    //retrieve sample data for plotting
    var samples = data[0].samples;
    console.log(samples);

    //filter for selected input
    function filterdata(sample) {
        return sample.id === inputValue;
    }

    var initdata = samples.filter(filterdata);
    console.log(initdata);

    //create horizontal bar chart (bar)
    //assign variables to samples data
    var otu_ids = initdata[0].otu_ids;
    otu_ids=otu_ids.map(String);
    var sample_values = initdata[0].sample_values;
    var otu_labels = initdata[0].otu_labels;

    console.log(otu_ids);
    
     //slice top 10
    var top_ids = otu_ids.slice(0,10);

    var top_values = sample_values.slice(0,10);
    var top_labels = otu_labels.slice(0,10);

    console.log(top_ids);
    console.log(top_values);
    console.log(top_labels);

    var trace1 = {
        type:'bar',
        x: top_values,
        y: top_ids,
        orientation: 'h'
    }

    var plot_data = [trace1];

    var layout = {
        yaxis: {
            type:'category'
        }

    }

    Plotly.newPlot("bar",plot_data, layout);


   

    //create bubble chart
    // otu_ids as x values and marker color
    // samples as y values and marker size
    // otu_labels as text values 



    //display metadata



    //select drop down and execute update code
    //d3.selectAll("#selDataset").on("change", updatePlotly);

    // This function is called when a dropdown menu item is selected
    //function updatePlotly() {
        // Use D3 to select the dropdown menu
        //var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        //var dataset = dropdownMenu.property("value");






});