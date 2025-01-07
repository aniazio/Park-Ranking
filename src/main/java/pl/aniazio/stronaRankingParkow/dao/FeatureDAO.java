package pl.aniazio.stronaRankingParkow.dao;

import pl.aniazio.stronaRankingParkow.entities.Feature;

import java.util.List;

public interface FeatureDAO {
    void saveAll(List<Feature> pluses);

    void deleteWhereParkId(int parkId);

    List<Feature> findByParkId(int parkId);
}
