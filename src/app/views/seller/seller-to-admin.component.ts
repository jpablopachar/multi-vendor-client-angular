/* eslint-disable @typescript-eslint/no-explicit-any */

import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core'
import { InfoUser } from '@app/models'
import { SocketService } from '@app/services'
import { selectUserInfo } from '@app/store/auth'
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
  selector: 'app-seller-to-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-to-admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerToAdminComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly _socketService: SocketService = inject(SocketService);

  public $sellers: Signal<any[]> = this._store.selectSignal(selectSellers);
  public $activeSellers: Signal<any[]> =
    this._store.selectSignal(selectActiveSellers);
  public $sellerAdminMessage: Signal<any[]> = this._store.selectSignal(
    selectSellerAdminMessages
  );
  public $currentSeller: Signal<any[]> =
    this._store.selectSignal(selectCurrentSeller);
  public $successMessage: Signal<string> =
    this._store.selectSignal(selectSuccessMessage);

  public $userInfo: Signal<InfoUser> = this._store.selectSignal(
    selectUserInfo
  ) as Signal<InfoUser>;

  public $text: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this._store.dispatch(chatActions.getSellerMessage());

    this._socketService.on('receiverAdminMessage', (message: any): void => {
      console.log('receiverAdminMessage', message);
      // this._store.dispatch(chatActions.updateAdminMessage({ message }));
    });
  }
}
