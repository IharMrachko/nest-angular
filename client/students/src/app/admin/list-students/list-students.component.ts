import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder} from "@angular/forms";
import { Router } from "@angular/router";
import { SchoolService } from "../../../shared/services/school.service";
import { LocalstorageService } from "../../../shared/services/localstorage.service";
import { DimensionService } from "../../../shared/services/dimension.service";
import { combineLatest, Subscription } from "rxjs";
import { getClassNumberHelper } from "../../../shared/get-class-number.helper";
import { PopupDirective } from "../../../shared/directories/popup.directive";
import { PopupSortComponent } from "../../../shared/popup-sort/popup-sort.component";
import { abbreviationHelper } from "../../../shared/helpers/abbreviation.helper";

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss']
})
export class ListStudentsComponent implements OnInit{

  @ViewChild(PopupDirective) refDir: PopupDirective;
  public subscriptions: Subscription[] = [];
  public isTrusted: boolean;
  public isShow: boolean;
  public schoolId: number;
  public students: any[] = [];
  public teachers: any[] = [];
  public displayedColumns: string[] = ['classNumber', 'fullName', 'instrument', 'teacher'];
  public dataSource: any;
  public dimensions: any;

  constructor(private router: Router,
              private fb: FormBuilder,
              private dimensionService: DimensionService,
              private localStorageService: LocalstorageService,
              private schoolService: SchoolService,
              private resolver: ComponentFactoryResolver,
              ) { }


  ngOnInit(): void {
    this.schoolId = this.localStorageService.User.schoolId;
    this.subscriptions.push(
      combineLatest([
        this.dimensionService.$dimensions,
        this.schoolService.getSchoolById(this.schoolId.toString())
       ]).subscribe(([dim, school]) => {
        this.dimensions = dim;
        this.students = school.students;
        this.teachers = school.users
        this.prepareStudents();
      }));
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private prepareStudents(): void {
  const students = this.students.map(student => {
      let classNumber = getClassNumberHelper(student.yearOfAdmission, this.getTrainingPeriod(student?.trainingPeriodKindId));
      let instrument = this.getInstrument(student.instrumentKindId);
      let fullName = student.lastName + ' ' + student.firstName + ' ' + student.thridName;
      let teacher =  this.getTeacherName(this.teachers.find(it => it.id === student.teacherId));
      return {...student, fullName, classNumber, instrument, teacher}
    });
    this.dataSource = new MatTableDataSource(students);
     this.isShow = true;
  }

  private getTrainingPeriod(trainingPeriodId: number): string {
   return this.dimensions?.TRAINING_PERIOD?.kinds.filter(it => it.id === trainingPeriodId).map(it => it.value).shift();
  }

  private getInstrument(instrumentId: number): string {
   return this.dimensions?.SPECIALIZATION?.kinds.filter(it => it.id === instrumentId).map(it => it.value).shift();
  }


  public focusOut(event: FocusEvent) {
    this.isTrusted = event.isTrusted;
  }

  public searchMyStudents(isMyStudents: boolean): void {
     if (isMyStudents) {
        this.students = this.students.filter(it => it.teacherId === this.localStorageService.User.teacherId);
        this.prepareStudents();
     }
      else {
       this.ngOnInit();
      }
  }

  public showPopup(): void {
  const component = this.refDir.containerRef.createComponent(this.resolver.resolveComponentFactory(PopupSortComponent));
   component.instance.close.subscribe(()=> {
    this.refDir.containerRef.clear();
   });
   component.instance.onSearch.subscribe((res: any) => {
    if (res) {
      this.searchMyStudents(res.isMyStudents)
      this.refDir.containerRef.clear();
    }
   })
  }

  private getTeacherName(teacher: any): string {
  return teacher.lastName + ' ' +  abbreviationHelper(teacher.firstName, teacher.thridName);
  }
}
