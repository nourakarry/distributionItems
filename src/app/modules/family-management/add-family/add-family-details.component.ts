import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AddFamilyFormGroup } from '../form-group/add-family-form-group.service';
import { AddFamily } from '../models/add-family.model';
import { FamiliesService } from '../services/families.service';

@Component({
  selector: 'app-add-family-details',
  templateUrl: './add-family-details.component.html',
})
export class AddFamilyDetailsComponent implements OnInit, OnDestroy {
  fg: FormGroup;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];
  familyId: string;
  isView: boolean;
  isEdit: boolean;
  constructor(
    private cdr: ChangeDetectorRef,
    private addFamilyFormGroup: AddFamilyFormGroup,
    private familiesService: FamiliesService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.isView = this.router.url.includes('view');
    this.isEdit = this.router.url.includes('edit');
    this.familyId = this.activeRoute.snapshot.params.id || null;
    this.initFormGroup();
  }

  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
  }
  initFormGroup() {
    let addFamily = this.initForm();
    if (this.familyId) {
      this.familiesService.getFamilyById(this.familyId).subscribe((data) => {
        addFamily = data;
        this.buildAddFamilyFormGroup(addFamily);
      });
    } else {
      this.buildAddFamilyFormGroup(addFamily);
    }
  }
  buildAddFamilyFormGroup(family: AddFamily) {
    this.fg = this.addFamilyFormGroup.getFormGroup(family, this.isView);
    this.cdr.detectChanges();
  }
  initForm() {
    const family: AddFamily = {
      idCard: '',
      arFName: '',
      arLName: '',
      enFName: '',
      enLName: '',
      gender: '',
      mainNumber: '',
      secondNumber: '',
      birthday: new Date().toISOString(),
      email: '',
      familySpender: false,
      isThereAnyProvider: false,
      job: '',
      countOfFamily: 0,
      income: '',
      areYouDisplacment: false,
      orginalHome: '',
      areYouRefugee: false,
      adress: '',
      dead: false,
      gettingAidFromOther: false,
      livingInCamp: false,
      campName: '',
      isThereAnyDisapility: false,
      notes: '',
    };
    return family;
  }
  submit() {
    if (!this.fg.valid) {
      return;
    } else {
      const addFamily: AddFamily =
        this.addFamilyFormGroup.getValueFromFormGroup(this.fg);
      if (this.isEdit) {
        const familySub = this.familiesService
          .editFamily(addFamily, this.familyId)
          .subscribe(() => {});
        this.unsubscribe.push(familySub);
      } else {
        const familySub = this.familiesService
          .addNewFamily(addFamily)
          .subscribe(() => {});
        this.unsubscribe.push(familySub);
      }
    }
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
