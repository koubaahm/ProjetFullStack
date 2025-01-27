package univ.rouen.gestionCategorie.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import univ.rouen.gestionCategorie.entities.Categorie;
import univ.rouen.gestionCategorie.repository.CategorieRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CategorieService {

    @Autowired
    private CategorieRepository categorieRepository;

    public Categorie ajouterCategorie(String nom, Long parentId) {
        Categorie parent = null;

        if (parentId != null) {
            Optional<Categorie> parentOptional = categorieRepository.findById(parentId);
            if (parentOptional.isPresent()) {
                parent = parentOptional.get();
            } else {
                throw new IllegalArgumentException("Le parent avec l'ID " + parentId + " n'existe pas.");
            }
        }

        Categorie nouvelleCategorie = new Categorie();
        nouvelleCategorie.setNom(nom);
        nouvelleCategorie.setDateCreation(LocalDate.now());

        if (parent != null) {
            nouvelleCategorie.setParent(parent);
            nouvelleCategorie.setEstRacine(false);
        } else {
            nouvelleCategorie.setEstRacine(true);
        }

        return categorieRepository.save(nouvelleCategorie);
    }
    //afficher les categorie parents
    public List<Categorie> getEnfantsOfCategorie(Long id) {
        Optional<Categorie> categorieOptional = categorieRepository.findById(id);
        if (!categorieOptional.isPresent()) {
            throw new IllegalArgumentException("La catégorie avec l'ID " + id + " n'existe pas.");
        }
        return categorieOptional.get().getEnfants();
    }
    // Méthode pour obtenir le parent d'une catégorie par ID
    public Categorie getParentOfCategorie(Long id) {
        Optional<Categorie> categorie = categorieRepository.findById(id);
        if (categorie.isPresent()) {
            return categorie.get().getParent();
        }
        throw new IllegalArgumentException("La catégorie avec l'ID " + id + " n'existe pas.");
    }
    public Categorie updateCategorie(Long id, String nom, Long parentId) {
        Optional<Categorie> categorieOptional = categorieRepository.findById(id);
        if (!categorieOptional.isPresent()) {
            throw new IllegalArgumentException("La catégorie avec l'ID " + id + " n'existe pas.");
        }

        Categorie categorie = categorieOptional.get();


        if (nom != null && !nom.isEmpty()) {
            categorie.setNom(nom);
        }


        if (parentId != null) {
            Optional<Categorie> parentOptional = categorieRepository.findById(parentId);
            if (!parentOptional.isPresent()) {
                throw new IllegalArgumentException("Le parent avec l'ID " + parentId + " n'existe pas.");
            }
            Categorie parent = parentOptional.get();


            if (parent.equals(categorie)) {
                throw new IllegalArgumentException("Une catégorie ne peut pas être son propre parent.");
            }

            categorie.setParent(parent);
            categorie.setEstRacine(false);
        } else {

            categorie.setParent(null);
            categorie.setEstRacine(true);
        }

        return categorieRepository.save(categorie);
    }

    //DELETE
    public void DeleteCategorie(Long id) {
        Optional<Categorie> categorieOptional = categorieRepository.findById(id);
        if (!categorieOptional.isPresent()) {
            throw new IllegalArgumentException("La catégorie avec l'ID " + id + " n'existe pas.");
        }

        categorieRepository.deleteById(id);
    }
    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }
    public Categorie getCategorieById(Long id) {
        Optional<Categorie> categorieOptional = categorieRepository.findById(id);
        if (categorieOptional.isPresent()) {
            return categorieOptional.get();
        } else {
            throw new IllegalArgumentException("La catégorie avec l'ID " + id + " n'existe pas.");
        }
    }
    public Page<Categorie> getCategoriesPaginated(int page, int size) {
        return categorieRepository.findAll(PageRequest.of(page, size));
    }

    public Page<Categorie> filterByEstRacine(Boolean estRacine, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return categorieRepository.findByEstRacine(estRacine, pageable);
    }

    public List<Categorie> categoriesFiltrees(String searchName, Boolean isRoot, LocalDate beforeDate, LocalDate afterDate) {
        Specification<Categorie> spec = Specification.where(null);

        if (searchName != null && !searchName.isEmpty()) {
            spec = spec.and(CategorieSpecification.hasName(searchName));
        }
        if (isRoot != null) {
            spec = spec.and(CategorieSpecification.isRoot(isRoot));
        }
        if (beforeDate != null) {
            spec = spec.and(CategorieSpecification.createBefore(beforeDate));
        }
        if (afterDate != null) {
            spec = spec.and(CategorieSpecification.createAfter(afterDate));
        }

        return categorieRepository.findAll(spec);
    }





}
