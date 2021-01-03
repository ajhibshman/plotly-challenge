

d3.json("static/samples.json").then((importedData) => {
    var data = importedData;
    console.log(data);

    //create dropdown list
    // select list of names
    var ids = data[0].names;
    console.log(ids);

    //add list to html as selct options
    var id_select=d3.select("#selDataset")
    ids.forEach((id) => {
        var item = id_select.append("option");
        item.text(id);
    });

    function init(){
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
        var top_ids = otu_ids.slice(0,10).reverse();

        var top_values = sample_values.slice(0,10).reverse();
        var top_labels = otu_labels.slice(0,10).reverse();

        console.log(top_ids);
        console.log(top_values);
        console.log(top_labels);

        var trace1 = {
            type:'bar',
            x: top_values,
            y: top_ids,
            orientation: 'h',
            text: otu_labels
        }

        var plot_data = [trace1];

        var layout = {
            title: 'Top 10 OTUs in selected subject ID<br> Hover for bacteria label',
            yaxis: {
                type:'category',
                title: 'OTU Id #'
            },
            xaxis: {
            title:'Frequency found'
            }
        }

        Plotly.newPlot("bar",plot_data, layout);
  
        //create bubble chart
        // otu_ids as x values and marker color
        // samples as y values and marker size
        // otu_labels as text values 

        var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            text : otu_labels,
            marker: {
                size: sample_values,
                color: otu_ids
            }
        };

        var data2 = [trace2];

        var layout2 = {
            title: 'Samples Frequency per otu_id for Subject ID,<br>Size indicates Frequency<br>Hover for Bacteria Label',
            showlegend: false,
            xaxis: {
                title:"OTU ID #"
            },
            yaxis:{
             title:"Frequency found"
            }
        };

        Plotly.newPlot('bubble',data2,layout2);

        //display metadata
        var metas = data[0].metadata;
        console.log(metas);

        //filter for selected input
        function filterdata2(subject) {
            return subject.id == inputValue;
        }

        var initmeta = metas.filter(filterdata2);
        console.log(initmeta);

        var meta_select=d3.select("#sample-metadata")
        initmeta.forEach((combo)=> {
            Object.entries(combo).forEach(([key, value])=> {
                var item = meta_select.append("p");
                item.text(`${key}: ${value}`);
            });
        });
    }


    //select drop down and execute update code
    d3.selectAll("#selDataset").on("change", updatePlotly);
    function updatePlotly(){
        // get selection as var
        var inputElement = d3.select("#selDataset");
        var inputValue = inputElement.property("value");
        
        //retrieve sample data for plotting
        var samples = data[0].samples;
        
        //filter for selected input
        function filterdata(sample) {
            return sample.id === inputValue;
        }

        var initdata = samples.filter(filterdata);
        
        //create horizontal bar chart (bar)
        //assign variables to samples data
        var otu_ids = initdata[0].otu_ids;
        otu_ids=otu_ids.map(String);
        var sample_values = initdata[0].sample_values;
        var otu_labels = initdata[0].otu_labels;

        //slice top 10
        var top_ids = otu_ids.slice(0,10).reverse();

        var top_values = sample_values.slice(0,10).reverse();
        var top_labels = otu_labels.slice(0,10).reverse();

        var trace1 = {
            type:'bar',
            x: top_values,
            y: top_ids,
            orientation: 'h',
            text: otu_labels
        }

        var plot_data = [trace1];

        var layout = {
            title: 'Top 10 OTUs in selected subject ID<br> Hover for bacteria label',
            yaxis: {
               type:'category',
               title: 'OTU Id #'
            },
            xaxis: {
               title:'Frequency found'
            }
        }

        Plotly.newPlot("bar",plot_data, layout);
  
        //create bubble chart
        // otu_ids as x values and marker color
        // samples as y values and marker size
        // otu_labels as text values 

        var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            text : otu_labels,
            marker: {
                size: sample_values,
                color: otu_ids
            }
        };

        var data2 = [trace2];

        var layout2 = {
            title: 'Samples Frequency per otu_id for Subject ID,<br>Size indicates Frequency<br>Hover for Bacteria Label',
            showlegend: false,
            xaxis: {
             title:"OTU ID #"
            },
            yaxis:{
            title:"Frequency found"
            }

        };

        Plotly.newPlot('bubble',data2,layout2);

        //display metadata
        var metas = data[0].metadata;
        
        //filter for selected input
        function filterdata2(subject) {
            return subject.id == inputValue;
        }

        var initmeta = metas.filter(filterdata2);
        
        var meta_select=d3.select("#sample-metadata")
        meta_select.html("");
        initmeta.forEach((combo)=> {
            Object.entries(combo).forEach(([key, value])=> {
                var item = meta_select.append("p");
                item.text(`${key}: ${value}`);
            });
        })
    };

    init();
  
});