package by.interview.portal.converter.impl;

import by.interview.portal.converter.Converter;
import by.interview.portal.dto.ListBean;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component("listBeanConverter")
public class ListBeanConverter implements Converter<Page, ListBean>{

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Page convertToEntity(ListBean dto) {
        return null;
    }

    @Override
    public ListBean convertToDTO(Page page) {
        return modelMapper.map(page, ListBean.class);
    }
}
