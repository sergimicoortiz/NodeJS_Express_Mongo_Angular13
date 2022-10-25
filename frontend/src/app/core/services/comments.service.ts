import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models';

const baseUrl = 'http://localhost:3001/api/comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient) { }

    getAll(slug: String): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${baseUrl}/${slug}`);
    }//getAll

    create(slug: String, data: any): Observable<any> {
        return this.http.post<any>(`${baseUrl}/${slug}`, data);
    }//create

    delete(id: String): Observable<any> {
        return this.http.delete<any>(`${baseUrl}/${id}`);
    }//delete

}//class