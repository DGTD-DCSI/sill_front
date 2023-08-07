import { Logiciel, LogicielDataFront } from './../../../models/logiciel';
import { Version } from './../../../models/version';
import { LazyLoadEvent } from 'primeng/api';

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categorie } from 'src/app/models/categorie';
import { LogicielService } from 'src/app/services/logiciel/logiciel.service';
import { CategorieService } from 'src/app/services/categorie/categorie.service';

import { AuthService } from 'src/app/services/auth/auth.service';
import { VersionService } from 'src/app/services/version/version.service';
import { UploadFileService } from 'src/app/services/uploadFile/upload-file.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-logic',
  templateUrl: './logic.component.html',
  styleUrls: ['./logic.component.css']
})
export class LogicComponent implements OnInit {
  logiciels: any[] = []
  /* [
     {
       libelleLog: "ubuntu",
       descriptionLog: "Distribution LINUX",
       communauteUrlLog: "ubuntu",
       imagelog: "assets/images/ubuntu.webp",
       versionlog: "2.5",
       editeurlog: "microsoft",
       type: "sante"
     },
     {
       libelleLog: "FileZilla",
       descriptionLog: "Client FTP",
       communauteUrlLog: "https://filezilla-project.org/",
       imagelog: "assets/images/FileZilla.png",
       versionlog: "2.5",
       editeurlog: "microsoft",
       type: "serveur",
       categorie: [{
         id: 1,
         libelleCat: "sante",
         descriptionCat: "logiciel de sante",
       }
 
 
       ]
     },
     {
       libelleLog: "libreoffice",
       descriptionLog: "Suite bureautique",
       communauteUrlLog: "https://fr.libreoffice.org/download/telecharger-libreoffice/",
       imagelog: "assets/images/libreoffice.jpg",
       versionlog: "2.5",
       editeurlog: "microsoft",
       type: "sante",
       categorie: [{
         id: 1,
         libelleCat: "sante",
         descriptionCat: "logiciel de sante",
       }]
     },
     {
       libelleLog: "Mozilla",
       descriptionLog: "Navigateur",
       imagelog: "assets/images/mozill.png",
       versionlog: "2.5",
       editeurlog: "microsoft",
       type: "education",
       categorie: [{
         id: 1,
         libelleCat: "sante",
         descriptionCat: "logiciel de sante",
       }]
     },
 
 
     {
       libelleLog: "nextcloud",
       descriptionLog: "Partage de fichiers",
       communauteUrlLog: "https://nextcloud.com/install/",
       imagelog: "assets/images/nextcloud.png",
       versionlog: "2.5",
       editeurlog: "microsoft",
       type: "education",
       categorie: [{
         id: 1,
         libelleCat: "sante",
         descriptionCat: "logiciel de sante",
       }]
     },
 
     {
       libelleLog: "postfix",
       descriptionLog: "serveur de courriel",
       communauteUrlLog: "https://www.postfix.org/download.html",
       imagelog: "assets/images/postfix.png",
       versionlog: "2.5",
       editeurlog: "microsoft",
       type: "email",
       categorie: [{
         id: 1,
         libelleCat: "sante",
         descriptionCat: "logiciel de sante",
       }]
     },
 
     {
       libelleLog: "Scribus",
       descriptionLog: "PAO",
       communauteUrlLog: "https://sourceforge.net/projects/scribus/",
       imagelog: "assets/images/scribus.jfif",
       versionlog: "2.5",
       editeurlog: "microsoft",
       type: "email",
       categorie: [{
         id: 1,
         libelleCat: "sante",
         descriptionCat: "logiciel de sante",
       }]
     },
 
     {
       libelleLog: "zip",
       descriptionLog: "Compression",
       communauteUrlLog: "https://sourceforge.net/projects/scribus/",
       imagelog: "assets/images/zip.jfif",
       versionlog: "2.5",
       editeurlog: "microsoft",
       type: "fichier",
       categorie: [{
         id: 1,
         libelleCat: "sante",
         descriptionCat: "logiciel de sante",
       }]
     },
 
     {
       libelleLog: "VLC",
       descriptionLog: "Lecteur multimédia",
       communauteUrlLog: "https://www.videolan.org/vlc/download-windows.html",
       imagelog: "assets/images/vlc.png",
       versionlog: "2.5",
       editeurlog: "microsoft",
       type: "fichier",
       categorie: [{
         id: 1,
         libelleCat: "sante",
         descriptionCat: "logiciel de sante",
       }]
     },
 
     {
       libelleLog: "PostgreSQL",
       descriptionLog: "Base transactionnelle",
       communauteUrlLog: "https://www.postgresql.org/download/",
       imagelog: "assets/images/Postgresql.svg.png",
       versionlog: "1.5",
       editeurlog: "Michael Stonebraker",
       type: "base",
       categorie: [{
         id: 1,
         libelleCat: "SGBD",
         descriptionCat: "Base de donnée",
       }]
     },
 
 
     {
       libelleLog: "Apache",
       descriptionLog: "serveur",
       communauteUrlLog: "https://httpd.apache.org/download.cgi",
       imagelog: "assets/images/apache.png",
       versionlog: "1.5",
       editeurlog: "microsoft",
       type: "base",
       categorie: [{
         id: 1,
         libelleCat: "serveur",
         descriptionCat: "serveur web",
       }]
     },
 
     {
       libelleLog: "Gimp",
       descriptionLog: "dessin matricielle",
       communauteUrlLog: "https://www.gimp.org/downloads/",
       imagelog: "assets/images/gimp.png",
       versionlog: "2.5",
       editeurlog: "microsoft",
       type: "dessin",
       categorie: [{
         id: 1,
         libelleCat: "sante",
         descriptionCat: "logiciel de sante",
       }]
     },
 
     {
       libelleLog: "Gimp",
       descriptionLog: "dessin matricielle",
       communauteUrlLog: "https://www.gimp.org/downloads/",
       imagelog: "assets/images/gimp.png",
       versionlog: "2.5",
       editeurlog: "microsoft",
       type: "dessin",
       categorie: [{
         id: 1,
         libelleCat: "sante",
         descriptionCat: "logiciel de sante",
       }]
     },
 
     {
       libelleLog: "Gimp",
       descriptionLog: "dessin matricielle",
       communauteUrlLog: "https://www.gimp.org/downloads/",
       imagelog: "assets/images/gimp.png",
       versionlog: "2.5",
       editeurlog: "microsoft",
       type: "dessin",
       categorie: [{
         id: 1,
         libelleCat: "sante",
         descriptionCat: "logiciel de sante",
       }]
     },
 
 
 
 
   ] */
  logiciells: any[] = [];
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  logiciel: Logiciel = {};
  isLoading!: boolean;
  message: any;
  logicielPerPage: number = 12;
  public selectedpage = 1;
  searchLogiciel: any;
  image!: SafeUrl;
  searchCategorie: any;
  categories: Categorie[] = [];
  sousCategories: Categorie[] = [];

