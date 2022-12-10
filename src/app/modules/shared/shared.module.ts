import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule
  ],
  exports: [
    SidebarComponent,
    MatIconModule,
    HttpClientModule
  ]
})
export class SharedModule { }
