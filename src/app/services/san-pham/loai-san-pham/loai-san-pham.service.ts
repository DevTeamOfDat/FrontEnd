import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loaisanphamModel } from 'app/model/san-pham/loaisanpham/loaisanpham-model';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoaiSanPhamService {

  constructor(private httpClient: HttpClient) { }

  create(model: loaisanphamModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'product-types', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'product-types');
  }

  update(id: any, model: loaisanphamModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'product-types/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'product-types/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'product-types/delete', modelDelete);
  }
}
