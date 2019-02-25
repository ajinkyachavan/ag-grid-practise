import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-popup-button-renderer',
  templateUrl: './popup-button-renderer.component.html',
  styleUrls: ['./popup-button-renderer.component.css']
})
export class PopupButtonRendererComponent {

  public params: any;
  public popupData: any[];

  constructor(
    private modalService: NgbModal,
    private appService: AppService
  ) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  public showPopup() {
    this.appService.getPopupData()
      .subscribe(
        (response: any[]) => {
          this.popupData = response;
        },
        (error) => {
          console.error(error);
        },
        () => {
          const modalRef = this.modalService.open(CustomPopupComponent);
          modalRef.componentInstance.popUpRowData = this.popupData;
        }
      );
  }

}
