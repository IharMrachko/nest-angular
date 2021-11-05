import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SnackBarService } from "../../../shared/services/snackbar.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SchoolService } from "../../../shared/services/school.service";

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {

  public formSchool: FormGroup;
  public isShowBranch: boolean;

  constructor(private fb: FormBuilder,
              private schoolService: SchoolService,
              private snackbarService: SnackBarService,
              private router: Router,
              private route: ActivatedRoute,

  ) {}

  ngOnInit() {
    this.formSchool = this.fb.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      locality: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      branch: this.fb.array([])
    });
  }

  public createSchool() {
    const createSchool = {
      ...this.formSchool.value,
    }
    console.log(createSchool)
    this.schoolService.createSchool(createSchool).subscribe(res => {
      if (res) {
        this.snackbarService.successfullyCreate('Школа успешно создана!', 'Ok');
        // this.router.navigate(['../add-user-page'],  { relativeTo: this.route })
      }
    })
  }

  private createBranchSchool(): FormGroup {
   return this.fb.group({
      address: ['', Validators.required],
    })
  }


  get branch(): FormArray {
    return this.formSchool.get('branch') as FormArray;
  }

  public addBranch(): void {
   this.isShowBranch = true;
   this.branch.push(this.createBranchSchool());
  }

  public removeBranch(idx: number) {
    this.branch.removeAt(idx);
    if (this.branch.length === 0) { this.isShowBranch = false}
  }
}
