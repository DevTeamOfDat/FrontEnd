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

  login(taikhoanModel: taikhoanModel): Observable<any> {
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API + "login", taikhoanModel);
  }
  register(userModel: taikhoanModel): Observable<any> {
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API + "register", userModel);
  }

  getInfo(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'info');
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'accounts');
  }

  getbyloaitaikhoan(loaitaikhoan:any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'accounts',loaitaikhoan);
  }

  update(model: taikhoanModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'accounts', model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'accounts/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'accounts/delete', modelDelete);
  }


}
