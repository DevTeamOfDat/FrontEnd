import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { voucherModel } from 'app/model/khuyenmai/voucher/voicher-model';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private httpClient: HttpClient) { }

  create(model: voucherModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'vouchers', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'vouchers');
  }

  update(id: any, model: voucherModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'vouchers/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'vouchers/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'vouchers/delete', modelDelete);
  }
}
