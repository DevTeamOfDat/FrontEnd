import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loaidonModel } from 'app/model/donhang/loaidon/loaidon-model';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoaidonService {

  constructor(private httpClient: HttpClient) { }

  create(model: loaidonModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'bill-types', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'bill-types');
  }

  update(id: any, model: loaidonModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'bill-types/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'bill-types/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'bill-types/delete', modelDelete);
  }
}
