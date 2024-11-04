/* eslint-disable @typescript-eslint/no-explicit-any */

import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  effect,
  inject,
} from '@angular/core'
import { RouterLink } from '@angular/router'
import { ApexChartTemplate, InfoUser, Message } from '@app/models'
import { FromNowPipe } from '@app/pipes'
import { selectUserInfo } from '@app/store/auth'
import {
  dashboardActions,
  selectMessages,
  selectRecentOrders,
  selectTotalOrders,
  selectTotalProducts,
  selectTotalSale,
  selectTotalSellers,
} from '@app/store/dashboard'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {
  IconDefinition,
  faCentSign,
  faDollarSign,
  faShoppingCart,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, FontAwesomeModule, RouterLink, FromNowPipe],
  templateUrl: './admin-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {
  private readonly _store = inject(Store);

  public $totalSale: Signal<number> = this._store.selectSignal(selectTotalSale);
  public $totalOrders: Signal<number> =
    this._store.selectSignal(selectTotalOrders);
  public $totalProducts: Signal<number> =
    this._store.selectSignal(selectTotalProducts);
  public $totalSellers: Signal<number> =
    this._store.selectSignal(selectTotalSellers);
  public $recentOrders: Signal<any[]> =
    this._store.selectSignal(selectRecentOrders);
  public $messages: Signal<Message[]> = this._store.selectSignal(selectMessages);

  public $userInfo: Signal<InfoUser> = this._store.selectSignal(
    selectUserInfo
  ) as Signal<InfoUser>;

  public state: ApexChartTemplate = {
    series: [
      {
        name: 'Orders',
        data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 34, 45],
      },
      {
        name: 'Revenue',
        data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78, 67, 78],
      },
      {
        name: 'Sellers',
        data: [34, 39, 56, 56, 80, 67, 23, 56, 98, 78, 45, 56],
      },
    ],
    options: {
      color: ['#008ffb', '#00e396', '#feb019'],
      plotOptions: {
        bar: {
          borderRadius: 30,
        },
      },
      chart: {
        type: 'bar',
        background: 'transparent',
        foreColor: '#d0d2d6',
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: ['smooth', 'straight', 'stepline'],
        lineCap: 'butt',
        colors: ['#f0f0f0'],
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apl',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      legend: {
        position: 'top',
      },
      responsive: [
        {
          breakpoint: 565,
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: '550px',
            },
            yaxis: {
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apl',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
            },
          },
        },
      ],
    },
  };

  public faDollarSign: IconDefinition = faDollarSign;
  public faCentSign: IconDefinition = faCentSign;
  public faShoppingCart: IconDefinition = faShoppingCart;
  public faUser: IconDefinition = faUser;

  public numbers = [1, 2, 3, 4, 5];

  constructor() {
    effect(
      (): void => {
        this._store.dispatch(
          dashboardActions.getAdminDashboardData({ role: 'admin' })
        );
      },
      { allowSignalWrites: true }
    );
  }
}
