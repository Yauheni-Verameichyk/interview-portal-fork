package by.interview.portal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.NamedSubgraph;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Entity
@Table(name = "users")
@NamedEntityGraph(name = "User.userRoleDisciplines",
        attributeNodes = {@NamedAttributeNode(value = "userRoleDisciplines",
                subgraph = "UserRoleDiscipline.discipline")},
        subgraphs = {@NamedSubgraph(name = "UserRoleDiscipline.discipline",
                attributeNodes = @NamedAttributeNode("discipline"))})
public class User extends Person {

    @Column(name = "login", unique = true, nullable = false, length = 50)
    private String login;

    @Column(name = "password", nullable = true, length = 100)
    private String password;

    @Column(name = "phone_number", nullable = false, length = 50)
    private String phoneNumber;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<UserRoleDiscipline> userRoleDisciplines;
}
