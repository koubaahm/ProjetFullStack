export interface Categorie {
  id: number;
  nom: string;
  dateCreation: number[];  // Utilisé pour la date sous forme d'un tableau d'entiers
  enfants: Categorie[];    // Liste des enfants de la catégorie
  estRacine: boolean;
  parent?: Categorie;      // Objet complet de la catégorie parente, pas juste l'ID
}
