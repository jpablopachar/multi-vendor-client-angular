import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Signal,
  ViewChild,
  WritableSignal,
  inject,
  signal
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { InfoUser } from '@app/models'
import { SocketService } from '@app/services'
import {
  chatActions,
  selectActiveSellers,
  selectCurrentSeller,
  selectSellerAdminMessages,
  selectSellers,
  selectSuccessMessage,
} from '@app/store/chat'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-chat-seller',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-seller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatSellerComponent implements OnInit {
  @ViewChild('scrollRef') scrollRef!: ElementRef | undefined;

  private readonly _store = inject(Store);
  private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly _socketService: SocketService = inject(SocketService);

  public $sellers: Signal<InfoUser[]> = this._store.selectSignal(selectSellers);
  public $activeSellers = this._store.selectSignal(selectActiveSellers);
  public $sellerAdminMessage = this._store.selectSignal(
    selectSellerAdminMessages
  );
  public $currentSeller = this._store.selectSignal(selectCurrentSeller);
  public $SuccessMessage = this._store.selectSignal(selectSuccessMessage);

  public $text: WritableSignal<string> = signal('');
  public $receiverMessage: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this._store.dispatch(chatActions.getSellers());
  }
}
