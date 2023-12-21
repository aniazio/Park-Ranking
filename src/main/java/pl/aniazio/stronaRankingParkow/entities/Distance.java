package pl.aniazio.stronaRankingParkow.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="distance")
public class Distance {

    @Id
    @Column(name="park_id")
    private int id;


    @Column(name="dist")
    private double dist;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name="park_id")
    @JsonIgnore
    private Park park;

}