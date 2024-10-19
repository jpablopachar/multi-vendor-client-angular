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
import { InfoUser, Message, SellerAdminMessageRequest } from '@app/models'
import { SocketService } from '@app/services'
import { selectUserInfo } from '@app/store/auth'
import {
  chatActions,
  selectSellerAdminMessages,
  selectSuccessMessage,
} from '@app/store/chat'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-seller-to-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-to-admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerToAdminComponent implements OnInit {
  @ViewChild('scrollRef') scrollRef!: ElementRef | undefined;

  private readonly _store = inject(Store);
  private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly _socketService: SocketService = inject(SocketService);

  public $sellerAdminMessage: Signal<Message[]> = this._store.selectSignal(
    selectSellerAdminMessages
  );
  public $successMessage: Signal<string> =
    this._store.selectSignal(selectSuccessMessage);

  public $userInfo: Signal<InfoUser> = this._store.selectSignal(
    selectUserInfo
  ) as Signal<InfoUser>;

  public $text: WritableSignal<string> = signal('');

  constructor() {
    effect(
      (): void => {
        if (this.$successMessage() && this.$successMessage().length > 0) {
          this._socketService.emit(
            'sendMessageSellerToAdmin',
            this.$sellerAdminMessage()[this.$sellerAdminMessage().length - 1]
          );

          this._store.dispatch(chatActions.messageClear());
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
    this._store.dispatch(chatActions.getSellerMessage());

    this._socketService.on('receiverAdminMessage', (message: Message): void => {
      this._store.dispatch(chatActions.updateAdminMessage({ message }));
    });
  }

  public send(): void {
    if (this.$text().length > 0) {
      const request: SellerAdminMessageRequest = {
        senderId: this.$userInfo()._id,
        receiverId: '',
        message: this.$text(),
        senderName: this.$userInfo().name,
      };

      this._store.dispatch(chatActions.sendMessageSellerAdmin({ request }));

      this.$text.set('');
    }
  }
}
