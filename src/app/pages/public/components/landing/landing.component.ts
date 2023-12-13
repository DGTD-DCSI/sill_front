import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Logiciel } from 'src/app/pages/public/models/logiciel';
import { LogicielService } from 'src/app/pages/public/service/logiciel.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  //styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  logiciels: Logiciel[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  sourceCities: any[] = [];

  targetCities: any[] = [];

  orderCities: any[] = [];

  constructor(public layoutService: LayoutService, public router: Router, private logicielService: LogicielService) { }

  ngOnInit(): void {
    this.logicielService.getLogiciels().subscribe(data => {
      if (data['code'] === 200) {
        this.logiciels = data['result'];
        console.log('dd');
      }

      else
        console.log('erreur');

    });

    this.sourceCities = [
      { name: 'San Francisco', code: 'SF' },
      { name: 'London', code: 'LDN' },
      { name: 'Paris', code: 'PRS' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Berlin', code: 'BRL' },
      { name: 'Barcelona', code: 'BRC' },
      { name: 'Rome', code: 'RM' }];

    this.targetCities = [];

    this.orderCities = [
      { name: 'San Francisco', code: 'SF' },
      { name: 'London', code: 'LDN' },
      { name: 'Paris', code: 'PRS' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Berlin', code: 'BRL' },
      { name: 'Barcelona', code: 'BRC' },
      { name: 'Rome', code: 'RM' }];

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  btnLogin = function () {
    this.router.navigateByUrl('/auth/login')
  };

  btnRegister = function () {
    this.router.navigateByUrl('/auth/register')
  };

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onFilter(dv: DataView, event: Event) {
    //dv.filter((event.target as HTMLInputElement).value);
  }

}
