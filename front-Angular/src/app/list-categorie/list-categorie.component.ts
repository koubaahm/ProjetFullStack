import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from '../categorie.service';
import { Categorie } from '../Categorie';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css'],
  providers: [DatePipe],
})
export class ListCategorieComponent implements OnInit {
  categories: Categorie[] = []; // Liste des catégories
  currentPage: number = 0; // Page actuelle
  pageSize: number = 10; // Nombre de catégories par page
  totalPages: number = 0; // Total de pages disponibles

  // Tri
  sortCriteria: string = 'name'; // Critère de tri initial

  // Filtre
  filter = {
    estRacine: undefined as boolean | undefined, // Filtrer par catégories racines
    beforeDate: undefined as string | undefined, // Date avant laquelle les catégories ont été créées
    afterDate: undefined as string | undefined, // Date après laquelle les catégories ont été créées
    searchName: undefined as string | undefined, // Recherche par nom
  };

  constructor(
    private categorieService: CategorieService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadAllCategories(); // Charger toutes les catégories au démarrage
  }

  // Charger toutes les catégories par défaut
  loadAllCategories(): void {
    this.categorieService.getCategories().subscribe(
      (data) => {
        this.categories = data; // Charger toutes les catégories
        console.log('Toutes les catégories :', this.categories);
        this.applySort(); // Appliquer le tri par défaut
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories', error);
      }
    );
  }

  // Charger les catégories filtrées
  applyFilter(): void {
    const { searchName, estRacine, beforeDate, afterDate } = this.filter;

    // Vérification des dates
    if (beforeDate && afterDate && new Date(beforeDate) < new Date(afterDate)) {
      console.error('La date "Avant le" doit être postérieure à la date "Après le".');
      return;
    }

    this.categorieService
      .getCategoriesFiltre(searchName, estRacine, beforeDate, afterDate)
      .subscribe(
        (data) => {
          this.categories = data; // Charger les catégories filtrées
          console.log('Catégories filtrées :', this.categories);
          this.applySort(); // Appliquer le tri
        },
        (error) => {
          console.error('Erreur lors du filtrage', error);
        }
      );
  }

  // Appliquer le tri
  applySort(): void {
    switch (this.sortCriteria) {
      case 'name':
        this.categories.sort((a, b) => a.nom.localeCompare(b.nom));
        break;
      case 'dateCreation':
        this.categories.sort((a, b) => {
          const dateA = new Date(a.dateCreation[0], a.dateCreation[1] - 1, a.dateCreation[2]);
          const dateB = new Date(b.dateCreation[0], b.dateCreation[1] - 1, b.dateCreation[2]);
          return dateA.getTime() - dateB.getTime();
        });
        break;
      case 'childrenCount':
        this.categories.sort((a, b) => (a.enfants?.length || 0) - (b.enfants?.length || 0));
        break;
    }
  }

  // Réinitialiser les filtres
  resetFilters(): void {
    this.filter = {
      estRacine: undefined,
      beforeDate: undefined,
      afterDate: undefined,
      searchName: undefined,
    };
    this.sortCriteria = 'name'; // Réinitialiser le tri
    this.loadAllCategories(); // Charger toutes les catégories
  }

  // Méthode pour naviguer vers la page suivante
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.applyFilter(); // Charger la page suivante avec les filtres
    }
  }

  // Méthode pour revenir à la page précédente
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.applyFilter(); // Charger la page précédente avec les filtres
    }
  }

  // Méthode pour formater la date
  formatDate(date: number[]): string {
    const dateStr = new Date(date[0], date[1] - 1, date[2]); // Convertir tableau [année, mois, jour] en objet Date
    return this.datePipe.transform(dateStr, 'dd/MM/yyyy') || ''; // Formater la date
  }

  // Méthode pour supprimer une catégorie
  deleteCategorie(id: number): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?');
    if (confirmation) {
      this.categorieService.deleteCategorie(id).subscribe(
        () => {
          this.categories = this.categories.filter((c) => c.id !== id); // Supprimer localement
        },
        (error) => {
          console.error('Erreur lors de la suppression de la catégorie', error);
        }
      );
    }
  }

  // Méthode pour naviguer vers la page de modification
  navigateToModifier(id: number): void {
    this.router.navigate(['/modifierCategorie', id]);
  }
}
