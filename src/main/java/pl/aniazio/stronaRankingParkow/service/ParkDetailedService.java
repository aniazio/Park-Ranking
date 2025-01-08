package pl.aniazio.stronaRankingParkow.service;

import pl.aniazio.stronaRankingParkow.entities.ParkDetailed;

public interface ParkDetailedService {
    ParkDetailed getParkDetailed(int id);

    void updateParkDetailed(int id, ParkDetailed parkDetailed);

    ParkDetailed saveParkDetailed(ParkDetailed parkDetailed);

    void deleteParkDetailed(int id);
}
