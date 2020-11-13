import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trangthaiModel } from 'app/model/donhang/trangthai/trangthai-model';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrangthaiService {

  constructor(private httpClient: HttpClient) { }

  create(model: trangthaiModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'status', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'status');
  }

  update(id: any, model: trangthaiModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'status/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'status/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'status/delete', modelDelete);
  }
}
