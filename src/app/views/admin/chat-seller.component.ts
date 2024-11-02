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
import { ActivatedRoute, RouterLink } from '@angular/router'
import { InfoUser, SellerAdminMessageRequest } from '@app/models'
import { SocketService } from '@app/services'
import {
  chatActions,
  selectActiveSellers,
  selectCurrentSeller,
  selectSellerAdminMessages,
  selectSellers,
  selectSuccessMessage,
} from '@app/store/chat'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import { faClose, faGrinHearts, faList } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-chat-seller',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FontAwesomeModule],
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
  public $sellerAdminMessages = this._store.selectSignal(
    selectSellerAdminMessages
  );
  public $currentSeller = this._store.selectSignal(selectCurrentSeller);
  public $SuccessMessage = this._store.selectSignal(selectSuccessMessage);

  private $_receiverMessage: WritableSignal<string | any> = signal('');

  public $show: WritableSignal<boolean> = signal(false);
  public $text: WritableSignal<string> = signal('');
  public $sellerId: WritableSignal<string | null> = signal(null);

  public faClose: IconDefinition = faClose;
  public faList: IconDefinition = faList;
  public faGrinHearts: IconDefinition = faGrinHearts;

  constructor() {
    effect(
      (): void => {
        if (this.$sellerId()) {
          this._store.dispatch(
            chatActions.getAdminMessages({
              receiverId: this.$sellerId() as string,
            })
          );
        }

        if (this.$SuccessMessage()) {
          this._socketService.emit(
            'sendMessageAdminToSeller',
            this.$sellerAdminMessages()[this.$sellerAdminMessages().length - 1]
          );

          this._store.dispatch(chatActions.messageClear());
        }

        if (this.$_receiverMessage()) {
          if (this.$_receiverMessage()) {
            if (
              this.$_receiverMessage().senderId === this.$sellerId() &&
              this.$_receiverMessage().receiverId === ''
            ) {
              this._store.dispatch(
                chatActions.updateSellerMessage(this.$_receiverMessage())
              );
            } else {
              this._toastr.success(
                `${this.$_receiverMessage().senderName} send a message`
              );

              this._store.dispatch(chatActions.messageClear());
            }
          }
        }

        if (this.$sellerAdminMessages()) {
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
    });

    this._store.dispatch(chatActions.getSellers());
  }

  public send(): void {
    if (this.$text().length > 0) {
      const request: SellerAdminMessageRequest = {
        senderId: '',
        receiverId: this.$sellerId() as string,
        message: this.$text(),
        senderName: 'Admin Support',
      };

      this._store.dispatch(chatActions.sendMessageSellerAdmin({ request }));

      this.$text.set('');
    }
  }
}
