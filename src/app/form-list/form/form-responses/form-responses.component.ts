import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormService} from '../../form.service'
@Component({
  selector: 'app-form-responses',
  templateUrl: './form-responses.component.html',
  styleUrls: ['./form-responses.component.css']
})
export class FormResponsesComponent implements OnInit {
  slug:string;
  form:any;
  emails:string[]=[];
  selectedEmail:string;
  clicked:Boolean;
  FormFetched:Boolean=false;

  constructor(private activateRoute:ActivatedRoute,private formService:FormService ) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.activateRoute.parent.params.subscribe((params:Params)=>{
        this.slug = params['slug'];
        this.formService.getFormBySlug(this.slug);
        this.formService.formBySlug.subscribe((form)=>{
          this.form = form;
          this.form.questions.map((question)=>{
            question.responses.map((response)=>{
             this.emails.push(response.email)
            })
            
          })
          this.emails = [...new Set(this.emails)]
          this.FormFetched = true;
        });
      })
    },1000)
   
    
  }
  onClickViewResponse(event:string){
    this.selectedEmail = event;
    this.clicked = true;
    
  }

}
