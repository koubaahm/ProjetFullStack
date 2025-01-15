import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private categorieService: CategorieService
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
  convertToDate(dateArray: number[]): Date {
    if (!dateArray || dateArray.length !== 3) {
      throw new Error('Invalid date array');
    }
    return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]); // Mois -1 car les mois en JavaScript commencent à 0
  }
    
}
