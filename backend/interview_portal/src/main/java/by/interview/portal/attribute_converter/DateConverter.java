package by.interview.portal.attribute_converter;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class DateConverter implements AttributeConverter<LocalDateTime, Integer> {

    @Override
    public Integer convertToDatabaseColumn(LocalDateTime attribute) {
        return (int) (attribute.toInstant(ZoneOffset.ofTotalSeconds(0)).toEpochMilli() / 1000);
    }

    @Override
    public LocalDateTime convertToEntityAttribute(Integer dbData) {
        return LocalDateTime.ofEpochSecond(dbData, 0, ZoneOffset.UTC);
    }
}
