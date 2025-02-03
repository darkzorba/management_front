import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {DashboardComponent} from './paginas/dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {MenuLateralComponent} from './components/menu-lateral/menu-lateral.component';
import {ScheduleComponent} from './paginas/schedule/schedule.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InfoComponent} from './paginas/user/info/info.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    RouterModule,
    InfoComponent,
    DashboardComponent,
    HttpClientModule,
    NavBarComponent,
    ReactiveFormsModule,
    MenuLateralComponent,
    ScheduleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bmanagement';

}
export var API = 'http://127.0.0.1:8000'
