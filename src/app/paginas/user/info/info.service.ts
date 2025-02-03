import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class  InfoService {
  private readonly url = 'http://127.0.0.1:8000'

  constructor(
    private http:HttpClient) { }

  buscarInfos(hash:string){
    return this.http.get<any>(`${this.url}/core/user/pegar/informacoes`,{
      params:{user_id:hash}
    }).pipe()
  }
}
