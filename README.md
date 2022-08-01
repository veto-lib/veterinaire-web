# VetoLib

VetoLib est une application ayant vocation à informatiser le lien entre des vétérinaires et des utilisateurs. Pour ce faire, elle a besoin :

- D'une application mobile native permettant aux utilisateurs finaux de consulter le carnet de santé de leurs animaux de compagnie ainsi que de s’inscrire à des rendez-vous chez le vétérinaire de leur choix, à condition que celui-ci adhère à VétoLib (l'adhésion est payante, fonction des services proposés). Un chatbot devra être configuré dans l’application mobile et permettra de déterminer une maladie d’un animal en fonction de sa race et de ses symptômes (l’apprentissage se fera grâce aux consultations des vétérinaires). Une remontée d'erreurs (du reporting) devra être prévue

- D'un site Web proposant aux vétérinaires de s’inscrire en utilisant leur numéro ordinal ainsi que les informations de la clinique. Une validation devra être effectuée sur le back-office de vetoLIB. Par la suite les vétérinaires pourront gérer l’intégralité de la clinique, des rendez-vous (un plus serait d'intégrer une consultation en vidéo), des clients et des animaux depuis le site. Il s'agit d'un espace personnel dédié à la gestion du cabinet.

- D'un back-office vetoLIB permettant d'assurer la gestion complète des données de la société, et également de valider les comptes des vétérinaires ainsi que de les facturer. Les vétérinaires doivent payer 2€ par mois et par animaux consultés, et s'acquitter d'un abonnement annuel, à rappeler périodiquement.

- Bien entendu, il est nécessaire de prévoir un système de signalement, d'avis, de modération, de commentaires et de notation.

Il est demandé de construire:

- Une API en NodeJS
- Une application mobile Android ou iOS pour les utilisateurs finaux.
- Un client web Angular pour le site des vétérinaires.
- Un client lourd technologie libre, pour le back-office vetoLIB
