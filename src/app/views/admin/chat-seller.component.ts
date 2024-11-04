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
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router'
import { InfoUser, Message, SellerAdminMessageRequest } from '@app/models'
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
import {
  faClose,
  faGrinHearts,
  faList,
} from '@fortawesome/free-solid-svg-icons'
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

  private $_successMessage: Signal<string> =
    this._store.selectSignal(selectSuccessMessage);

  public $sellers: Signal<InfoUser[]> = this._store.selectSignal(selectSellers);
  public $activeSellers: Signal<InfoUser[]> =
    this._store.selectSignal(selectActiveSellers);
  public $sellerAdminMessages: Signal<Message[]> = this._store.selectSignal(
    selectSellerAdminMessages
  );
  public $currentSeller: Signal<InfoUser> = this._store.selectSignal(
    selectCurrentSeller
  ) as Signal<InfoUser>;

  private $_receiverMessage: WritableSignal<null | Message> = signal(null);

  public $show: WritableSignal<boolean> = signal(false);
  public $text: WritableSignal<string> = signal('');
  public $sellerId: WritableSignal<string | null> = signal(null);

  public faClose: IconDefinition = faClose;
  public faList: IconDefinition = faList;
  public faGrinHearts: IconDefinition = faGrinHearts;

  constructor() {
    effect(
      (): void => {
        if (this.$_successMessage()) {
          const lastMessage = this.$sellerAdminMessages().slice(-1)[0];

          this._socketService.emit('sendMessageAdminToSeller', lastMessage);

          this._store.dispatch(chatActions.messageClear());
        }

        const message = this.$_receiverMessage() as Message;

        if (message) {
          if (message.senderId === this.$sellerId()) {
            this._store.dispatch(chatActions.updateSellerMessage({ message }));
          } else {
            this._toastr.success(`${message.senderName} send a message`);

            this._store.dispatch(chatActions.messageClear());
          }

          this.$_receiverMessage.set(null);
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
    this._route.paramMap.subscribe((params: ParamMap): void => {
      const sellerId: string | null = params.get('sellerId');

      if (sellerId) {
        this.$sellerId.set(sellerId);

        this._store.dispatch(
          chatActions.getAdminMessages({
            receiverId: sellerId,
          })
        );
      }
    });

    this._socketService.on(
      'receiverSellerMessage',
      (message: Message): void => {
        this.$_receiverMessage.set(message);
      }
    );

    this._store.dispatch(chatActions.getSellers());
  }

  public send(): void {
    const text: string = this.$text().trim();

    if (text) {
      const request: SellerAdminMessageRequest = {
        senderId: '',
        receiverId: this.$sellerId() as string,
        message: text,
        senderName: 'Admin Support',
      };

      this._store.dispatch(chatActions.sendMessageSellerAdmin({ request }));

      this.$text.set('');
    }
  }
}
