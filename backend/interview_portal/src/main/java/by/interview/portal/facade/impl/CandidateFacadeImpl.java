package by.interview.portal.facade.impl;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Candidate;
import by.interview.portal.dto.CandidateDTO;
import by.interview.portal.dto.ListBean;
import by.interview.portal.facade.CandidateFacade;
import by.interview.portal.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CandidateFacadeImpl implements CandidateFacade {

    @Autowired
    private CandidateService candidateService;

    @Autowired
    @Qualifier("candidateConverter")
    private Converter<Candidate, CandidateDTO> candidateConverter;

    @Autowired
    @Qualifier("listBeanConverter")
    private Converter<Page, ListBean> listBeanConverter;

    @Override
    public ListBean<CandidateDTO> findPage(Integer page) {
        Page<Candidate> candidatePage = candidateService.findPage(page);
        ListBean listBean = listBeanConverter.convertToDTO(candidatePage);
        List<Candidate> candidateList = listBean.getContent();
        List<CandidateDTO> candidateListDTO = candidateList.stream()
                .filter(Objects::nonNull)
                .map(candidateConverter::convertToDTO)
                .collect(Collectors.toList());
        listBean.setContent(candidateListDTO);
        listBean.setPage(page);
        return listBean;
    }
}
