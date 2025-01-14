package pl.aniazio.stronaRankingParkow.controller;

import jakarta.persistence.AttributeOverride;
import jakarta.validation.Valid;
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
    public ParkDetailed updateParkDetailed(@PathVariable int id, @RequestBody @Valid ParkDetailed parkDetailed) {
        service.updateParkDetailed(id, parkDetailed);
        return parkDetailed;
    }

    @PostMapping()
    public ParkDetailed saveParkDetailed(@RequestBody @Valid ParkDetailed parkDetailed) {
        return service.saveParkDetailed(parkDetailed);
    }

    @DeleteMapping("/{id}")
    public void deleteParkDetailed(@PathVariable int id) {
        service.deleteParkDetailed(id);
    }


}
