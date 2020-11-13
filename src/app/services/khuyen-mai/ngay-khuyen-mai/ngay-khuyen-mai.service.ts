import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ngaykhuyenmaiModel } from 'app/model/khuyenmai/ngaykhuyenmai/ngaykhuyenmai-model';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NgayKhuyenMaiService {

  constructor(private httpClient: HttpClient) { }

  create(model: ngaykhuyenmaiModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'promotion-dates', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'promotion-dates');
  }

  update(id: any, model: ngaykhuyenmaiModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'promotion-dates/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'promotion-dates/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'promotion-dates/delete', modelDelete);
  }
}
