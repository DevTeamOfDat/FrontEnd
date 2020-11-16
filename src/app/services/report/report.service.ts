import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { hangtonkhoModel } from 'app/model/report/baocaotonkho-model';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { excelModel } from 'app/model/report/report_excel';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient) { }

  reportPhieuNhap(model: excelModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'reports/report-coupons', model);
  }

  reportHoaDon(model: excelModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'reports/report-bills', model);
  }

  reportNhanvien(model: excelModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'reports/report-employees', model);
  }

  reportHangTonKho(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'reports/inventory-product');
  }
}
