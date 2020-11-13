import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { taikhoanModel } from 'app/model/taikhoan/taikhoan-model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaikhoanService {

  constructor(private httpClient: HttpClient) { }

  create(model: taikhoanModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'accounts', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'accounts');
  }

  getbyloaitaikhoan(loaitaikhoan:any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'accounts',loaitaikhoan);
  }

  update(id: any, model: taikhoanModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'accounts/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'accounts/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'accounts/delete', modelDelete);
  }
}
