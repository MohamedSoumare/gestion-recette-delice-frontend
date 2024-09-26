# Gestion de Recettes

## Description

Ce projet est une application web de gestion de recettes développée avec Vue.js 3, Pinia pour la gestion des états, Bootstrap pour le style, et Vite pour le build. Elle permet d'ajouter, de lister, de modifier, de supprimer et de consulter les détails des recettes.

L'application est conteneurisée à l'aide de Docker et est déployée sur Vercel. Une image Docker de l'application est également publiée sur Docker Hub.

## Fonctionnalités

- Ajouter une nouvelle recette
- Modifier une recette existante
- Supprimer une recette
- Afficher les détails d'une recette
- Interface utilisateur responsive avec Bootstrap

## Technologies utilisées

- Vue.js 3 avec Composition API
- Pinia pour la gestion des états
- Vue Router pour la navigation
- Bootstrap 5 pour le design
- Vite pour le build
- Docker pour la conteneurisation
- Vercel pour le déploiement
- Docker Hub pour l'hébergement de l'image Docker

## Installation

### Prérequis

- [Node.js](https://nodejs.org/)
- [Vue CLI](https://cli.vuejs.org/)
- [Docker](https://www.docker.com/)

### Étapes d'installation

1. Cloner le repository :

   ```bash
   - git clone https://github.com/FatimataAliouSall/Gestion-recettes.git
   - cd challenge-tp-42


2. Installer les dépendances :


   - npm install

3. Lancer le serveur de développement :


   - npm run dev


L'application sera accessible à l'adresse http://localhost:80.


## Déploiement

### Déploiement sur Vercel


L'application est déployée sur Vercel. Pour déployer toi-même sur Vercel :

1. Connecte ton compte GitHub à Vercel.

2. Crée un nouveau projet et sélectionne ton repository Gestion-recettes.

3. Suis les instructions pour déployer.


## Conteneurisation avec Docker

Une image Docker a été créée pour ce projet. Pour construire et lancer le conteneur localement :

1. Construire l'image Docker :

   - docker build -t gestion-recettes .


2. Lancer le conteneur :

  - docker run -p 8080:80 gestion-recettes

L'application sera accessible à l'adresse http://localhost:80.

## Publication sur Docker Hub

  - docker pull fatimata949/gestion-recettes:latest


## Auteur

Fatimata Aliou Sall - Développeuse full stack

[https://github.com/FatimataAliouSall/Gestion-recettes.git]







