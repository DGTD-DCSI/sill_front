import { Logiciel } from './../../../models/logiciel';
import { environment } from 'src/environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie/categorie.service';

@Component({
  selector: 'app-logic-list',
  templateUrl: './logic-list.component.html',
  styleUrls: ['./logic-list.component.css']
})
export class LogicListComponent implements OnInit {

  title:string="SILL";
   ge:number=25;
   verify : boolean=false;
   nom:string[]=["gildas", "monsieur"]
   ages:number[]=[25,30,25]
   bol: any[]=[25,30,40,"bonjour"]
logiciels!: Logiciel[]
logiciel: Logiciel = {};
categories!: any;
isDisplayModal:boolean=false;
modalLog:Logiciel | undefined

timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  message: any;
  dialogErrorMessage: any;

  constructor(private categorieService:CategorieService) {
    this.load();
   }

  ngOnInit(): void {


    this.logiciels=[
     {libelleLog: "ubuntu",
    descriptionLog:"Distribution LINUX",
    communauteUrlLog:"ubuntu",
    imagelog:"assets/images/ubuntu.webp",
    versionlog:"2.5",
    editeurlog:"microsoft"
  },
    {libelleLog: "FileZilla",
    descriptionLog:"Client FTP",
    communauteUrlLog:"https://filezilla-project.org/",
    imagelog:"assets/images/FileZilla.png",
    versionlog:"2.5",
    editeurlog:"microsoft",
    categorie:[{ id:1,
      libelleCat: "sante",
      descriptionCat:"logiciel de sante",
       }


    ]
  },
    {libelleLog: "libreoffice",
    descriptionLog:"Suite bureautique",
    communauteUrlLog:"https://fr.libreoffice.org/download/telecharger-libreoffice/",
    imagelog:"assets/images/libreoffice.jpg",
    versionlog:"2.5",
    editeurlog:"microsoft",
    categorie:[{ id:1,
      libelleCat: "sante",
      descriptionCat:"logiciel de sante",
       }]
  },
    {libelleLog: "Mozilla",
    descriptionLog:"Navigateur",
    imagelog:"assets/images/mozill.png",
    versionlog:"2.5",
    editeurlog:"microsoft",
    categorie:[{ id:1,
      libelleCat: "sante",
      descriptionCat:"logiciel de sante",
       }]},
    

    {libelleLog: "nextcloud",
    descriptionLog:"Partage de fichiers",
    communauteUrlLog:"https://nextcloud.com/install/",
    imagelog:"assets/images/nextcloud.png",
    versionlog:"2.5",
    editeurlog:"microsoft",
    categorie:[{ id:1,
      libelleCat: "sante",
      descriptionCat:"logiciel de sante",
       }]
  },
    
    {libelleLog: "postfix",
    descriptionLog:"serveur de courriel",
    communauteUrlLog:"https://www.postfix.org/download.html",
    imagelog:"assets/images/postfix.png",
    versionlog:"2.5",
    editeurlog:"microsoft",
    categorie:[{ id:1,
      libelleCat: "sante",
      descriptionCat:"logiciel de sante",
       }]},

    {libelleLog: "Scribus",
    descriptionLog:"PAO",
    communauteUrlLog:"https://sourceforge.net/projects/scribus/",
    imagelog:"assets/images/scribus.jfif",
    versionlog:"2.5",
    editeurlog:"microsoft",
    categorie:[{ id:1,
      libelleCat: "sante",
      descriptionCat:"logiciel de sante",
       }]},

    {libelleLog: "zip",
    descriptionLog:"Compression",
    communauteUrlLog:"https://sourceforge.net/projects/scribus/",
    imagelog:"assets/images/zip.jfif",
    versionlog:"2.5",
    editeurlog:"microsoft",
    categorie:[{ id:1,
      libelleCat: "sante",
      descriptionCat:"logiciel de sante",
       }]},
   
    {libelleLog: "VLC",
    descriptionLog:"Lecteur multimédia",
    communauteUrlLog:"https://www.videolan.org/vlc/download-windows.html",
    imagelog:"assets/images/vlc.png",
    versionlog:"2.5",
    editeurlog:"microsoft",
    categorie:[{ id:1,
      libelleCat: "sante",
      descriptionCat:"logiciel de sante",
       }]},
   
       {libelleLog: "PostgreSQL",
       descriptionLog:"Base transactionnelle",
       communauteUrlLog:"https://www.postgresql.org/download/",
       imagelog:"assets/images/Postgresql.svg.png",
       versionlog:"1.5",
       editeurlog:"Michael Stonebraker",
       categorie:[{ id:1,
         libelleCat: "SGBD",
         descriptionCat:"Base de donnée",
          }]},
      

          {libelleLog: "Apache",
          descriptionLog:"serveur",
          communauteUrlLog:"https://httpd.apache.org/download.cgi",
          imagelog:"assets/images/apache.png",
          versionlog:"1.5",
          editeurlog:"microsoft",
          categorie:[{ id:1,
            libelleCat: "serveur",
            descriptionCat:"serveur web",
             }]},
         
             {libelleLog: "Gimp",
             descriptionLog:"dessin matricielle",
             communauteUrlLog:"https://www.gimp.org/downloads/",
             imagelog:"assets/images/gimp.png",
             versionlog:"2.5",
             editeurlog:"microsoft",
             categorie:[{ id:1,
               libelleCat: "sante",
               descriptionCat:"logiciel de sante",
                }]},
            
   



    ]
    console.log(this.logiciels)
  }
  handleDisplayLogicielModal(logiciel:Logiciel){
    console.log("======================logiciel")
    console.log(logiciel)
    if (logiciel){
this.isDisplayModal=true
this.modalLog=logiciel
    }
  }
  handleCloseModal(){
    this.isDisplayModal=false
    this.modalLog=undefined
}

load(event?: LazyLoadEvent) {
  //this.isLoading = true;
 this.categorieService.getAll(event).subscribe(response => {
   //this.isLoading = false;
   this.categories = response.categories;
 }, error => {
   this.message = { severity: 'error', summary: error.error };
   console.error(JSON.stringify(error));
 });
}

}
