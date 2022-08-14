import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { UsersComponent } from './components/users/users.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import {ReadGuard} from "./guard/read.guard"
import {CreateGuard} from "./guard/create.guard"
import {UpdateGuard} from "./guard/update.guard"


const routes: Routes = [
  {
      path: "",
      component: HomeComponent
  },
  {
       path: "users",
       component: UsersComponent,
       canActivate: [ReadGuard]
  },
  {
        path: "addUser",
        component: AdduserComponent,
        canActivate: [CreateGuard]
  },
  {
        path: "editUser/:id",
        component: EdituserComponent,
        canActivate: [UpdateGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
