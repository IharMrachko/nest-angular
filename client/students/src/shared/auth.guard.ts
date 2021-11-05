import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import { AuthService } from "../app/auth/auth.service";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild{

  constructor(private auth: AuthService,
              private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
     if(this.auth.isAuthenticated()) {
      const jwtUser = this.auth.getToken();
      const user = jwt_decode(jwtUser);
      // @ts-ignore
      const roles = user.roles.map(it => it.value);
      if (route.data.roles && route.data.roles.some(role => roles.includes(role))) {
        return of(true);
      }
      return of(false);

      } else {
        this.router.navigate(['/'], {
          queryParams: {
            accessDenied: true
          }
        })
        return of(false);
       }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
}
