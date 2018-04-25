package by.interview.portal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "disciplines")
public class Discipline {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", columnDefinition = "bigserial")
    private long id;

    @Column(name = "name", unique = true, nullable = false, length = 50)
    private String name;

    @Column(name = "subscription", nullable = true, length = 200)
    private String subscription;

    @Column(name = "parent_id", nullable = true)
    private Long parentId;
}
