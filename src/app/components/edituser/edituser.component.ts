import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {HttpService} from "../../http.service"
import {UserService} from "../../user.service"
import {User,UserC} from "../../model";



@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  user: User;
  id:number;
  canC: boolean;
  canR:boolean;
  canU:boolean;
  canD:boolean;
  constructor(private httpService: HttpService, private userService:UserService, private route:ActivatedRoute,private router: Router) {
    this.user = new User(0,"","","",[]);
    this.id = 0;
    this.canC =false;
    this.canR =false;
    this.canU =false;
    this.canD =false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
        this.id = p['id'];
      });

    this.httpService.getUser("http://localhost:8080/api/user/" + this.id, this.userService.getToken()).subscribe((u)=>{
           this.user = u;
           if(this.user.permissions.includes("can_create_users")){
              this.canC = true;
           }
           if(this.user.permissions.includes("can_read_users")){
                         this.canR = true;
                      }
           if(this.user.permissions.includes("can_update_users")){
                         this.canU = true;
                      }
            if(this.user.permissions.includes("can_delete_users")){
                          this.canD = true;
                       }
          })
  }
  edit():void{
      let userC = new UserC(0,"","","",[],"");
      userC.email= this.user.email;
      userC.firstName = this.user.firstName;
      userC.lastName = this.user.lastName;
      userC.password = "**********";
      if(this.canC){
            userC.permissions.push("can_create_users")
      }
      if(this.canR){
            userC.permissions.push("can_read_users")
            }
      if(this.canU){
            userC.permissions.push("can_update_users")
            }
      if(this.canD){
            userC.permissions.push("can_delete_users")
            }
      this.user.permissions = userC.permissions;
      this.httpService.updateUser("http://localhost:8080/api/user/update/" + this.id,userC,this.userService.getToken()).subscribe((l)=>{
        this.user = l;
        this.router.navigateByUrl("users");
      })

    }
}
