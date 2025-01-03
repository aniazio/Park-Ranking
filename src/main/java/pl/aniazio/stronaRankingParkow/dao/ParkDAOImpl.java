package pl.aniazio.stronaRankingParkow.dao;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import pl.aniazio.stronaRankingParkow.entities.Park;

import java.util.List;

@Repository
public class ParkDAOImpl implements ParkDAO {

    private EntityManager entityManager;

    @Autowired
    public ParkDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Park> getAll() {
        TypedQuery<Park> query = entityManager.createQuery("from Park order by id", Park.class);
        return query.getResultList();
    }

    @Override
    public List<Park> getAllOrdered(double maxDist, double weight) {
        TypedQuery<Park> query = entityManager.createQuery("from Park order by " +
                "((10.0 - rating) * (1.0 - :theWeight) + (10.0 * distance.dist / :max) * :theWeight) asc, distance.dist asc", Park.class);
        query.setParameter("theWeight", weight);
        query.setParameter("max", maxDist);
        return query.getResultList();
    }

    @Override
    public Park getById(int id) {
        return entityManager.find(Park.class, id);
    }

    @Override
    public Park getByName(String name) {
        TypedQuery<Park> query = entityManager.createQuery("from Park where name = :theName", Park.class);
        query.setParameter("theName", name);
        List<Park> result = query.getResultList();
        if(result.isEmpty()) return null;
        else return result.get(0);
    }

    @Override
    public Park save(Park park) {
        entityManager.persist(park);
        return park;
    }

    @Override
    public int update(Park park) {
        entityManager.merge(park);
        return 1;
    }

    @Override
    public int delete(Park park) {
        entityManager.remove(park);
        return 1;
    }

}
