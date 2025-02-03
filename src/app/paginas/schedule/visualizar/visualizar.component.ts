import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ViewService} from './view.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {CommonModule} from '@angular/common';

import * as bootstrap from 'bootstrap';
import {ScheduleService} from '../schedule.service';

@Component({
  selector: 'app-visualizar',
  imports: [NgxMaterialTimepickerModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss'] // Certifique-se de que o nome esteja correto (styleUrls, não styleUrl)
})
export class VisualizarComponent implements OnInit, AfterViewInit{
  public tarefas: any[] = [];
  private user: string = 'c7c2f51e-1033-4182-b477-b66b9827646a';
  formGroup!: FormGroup;
  timer: any;
  tarefaGroup!: FormGroup;
  horaIni: string = '';
  horaFim: string = '';
  horarios: string[] = [];
  users: any[] = [];
  dropdownUserAberto: boolean = false;
  tarefaId:any = '';
  responsavelSelecionado: any;



  constructor(private viewService: ViewService,
              private fb: FormBuilder,
              private scheduleService: ScheduleService) { }

  ngOnInit() {
    const dataAtual = new Date().toISOString().split('T')[0];
    this.formGroup = this.fb.group({
      id: [null],
      horaIni: ['00:00', Validators.required],
      horaFim: ['23:59', Validators.required],
      data: [dataAtual, Validators.required],
      user: [[], Validators.required],
    });
    this.tarefaGroup = this.fb.group({
      id:[null],
      data:[''],
      horario:[''],
      responsavelId:['']
    })

    this.buscarTarefas()
  }

  formatarHorario(horario: string): string {
    // Se o horário vier com segundos (ex.: "15:30:00"), corta para "15:30"
    return horario.length > 5 ? horario.slice(0, 5) : horario;
  }

    buscarTarefas() {
    let valoresPesquisa = {
      hora_ini: this.formGroup.get("horaIni")?.value,
      hora_fim: this.formGroup.get("horaFim")?.value,
      data: this.formGroup.get("data")?.value,
      hash: this.user
    };

    // Atualiza as variáveis para os cálculos posteriores
    this.horaIni = this.formatarHorario(this.formGroup.get("horaIni")?.value);
    this.horaFim = this.formatarHorario(this.formGroup.get("horaFim")?.value);

;

    this.viewService.buscarTarefas(valoresPesquisa).subscribe((tarefas) => {
      this.tarefas = tarefas.tarefas;
      console.log('Tarefas:', this.tarefas);
      this.horarios = this.gerarHorarios(this.horaIni, this.horaFim);
      console.log('Horários gerados:', this.horarios);
    })
  }

  ngAfterViewInit() {
    // Inicializa os tooltips do Bootstrap
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipEl) => new bootstrap.Tooltip(tooltipEl));
  }

abrirModal(tarefaId:number,id: string) {
  const modalElement = document.getElementById(id);
  this.tarefaId = tarefaId
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  } else {
    console.error(`Elemento com id "${id}" não encontrado.`);
  }
}


  editarTarefa(){
  let dadosTarefa = {
    tarefa_id:this.tarefaId,
    data:this.tarefaGroup.get('data')?.value,
    horario:this.tarefaGroup.get('horario')?.value,
    resp_id:this.tarefaGroup.get('responsavelId')?.value
  }
  this.scheduleService.editarTarefa(dadosTarefa)
  }


  gerarHorarios(horaIni: string, horaFim: string): string[] {
    const listaHoras: string[] = [];
    const horariosTarefas:string[] = this.tarefas.map(tarefa => tarefa.horario)
    let [hora, minuto] = horaIni.split(":").map(Number);
    const [horaFinal, minutoFinal] = horaFim.split(":").map(Number);

    while (hora < horaFinal || (hora === horaFinal && minuto <= minutoFinal)) {
      // Adiciona horário formatado na lista
      listaHoras.push(`${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`);

      // Adiciona 30 minutos
      minuto += 30;
      if (minuto >= 60) {
        minuto = 0;
        hora++;
      }
    }
    return Array.from(new Set([...listaHoras, ...horariosTarefas])).sort((a, b) => a.localeCompare(b));
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

  selecionarResponsavel(value: any): void {
    this.responsavelSelecionado = value;
    console.log(this.responsavelSelecionado)
    this.formGroup.get('responsavelId')?.setValue(value.nome);
    this.fecharDropdown('dropdownUserAberto')
  }

  abrirDropdown(varName: 'users', dropdown: 'dropdownUserAberto'): void {
    if (this[varName].length > 0) {
      this[dropdown] = true;
    }
  }

  fecharDropdown(dropdown: 'dropdownUserAberto' ): void {
    setTimeout(() => {
      this[dropdown] = !this[dropdown];
    }, 200);
  }



  getTarefasPorHorario(horario: string): any[] {
  return this.tarefas.filter(tarefa => tarefa.horario === horario);
}

}
