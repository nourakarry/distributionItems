import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { BaseFormGroup } from '../../shared/forms/services/base-form-group.service';
import { AddFamily } from '../models/add-family.model';
@Injectable({
  providedIn: 'root',
})
export class AddFamilyFormGroup extends BaseFormGroup<AddFamily> {
  fg: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
  }

  getFormGroup(family: AddFamily, isView?: boolean): FormGroup {
    this.fg = this.fb.group({
      idCard: [
        { value: family.idCard || '', disabled: isView },
        [Validators.required],
      ],
      arFName: [
        { value: family.arFName || '', disabled: isView },
        [Validators.required],
      ],
      arLName: [
        { value: family.arLName || '', disabled: isView },
        [Validators.required],
      ],
      enFName: [
        { value: family.enFName || '', disabled: isView },
        [Validators.required],
      ],
      enLName: [
        { value: family.enLName || '', disabled: isView },
        [Validators.required],
      ],
      gender: [
        { value: family.gender || 'male', disabled: isView },
        [Validators.required],
      ],
      mainNumber: [
        { value: family.mainNumber || '', disabled: isView },
        [Validators.required],
      ],
      secondNumber: [
        { value: family.secondNumber || '', disabled: isView },
        [Validators.required],
      ],
      birthday: [
        {
          value: family.birthday || new Date().toISOString(),
          disabled: isView,
        },
        [Validators.required],
      ],
      email: [
        { value: family.email || '', disabled: isView },
        [Validators.required],
      ],
      familySpender: [
        {
          value: family.familySpender ? true : false || false,
          disabled: isView,
        },
        [Validators.required],
      ],
      isThereAnyProvider: [
        {
          value: family.isThereAnyProvider ? true : false || false,
          disabled: isView,
        },
        [Validators.required],
      ],
      job: [
        { value: family.job || '', disabled: isView },
        [Validators.required],
      ],
      countOfFamily: [
        { value: family.countOfFamily || 0, disabled: isView },
        [Validators.required],
      ],
      income: [
        { value: family.income || '', disabled: isView },
        [Validators.required],
      ],
      areYouDisplacment: [
        {
          value: family.areYouDisplacment ? true : false || false,
          disabled: isView,
        },
        [Validators.required],
      ],
      orginalHome: [
        { value: family.orginalHome || '', disabled: isView },
        [Validators.required],
      ],
      areYouRefugee: [
        {
          value: family.areYouRefugee ? true : false || false,
          disabled: isView,
        },
        [Validators.required],
      ],
      adress: [
        { value: family.adress || '', disabled: isView },
        [Validators.required],
      ],
      dead: [
        { value: family.dead ? true : false || false, disabled: isView },
        [Validators.required],
      ],
      gettingAidFromOther: [
        {
          value: family.gettingAidFromOther ? true : false || false,
          disabled: isView,
        },
        [Validators.required],
      ],
      livingInCamp: [
        {
          value: family.livingInCamp ? true : false || false,
          disabled: isView,
        },
        [Validators.required],
      ],
      campName: [
        { value: family.campName || '', disabled: isView },
        [Validators.required],
      ],
      isThereAnyDisapility: [
        {
          value: family.isThereAnyDisapility ? true : false || false,
          disabled: isView,
        },
        [Validators.required],
      ],
      notes: [
        { value: family.notes || '', disabled: isView },
        [Validators.required],
      ],
    });
    return this.fg;
  }

  getValueFromFormGroup(fg: FormGroup): AddFamily {
    const family = {
      idCard: fg.controls.idCard.value,
      arFName: fg.controls.arFName.value,
      arLName: fg.controls.arLName.value,
      enFName: fg.controls.enFName.value,
      enLName: fg.controls.enLName.value,
      gender: fg.controls.gender.value,
      mainNumber: fg.controls.mainNumber.value,
      secondNumber: fg.controls.secondNumber.value,
      birthday: fg.controls.birthday.value,
      email: fg.controls.email.value,
      familySpender: fg.controls.familySpender.value,
      isThereAnyProvider: fg.controls.isThereAnyProvider.value,
      job: fg.controls.job.value,
      countOfFamily: fg.controls.countOfFamily.value,
      income: fg.controls.income.value,
      areYouDisplacment: fg.controls.areYouDisplacment.value,
      orginalHome: fg.controls.orginalHome.value,
      areYouRefugee: fg.controls.areYouRefugee.value,
      adress: fg.controls.adress.value,
      dead: fg.controls.dead.value,
      gettingAidFromOther: fg.controls.gettingAidFromOther.value,
      livingInCamp: fg.controls.livingInCamp.value,
      campName: fg.controls.campName.value,
      isThereAnyDisapility: fg.controls.isThereAnyDisapility.value,
      notes: fg.controls.notes.value,
    } as AddFamily;
    return family;
  }
}
