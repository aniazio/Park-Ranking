package pl.aniazio.stronaRankingParkow.entities;

import lombok.Data;

import java.util.List;

@Data
public class ParkDetailed extends Park {

    List<Feature> pluses;
    List<Feature> minuses;

    public ParkDetailed(Park park) {
        super(park);
    }
}
