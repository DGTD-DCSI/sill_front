import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DataView } from 'primeng/dataview';
import { Logiciel } from 'src/app/pages/shared/models/logiciel.model';
import { LogicielService } from 'src/app/pages/shared/service/logiciel.service';
import { retry } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  //styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  logiciels: Logiciel[] = [];
  logiciel: Logiciel;

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  detailViewDialog : boolean = false;


  current_year = new Date().getFullYear();

  constructor(public layoutService: LayoutService, public router: Router, private logicielService: LogicielService) { }

  ngOnInit(): void {
    this.logicielService.getLogiciels().subscribe(data => {
      if (data['code'] === 200) {
        this.logiciels = data['result'];
      }

    });
    this.sortOptions = [
      { label: 'Tri par libellé', value: 'libelle' },
      { label: 'Tri par categorie', value: 'categorie' }
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
    dv.filter((event.target as HTMLInputElement).value);
  }

  // openCommentaireView(singleObject) {
  //   this.commentViewDialog = true;
  
  //   this.logicielService.getCommentaires(singleObject).subscribe((data) => {
  //     if( data.code == 200 ) {
  //       this.commentaires = data.result;
  //       console.log(this.commentaires, "Commentaire");
  //     }
  //   });
  // }

  openDetail(){
    this.detailViewDialog = true;
  }

  hideDialog() {
    this.detailViewDialog = false;
  }

}
