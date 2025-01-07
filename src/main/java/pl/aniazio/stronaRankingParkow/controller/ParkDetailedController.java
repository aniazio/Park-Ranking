package pl.aniazio.stronaRankingParkow.controller;

import jakarta.persistence.AttributeOverride;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.aniazio.stronaRankingParkow.entities.Park;
import pl.aniazio.stronaRankingParkow.entities.ParkDetailed;
import pl.aniazio.stronaRankingParkow.service.ParkDetailedService;

@RestController
@RequestMapping("/parks/detailed")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ParkDetailedController {

    private final ParkDetailedService service;


    @GetMapping("/{id}")
    public ParkDetailed getParkDetailed(@PathVariable int id) {
        return service.getParkDetailed(id);
    }

    @PutMapping("/{id}")
    public void updateParkDetailed(@PathVariable int id, @RequestBody ParkDetailed parkDetailed) {
        service.updateParkDetailed(id, parkDetailed);
    }

    @PostMapping()
    public void saveParkDetailed(@RequestBody ParkDetailed parkDetailed) {
        service.saveParkDetailed(parkDetailed);
    }


}
