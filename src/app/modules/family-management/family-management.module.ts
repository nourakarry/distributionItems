import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyManagementComponent } from './family-management.component';
import { FamilyTableComponent } from './family-table/family-table.component';
import { FamilyManagementRoutingModule } from './family-management-routing.module';
import { AddFamilyDetailsComponent } from './add-family/add-family-details.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownMenusModule, WidgetsModule } from '../../_metronic/partials';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslationModule } from '../i18n/translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFamilyFormGroup } from './form-group/add-family-form-group.service';
@NgModule({
  declarations: [
    FamilyManagementComponent,
    FamilyTableComponent,
    AddFamilyDetailsComponent,
  ],
  imports: [
    CommonModule,
    FamilyManagementRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    NgbModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AddFamilyFormGroup],
})
export class FamilyManagementModule {}
