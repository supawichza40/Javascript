// specify the columns
const wax_data = [
    {
    name:"Full leg and bikini",
    duration:"45 mins",
    price:30
    },
    {
    name:"Full arm",
    duration:"30 mins",
    price:20
    },
    {
    name:"Under arm",
    duration:"10 mins",
    price:12
    },
    {
    name:"Full arm & under arm",
    duration:"40 mins",
    price:25
    },
    {
    name:"Full leg",
    duration:"60 mins",
    price:25
    },
    {
    name:"Lower leg",
    duration:"15 mins",
    price:15
    },
    {
    name:"Top leg",
    duration:"15 mins",
    price:20
    },
    {
    name:"Bikini",
    duration:"15 mins",
    price:15
    },
    {
    name:"Brazilian",
    duration:"30 mins",
    price:25
    },
    {
    name:"Hollywood",
    duration:"30 mins",
    price:28
    },
    {
    name:"Shoulder",
    duration:"30 mins",
    price:15
    },
    {
    name:"Chest",
    duration:"30 mins",
    price:20
    },
    {
    name:"Back& Shoulder",
    duration:"30 mins",
    price:28
    },
    {
    name:"Chest&Shoulder",
    duration:"30 mins",
    price:25
    },
    {
    name:"Chest&Stomach",
    duration:"30 mins",
    price:25
    }
]

const columnDefs = [
    { field: "name",sortable:true, filter: true},
    { field: "duration",sortable:true, filter: true },
    { field: "price ",sortable:true, filter: true }
];

// specify the data
const rowData = [
]
for (let wax of wax_data) {
    rowData.push({
        name: wax.name,
        duration: wax.duration,
        price: `£${wax.price}`
    })
}

// let the grid know which columns and what data to use
const gridOptions = {
    columnDefs: [
    // set filters
   

    // number filters
    { field: 'name', filter: 'agTextColumnFilter' },
    { field: 'duration', filter: 'agTextColumnFilter' },
        { field: 'price', filter: 'agTextColumnFilter' },
    

  ],
  defaultColDef: {
    flex: 1,
    minWidth: 200,
    resizable: true,
    floatingFilter: true,
  },
    rowData: rowData,
    onGridReady: function (params) {
    params.api.sizeColumnsToFit();

    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
    },
    

};

// lookup the container we want the Grid to use
const eGridDiv = document.querySelector('#myGrid');

// create the grid passing in the div to use together with the columns & data we want to use
new agGrid.Grid(eGridDiv, gridOptions);