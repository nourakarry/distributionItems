import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFamilyDetailsComponent } from './add-family/add-family-details.component';
import { FamilyManagementComponent } from './family-management.component';
import { FamilyTableComponent } from './family-table/family-table.component';

const routes: Routes = [
  {
    path: '',
    component: FamilyManagementComponent,
    children: [
      {
        path: '',
        component: FamilyTableComponent,
      },
      {
        path: 'add-family',
        component: AddFamilyDetailsComponent,
      },
      {
        path: 'edit-family/:id',
        component: AddFamilyDetailsComponent,
      },
      {
        path: 'view-family/:id',
        component: AddFamilyDetailsComponent,
      },
      { path: '', redirectTo: '404', pathMatch: 'full' },
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyManagementRoutingModule {}
