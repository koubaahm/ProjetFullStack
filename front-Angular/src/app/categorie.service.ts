import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from './Categorie';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = 'http://localhost:8085/api/categories/'; // L'URL de l'API

  //private apiUrl = '/api/categories/';


  constructor(private http: HttpClient) { }

  
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

 
getCategoriesPaginated(page: number, size: number): Observable<any> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

  
  return this.http.get<any>(`${this.apiUrl}paginated`, { params });
}



  getCategorieById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}${id}`);
  }

   getCategorieParent(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}CategorieParent/${id}`);
  }

 
  ajouterCategorie(nom: string, parentId?: number): Observable<Categorie> {
    let params = new HttpParams();
    params = params.set('nom', nom);
    if (parentId) {
      params = params.set('parent_id', parentId.toString());
    }

  
    return this.http.post<Categorie>(`${this.apiUrl}ajouter`, params);
  }

 
  updateCategorie(id: number, nom?: string, parentId?: number): Observable<Categorie> {
    let params = new HttpParams();
    if (nom) {
      params = params.set('nom', nom);
    }
    if (parentId) {
      params = params.set('parent_id', parentId.toString());
    }

  
    return this.http.put<Categorie>(`${this.apiUrl}update/${id}`, params);
  }

 
  deleteCategorie(id: number): Observable<void> {
   
    return this.http.delete<void>(`${this.apiUrl}delete/${id}`);
  }

  //filtre categorie
getFilteredCategories(estRacine?: boolean, page: number = 0, size: number = 10): Observable<any> {
  const params = {
    page: page.toString(),
    size: size.toString(),
    ...(estRacine !== undefined && { estRacine: estRacine.toString() }) // Ajouter estRacine uniquement s'il est défini
  };

  return this.http.get<any>(`${this.apiUrl}filtrer`, { params });
}

getSortedCategories(sortBy: string, page: number = 0, size: number = 10): Observable<any> {
  let params = new HttpParams()
    .set('sortBy', sortBy)
    .set('page', page.toString())
    .set('size', size.toString());

  return this.http.get<any>(`${this.apiUrl}`, { params });
}
getCategoriesFiltre(
  searchName?: string,
  isRoot?: boolean,
  beforeDate?: string,
  afterDate?: string
): Observable<Categorie[]> {
  let params = new HttpParams();

  if (searchName) {
    params = params.set('searchName', searchName);
  }
  if (isRoot !== undefined) {
    params = params.set('isRoot', isRoot.toString());
  }
  if (beforeDate) {
    params = params.set('beforeDate', beforeDate);
  }
  if (afterDate) {
    params = params.set('afterDate', afterDate);
  }

  return this.http.get<Categorie[]>(`${this.apiUrl}filtrerParNom`, { params });
}




  
  
}
