import { Component } from '@angular/core';
import {FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {getAnalyticsInfoString} from '@angular/cli/src/analytics/analytics';
import { map } from 'rxjs/operators';
import {Router, RouterModule, RouterOutlet} from '@angular/router';


interface Infos {
  nm_completo?: string;
  dat_nasc?: string;
  cpf?: number;
  email?: string; // O '?' indica que esse campo é opcional
  num_telefone?: number;
  foto_perfil?: string;
  cargo?: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule,RouterModule,RouterOutlet ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent {
  envioNome!: FormGroup
  private readonly url: string = 'http://127.0.0.1:8000';

  constructor(private http:HttpClient) {
    this.envioNome = new FormGroup({
      hash: new FormControl('c7c2f51e-1033-4182-b477-b66b9827646a')
      }
    )
  }

  salvarNome() {
   let hash = this.envioNome.value.hash
 this.http.get<{ status: boolean; infos: Infos[] }>(`${this.url}/core/user/pegar/informacoes?user_id=${hash}`)
  .pipe(
    map(response => response.infos) // Extrai apenas o array `infos`
  )
  .subscribe((infos) => {
    console.log(infos); // Agora `infos` contém apenas a lista de informações
  });

  }
}


