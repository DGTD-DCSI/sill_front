import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LogicielService } from 'src/app/pages/shared/service/logiciel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items!: MenuItem[];

  products!: Product[];

  chartData: any;

  chartOptions: any;

  subscription!: Subscription;
  nbrelogiciels!: number;
  sommelogiciels!: number;

  constructor(private productService: ProductService, public layoutService: LayoutService, private logicielService:LogicielService) {
      this.subscription = this.layoutService.configUpdate$.subscribe(() => {
          this.initChart();
      });
  }

  ngOnInit() {
      this.initChart();
      this.productService.getProductsSmall().then(data => this.products = data);
      this.logicielService.getLogiciels().subscribe((data)=>{
        if (data.code == 200){
            this.nbrelogiciels = data.result.length;
            // this.sommelogiciels = data.result.reduce(function(acc, element){
            //     return acc + element.nbTelechargement;
            // });


        }
      });
      

      this.items = [
          { label: 'Add New', icon: 'pi pi-fw pi-plus' },
          { label: 'Remove', icon: 'pi pi-fw pi-minus' }
      ];
  }

  initChart() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.chartData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: 'First Dataset',
                  data: [65, 59, 80, 81, 56, 55, 40],
                  fill: false,
                  backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                  borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                  tension: .4
              },
              {
                  label: 'Second Dataset',
                  data: [28, 48, 40, 19, 86, 27, 90],
                  fill: false,
                  backgroundColor: documentStyle.getPropertyValue('--green-600'),
                  borderColor: documentStyle.getPropertyValue('--green-600'),
                  tension: .4
              }
          ]
      };

      this.chartOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

}
