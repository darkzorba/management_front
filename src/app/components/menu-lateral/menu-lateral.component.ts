import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-menu-lateral',
  imports: [RouterModule,RouterOutlet,CommonModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss'
})
export class MenuLateralComponent {
  isSidebarHovered = false;  // Controle de hover da sidebar
  isSubmenuOpen = false;     // Controle de abertura do submenu
  isSidebarOpen = false;     // Controle de expansão da sidebar

  // Função para alternar o submenu
  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  // Função para alternar a expansão da sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
