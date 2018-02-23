package by.interview.portal.domain;

import javax.persistence.*;

import lombok.*;

import java.util.List;

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
