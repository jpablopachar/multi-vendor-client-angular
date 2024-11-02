/* eslint-disable @typescript-eslint/no-explicit-any */

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
  effect,
  inject,
  signal,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
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
import { ToastrService } from 'ngx-toastr'

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
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _toastr: ToastrService = inject(ToastrService);
  private readonly _socketService: SocketService = inject(SocketService);

  public $sellers: Signal<InfoUser[]> = this._store.selectSignal(selectSellers);
  public $activeSellers = this._store.selectSignal(selectActiveSellers);
  public $sellerAdminMessage = this._store.selectSignal(
    selectSellerAdminMessages
  );
  public $currentSeller = this._store.selectSignal(selectCurrentSeller);
  public $SuccessMessage = this._store.selectSignal(selectSuccessMessage);

  private $_receiverMessage: WritableSignal<string | any> = signal('');

  public $text: WritableSignal<string> = signal('');
  public $sellerId: WritableSignal<string | null> = signal(null);

  constructor() {
    effect(
      (): void => {
        if (this.$sellerId()) {
          // Get admin messages
        }

        if (this.$SuccessMessage()) {
          this._socketService.emit(
            'sendMessageAdminToSeller',
            this.$sellerAdminMessage()[this.$sellerAdminMessage().length - 1]
          );

          this._store.dispatch(chatActions.messageClear());
        }

        if (this.$_receiverMessage()) {
          if (this.$_receiverMessage()) {
            if (this.$_receiverMessage().senderId === this.$sellerId() && this.$_receiverMessage().receiverId === '') {
              this._store.dispatch(chatActions.updateSellerMessage(this.$_receiverMessage()));
            } else {
              this._toastr.success(`${this.$_receiverMessage().senderName} send a message`);

              this._store.dispatch(chatActions.messageClear());
            }
          }
        }

        if (this.$sellerAdminMessage()) {
          this._cdr.detectChanges();

          requestAnimationFrame((): void => {
            if (this.scrollRef) {
              const elementTemp = this.scrollRef.nativeElement;

              elementTemp.scrollTop = elementTemp.scrollHeight;
            }
          });
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.$sellerId.set(this._route.snapshot.params['sellerId']);

    this._socketService.on('', (message) => {
      this.$_receiverMessage.set(message);
    })

    this._store.dispatch(chatActions.getSellers());
  }
}
