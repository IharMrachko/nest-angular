import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { RoleInterface } from "../interfaces/role.interface";


@Injectable({providedIn: 'root'})
export class RoleService {

  constructor(private http: HttpClient) {
  }

  public getAllRoles(): Observable<RoleInterface[]> {
    return this.http.get<RoleInterface[]>(`${environment.baseUrl}/roles`);
  }
}
