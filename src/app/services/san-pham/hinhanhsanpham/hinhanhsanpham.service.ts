import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { hinhanhsanphamModel } from 'app/model/san-pham/hinhanhsanpham/hinhanhsanpham-model';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HinhanhsanphamService {

  constructor(private httpClient: HttpClient) { }

  create(model: hinhanhsanphamModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'image-products', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'image-products');
  }

  update(id: any, model: hinhanhsanphamModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'image-products/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'image-products/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'image-products/delete', modelDelete);
  }
}
