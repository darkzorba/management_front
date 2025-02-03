import {RouterModule, Routes} from '@angular/router';
import {ScheduleComponent} from './paginas/schedule/schedule.component';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './paginas/dashboard/dashboard.component';
import {InfoComponent} from './paginas/user/info/info.component';
import {VisualizarComponent} from './paginas/schedule/visualizar/visualizar.component';

export const routes: Routes = [
  {
    path:'tarefas/criar',
    component:ScheduleComponent,
  },
  {
    path:'funcionario/perfil',
    component:InfoComponent,
  },
  {
    path:'tarefas/visualizar',
    component:VisualizarComponent
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
