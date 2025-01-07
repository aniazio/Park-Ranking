package pl.aniazio.stronaRankingParkow.service;

import pl.aniazio.stronaRankingParkow.entities.ParkDetailed;

public interface ParkDetailedService {
    ParkDetailed getParkDetailed(int id);

    void updateParkDetailed(int id, ParkDetailed parkDetailed);

    void saveParkDetailed(ParkDetailed parkDetailed);
}
