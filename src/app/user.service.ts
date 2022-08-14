import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private token: string;
  private permissions: string[];
  private read: string;
  private create: string;
  private delete: string;
  private update: string;
  constructor() {
   this.token = "";
   this.permissions = [];
   this.read = "can_read_users";
   this.update = "can_update_users";
   this.create = "can_create_users";
   this.delete = "can_delete_users";
   }
  getRead(): string{
           return this.read;
    }
  getCreate(): string{
           return this.create;
    }
  getUpdate(): string{
           return this.update;
    }
  getDelete(): string{
           return this.delete;
    }
  getToken(): string{
         return this.token;
  }
  setToken(token: string): void{
           this.token = token;
           localStorage.setItem('token', this.token);
  }

  getPermissions(): string[]{
    return this.permissions;
  }

  setPermissions(per: string[]): void{
      this.permissions = per;
      localStorage.setItem('permissions',  JSON.stringify(this.permissions));
  }
}
