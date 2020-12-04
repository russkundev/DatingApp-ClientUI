import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../components/members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: MemberEditComponent): boolean  {
    if(component.editMemberForm.dirty)
      return confirm("Are you sure you want to continue? Any unsaved changes will be lost.");
    return true;
  }
  
}
