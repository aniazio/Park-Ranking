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
    public int updateParkDetailed(@PathVariable int id, @RequestBody ParkDetailed parkDetailed) {
        service.updateParkDetailed(id, parkDetailed);
        return id;
    }

    @PostMapping()
    public int saveParkDetailed(@RequestBody ParkDetailed parkDetailed) {
        ParkDetailed returned = service.saveParkDetailed(parkDetailed);
        return returned.getId();
    }

    @DeleteMapping("/{id}")
    public void deleteParkDetailed(@PathVariable int id) {
        service.deleteParkDetailed(id);
    }


}
