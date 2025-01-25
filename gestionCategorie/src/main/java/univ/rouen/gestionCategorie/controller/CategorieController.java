package univ.rouen.gestionCategorie.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import univ.rouen.gestionCategorie.entities.Categorie;

import java.time.LocalDate;
import java.util.List;
import univ.rouen.gestionCategorie.service.CategorieService;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:8081")
public class CategorieController {

    @Autowired
    private CategorieService categorieService;

    //API qui permet soit de créer une catégorie simple oui d'affecter une catégorie a une catégorie parent
    @PostMapping("/ajouter")
    public Categorie ajouterCategorie(@RequestParam String nom, @RequestParam(required = false) Long parent_id) {
        return categorieService.ajouterCategorie(nom, parent_id);
    }

    //API pour afficher les catégorie parents avec ces enfants
    @GetMapping("CategorieEnfants/{id}")
    public List<Categorie> getEnfants(@PathVariable Long id) {
        return categorieService.getEnfantsOfCategorie(id);
    }

    //API qui permet d'afficher le parent de la catégorie
    @GetMapping("/CategorieParent/{id}")
    public Categorie getParent(@PathVariable Long id) {
        return categorieService.getParentOfCategorie(id);
    }

    //API qui permet de modifier une catégorie
    @PutMapping("/update/{id}")
    public Categorie updateCategorie(@PathVariable Long id, @RequestParam(required = false) String nom, @RequestParam(required = false) Long parent_id) {
        return categorieService.updateCategorie(id, nom, parent_id);
    }

    //API DELETE
    @DeleteMapping("/delete/{id}")
    public void DeleteCategorie(@PathVariable Long id) {
        categorieService.DeleteCategorie(id);
    }

    // API qui permet d'afficher toutes les catégories
    @GetMapping("/")
    public List<Categorie> getCategories() {

        return categorieService.getAllCategories();
    }


    // API qui permet d'afficher une catégorie par son ID
    @GetMapping("/{id}")
    public Categorie getCategorieById(@PathVariable Long id) {
        return categorieService.getCategorieById(id);
    }

    @GetMapping("/paginated")
    public Page<Categorie> getPaginatedCategories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return categorieService.getCategoriesPaginated(page, size);
    }

    @GetMapping("/filtrer")
    public Page<Categorie> filterCategories(@RequestParam(required = false) Boolean estRacine,
                                            @RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size) {
        return categorieService.filterByEstRacine(estRacine, page, size);
    }

    @GetMapping("/filtrerParNom")
    public List<Categorie> filterByNameAndDate(
            @RequestParam(required = false) String searchName,
            @RequestParam(required = false) Boolean isRoot,
            @RequestParam(required = false) LocalDate beforeDate,
            @RequestParam(required = false) LocalDate afterDate
    ) {
        return categorieService.categoriesFiltrees(searchName, isRoot, beforeDate, afterDate);
    }





}

