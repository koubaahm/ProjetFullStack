package univ.rouen.gestionCategorie.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import univ.rouen.gestionCategorie.entities.Categorie;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {
    Page<Categorie> findAll(Pageable pageable);
}
