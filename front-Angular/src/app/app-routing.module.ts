import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { AjoutCategorieComponent } from './ajout-categorie/ajout-categorie.component';
import { ModifierCategorieComponent } from './modifier-categorie/modifier-categorie.component';

const routes: Routes = [
  { path: 'listCategorie', component: ListCategorieComponent },
  { path: 'ajoutCategorie', component: AjoutCategorieComponent },
  { path: 'modifierCategorie/:id', component: ModifierCategorieComponent },
  { path: '', redirectTo: '/listCategorie', pathMatch: 'full' }   // Redirection par défaut vers listCategorie
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
