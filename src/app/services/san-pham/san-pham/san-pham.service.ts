import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sanphamModel } from 'app/model/san-pham/sanpham/sanpham-model';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SanPhamService {

  constructor(private httpClient: HttpClient) { }

  create(model: sanphamModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'products', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'products');
  }

  update(id: any, model: sanphamModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'products/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'products/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'products/delete', modelDelete);
  }
}
