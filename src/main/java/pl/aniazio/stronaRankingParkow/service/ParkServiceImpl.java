package pl.aniazio.stronaRankingParkow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.aniazio.stronaRankingParkow.dao.*;
import pl.aniazio.stronaRankingParkow.entities.*;

import java.util.*;

@Service
public class ParkServiceImpl implements ParkService {

    ParkDAO parkDAO;
    DistanceDAO distanceDAO;
    Localization localization;

    @Autowired
    public ParkServiceImpl(ParkDAO parkDAO, DistanceDAO distanceDAO) {
        this.parkDAO = parkDAO;
        this.distanceDAO = distanceDAO;
        this.localization = new Localization();
    }

    @Override
    public List<Park> getAll() {
        return parkDAO.getAll();
    }

    @Override
    @Transactional
    public List<Park> showRanking(double lat, double lon, double weight) {
        localization.setLatitude(lat);
        localization.setLongitude(lon);

        if(isNotProperWeight(weight)) weight = 0;

        updateDistances();
        double maxDist = distanceDAO.getMaxDist();

        return parkDAO.getAllOrdered(maxDist, weight);
    }

    private boolean isNotProperWeight(double weight) {
        return (weight<0 || weight>1);
    }

    private void updateDistances() {
        List<Distance> distances = distanceDAO.getAll();
        for(Distance theDistance : distances) {
            Park park = theDistance.getPark();
            setDistanceFor(park, theDistance);
            distanceDAO.update(theDistance);
        }
    }

    private void setDistanceFor(Park park, Distance theDistance) {
        double parkLat = park.getLatitude();
        double parkLon = park.getLongitude();
        double parkDistance = localization.calculateDistance(parkLat, parkLon);
        theDistance.setDist(parkDistance);
    }

    @Override
    public Park getById(int id) {
        Park result = parkDAO.getById(id);
        return result;
    }

    @Override
    public boolean isParkAlreadySaved(String name) {
        return (parkDAO.getByName(name)!= null);
    }

    @Override
    @Transactional
    public Park save(Park park) {
        if(parkDAO.getByName(park.getName()) != null) return null;
        if(park.getLatitude()==0) park.setLatitude(Localization.DEFAULT_LATITUDE);
        if(park.getLongitude()==0) park.setLongitude(Localization.DEFAULT_LONGITUDE);

        Distance distance = new Distance();
        setDistanceFor(park, distance);
        Park result = parkDAO.save(park);
        distance.setPark(park);
        distanceDAO.save(distance);
        return result;
    }

    @Override
    @Transactional
    public List<Park> save(List<Park> parks) {
        List<Park> parkList = new LinkedList<>();
        for(Park thePark : parks) {
            parkList.add(save(thePark));
        }
        return parkList;
    }

    @Override
    @Transactional
    public void update(int id, Park parkInfo) {
        Park park = getById(id);
        if(parkInfo.getName() != null) park.setName(parkInfo.getName());
        if(parkInfo.getDistrict() != null) park.setDistrict(parkInfo.getDistrict());
        if(parkInfo.getRating() > 0 && parkInfo.getRating() <= 10) park.setRating(parkInfo.getRating());
        if(localization.isProperLatitude(parkInfo.getLatitude())) park.setLatitude(parkInfo.getLatitude());
        if(localization.isProperLongitude(parkInfo.getLongitude())) park.setLongitude(parkInfo.getLongitude());

        parkDAO.update(park);
    }

    @Override
    @Transactional
    public void delete(int id) {
        Park park = getById(id);
        parkDAO.delete(park);
    }

}
