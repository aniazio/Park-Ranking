package pl.aniazio.stronaRankingParkow.service;

import pl.aniazio.stronaRankingParkow.entities.Feature;

import java.util.List;
import java.util.Map;

public interface FeatureService {
    void saveFeatures(int parkId, Map<String, List<Feature>> features);

    void updateFeatures(int parkId, Map<String, List<Feature>> features);

    Map<String, List<Feature>> getFeatures(int parkId);

}
