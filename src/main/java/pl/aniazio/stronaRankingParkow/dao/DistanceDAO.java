package pl.aniazio.stronaRankingParkow.dao;

import pl.aniazio.stronaRankingParkow.entities.Distance;

import java.util.List;

public interface DistanceDAO {

    List<Distance> getAll();
    Distance getById(int id);
    Double getMaxDist();
    int save(Distance distance);
    int update(Distance distance);
}
