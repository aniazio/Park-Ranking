package pl.aniazio.stronaRankingParkow.entities;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="park")
public class Park {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name")
    private String name;
    @Column(name="district")
    private String district;
    @Column(name="rating")
    private double rating;
    @Column(name="latitude")
    private double latitude;
    @Column(name="longitude")
    private double longitude;

    /*
    @Id
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="id")
    private Distance distance;
     */

    @OneToOne(mappedBy = "park", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Distance distance;

    public Park(Park park) {
        id = park.getId();
        name = park.getName();
        district = park.getDistrict();
        rating = park.getRating();
        latitude = park.getLatitude();
        longitude = park.getLongitude();
    }
}
