import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { AuthService } from "../../auth/auth.service";
import { DimensionService } from "../../../shared/services/dimension.service";
import { LocalstorageService } from "../../../shared/services/localstorage.service";
import { AccountPopupComponent } from "../../../shared/account-popup/account-popup.component";
import { PopupDirective } from "../../../shared/directories/popup.directive";
import { AvatarService } from "../../../shared/services/avatar.service";
import { abbreviationHelper } from "../../../shared/helpers/abbreviation.helper";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild(PopupDirective) refDir: PopupDirective;
  public imagePreview: string| ArrayBuffer;
  public isAdmin?: boolean;
  public userName: string = '';
  public userId: number;
  public isShow: boolean;


  constructor(private observer: BreakpointObserver,
              private localStorageService: LocalstorageService,
              private dimensionService: DimensionService,
              private resolver: ComponentFactoryResolver,
              private avatarService: AvatarService,
              private localstorageService: LocalstorageService,
              public authService: AuthService) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    }, 0)

    this.userId = this.localstorageService.User.teacherId;
    this.avatarService.getAvatarByUserId(this.userId).subscribe((res: any) => {
      this.imagePreview = res?.image;
      this.isShow = true;
    })
  }

  ngOnInit(): void {
    this.dimensionService.initialDimensions();
  }

  public logout() {
    this.authService.logout();

  }

  public isShowRout(roles: any[]): boolean {
   // @ts-ignore
    return roles.some(role => this.localStorageService.User.roles.includes(role))
  }

  public getName(): string {
    let firstName = this.localStorageService.User.fullName.split(' ')[0];
    let lastName = this.localStorageService.User.fullName.split(' ')[1];
    let thridName = this.localStorageService.User.fullName.split(' ')[2];
    return lastName + ' ' + abbreviationHelper(firstName, thridName);
  }

  public showPopup(): void {
    const component = this.refDir.containerRef.createComponent(this.resolver.resolveComponentFactory(AccountPopupComponent));
    component.instance.imagePreview = this.imagePreview;
    component.instance.userName = this.getName();
    component.instance.email = this.localstorageService.User.email;
    component.instance.close.subscribe((res)=> {
      this.imagePreview = res;
      this.refDir.containerRef.clear();
    });
  }
}
