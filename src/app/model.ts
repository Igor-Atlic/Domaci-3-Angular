export interface Login{
  jwt: string,
  permissions: string[]
}

export interface Submit{
  username: string,
  password: string
}

export class User{
  userId:number;
  firstName: string;
  lastName: string;
  email: string;
  permissions: string[];
  constructor(userId:number,
                firstName: string,
                lastName: string,
                email: string,
                permissions: string[]){
                this.userId = userId;
                this.firstName = firstName;
                this.lastName = lastName;
                this.email = email;
                this.permissions = permissions;
  }
}

export class UserC{
  userId:number;
  firstName: string;
  lastName: string;
  email: string;
  permissions: string[];
  password:string;
  constructor(userId:number,
                firstName: string,
                lastName: string,
                email: string,
                permissions: string[],
                password:string){
                this.userId = userId;
                this.firstName = firstName;
                this.lastName = lastName;
                this.email = email;
                this.permissions = permissions;
                this.password = password;
  }
}


