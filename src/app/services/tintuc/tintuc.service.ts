import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { tintucModel } from 'app/model/tintuc/tintuc-model';

@Injectable({
  providedIn: 'root'
})
export class TintucService {

  constructor(private httpClient: HttpClient) { }

  create(model: tintucModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'hotnews', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'hotnews');
  }

  update(id: any, model: tintucModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'hotnews/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'hotnews/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'hotnews/delete', modelDelete);
  }
}
