package univ.rouen.gestionCategorie.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "categories")
@Data
@AllArgsConstructor
public class Categorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nom;

    @Column(name = "date_creation", nullable = false)
    private LocalDate dateCreation;


    @ManyToOne
    @JoinColumn(name = "parent_id")
    @JsonBackReference
    private Categorie parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    //@JsonIgnore
    @JsonManagedReference
    private List<Categorie> enfants;

    @Column(name = "est_racine")
    private boolean estRacine;

    public Categorie() {}

    public Categorie(String nom, Categorie parent) {
        this.nom = nom;
        this.dateCreation = LocalDate.now();
        this.estRacine = (parent == null);
        this.parent = parent;
    }


    public void setParent(Categorie parent) {
        if (parent != null && parent.equals(this)) {
            throw new IllegalArgumentException("Une catégorie ne peut pas être enfant d'elle-même.");
        }
        this.parent = parent;
        this.estRacine = (parent == null);
    }

    // Inclure le parent même si null (si un parent existe)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public Categorie getParent() {
        return parent;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }

    public List<Categorie> getEnfants() {
        return enfants;
    }

    public void setEnfants(List<Categorie> enfants) {
        this.enfants = enfants;
    }

    public boolean isEstRacine() {
        return estRacine;
    }

    public void setEstRacine(boolean estRacine) {
        this.estRacine = estRacine;
    }

}
