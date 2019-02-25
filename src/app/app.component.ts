import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { TableDataModel } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  columnDefs = [];
  rowData: Array<TableDataModel> = [];

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {

    /**
     * each element in this array of objects describes one column
     * 
     * @params
     *  headerName = what is shown in the UI table column header
     *  field = actual field name in table object
     *
     *  e.g.
     *
    *  {
    *   "USER_ID": "BobAlnPennInd3065010",
    *   "COMPANY_CD": "PA",
    *   "BEFORE_EXECUTE_LOG": "08:26:05",
    *   "AFTER_EXECUTE_LOG": "08:26:16",
    *   "TIME_SEC": 10.99,
    *   "REQUEST_TRACKINGID": "BobAlnPennInd3065010-70d72386-0ade-4475-8d14-b2e4cc865a01-tBswf-01-02-2019-08:26:8570"
    * },
     */
    this.columnDefs = [
      { headerName: 'User id', field: 'USER_ID', filter: "agTextColumnFilter" },
      { headerName: 'Company cd', field: 'COMPANY_CD', filter: "agTextColumnFilter" },
      { headerName: 'Before', field: 'BEFORE_EXECUTE_LOG', filter: "agTextColumnFilter" },
      { headerName: 'After', field: 'AFTER_EXECUTE_LOG', filter: "agTextColumnFilter" },
      { headerName: 'Time', field: 'TIME_SEC', filter: "agNumberColumnFilter" },
      { headerName: 'Id', field: 'REQUEST_TRACKINGID', filter: "agTextColumnFilter" }
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
        },
        () => {
          // this block is not required unless used
          console.log("Got table data successfully");
        }
      );

  }

}