  PageNumbers: number[] = []
  @Output() DisplayLogicielModal: EventEmitter<Logiciel> = new EventEmitter<Logiciel>()

  constructor(private logicielService: LogicielService,
    private authService: AuthService,
    private categorieService: CategorieService,
    private sanitizer: DomSanitizer,
    private fileService: UploadFileService,
    private versionService: VersionService) { }

  ngOnInit(): void {
    this.authService.initLocastorage();
    let pageIndex = (this.selectedpage - 1) * this.logicielPerPage;
    this.loadLogiciel(pageIndex, this.logicielPerPage);
    this.load();
  }


  generateSafeImageUrl(imgBase64: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imgBase64);
  }
  load(event?: LazyLoadEvent) {

    this.categorieService.getAll(event).subscribe(response => {
      if (response.code == 200) {
        this.categories = response.result as Categorie[];
      }

    }, error => {
      this.message = { severity: 'error', summary: error.error };
    });
  }
  loadSousCategorie(event: Event) {
    const newSize = (event.target as HTMLInputElement).value
    this.categorieService.getSouscategorieByLibelle(newSize).subscribe(response => {
      if (response.code == 200) {
        this.sousCategories = response.result as Categorie[];
      }

    }, error => {
      this.message = { severity: 'error', summary: error.error };
    });
  }

  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value
    this.logicielPerPage = Number(newSize);
    this.changePage(1);
  }


  changePage(page: any) {
    this.selectedpage = page;
    this.SlicedLogiciel();
  }
  SlicedLogiciel() {
    let pageIndex = (this.selectedpage - 1) * this.logicielPerPage;
    let endIndes = (this.selectedpage - 1) * this.logicielPerPage + this.logicielPerPage;
    this.logiciells = [];
    this.loadLogiciel(pageIndex, endIndes);

  }

  loadLogiciel(pageIndex: number, endIndes: number) {
    this.logicielService.getAll().subscribe(p => {
      if (p.code == 200) {
        this.logiciels = p.result as Logiciel[]

        // PAGINATION TABLE
        this.PageNumbers = Array(Math.ceil(this.logiciels.length / this.logicielPerPage))
          .fill(0).map((x, i) => i + 1);

        this.logiciels.slice(pageIndex, endIndes).forEach(p => {
          this.versionService.getAll().subscribe(n => {

            if (n.code == 200) {
              let versions = n.result as Version[]
              let myVersionsListes = versions.filter(e => e.logicielID == p.id);
              let versionLast = myVersionsListes[myVersionsListes.length - 1] as Version
              let logicielDataFront: LogicielDataFront = {}
              logicielDataFront.libelleLog = p.libelleLog,
                logicielDataFront.descriptionLog = p.descriptionLog,
                logicielDataFront.communauteUrlLog = "http://" + versionLast.lienTelechVer,
                logicielDataFront.versionlog = versionLast.numeroVer,
                logicielDataFront.editeurlog = p.editeur.libelleEdi,
                logicielDataFront.type = p.libelleLog,
                logicielDataFront.categorie = p.categorie
              this.fileService.getFileVersion(versionLast.logoVer as String).subscribe(p => {
                let doto = p as String
                logicielDataFront.imagelog = 'data:image/jpeg;base64,' + doto;

              }

              )
              this.logiciells.push(logicielDataFront)

            }
          }
          )

        }
        )

      }
    }
    )
  }

}




