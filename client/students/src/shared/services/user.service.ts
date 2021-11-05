import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { TeacherInterface } from "../interfaces/teacher.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  public getAllUserBySchoolId(schoolId): Observable<TeacherInterface[]> {
    return this.http.get<TeacherInterface[]>(`${environment.baseUrl}/users/schoolId`, {
      params: {
        schoolId: schoolId
      }
    })
  }

  public getUserById(userId: string): Observable<TeacherInterface> {
    return this.http.get<TeacherInterface>(`${environment.baseUrl}/users/userId`, {
      params: {
        userId: userId
      }
    })
  }

  public updateUser(userId: number, user: any) {
    return this.http.put(`${environment.baseUrl}/users/update/${userId}`, user);
  }
}
