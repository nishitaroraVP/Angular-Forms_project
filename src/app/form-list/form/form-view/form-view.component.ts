import { Component, OnInit } from '@angular/core';
import {FormService} from '../../form.service';
import {ActivatedRoute,Router} from '@angular/router'
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import {DialogElementsExampleDialog} from '../../form-edit/form-edit.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {
  slug:string;
  form:any;
  questions:[]=[];
  result:any={responses:[]};
  FormFetched:Boolean=false;
  constructor(private formService:FormService,private route:ActivatedRoute,private router:Router,
    private snackbar:MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.route.parent.params.subscribe((params)=>{
        this.slug = params['slug'];
        this.formService.getFormBySlug(this.slug);
        this.formService.formBySlug.subscribe((form)=>{
          this.form = form;
          this.questions = this.form.questions;
          this.FormFetched = true;
        })
      },(error)=>{
        this.snackbar.open(error.message,'Dismiss',{
          duration:1500
        })
      })
    },1000)
  }
  onSubmitSurveyForm(surveyForm:NgForm){
    this.result['slug'] = this.slug;
    for (const key in  surveyForm.value ) {
      if(key!=='email'){
        this.result.responses.push({email:surveyForm.value.email,response:surveyForm.value[key]})
      }
    }
    
   this.formService.SubmitResponse(this.result);
   let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
    data: {
      url: "Response Recorded Successfully"
    },
    height: '400px',
    width: '600px',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log("closed");
  });
  }
}
