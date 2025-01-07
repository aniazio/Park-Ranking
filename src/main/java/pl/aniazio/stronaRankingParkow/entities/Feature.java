package pl.aniazio.stronaRankingParkow.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="feature")
public class Feature {

  @EmbeddedId
  @AttributeOverrides({
          @AttributeOverride(name = "parkId", column = @Column(name = "park_id")),
          @AttributeOverride(name = "id", column = @Column(name = "id")),
          @AttributeOverride(name = "isPositive", column = @Column(name = "is_positive"))
  })
  @ToString.Exclude
  @JsonIgnore
  private FeaturePK pk = new FeaturePK();

    private String description;

    public void setParkId(int parkId) {
        this.pk.setParkId(parkId);
    }

    public void setId(int id) {
      this.pk.setId(id);
    }

    public int getId() {
      return this.pk.getId();
    }

    public void setPositive(boolean isPositive) {
      this.pk.setPositive(isPositive);
    }

    @JsonIgnore
    public boolean isPositive() {
      return pk.isPositive();
    }

}
