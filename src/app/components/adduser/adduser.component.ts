import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../http.service"
import {UserService} from "../../user.service"
import {User,UserC} from "../../model";
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {



  permissions:string[]
  canC:boolean;
  canR:boolean;
  canU:boolean;
  canD:boolean;
  error:boolean;
  errorMessage: string;
  exform: FormGroup;
  constructor(private httpService: HttpService, private userService:UserService,private router: Router) {
   this.canC =false;
   this.canR =false;
   this.canU =false;
   this.canD =false;
   this.error = false;
   this.errorMessage = "";
     this.permissions=[];
   this.exform = new FormGroup({
       'firstName' : new FormControl(null, Validators.required),
       'lastName' : new FormControl(null, Validators.required),
       'email' : new FormControl(null, [Validators.required, Validators.email]),
       'password' : new FormControl(null, [Validators.required])

     });

   }

  ngOnInit(): void {
  }
  create():void{
        let userC = new UserC(-1,this.exform.value.firstName,this.exform.value.lastName,this.exform.value.email,[],this.exform.value.password);

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
        this.permissions = userC.permissions;
        this.httpService.createUser("http://localhost:8080/api/user/create",userC,this.userService.getToken()).subscribe(
          (response) => {    this.error = false;
                             this.router.navigateByUrl("users");

                             },(error) => {
                              this.error = true;
                              this.errorMessage = error.error.reason
                              if(this.errorMessage === undefined)
                                this.errorMessage = error.message;
                             }

        )

      }

    get firstName() {
      return this.exform.get('firstName');
    }
    get email() {
      return this.exform.get('email');
    }
    get password() {
      return this.exform.get('password');
    }
    get lastName() {
      return this.exform.get('lastName');
    }
}
