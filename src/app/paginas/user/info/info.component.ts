import {Component, OnInit} from '@angular/core';
import {InfoService} from './info.service';
import {UserInfo} from './info';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class  InfoComponent implements OnInit{
  public user: UserInfo | null = null;
constructor(
  private infoService:InfoService,
){}

ngOnInit(){
  this.buscarInfosUser()
}

buscarInfosUser(){
  this.infoService.buscarInfos('c7c2f51e-1033-4182-b477-b66b9827646a').subscribe((user) => {
    console.log(user.infos)
    this.user = (user.infos)
  })
}

}

