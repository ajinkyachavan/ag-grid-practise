import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { TableDataModel } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // ag-grid column and row variables
  columnDefs = [];
  rowData: Array<TableDataModel> = [];

  // other ag-grid variables
  public gridApi;
  public rowSelection = "single"; // or multiple if required

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {

    this.columnDefs = [
      {
        headerName: 'User id',
        field: 'USER_ID',
        filter: "agTextColumnFilter",
        caseSensitive: true, // usually ag-grid lowercases anything you search, with this it won't
        suppressMenu: true
      },
      {
        headerName: 'Company cd',
        field: 'COMPANY_CD',
        filter: "agTextColumnFilter",
        caseSensitive: true,
        suppressMenu: true,
        // sort: 'asc' // you can use this if you want sort by default . When you click on column, it will sort other ways anyway
      },
      {
        headerName: 'Before',
        field: 'BEFORE_EXECUTE_LOG',
        filter: "agTextColumnFilter",
        caseSensitive: true,
        suppressMenu: true
      },
      {
        headerName: 'After',
        field: 'AFTER_EXECUTE_LOG',
        filter: "agTextColumnFilter",
        caseSensitive: true,
        suppressMenu: true
      },
      {
        headerName: 'Time',
        field: 'TIME_SEC',
        filter: "agNumberColumnFilter",
        suppressMenu: true
      },
      {
        headerName: 'Id',
        field: 'REQUEST_TRACKINGID',
        filter: "agTextColumnFilter",
        caseSensitive: true,
        suppressMenu: true,
        hide: true // I think you wouldn't want to show id so hide: true
      }
    ];

    /**
     * rowData = actual data array mapping to columnDefs that you defined above
     */
    this.appService.getTableData()
      .subscribe(
        (response: Array<TableDataModel>) => {
          this.rowData = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /**
   * when row is clicked
   */
  onRowClicked(event) {
    console.log(event.rowIndex + "th row clicked")
    console.log(event);
    console.log(event.data);
    console.log("-------");
  }

  /**
   * when row is selected
   */
  onRowSelected(event) {
    console.log(event.rowIndex + "th row selected")
    console.log(event);
    console.log(event.data);
    console.log("-------");
  }

  /**
   * @listens for any change in ag-grid.  
   */
  onModelUpdated($event) {
    // If you search for something and nothing matches, show "No Rows to show"
    // inbuilt function of ag-grid showNoRowsOverlay() takes care of that, we don't need to know how

    // overlay = popup that shows when some error or info needs to be shown on 
    // top of grid. hideOverlay = hide any popups if data exists
    if (this.gridApi && this.gridApi.rowModel.rowsToDisplay.length === 0) {
      this.gridApi.showNoRowsOverlay();
    }
    if (this.gridApi && this.gridApi.rowModel.rowsToDisplay.length > 0) {
      this.gridApi.hideOverlay();
    }
  }

  /**
   * main function called for housekeeping purposes of ag-grid
   * We can use this.gridApi to do a lot of things.
   */
  onGridReady(params) {
    this.gridApi = params.api;
    // console.log(this.gridApi)

    // On initial viewing, before any search is performed,
    // there is no overlay
    this.gridApi.hideOverlay();
  }

}
