package by.interview.portal.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "users")
public class User extends  Person{

    @Column(name = "login", unique = true, nullable = false, length = 50)
    private String login;

    @JsonIgnore
    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<UserRoleDiscipline> userRoleDisciplines;

}
