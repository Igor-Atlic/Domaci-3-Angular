import { Component, OnInit } from '@angular/core';
import {Login} from "../../model";
import {HttpService} from "../../http.service"
import {UserService} from "../../user.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: string;
  permissions: string[];
  username: string;
  password: string;
  log:boolean;

  constructor(private httpService: HttpService, public userService:UserService) {
    this.token = "";
    this.permissions = [];
    this.username = "";
    this.password = "";
    this.log = false;
  }

  ngOnInit(): void {
    if(localStorage.getItem('token') === null){
          localStorage.setItem('token', '');
        }
          this.token = localStorage.getItem('token')!;
          this.userService.setToken(this.token);
    if(localStorage.getItem('permissions') === null){
              localStorage.setItem('permissions', '');
            }
              this.permissions = JSON.parse(localStorage.getItem('permissions')!);
              this.userService.setPermissions(this.permissions);
  }

  login():void{
    this.httpService.login("http://localhost:8080/auth/login",this.username,this.password).subscribe((l)=>{
      this.userService.setToken(l.jwt)
      this.userService.setPermissions(l.permissions)
      this.token = this.userService.getToken();
      this.permissions = this.userService.getPermissions();
      this.log = true;
    })
  }

}
