package univ.rouen.gestionCategorie.service;

import org.springframework.data.jpa.domain.Specification;
import univ.rouen.gestionCategorie.entities.Categorie;

import java.time.LocalDate;

public class CategorieSpecification {
    public static Specification<Categorie> hasName(String name) {
        return (root, query, builder) ->
                builder.like(builder.lower(root.get("nom")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Categorie> createBefore(LocalDate date) {
        return (root, query, builder) -> builder.lessThanOrEqualTo(root.get("dateCreation"), date);
    }

    public static Specification<Categorie> createAfter(LocalDate date) {
        return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("dateCreation"), date);
    }

    public static Specification<Categorie> isRoot(Boolean isRoot) {
        return (root, query, builder) -> builder.equal(root.get("estRacine"), isRoot);
    }
}

