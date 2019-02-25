import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';

@Component({
  selector: 'app-popup-button-renderer',
  templateUrl: './popup-button-renderer.component.html',
  styleUrls: ['./popup-button-renderer.component.css']
})
export class PopupButtonRendererComponent {

 public params: any;

  constructor(
    private modalService: NgbModal
  ) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  public showPopup() {
    const modalRef = this.modalService.open(CustomPopupComponent);
    modalRef.componentInstance.name = 'World';
  }

}
