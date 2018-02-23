package by.interview.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListBean<T> {

    private Long totalPages;
    private Long totalElements;
    private Integer page;
    private List<T> content;

}
