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
import { InfoUser } from '@app/models'
import {
  selectSellers,
  selectTotalSellers,
  sellerActions,
} from '@app/store/seller'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'
import { PaginationComponent } from '../pagination.component'

@Component({
  selector: 'app-sellers',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink, PaginationComponent],
  templateUrl: './sellers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellersComponent {
  private readonly _store = inject(Store);

  public $sellers: Signal<InfoUser[]> = this._store.selectSignal(selectSellers);
  public $totalSellers: Signal<number> =
    this._store.selectSignal(selectTotalSellers);

  public $currentPage: WritableSignal<number> = signal(1);
  public $searchValue: WritableSignal<string> = signal('');
  public $parPage: WritableSignal<number> = signal(5);
  public $show: WritableSignal<boolean> = signal(false);

  public faEye: IconDefinition = faEye;

  constructor() {
    effect(() => {
      if (this.$searchValue() || this.$currentPage() || this.$parPage()) {
        const payload = {
          parPage: this.$parPage(),
          page: this.$currentPage(),
          searchValue: this.$searchValue(),
        };

        this._store.dispatch(sellerActions.getActiveSellers({ payload }));
      }
    });
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
