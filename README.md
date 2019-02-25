Objectives:

  1. Hour based filter based on url
  2. Pop up on click
  ------------
  3. Download data as excel - Metrics, Metrics (1), ....
  4. Sort/Search table column


Steps:

1. Install ag-grid
  - npm install --save ag-grid-angular ag-grid-community
  - In app.module imports, add AgGridModule.withComponents([])
  - In styles.scss (Ctrl+P and search) => paste these:
      @import "~ag-grid-community/dist/styles/ag-grid.css";
      @import "~ag-grid-community/dist/styles/ag-theme-balham.css";

2. In app.component.html
  - <ag-grid-angular> tag is used to show table
  - column definitions are provided in columnDefs and actual data in rowData variable
  - all other attributes are self-explanatory, you can always refer documentation
