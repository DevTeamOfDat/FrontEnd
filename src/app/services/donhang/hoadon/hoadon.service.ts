import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { hoadonModel } from 'app/model/donhang/hoadon/hoadon-model';

@Injectable({
  providedIn: 'root'
})
export class HoadonService {

  constructor(private httpClient: HttpClient) { }

  create(model: hoadonModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'bills', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'bills');
  }

  update(id: any, model: hoadonModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'bills/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'bills/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'bills/delete', modelDelete);
  }
}
