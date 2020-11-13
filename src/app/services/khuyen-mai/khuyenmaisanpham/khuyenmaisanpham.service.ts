import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { khuyenmaisanphamModel } from 'app/model/khuyenmai/khuyenmaisanpham/khuyenmaisanpham-modle';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KhuyenmaisanphamService {

  constructor(private httpClient: HttpClient) { }

  create(model: khuyenmaisanphamModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'promotion-products', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'promotion-products');
  }

  update(id: any, model: khuyenmaisanphamModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'promotion-products/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'promotion-products/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'promotion-products/delete', modelDelete);
  }
}
