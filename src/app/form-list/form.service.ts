import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment.prod'
import { env } from 'process';
@Injectable({providedIn:'root'})
export class FormService{
    subject = new Subject();
    formBySlug = new Subject();
    ApiErrors = new Subject();
    constructor(private http:HttpClient){
        
    }
    getForms(){
        this.http.get(`${environment.domainName}/forms`).pipe(map(response=>response
        )).subscribe((forms)=>{
            this.subject.next(forms);
            return forms;
            
        },(error)=>{
            this.ApiErrors.next(error);
        })
    }
    getFormBySlug(slug:string){
        this.http.get(`${environment.domainName}/form/${slug}`).subscribe((data)=>{
            this.formBySlug.next(data);
        },(error)=>this.ApiErrors.next(error));
    }
    SubmitResponse(body:any){
        this.http.post(`${environment.domainName}/form/response`,body).subscribe((response)=>{
            console.log(response);
        },(error)=>this.ApiErrors.next(error))
    }
}