import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private readonly url = 'http://127.0.0.1:8000'
  constructor(private http: HttpClient) { }

  buscarServicoPorNome(termo:string){
    return this.http.get<any>(`${this.url}/core/schedule/pesquisa/servicos`,
      {params:{termo: termo}})
  }

  editarTarefa(valores:any){
      console.log('URL final:', `${this.url}/core/schedule/editar/tarefa`);

    this.http.post(`${this.url}/core/schedule/editar/tarefa`, valores).subscribe(
      (response) => {
        console.log('Resposta da API:', response);
      })
  }

  buscarResponsavelPorNome(termo:string){
    return this.http.get<any>(`${this.url}/core/schedule/pesquisa/user`,{
      params:{termo:termo}
    })
  }


  buscarClientePorNome(termo:string){
    return this.http.get<any>(`${this.url}/core/schedule/pesquisa/cliente`,{
      params:{termo:termo}
    })
  }


  enviarTarefa(parametros:any){
    console.log({...parametros})
  return this.http.post(`${this.url}/core/schedule/criar/tarefa`,{
    ...parametros
  })
}
}


