import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StudentInterface } from "../interfaces/student.interface";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  public createStudent(student: StudentInterface): Observable<StudentInterface> {
   return this.http.post<StudentInterface>(`${environment.baseUrl}/students`, student);
  }

  public updateStudentById(id: number, student: StudentInterface): Observable<StudentInterface> {
    return this.http.patch<StudentInterface>(`${environment.baseUrl}/students/${id}`, student);
  }

  public getStudentById(id: string): Observable<StudentInterface> {
    return this.http.get<StudentInterface>(`${environment.baseUrl}/students/${id}`);
  }
}
