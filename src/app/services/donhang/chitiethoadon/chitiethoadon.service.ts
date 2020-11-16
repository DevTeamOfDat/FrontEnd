import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { chitiethoadonModel } from 'app/model/donhang/chitiethoadon/chitiethoadon-models';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChitiethoadonService {

  constructor(private httpClient: HttpClient) { }

  create(model: chitiethoadonModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'bill-details', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'bill-details');
  }

  update(id: any, model: chitiethoadonModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'bill-details/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'bill-details',id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'bill-details/delete', modelDelete);
  }
}
