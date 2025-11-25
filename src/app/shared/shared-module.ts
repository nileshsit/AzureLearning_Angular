import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Card } from '../components/card/card';



@NgModule({
  declarations: [
    Breadcrumbs,
    Card
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
    RouterModule,
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  exports:[
    Breadcrumbs,
    Card,
    NgScrollbarModule,
    RouterModule,
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class SharedModule { }
