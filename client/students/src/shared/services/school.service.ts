import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SchoolInterface } from "../interfaces/school.interface";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SchoolService {

  constructor(private http: HttpClient) {
  }
  public createSchool(createSchool: SchoolInterface): Observable<SchoolInterface> {
    return this.http.post<SchoolInterface>(`${environment.baseUrl}/schools`, createSchool);
  }

  public getAllSchools(): Observable<SchoolInterface[]> {
    return this.http.get<SchoolInterface[]>(`${environment.baseUrl}/schools`);
  }

  public getSchoolById(id: string): Observable<SchoolInterface> {
    return this.http.get<SchoolInterface>(`${environment.baseUrl}/schools/${id}`);
  }

}
