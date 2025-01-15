package univ.rouen.gestionCategorie.DTO;

import lombok.*;

@Data
@Getter@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FilterCategorieDTO {
    private Boolean estRacine;
    private String dateMin; // Ou LocalDate si vous préférez
    private String dateMax; // Ou LocalDate
    private int page = 0;
    private int size = 10;


}
