import {Component, OnInit} from '@angular/core';
import {ScheduleService} from './schedule.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

@Component({
  selector: 'app-schedule',
  imports: [HttpClientModule,CommonModule,ReactiveFormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit{


  constructor(
    private scheduleService: ScheduleService,
    private fb: FormBuilder,

  ) {
  }
  id: any;
  timer: any;
  formGroup!: FormGroup;

  servicos: any[] = [];
  clientes: any[] = [];
  users: any[] = [];
  dropdownServicoAberto: boolean = false;
  dropdownUserAberto: boolean = false;
  dropdownClienteAberto: boolean = false;
  servicoSelecionado: any;
  responsavelSelecionado: any;
  clienteSelecionado: any;

  subs: Subscription[] = [];
  subsNavigate: Subscription[] = [];
  rotaAtual: any;

  listaSku = [
    { header: 'SKU', key: 'sku', width: 20 },
  ]

ngOnInit(){
      this.formGroup = this.fb.group({
      id: [null],
      servico: [[], Validators.required],
      cliente: [[], Validators.required],
      nome: [[], Validators.required],
      horario: [[], Validators.required],
      responsavelId: [[], Validators.required],
      data: [[], Validators.required],
    })
}


buscarServico(termo: string): Observable<any> {
    return this.scheduleService.buscarServicoPorNome(termo).pipe(
    );
  }


  onClienteChange(event: any): void {
    let value = event.target.value
    if (value.length >= 3) {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {

        this.buscarCliente(value).subscribe((resultados) => {
          console.log(resultados.clientes)
          this.clientes = resultados.clientes;
          this.dropdownClienteAberto = true;
        });
      }, 1000)
    } else {
      this.clientes = [];
      this.dropdownClienteAberto = false;
    }
  }

  buscarCliente(termo: string): Observable<any> {
    return this.scheduleService.buscarClientePorNome(termo).pipe(
    );
  }

enviarTarefa() {
    console.log('olamundo')
let parametros = {horario:this.formGroup.get('horario')?.value,
  resp_id:this.responsavelSelecionado.hash,
  serv_id:this.servicoSelecionado.id,
  cliente:this.clienteSelecionado.hash,
  data:this.formGroup.get("data")?.value
}
this.scheduleService.enviarTarefa(parametros).pipe().subscribe((resultados) =>{
  console.log(resultados)
})

}

  onServicoChange(event: any): void {
    let value = event.target.value
    if (value.length >= 3) {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {

        this.buscarServico(value).subscribe((resultados) => {
          console.log(resultados.servicos)
          this.servicos = resultados.servicos;
          this.dropdownServicoAberto = true;
        });
      }, 1000)
    } else {
      this.servicos = [];
      this.dropdownServicoAberto = false;
    }
  }


  buscarResponsavel(termo:string){
    return this.scheduleService.buscarResponsavelPorNome(termo).pipe()
  }

    onResponsavelChange(event: any): void {
    let value = event.target.value
    if (value.length >= 3) {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {

        this.buscarResponsavel(value).subscribe((resultados) => {
          console.log(resultados.users)
          this.users = resultados.users;
          this.dropdownUserAberto = true;
        });
      }, 1000)
    } else {
      this.users = [];
      this.dropdownUserAberto = false;
    }
  }

  selecionarServico(value: any): void {
    this.servicoSelecionado = value;
    console.log(this.servicoSelecionado)
    this.formGroup.get('servico')?.setValue(value.servico);
    this.fecharDropdown('dropdownServicoAberto')
  }
  selecionarCliente(value: any): void {
    this.clienteSelecionado = value;
    console.log(this.clienteSelecionado)
    this.formGroup.get('cliente')?.setValue(value.nome);
    this.fecharDropdown('dropdownClienteAberto')
  }

  selecionarResponsavel(value: any): void {
    this.responsavelSelecionado = value;
    console.log(this.responsavelSelecionado)
    this.formGroup.get('responsavelId')?.setValue(value.nome);
    this.fecharDropdown('dropdownUserAberto')
  }

  abrirDropdown(varName: 'users'| 'servicos' | 'clientes',
  dropdown: 'dropdownUserAberto' | 'dropdownServicoAberto' | 'dropdownClienteAberto'): void {
    if (this[varName].length > 0) {
      this[dropdown] = true;
    }
  }

  fecharDropdown(dropdown: 'dropdownUserAberto' | 'dropdownServicoAberto' | 'dropdownClienteAberto'): void {
    setTimeout(() => {
      this[dropdown] = !this[dropdown];
    }, 200);
  }
}
