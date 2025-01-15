package univ.rouen.gestionCategorie.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import univ.rouen.gestionCategorie.entities.Categorie;

import java.time.LocalDate;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {
    Page<Categorie> findAll(Pageable pageable);

    //filtre categorie

    @Query("SELECT c FROM Categorie c WHERE (:estRacine IS NULL OR c.estRacine = :estRacine)")
    Page<Categorie> findByEstRacine(@Param("estRacine") Boolean estRacine, Pageable pageable);






}
