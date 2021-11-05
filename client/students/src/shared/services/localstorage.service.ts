import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";

export interface UserLocalstorage {
  teacherId: number;
  schoolId: number;
  roles: [];
  fullName: string;
  email: string;
  individual_specializationId: number;
}

@Injectable({providedIn: 'root'})
export class LocalstorageService {
   private user = {};

   public get User(): UserLocalstorage {
     const token = localStorage.getItem('auth-token');
     const user: UserLocalstorage = jwt_decode(token);
     return this.user = {
       teacherId: user.teacherId,
       schoolId: user.schoolId,
       email: user.email,
       // @ts-ignore
       roles: user.roles.map((it: any) => it.value),
       fullName: user.fullName,
       individual_specializationId: user.individual_specializationId
     }

   }
}
