import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SnackBarService } from "../../../shared/services/snackbar.service";
import { combineLatest, Subscription } from "rxjs";
import { DimensionService } from "../../../shared/services/dimension.service";
import { StudentService } from "../../../shared/services/student.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LocalstorageService } from "../../../shared/services/localstorage.service";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit, OnDestroy {

  public step = 0;
  public form: FormGroup = new FormGroup({});
  public teachers: any[];
  public subscriptions: Subscription[] = [];
  public isShowForm: boolean;
  public isTrusted: boolean;
  public schoolId: number;
  public teacherId: number;
  public individualSpec: number;
  public dimensions: any = {};

  constructor(private fb: FormBuilder,
              private studentService: StudentService,
              private snackBarService: SnackBarService,
              private dimensionService: DimensionService,
              private localstorageService: LocalstorageService,
              public dialog: MatDialog,
              public router: Router,
              ) {
  }

  ngOnInit(): void {
    this.schoolId = this.localstorageService.User.schoolId;
    this.teacherId =  this.localstorageService.User.teacherId;
    this.individualSpec = this.localstorageService.User.individual_specializationId;
    this.subscriptions.push(
      combineLatest([
        this.dimensionService.$dimensions,
      ]).subscribe(([dim] )=> {
        this.dimensions = dim;
        this.initialForm();
      }));
  }


  public initialForm(): void {
    this.form = this.fb.group({
      schoolId: [this.schoolId],
      teacherId: [this.teacherId],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      thridName: ['', Validators.required],
      dateBirthday: ['', Validators.required],
      yearOfAdmission: ['', Validators.required],
      trainingPeriodKindId: [this.getIdTrainingPeriod(), Validators.required],
      instrumentKindId: [],
      parents: this.fb.array([this.fb.group({
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        thridName: ['', Validators.required],
        phone: ['', Validators.required],
      })
      ]),
      secondary_school_number: ['', Validators.required],
      address: ['', Validators.required],
      general_information: ['']
    })
    this.isShowForm = true;
  }

  public getIdTrainingPeriod(trainingPeriodName: string = 'Пятилетний'): number {
    return this.dimensions?.TRAINING_PERIOD?.kinds.filter(it => it.value === trainingPeriodName).map(it => it.id).shift();
  }

  public setStep(index: number) {
    this.step = index;
  }

  public nextStep() {
    this.step++;
  }

  public prevStep() {
    this.step--;
  }

  get parents() {
    return this.form.get('parents') as FormArray;
  }

  public addContact(): void {
    const contact = this.fb.group({
      lastName: '',
      firstName: '',
      thridName: '',
      phone: '',
    })
    this.parents.push(contact);
  }

  public deleteContact(index: number): void {
    this.parents.removeAt(index);
  }

  public saveStudent(): void {
    const student = {
      ...this.form.value,
      schoolId: this.schoolId,
      instrumentKindId: this.individualSpec,
      teacherId: this.teacherId,
    }
    this.studentService.createStudent(student).subscribe(res => {
      if (res) {
        this.snackBarService.successfullyCreate('Ученик успешно добавлен!', 'Ok');
        this.form.reset()
      }
    });
  }

  public focusOut(event: FocusEvent): void {
    this.isTrusted = event.isTrusted;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
