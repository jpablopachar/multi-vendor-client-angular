import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  WritableSignal,
  inject,
  signal
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SocketService } from '@app/services'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-chat-seller',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-seller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatSellerComponent {
  @ViewChild('scrollRef') scrollRef!: ElementRef | undefined;

  private readonly _store = inject(Store);
  private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly _socketService: SocketService = inject(SocketService);

  public $text: WritableSignal<string> = signal('');
  public $receiverMessage: WritableSignal<string> = signal('');
}
