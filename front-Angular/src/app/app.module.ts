import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { NavbarComponent } from './navbar/navbar.component';
import { provideHttpClient } from '@angular/common/http';
import { AjoutCategorieComponent } from './ajout-categorie/ajout-categorie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModifierCategorieComponent } from './modifier-categorie/modifier-categorie.component';
import { FormsModule } from '@angular/forms';
import { CategorieDetailsComponent } from './categorie-details/categorie-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCategorieComponent,
    NavbarComponent,
    AjoutCategorieComponent,
    ModifierCategorieComponent,
    CategorieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
