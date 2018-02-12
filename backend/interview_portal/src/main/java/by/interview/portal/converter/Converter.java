package by.interview.portal.converter;

public interface Converter<E, D> {

    /**
     * Convert from DTO to entity.
     *
     * @param dto to convert
     * @return entity
     */
    E convertToEntity(D dto);

    /**
     * Convert from entity to DTO.
     *
     * @param entity to convert
     * @return DTO
     */
    D convertToDTO(E entity);
}
