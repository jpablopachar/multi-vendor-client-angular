import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { environment } from '@src/environments/environment'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private _apiUr: string = environment.apiUrl;

  ngOnInit(): void {
    console.log(this._apiUr);
  }
}
