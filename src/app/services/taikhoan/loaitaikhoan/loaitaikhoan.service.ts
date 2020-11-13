import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loaitaikhoanModel } from 'app/model/taikhoan/loaitaikhoan/loaitaikhoan-model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoaitaikhoanService {

  constructor(private httpClient: HttpClient) { }

  create(model: loaitaikhoanModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'account-types', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'account-types');
  }


  update(id: any, model: loaitaikhoanModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'account-types/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'account-types/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'account-types/delete', modelDelete);
  }
}
