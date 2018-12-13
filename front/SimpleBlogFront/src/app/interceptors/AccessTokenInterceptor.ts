import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(this.injectAccessToken(request))

    }

    injectAccessToken(request: HttpRequest<any>){
        const access = this.auth.getAccessToken();
        if(!access){
            return request
        }
        
        return request.clone({
            setParams: {
                access_token: access
            }
        })
    }
}