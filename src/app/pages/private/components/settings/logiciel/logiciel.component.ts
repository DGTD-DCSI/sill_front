import { Component, OnInit } from '@angular/core';
import { LogicielService } from 'src/app/pages/shared/service/logiciel.service';
import { MessageService } from 'primeng/api';
import { Logiciel } from 'src/app/pages/shared/models/logiciel.model';

@Component({
  selector: 'app-logiciel',
  templateUrl: './logiciel.component.html',
  styleUrls: ['./logiciel.component.scss']
})
export class LogicielComponent implements OnInit {
  logiciels: Logiciel[] = [];
  selectedLogiciels: Logiciel[] = [];
  cols = [];

  constructor(private logicielService: LogicielService) { }

  ngOnInit(): void {
    this.logicielService.getLogiciels().subscribe((data) => {
      console.log("un")
        if( data.code == 200 ) {
          this.logiciels = data.result;
          console.log("deux")
          console.log(this.logiciels)
        }
        console.log("trois")
    });

    this.cols = [
      { field: 'libelle', header: 'Libellé' },
      { field: 'description', header: 'Description' },
      { field: 'isActif', header: 'Est Actif' },
      { field: 'logoUrl', header: 'Logo' },
      { field: 'categorie', header: 'Catégorie' },
      { field: 'editeur', header: 'Editeur' },
      { field: 'groupeThematique', header: 'Groupe Thématique' },
    ];
  }

}
