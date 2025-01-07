package pl.aniazio.stronaRankingParkow.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import pl.aniazio.stronaRankingParkow.entities.Feature;

import java.util.List;

@Repository
@AllArgsConstructor
@Transactional
public class FeatureDAOImpl implements FeatureDAO {

    private final EntityManager entityManager;


    @Override
    public void saveAll(List<Feature> features) {
        features.forEach(entityManager::persist);
        entityManager.flush();
        entityManager.clear();
    }

    @Override
    public void deleteWhereParkId(int parkId) {
        List<Feature> features = findByParkId(parkId);
        features.forEach(entityManager::remove);
        entityManager.flush();
        entityManager.clear();
    }

    @Override
    public List<Feature> findByParkId(int parkId) {
        TypedQuery<Feature> query = entityManager.createQuery("from Feature where pk.parkId = :parkId", Feature.class);
        query.setParameter("parkId", parkId);
        return query.getResultList();
    }
}
