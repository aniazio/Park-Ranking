package pl.aniazio.stronaRankingParkow.controller;

import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import pl.aniazio.stronaRankingParkow.entities.Park;
import pl.aniazio.stronaRankingParkow.service.ParkService;

import java.util.List;

@RestController
@RequestMapping("/parks")
@CrossOrigin(origins = "http://localhost:5173")
public class ParkController {

    ParkService parkService;

    @Autowired
    public ParkController(ParkService parkService) {
        this.parkService = parkService;
    }

    @GetMapping("")
    @ResponseBody
    public List<Park> getAll() {
        return parkService.getAll();
    }

    @GetMapping("/ranking")
    @ResponseBody
    public List<Park> getRanking(
            @RequestParam(name = "lat", required = false, defaultValue = "52.2278197") double lat,
            @RequestParam(name = "long", required = false, defaultValue = "21.0028638") double lon,
            @RequestParam(name = "weight", required = false, defaultValue = "0.0") double weight
    ) {
        return parkService.showRanking(lat, lon, weight);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Park getById(@PathVariable("id") int id) {
        return parkService.getById(id);
    }

    @PostMapping("")
    @ResponseBody
    public List<Park> add(@RequestBody List<Park> parks) {
        return parkService.save(parks);
    }

    @PatchMapping("/{id}")
    public int partiallyUpdate(@PathVariable("id") int id, @RequestBody Park updatedPark) {
        parkService.update(id, updatedPark);
        return 1;
    }

    @DeleteMapping("/{id}")
    public int delete(@PathVariable("id") int id) {
        parkService.delete(id);
        return 1;
    }

}
