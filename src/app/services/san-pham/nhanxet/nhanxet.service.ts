import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { nhanxetModel } from 'app/model/san-pham/nhanxet/nhanxet-model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NhanxetService {

  constructor(private httpClient: HttpClient) { }

  create(model: nhanxetModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'reviews', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'reviews');
  }

  update(id: any, model: nhanxetModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'reviews/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'reviews/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'reviews/delete', modelDelete);
  }
}
