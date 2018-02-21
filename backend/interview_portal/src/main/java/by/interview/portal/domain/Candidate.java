package by.interview.portal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name = "candidates")
public class Candidate extends Person{


}
