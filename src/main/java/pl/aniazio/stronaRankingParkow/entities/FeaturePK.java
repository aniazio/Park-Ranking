package pl.aniazio.stronaRankingParkow.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeaturePK {

    private int parkId;
    private int id;
    @ToString.Exclude
    @Column(name = "is_positive")
    private boolean isPositive;
}
