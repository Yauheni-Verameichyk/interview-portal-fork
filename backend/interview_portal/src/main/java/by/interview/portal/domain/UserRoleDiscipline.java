package by.interview.portal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.NamedSubgraph;
import javax.persistence.Table;

@Data
@ToString(exclude = "user")
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "users_roles_disciplines")
@NamedEntityGraph(name = "UserRoleDisciplines.user",
        attributeNodes = {
                @NamedAttributeNode(value = "user", subgraph = "User.userRoleDiscipline")},
        subgraphs = {@NamedSubgraph(name = "User.userRoleDiscipline",
                attributeNodes = @NamedAttributeNode("userRoleDisciplines"))})
public class UserRoleDiscipline {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false, columnDefinition = "bigserial")
    private Long id;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "role_id", nullable = true)
    private Role role;

    @ManyToOne(optional = true)
    @JoinColumn(columnDefinition = "integer", name = "discipline_id")
    private Discipline discipline;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
