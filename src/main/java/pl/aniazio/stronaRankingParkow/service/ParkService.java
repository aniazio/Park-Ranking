package pl.aniazio.stronaRankingParkow.service;

import pl.aniazio.stronaRankingParkow.entities.Distance;
import pl.aniazio.stronaRankingParkow.entities.Park;

import java.util.List;

public interface ParkService {

    List<Park> getAll();
    List<Park> showRanking(double lat, double lon, double weight);
    Park getById(int id);
    boolean isParkAlreadySaved(String name);
    Park save(Park park);
    List<Park> save(List<Park> parks);
    void update(int id, Park parkInfo);
    void delete(int id);
}
