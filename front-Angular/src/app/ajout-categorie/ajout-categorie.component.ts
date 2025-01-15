import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from '../categorie.service';
import { Categorie } from '../Categorie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styleUrls: ['./ajout-categorie.component.css']
})
export class AjoutCategorieComponent implements OnInit {
  @Output() categorieAdded = new EventEmitter<void>();

  categorieForm: FormGroup;
  categories: Categorie[] = [];

  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private router: Router  // Injection du service Router
  ) {
    this.categorieForm = this.fb.group({
      nom: ['', Validators.required],
      parentId: ['']
    });
  }

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (error) => console.error('Erreur lors du chargement des catégories', error),
      complete: () => console.log('Chargement des catégories terminé')
    });    
  }

  onSubmit(): void {
    if (this.categorieForm.valid) {
      const { nom, parentId } = this.categorieForm.value;
      this.categorieService.ajouterCategorie(nom, parentId).subscribe({
        next: () => {
          this.categorieForm.reset();
          this.categorieAdded.emit();  // Notifie le composant parent de l'ajout
          this.router.navigate(['/listCategorie']);  // Redirection après ajout
        },
        error: (error) => console.error('Erreur lors de l\'ajout de la catégorie', error)
      });
    }
  }
}
