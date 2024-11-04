import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal
} from '@angular/core'
import { RouterLink } from '@angular/router'
import { SearchComponent } from '@app/components/search.component'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import {
  faEdit,
  faEye,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { PaginationComponent } from '../pagination.component'

@Component({
  selector: 'app-discount-products',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    SearchComponent,
    PaginationComponent,
  ],
  templateUrl: './discount-products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountProductsComponent {
  public $currentPage: WritableSignal<number> = signal(1);
  public $searchValue: WritableSignal<string> = signal('');
  public $parPage: WritableSignal<number> = signal(5);

  public faEye: IconDefinition = faEye;
  public faTrash: IconDefinition = faTrash;
  public faEdit: IconDefinition = faEdit;
}
