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

3. Popups
  - install ngbootstrap - npm install --save @ng-bootstrap/ng-bootstrap
  - Add NgbModule to app.module.ts - import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

  - PopupButtonRendererComponent has the button which is added to ag-grid table.
    What does that mean? ag-grid doesn't support using icons as table elements directly,
    so we have to create components and point to them as an element of ag-grid table
    If you look at app.component.ts line 70, string "popupButtonRenderer" which can be
    found on line 37 to be pointing to PopupRendererComponent.

  - When you click on the button, the modal functionality is in the function showPopup()
    while the data in it is pointed by CustomPopupComponent


4. Excel save
  - install file-save & xlsx