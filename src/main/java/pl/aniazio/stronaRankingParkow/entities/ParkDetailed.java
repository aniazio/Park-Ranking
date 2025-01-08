package pl.aniazio.stronaRankingParkow.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ParkDetailed extends Park {

    List<Feature> pluses;
    List<Feature> minuses;

    public ParkDetailed(Park park) {
        super(park);
    }
}
