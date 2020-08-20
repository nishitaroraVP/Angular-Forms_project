import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  slug:string;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe((data:Params)=>{
      this.slug=data['slug'];
    })
  }

}
