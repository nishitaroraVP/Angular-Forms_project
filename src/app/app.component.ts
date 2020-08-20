import { Component, OnInit } from '@angular/core';
import {FormService} from './form-list/form.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Header';
  constructor(private formService:FormService){
    
  }
  ngOnInit(){
    
  }
  
}
