import { Component, OnInit } from '@angular/core';
import { SchoolService } from "../../../shared/services/school.service";

@Component({
  selector: 'app-list-schools',
  templateUrl: './list-schools.component.html',
  styleUrls: ['./list-schools.component.scss']
})
export class ListSchoolsComponent implements OnInit {

  constructor(private schoolService: SchoolService) { }

  ngOnInit(): void {
   this.schoolService.getAllSchools().subscribe(res => {
     console.log(res)
   })
  }

}
