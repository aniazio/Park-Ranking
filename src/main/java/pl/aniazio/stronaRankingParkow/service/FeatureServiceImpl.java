package pl.aniazio.stronaRankingParkow.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.aniazio.stronaRankingParkow.dao.FeatureDAO;
import pl.aniazio.stronaRankingParkow.entities.Feature;
import pl.aniazio.stronaRankingParkow.entities.FeaturePK;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class FeatureServiceImpl implements FeatureService {

    private final FeatureDAO featureDAO;


    @Override
    public void saveFeatures(int parkId, Map<String, List<Feature>> features) {
        List<Feature> pluses = features.get(positive);
        List<Feature> minuses = features.get(negative);

        pluses.forEach(feature -> {
            feature.setPositive(true);
            feature.setParkId(parkId);
        });
        minuses.forEach(feature -> {
            feature.setPositive(false);
            feature.setParkId(parkId);
        });

        featureDAO.saveAll(pluses);
        featureDAO.saveAll(minuses);
    }

    @Override
    public void updateFeatures(int parkId, Map<String, List<Feature>> features) {
        featureDAO.deleteWhereParkId(parkId);

        saveFeatures(parkId, features);
    }

    @Override
    public Map<String, List<Feature>> getFeatures(int parkId) {
        List<Feature> features = featureDAO.findByParkId(parkId);

        List<Feature> pluses = features.stream().filter(Feature::isPositive).toList();
        List<Feature> minuses = features.stream().filter(feature -> !feature.isPositive()).toList();

        Map<String, List<Feature>> result = new HashMap<>();
        result.put(positive, pluses);
        result.put(negative, minuses);

        return result;
    }

}
