import { Injectable } from '@angular/core';
import {API} from '../../../app.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private readonly url = API
  constructor(private http:HttpClient) { }

  buscarTarefas(params: any) {
    return this.http.get<any>(`${this.url}/core/schedule/pegar/tarefas`, {
        params: {...params}
    });
}

}

