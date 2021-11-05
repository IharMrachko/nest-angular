import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { JournalInterface } from "../interfaces/journal.interface";

@Injectable({providedIn: "root"})
export class ElectronicJournalService {
  constructor(private http: HttpClient) {
  }

  public createElectronicJournal(journal: JournalInterface[]) {
    return this.http.post(`${environment.baseUrl}/electronic-journal`, journal);
  }
}
