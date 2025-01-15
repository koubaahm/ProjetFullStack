import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../categorie.service';
import { Categorie } from '../Categorie';

@Component({
  selector: 'app-categorie-details',
  templateUrl: './categorie-details.component.html',
  styleUrls: ['./categorie-details.component.css']
})
export class CategorieDetailsComponent implements OnInit {
  categorie: Categorie | null = null;

  constructor(
    private route: ActivatedRoute,
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // Récupérer l'ID depuis l'URL
    this.loadCategorieDetails(id);
  }

  loadCategorieDetails(id: number): void {
    this.categorieService.getCategorieById(id).subscribe(
      (data) => {
        this.categorie = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la catégorie', error);
      }
    );
  }

  goBack(): void {
    window.history.back();
  }

  navigateToModifier(id: number): void {
    this.router.navigate(['/modifierCategorie', id]); // Naviguer vers la page de modification
  }

  deleteCategorie(id: number): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?');
    if (confirmation) {
      this.categorieService.deleteCategorie(id).subscribe(
        () => {
          alert('Catégorie supprimée avec succès.');
          this.goBack(); // Retour à la page précédente après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de la catégorie', error);
        }
      );
    }
  }

  convertToDate(dateArray: number[]): Date {
    if (!dateArray || dateArray.length !== 3) {
      throw new Error('Invalid date array');
    }
    return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]); // Mois -1 car les mois en JavaScript commencent à 0
  }
}
