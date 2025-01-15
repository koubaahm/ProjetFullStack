import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from '../categorie.service';
import { Categorie } from '../Categorie';

@Component({
  selector: 'app-modifier-categorie',
  templateUrl: './modifier-categorie.component.html',
  styleUrls: ['./modifier-categorie.component.css']
})
export class ModifierCategorieComponent implements OnInit {
  categorieForm: FormGroup;
  categorieId: number = 0; // ID de la catégorie à modifier
  categorie: Categorie | null = null;
  categories: Categorie[] = []; // Liste des catégories disponibles

  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialisation du formulaire
    this.categorieForm = this.fb.group({
      nom: ['', Validators.required],
      parentId: ['']
    });
  }

  ngOnInit(): void {
    // Récupérer l'ID de la catégorie depuis l'URL
    this.categorieId = Number(this.route.snapshot.paramMap.get('id'));

    // Charger la liste des catégories et la catégorie à modifier
    this.loadCategories();
    this.loadCategorie();
  }

  // Méthode pour charger la liste des catégories
  loadCategories(): void {
    this.categorieService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories', error);
      }
    );
  }

  // Méthode pour charger les données de la catégorie à modifier
  loadCategorie(): void {
    this.categorieService.getCategorieById(this.categorieId).subscribe(
      (categorie) => {
        console.log('Catégorie récupérée:', categorie);  // Affiche la catégorie récupérée
        this.categorie = categorie;
  
        // Vérification si la catégorie a un parent
        if (!categorie.estRacine) {
          this.categorieService.getCategorieParent(categorie.id).subscribe(
            (parent) => {
              console.log('Parent de la catégorie:', parent);  // Affiche le parent récupéré
              // Mettre à jour le formulaire avec le parent
              this.categorieForm.patchValue({
                nom: categorie.nom,
                parentId: parent.id // Remplir avec l'id du parent
              });
            },
            (error) => {
              console.error('Erreur lors de la récupération du parent', error);
            }
          );
        } else {
          // Si la catégorie est racine, mettre parentId à null
          this.categorieForm.patchValue({
            nom: categorie.nom,
            parentId: null
          });
        }
  
        console.log('Valeur du formulaire après patch:', this.categorieForm.value);  // Vérifiez la valeur du formulaire
      },
      (error) => {
        console.error('Erreur lors de la récupération de la catégorie', error);
      }
    );
  }
  
  
  
  
  
  
  

  // Méthode pour soumettre le formulaire et mettre à jour la catégorie
  onSubmit(): void {
    if (this.categorieForm.valid) {
      const { nom, parentId } = this.categorieForm.value;
      this.categorieService.updateCategorie(this.categorieId, nom, parentId).subscribe(
        () => {
          this.router.navigate(['/listCategorie']); // Redirection vers la liste après modification
        },
        (error) => {
          console.error('Erreur lors de la modification de la catégorie', error);
        }
      );
    }
  }
}
