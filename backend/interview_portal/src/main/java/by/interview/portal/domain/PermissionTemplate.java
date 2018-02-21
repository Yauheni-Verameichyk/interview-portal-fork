package by.interview.portal.domain;

import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "permission_templates")
public class PermissionTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false, columnDefinition = "bigserial")
    private Long id;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "name_id", nullable = false)
    private PermissionName name;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "operation_id")
    private Operation operation;

    @ElementCollection(targetClass = Role.class)
    @CollectionTable(name = "roles_permissions", joinColumns = @JoinColumn(name = "permission_id"))
    @Column(name = "role_id")
    private Set<Role> roles;
}
