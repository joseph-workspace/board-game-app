import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    
  ],
  //exports must be placed (as below) so that other modules can access the MatToolbarModule material component(s)
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ]
})
export class MaterialModule { }
