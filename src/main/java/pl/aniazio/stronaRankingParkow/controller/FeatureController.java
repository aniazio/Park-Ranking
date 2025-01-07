package pl.aniazio.stronaRankingParkow.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.aniazio.stronaRankingParkow.entities.Feature;
import pl.aniazio.stronaRankingParkow.service.FeatureService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("parks/{parkId}/features")
@RequiredArgsConstructor
public class FeatureController {

    private final FeatureService featureService;


    @PostMapping
    void saveFeatures(@PathVariable int parkId, @RequestBody Map<String, List<Feature>> features) {
        featureService.saveFeatures(parkId, features);
    }

    @PutMapping
    void updateFeatures(@PathVariable int parkId, @RequestBody Map<String, List<Feature>> features) {
        featureService.updateFeatures(parkId, features);
    }

    @GetMapping
    Map<String, List<Feature>> getFeatures(@PathVariable int parkId) {
        return featureService.getFeatures(parkId);
    }


}
