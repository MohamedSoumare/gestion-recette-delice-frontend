Une application de gestion de recettes construite avec Vue.js 3, Pinia, et Bootstrap. Elle permet l'ajout, la modification, la suppression, et l'affichage de recettes. Le projet inclut la gestion de version avec Git, le déploiement sur Vercel, la conteneurisation avec Docker, et la publication de l'image Docker sur Docker Hub.

Technologies

 . Vue.js 3
 . Pinia
 . Bootstrap
 . Git
 . Vercel
 . Docker

 Prérequis

 . Node.js 
 . Git
 . Docker


 Installation

 Cloner le dépôt :

 git clone https://github.com/FatimataAliouSall/Gestion-recettes.git
 cd Gestion-recettes

 Installer les dépendances :

 npm install

 Lancer l'application :

 npm run dev

 Déploiement

  . Déployer sur Vercel :

 Conteneurisation avec Docker :

  . docker build -t live-coding .
  . docker run -p 8080:4173 live-coding
 
