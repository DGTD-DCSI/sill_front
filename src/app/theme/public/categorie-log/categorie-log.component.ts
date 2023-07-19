import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { Logiciel } from 'src/app/models/logiciel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categorie-log',
  templateUrl: './categorie-log.component.html',
  styleUrls: ['./categorie-log.component.css']
})
export class CategorieLogComponent implements OnInit {

  logiciels: any []=[
    {libelleLog: "ubuntu",
   descriptionLog:"Distribution LINUX",
   communauteUrlLog:"ubuntu",
   imagelog:"assets/images/ubuntu.webp",
   versionlog:"2.5",
   editeurlog:"microsoft",
   type:"sante"
 },
   {libelleLog: "FileZilla",
   descriptionLog:"Client FTP",
   communauteUrlLog:"https://filezilla-project.org/",
   imagelog:"assets/images/FileZilla.png",
   versionlog:"2.5",
   editeurlog:"microsoft",
   type:"serveur",
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
   type:"sante",
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
   type:"education",
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
   type:"education",
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
   type:"email",
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
   type:"email",
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
   type:"fichier",
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
   type:"fichier",
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
      type:"base",
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
         type:"base",
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
            type:"dessin",
            categorie:[{ id:1,
              libelleCat: "sante",
              descriptionCat:"logiciel de sante",
               }]},
           
               {libelleLog: "Gimp",
               descriptionLog:"dessin matricielle",
               communauteUrlLog:"https://www.gimp.org/downloads/",
               imagelog:"assets/images/gimp.png",
               versionlog:"2.5",
               editeurlog:"microsoft",
               type:"dessin",
               categorie:[{ id:1,
                 libelleCat: "sante",
                 descriptionCat:"logiciel de sante",
                  }]},
           
                  {libelleLog: "Gimp",
            descriptionLog:"dessin matricielle",
            communauteUrlLog:"https://www.gimp.org/downloads/",
            imagelog:"assets/images/gimp.png",
            versionlog:"2.5",
            editeurlog:"microsoft",
            type:"dessin",
            categorie:[{ id:1,
              libelleCat: "sante",
              descriptionCat:"logiciel de sante",
               }]},
           



   ]
   logiciells: any []=[];
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  logiciel: Logiciel = {};
  isLoading!: boolean;
  message: any;
  logicielPerPage: number= 12;
  public selectedpage =1; 
  searchLogiciel:any;
  searchCategorie:any;
  categories!: Categorie[];

  constructor() { }

  ngOnInit(): void {
    let pageIndex = (this.selectedpage -1 ) * this.logicielPerPage;
    this.logiciells=this.logiciels.slice(pageIndex, this.logicielPerPage)

   }

   changePageSize(event : Event){
    const newSize= (event.target as HTMLInputElement).value
    this.logicielPerPage = Number(newSize);
    this.changePage(1);
  }
    get PageNumbers(): number[]{
      return Array(Math.ceil(this.logiciels.length / this.logicielPerPage))
      .fill(0).map((x,i)=> i+1);
    }

    changePage(page : any){
this.selectedpage=page;
this.SlicedLogiciel();
    }
    SlicedLogiciel(){
      let pageIndex = (this.selectedpage -1 ) * this.logicielPerPage;
      let endIndes = (this.selectedpage -1) * this.logicielPerPage + this.logicielPerPage;
      this.logiciells = [];
      this.logiciells = this.logiciels.slice(pageIndex, endIndes);


    }

  }
 
  


