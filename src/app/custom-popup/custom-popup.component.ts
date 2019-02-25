import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-custom-popup',
  templateUrl: './custom-popup.component.html',
  styleUrls: ['./custom-popup.component.css']
})
export class CustomPopupComponent implements OnInit {
  // will be initialized in popup-button renderer
  @Input() popUpRowData;

  // ag-grid variables
  columnDefs = [];
  gridApi;
  defaultColDef;
  rowSelection = "single"; // or multiple if required
  frameworkComponents;

  constructor(public activeModal: NgbActiveModal) { }

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
      },
      {
        headerName: 'Execute log',
        field: 'EXECUTE_LOG',
        suppressFilter: true,
      }
    ];

    this.defaultColDef = {
      filter: "agTextColumnFilter",
      sortable: true,
      autoHeight: true,
      resizable: true
    }
  }

  /**
 * when row is clicked
 */
  onRowClicked(event) {
    console.log(event.rowIndex + "th popup row clicked")
    console.log(event);
    console.log(event.data);
    console.log("-------");
  }

  /**
   * when row is selected
   */
  onRowSelected(event) {
    console.log(event.rowIndex + "th popup row selected")
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
