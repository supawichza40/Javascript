// specify the columns
const columnDefs = [
    { field: "make" },
    { field: "model" },
    { field: "price" }
];

// specify the data
const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
];

// let the grid know which columns and what data to use
const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData
};

// lookup the container we want the Grid to use
const eGridDiv = document.querySelector('#myGrid');

// create the grid passing in the div to use together with the columns & data we want to use
new agGrid.Grid(eGridDiv, gridOptions);