import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from '../categorie.service';
import { Categorie } from '../Categorie';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css'],
  providers: [DatePipe]
})
export class ListCategorieComponent implements OnInit {
  categories: Categorie[] = []; // Liste des catégories
  currentPage: number = 0;     // Page actuelle
  pageSize: number = 10;       // Nombre de catégories par page
  totalPages: number = 0;      // Total de pages disponibles

  // Tri
  sortCriteria: string = 'name'; // Critère de tri initial
  
  // Filtre
  filter = {
    estRacine: undefined as boolean | undefined
  };

  constructor(
    private categorieService: CategorieService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadCategories(); // Charger les catégories au démarrage
  }

  // Charger les catégories paginées avec filtre
  loadCategories(): void {
    this.categorieService.getFilteredCategories(this.filter.estRacine, this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.categories = response.content; // Catégories actuelles
        this.totalPages = response.totalPages; // Nombre total de pages
        this.applySort(); // Appliquer le tri après chargement
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories filtrées', error);
      }
    );
  }

  // Méthode pour appliquer le tri
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

  // Méthode pour afficher l'arborescence des catégories
  displayCategoryTree(categories: Categorie[]): string {
    const buildTree = (categories: Categorie[], level: number = 0): string => {
      return categories
        .map(
          (cat) =>
            `${'--'.repeat(level)} ${cat.nom}\n` +
            (cat.enfants && cat.enfants.length > 0 ? buildTree(cat.enfants, level + 1) : '')
        )
        .join('');
    };
    return buildTree(categories);
  }

  // Appliquer le filtre
  applyFilter(): void {
    this.currentPage = 0; // Réinitialiser à la première page
    this.loadCategories();
  }

  // Méthode pour passer à la page suivante
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadCategories();
    }
  }

  // Méthode pour revenir à la page précédente
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadCategories();
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
