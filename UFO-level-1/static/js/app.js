// from data.js
var tableData = data;

// Create the variables
var tbody = d3.select("tbody");

var inputField_date = d3.select("#datetime");

var filterButton = d3.select("#filter-btn");
var resetFilterButton = d3.select("#btn_reset");

// Loading the data to tehe table when the page is loaded
data_to_table(tableData);

// Filter data when the button is clicked
filterButton.on("click", function() {
    input_value=inputField_date.node().value;
    if (input_value !== ""){
        var filtered_data=tableData.filter(filterDate);
        data_to_table(filtered_data);
    }
});

// Reseting the filter  
resetFilterButton.on("click", function() {
    data_to_table(tableData);
    
    inputField_date.property("value","");
});

///////////////FUNCTIONS///////////////

// function to append data to the table 
function data_to_table(array){
    tbody.html("");
    array.forEach(function(event){
        var row = tbody.append("tr");
        Object.values(event).forEach(function(value){
            row.append('td').text(value);
        });
    });
};

// function to filter the data
function filterDate (record){    
        return record.datetime == inputField_date.property("value");
};