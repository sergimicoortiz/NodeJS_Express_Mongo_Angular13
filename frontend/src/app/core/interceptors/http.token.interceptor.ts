import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(private jwtService: JwtService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': ''
        };

        const token = this.jwtService.getToken();

        if (token) {
            headersConfig['Authorization'] = `Token ${token}`;
        }

        const request = req.clone({ setHeaders: headersConfig });
        return next.handle(request);
    }//intercept
}//class