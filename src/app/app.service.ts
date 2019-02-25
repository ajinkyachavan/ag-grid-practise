import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  getTableData() {
    return this.http.get("../assets/table.json");
  }

  getPopupData() {
    return this.http.get("../assets/popup.json");
  }

}
