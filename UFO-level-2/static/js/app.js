// from data.js
var tableData = data;

// Create the variables
var tbody = d3.select("tbody");

var inputFields = d3.select(".input-fields");

var inputField_country = d3.select("#country");
var inputField_state = d3.select("#state");
var inputField_city = d3.select("#city");
var inputField_date = d3.select("#datetime");
var inputField_shape = d3.select("#shape");

var inputArray = [inputField_country,inputField_state,inputField_city,inputField_date,inputField_shape];

var filterButton = d3.select("#filter-btn");
var resetFilterButton = d3.select("#btn_reset");


var country = tableData.map(item => item.country).filter((value, index, self) => self.indexOf(value) === index);
var state = tableData.map(item => item.state).filter((value, index, self) => self.indexOf(value) === index);
var shape = tableData.map(item => item.shape).filter((value, index, self) => self.indexOf(value) === index);

// Adding the dropdown values directly from the data source
dropdownValues (country,inputField_country);
dropdownValues (state,inputField_state);
dropdownValues (shape,inputField_shape);



// Appending all the data available to the table when the page opens
data_to_table(tableData);

// Filtering the table when the any of the input fileds changes
inputFields.on("change",function() {
    input_values=inputArray.map(item => item.node().value);
    var filtered_data=tableData.filter(multi_filter)
    data_to_table(filtered_data);
});


// Filtering the table when the button is clicked
filterButton.on("click", function() {
    input_values=inputArray.map(item => item.node().value);
    var filtered_data=tableData.filter(multi_filter)
    data_to_table(filtered_data);
});

// Reseting the filter  
resetFilterButton.on("click", function() {
    data_to_table(tableData);
    
    inputArray.forEach(item => item.property("value",""))
});


///////////////FUNCTIONS///////////////

// function to append data to the table 
function data_to_table(array){
    tbody.html("")
    array.forEach(function(event){
        var row = tbody.append("tr");
        Object.values(event).forEach(function(value){
            row.append('td').text(value);
        });
    });
};

// Function to filter the data
function multi_filter (record){    
        
    var array=[
    record.country == input_values[0],
    record.state == input_values[1],
    record.city == input_values[2],
    record.datetime == input_values[3],
    record.shape == input_values[4]];

    var final_array = [];

    for (var i=0; i<input_values.length; i++){
        if (final_array.length == 0){
            if(input_values[i]!==""){
                final_array.push(array[i]);
            }
        }
        else if(input_values[i]!==""){
            final_array[0]=final_array[0] && array[i];
        }  
    }
    if (final_array.length>0){
        return(final_array[0]);
    }
    else{
        return 1==1
    }
};


// Function to add the dropdown values directly from the data source
function dropdownValues (array,inputField){
    array.forEach(function(item){
        inputField.append("option").text(item);
    });
};



