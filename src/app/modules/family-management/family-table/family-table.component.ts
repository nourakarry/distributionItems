import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  DrawerComponent,
  MenuComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent,
} from '../../../_metronic/kt/components';
import { AddFamily } from '../models/add-family.model';
import { FamiliesService } from '../services/families.service';

@Component({
  selector: 'app-family-table',
  templateUrl: './family-table.component.html',
  styleUrls: ['./family-table.component.scss'],
})
export class FamilyTableComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  familiesList: AddFamily[];
  constructor(
    private router: Router,
    private familiesService: FamiliesService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.familiesService.getAllFamilies().subscribe((data) => {
      this.familiesList = data;
      this.changeDetectorRef.detectChanges();
    });
  }

  routeToDashboard() {
    this.router.navigate(['dashboard']);
    setTimeout(() => {
      ToggleComponent.reinitialization();
      ScrollTopComponent.reinitialization();
      DrawerComponent.reinitialization();
      StickyComponent.bootstrap();
      MenuComponent.reinitialization();
      ScrollComponent.reinitialization();
    }, 200);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    document.body.style.backgroundImage = 'none';
  }
  delete(id?: string) {
    console.log(id);
  }
}
