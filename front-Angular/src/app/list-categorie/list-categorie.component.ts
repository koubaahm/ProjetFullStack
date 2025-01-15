import { Component, OnInit } from '@angular/core';
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
  categories: Categorie[] = []; // Liste des catégories de la page actuelle
  currentPage: number = 0;     // Page actuelle
  pageSize: number = 10;       // Nombre de catégories par page
  totalPages: number = 0;      // Total de pages disponibles

  constructor(private categorieService: CategorieService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadCategories(); // Charger la première page au démarrage
  }

  // Charger les catégories paginées
  loadCategories(): void {
    this.categorieService.getCategoriesPaginated(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.categories = response.content; // Les catégories de la page actuelle
        this.totalPages = response.totalPages; // Nombre total de pages
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories paginées', error);
      }
    );
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
          this.categories = this.categories.filter(c => c.id !== id); // Supprimer la catégorie localement
        },
        (error) => {
          console.error('Erreur lors de la suppression de la catégorie', error);
        }
      );
    }
  }
}
