import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient) { }

    getAll(slug: String): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${environment.COMMENT_BASE}/${slug}`);
    }//getAll

    create(slug: String, data: any): Observable<any> {
        return this.http.post<any>(`${environment.COMMENT_BASE}/${slug}`, data);
    }//create

    delete(id: String): Observable<any> {
        return this.http.delete<any>(`${environment.COMMENT_BASE}/${id}`);
    }//delete

}//class