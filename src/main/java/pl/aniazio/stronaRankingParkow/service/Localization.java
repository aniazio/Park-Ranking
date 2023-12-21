package pl.aniazio.stronaRankingParkow.service;

public class Localization {

    public final static double EARTH_RADIUS = 6371;
    public final static double DEFAULT_LATITUDE = 52.2278197;
    public final static double DEFAULT_LONGITUDE = 21.0028638;

    private double latitude;
    private double longitude;

    Localization(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Localization() {
        latitude = DEFAULT_LATITUDE;
        longitude = DEFAULT_LONGITUDE;
    }

    public void setLatitude(double latitude) {
        if(isProperLatitude(latitude)) this.latitude = latitude;
    }

    public void setLongitude(double longitude) {
        if(isProperLongitude(longitude)) this.longitude = longitude;
    }

    public boolean isProperLatitude(double latitude) {
        return (latitude>(DEFAULT_LATITUDE-0.5) && latitude<(DEFAULT_LATITUDE+0.5));
    }

    public boolean isProperLongitude(double longitude) {
        return (longitude>(DEFAULT_LONGITUDE-0.5) && longitude<(DEFAULT_LONGITUDE+0.5));
    }

    /*
        source: https://www.baeldung.com/java-find-distance-between-points
    */

    public double calculateDistance(double pointLat, double pointLong) {

        double dLat = Math.toRadians((latitude - pointLat));
        double dLong = Math.toRadians((longitude - pointLong));

        double pointLatRad = Math.toRadians(pointLat);
        double latitudeRad = Math.toRadians(latitude);

        double a = haversine(dLat) + Math.cos(pointLatRad) * Math.cos(latitudeRad) * haversine(dLong);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c;
    }

    double haversine(double val) {
        return Math.pow(Math.sin(val / 2), 2);
    }
}
