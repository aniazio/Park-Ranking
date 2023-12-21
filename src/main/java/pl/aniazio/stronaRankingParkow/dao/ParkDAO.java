package pl.aniazio.stronaRankingParkow.dao;

import pl.aniazio.stronaRankingParkow.entities.Park;

import java.util.List;

public interface ParkDAO {

    List<Park> getAll();
    List<Park> getAllOrdered(double maxDist, double weight);
    Park getById(int id);
    Park getByName(String name);
    Park save(Park park);
    int update(Park park);
    int delete(Park park);
}
