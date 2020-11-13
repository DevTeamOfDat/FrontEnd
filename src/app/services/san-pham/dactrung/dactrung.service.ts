import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { dactrungModel } from 'app/model/san-pham/dac-trung/dactrung-model';

@Injectable({
  providedIn: 'root'
})
export class DactrungService {

  constructor(private httpClient: HttpClient) { }

  create(model: dactrungModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'specialities', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'specialities');
  }

  update(id: any, model: dactrungModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'specialities/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'specialities/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'specialities/delete', modelDelete);
  }
}


