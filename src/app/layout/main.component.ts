import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  effect,
  inject,
} from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { InfoUser } from '@app/models'
import { SocketService } from '@app/services'
import { selectUserInfo } from '@app/store/auth'
import { chatActions } from '@app/store/chat'
import { Store } from '@ngrx/store'
import { HeaderComponent } from './header.component'
import { SidebarComponent } from './sidebar.component'

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="bg-[#cdcae9] w-full min-h-screen">
      <app-header
        [showSidebar]="showSidebar"
        (setShowSidebar)="showSidebar = $event"
      ></app-header>
      <app-sidebar
        [showSidebar]="showSidebar"
        (setShowSidebar)="showSidebar = $event"
      ></app-sidebar>
      <div class="ml-0 lg:ml-[260px] pt-[95px] transition-all">
        <router-outlet />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly _socketService: SocketService = inject(SocketService);

  public $userInfo: Signal<InfoUser> = this._store.selectSignal(
    selectUserInfo
  ) as Signal<InfoUser>;

  public showSidebar = false;

  constructor() {
    effect(() => {
      if (this.$userInfo()) {
        if (this.$userInfo().role === 'seller') {
          this._socketService.emit(
            'addSeller',
            this.$userInfo()._id,
            this.$userInfo()
          );
        } else {
          this._socketService.emit('addAdmin', this.$userInfo());
        }
      }
    });
  }

  ngOnInit(): void {
    this._socketService.on('activeSellers', (sellers): void => {
      this._store.dispatch(chatActions.updateSellers({ payload: sellers }));
    });
  }
}
