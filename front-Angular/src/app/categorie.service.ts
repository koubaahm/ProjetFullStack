import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from './Categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = 'http://localhost:8085/api/categories/'; // L'URL de l'API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer toutes les catégories
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  // Méthode pour récupérer les catégories paginées
getCategoriesPaginated(page: number, size: number): Observable<any> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

  // Envoie une requête GET avec des paramètres de pagination
  return this.http.get<any>(`${this.apiUrl}paginated`, { params });
}


  // Méthode pour récupérer une catégorie par son ID
  getCategorieById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}${id}`);
  }
   // Méthode pour récupérer le parent d'une catégorie
   getCategorieParent(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}CategorieParent/${id}`);
  }

  // Méthode pour ajouter une nouvelle catégorie
  ajouterCategorie(nom: string, parentId?: number): Observable<Categorie> {
    let params = new HttpParams();
    params = params.set('nom', nom);
    if (parentId) {
      params = params.set('parent_id', parentId.toString());
    }

    // Envoie une requête POST pour ajouter une catégorie
    return this.http.post<Categorie>(`${this.apiUrl}ajouter`, params);
  }

  // Méthode pour modifier une catégorie
  updateCategorie(id: number, nom?: string, parentId?: number): Observable<Categorie> {
    let params = new HttpParams();
    if (nom) {
      params = params.set('nom', nom);
    }
    if (parentId) {
      params = params.set('parent_id', parentId.toString());
    }

    // Envoie une requête PUT pour mettre à jour une catégorie
    return this.http.put<Categorie>(`${this.apiUrl}update/${id}`, params);
  }

  // Méthode pour supprimer une catégorie
  deleteCategorie(id: number): Observable<void> {
    // Envoie une requête DELETE pour supprimer la catégorie avec l'ID donné
    return this.http.delete<void>(`${this.apiUrl}delete/${id}`);
  }
}
