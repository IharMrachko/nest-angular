import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";


@Injectable({providedIn: 'root'})
export class DimensionService {

  public requestDims = [];
  public dimensions: any = {};
  public $dimensions = new BehaviorSubject({});

  constructor(private http: HttpClient) {
  }

  public initialDimensions() {
   this.http.get(`${environment.baseUrl}/directory`)
     .pipe(
       tap((it: any[]) => this.requestDims = it.map(it => it.code))
      )
     .subscribe(res => {
       res.forEach((r, i) => this.dimensions[this.requestDims[i]] = r);
       this.setDimensions(this.dimensions);
     })

  }

  private setDimensions(dimensions: {}) {
    this.$dimensions.next(dimensions);
  }
}
