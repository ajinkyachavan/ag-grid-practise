import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { TableDataModel } from './app.model';
import { fromEvent } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // number of hours input
  hoursInput: number;

  // ag-grid column and row variables
  columnDefs = [];
  rowData: Array<TableDataModel> = [];

  // other ag-grid variables
  public gridApi;
  public defaultColDef;
  public rowSelection = "single"; // or multiple if required

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.columnDefs = [
      {
        headerName: 'User id',
        field: 'USER_ID',
        suppressMenu: true
      },
      {
        headerName: 'Company cd',
        field: 'COMPANY_CD',
        suppressMenu: true,
        // sort: 'asc' // you can use this if you want sort by default . When you click on column, it will sort other ways anyway
      },
      {
        headerName: 'Before',
        field: 'BEFORE_EXECUTE_LOG',
        suppressMenu: true
      },
      {
        headerName: 'After',
        field: 'AFTER_EXECUTE_LOG',
        suppressMenu: true
      },
      {
        headerName: 'Time',
        field: 'TIME_SEC',
        suppressMenu: true
      }
    ];


    this.defaultColDef = {
      // set every column width
      filter: "agTextColumnFilter",
      // make every column editable
      sortable: true,
      autoHeight: true,
      resizable: true
    }

    /**
     * rowData = actual data array mapping to columnDefs that you defined above
     */
    this.appService.getTableData()
      .subscribe(
        (response: Array<TableDataModel>) => {
          this.rowData = response;
          this.gridApi.setRowData(this.rowData.slice(0, 30));
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getAllRecordsWithinInputHours() {
    if (this.rowData && this.hoursInput) {
      console.log(_.filter(this.rowData, (row, i) => {
        let hoursInputString = String(this.hoursInput);
        // String(parseInt(str, 10)) removes leading zeroes. so { 08 => 8, 15 => 15 }
        let beforeLogHours = String(parseInt(row['BEFORE_EXECUTE_LOG'].split(":")[0], 10));
        let afterLogHours = String(parseInt(row['AFTER_EXECUTE_LOG'].split(":")[0], 10));
        return (beforeLogHours == afterLogHours && afterLogHours == hoursInputString);
      }));
    } 
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
    // fit table to width
    params.api.sizeColumnsToFit();

    // fit table to width on resize
    fromEvent(window, "resize")
      .subscribe(
        (res) => {
          params.api.sizeColumnsToFit();
        }
      )

    // On initial viewing, before any search is performed,
    // there is no overlay
    this.gridApi.hideOverlay();
  }

}
