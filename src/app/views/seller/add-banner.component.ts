import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-add-banner',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>addBanner works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBannerComponent { }
