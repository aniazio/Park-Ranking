package pl.aniazio.stronaRankingParkow.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.aniazio.stronaRankingParkow.entities.Feature;
import pl.aniazio.stronaRankingParkow.entities.Park;
import pl.aniazio.stronaRankingParkow.entities.ParkDetailed;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@AllArgsConstructor
public class ParkDetailedServiceImpl implements ParkDetailedService {

    private final ParkService parkService;
    private final FeatureService featureService;

    @Override
    public ParkDetailed getParkDetailed(int id) {
        var features = featureService.getFeatures(id);
        ParkDetailed parkDetailed = new ParkDetailed(parkService.getById(id));
        parkDetailed.setPluses(features.get(FeatureService.positive));
        parkDetailed.setMinuses(features.get(FeatureService.negative));
        return parkDetailed;
    }

    @Override
    public void updateParkDetailed(int id, ParkDetailed parkDetailed) {
        Park park = new Park(parkDetailed);
        parkService.update(id, park);
        Map<String, List<Feature>> features = new HashMap<>();
        features.put(FeatureService.positive, parkDetailed.getPluses());
        features.put(FeatureService.negative, parkDetailed.getMinuses());
        featureService.updateFeatures(id, features);
    }

    @Override
    public void saveParkDetailed(ParkDetailed parkDetailed) {
        Park park = new Park(parkDetailed);
        park = parkService.save(park);
        Map<String, List<Feature>> features = new HashMap<>();
        features.put(FeatureService.positive, parkDetailed.getPluses());
        features.put(FeatureService.negative, parkDetailed.getMinuses());
        featureService.saveFeatures(park.getId(), features);
    }
}
