import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login, Submit, User, UserC} from "./model"


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  login (url: string, username:string, password:string): Observable<Login>{

    return this.httpClient.post<Login>(url,{
      username:username,
      password:password
    })
  }

  getUsers(url:string, token:string): Observable<User[]>{
    let httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  token})
      };

    return this.httpClient.get<User[]>(url,httpOptions)
  }

  getUser(url:string, token:string): Observable<User>{
      let httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  token})
        };
      return this.httpClient.get<User>(url,httpOptions)
    }
  createUser(url:string, user:UserC,token:string): Observable<User>{
    let httpOptions = {
              headers: new HttpHeaders({ 'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  token})
            };
    return this.httpClient.post<UserC>(url,user,httpOptions)
  }

  updateUser(url:string, user:User,token:string): Observable<User>{
      let httpOptions = {
                    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' +  token})
                  };
      return this.httpClient.put<User>(url,user,httpOptions)
    }

   deleteUser(url:string, token:string): Observable<User>{
         let httpOptions = {
             headers: new HttpHeaders({ 'Content-Type': 'application/json',
             'Authorization': 'Bearer ' +  token})
           };
         return this.httpClient.delete<User>(url,httpOptions)
       }
}
