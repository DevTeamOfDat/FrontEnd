import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { thuonghieuModel } from 'app/model/san-pham/thuong-hieu/thuonghieu-model';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThuongHieuService {

  constructor(private httpClient: HttpClient) { }

  create(model: thuonghieuModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'trademarks', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'trademarks');
  }

  update(id: any, model: thuonghieuModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'trademarks/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'trademarks/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'trademarks/delete', modelDelete);
  }
}
