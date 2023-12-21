package pl.aniazio.stronaRankingParkow.dao;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import pl.aniazio.stronaRankingParkow.entities.Distance;

import java.util.List;

@Repository
public class DistanceDAOImpl implements DistanceDAO {

    private EntityManager entityManager;

    @Autowired
    DistanceDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Distance> getAll() {
        TypedQuery<Distance> query = entityManager.createQuery("from Distance", Distance.class);
        return query.getResultList();
    }

    @Override
    public Distance getById(int id) {
        return entityManager.find(Distance.class, id);
    }

    @Override
    public Double getMaxDist() {
        TypedQuery<Distance> query = entityManager.createQuery("from Distance order by dist desc", Distance.class);
        Distance result = query.getResultList().get(0);
        return result.getDist();
    }

    @Override
    public int save(Distance distance) {
        entityManager.persist(distance);
        return 1;
    }

    @Override
    public int update(Distance distance) {
        entityManager.merge(distance);
        return 1;
    }
}
