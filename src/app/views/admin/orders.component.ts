/* eslint-disable @typescript-eslint/no-explicit-any */

import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core'
import { RouterLink } from '@angular/router'
import {
  orderActions,
  selectOrders,
  selectTotalOrders,
} from '@app/store/order'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'
import { PaginationComponent } from '../pagination.component'

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink, PaginationComponent],
  templateUrl: './orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  private readonly _store = inject(Store);

  public $orders: Signal<any[]> = this._store.selectSignal(selectOrders);
  public $totalOrders: Signal<number> =
    this._store.selectSignal(selectTotalOrders);

  public $currentPage: WritableSignal<number> = signal(1);
  public $searchValue: WritableSignal<string> = signal('');
  public $parPage: WritableSignal<number> = signal(5);
  public $show: WritableSignal<boolean> = signal(false);

  public faArrowDown: IconDefinition = faArrowDown;

  constructor() {
    effect(
      (): void => {
        if (this.$searchValue() || this.$currentPage() || this.$parPage()) {
          const payload = {
            parPage: this.$parPage(),
            page: this.$currentPage(),
            searchValue: this.$searchValue(),
          };

          this._store.dispatch(orderActions.getAdminOrders({ payload }));
        }
      },
      { allowSignalWrites: true }
    );
  }

  public changeValue(type: string, event: Event): void {
    let value = '';

    if (type === 'input') {
      value = (event.target as HTMLInputElement).value;

      this.$searchValue.set(value);
    } else if (type === 'select') {
      value = (event.target as HTMLSelectElement).value;

      this.$parPage.set(Number(value));
    }
  }
}
