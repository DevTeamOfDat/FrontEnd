import { Injectable } from '@angular/core';
import { dactrungsanphamModel } from 'app/model/san-pham/dactrungsanpham/dactrungsanpham-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DactrungsanphamService {

  constructor(private httpClient: HttpClient) { }

  create(model: dactrungsanphamModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'speciality-products', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'speciality-products');
  }

  update(id: any, model: dactrungsanphamModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'speciality-products/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'speciality-products/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'speciality-products/delete', modelDelete);
  }
}
