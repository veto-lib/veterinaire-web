import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CanDeactivate,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { YesNoModalComponent } from '../components/yes-no-modal/yes-no-modal.component';

type ComponentCanDeactivate = {
  canDeactivate: () => boolean;
};

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard
  implements CanDeactivate<ComponentCanDeactivate>
{
  constructor(private modal: MatDialog) {}

  canDeactivate(
    component: ComponentCanDeactivate,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.canDeactivate()
      ? true
      : this.modal.open(YesNoModalComponent, { data: 'Voulez-vous vraiment quitter le formulaire sans sauvegarder ?' }).afterClosed();
  }
}
