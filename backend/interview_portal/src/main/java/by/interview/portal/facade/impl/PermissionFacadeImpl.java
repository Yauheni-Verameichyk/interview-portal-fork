package by.interview.portal.facade.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import by.interview.portal.domain.PermissionTemplate;
import by.interview.portal.facade.PermissionFacade;
import by.interview.portal.service.PermissionService;

@Service
public class PermissionFacadeImpl implements PermissionFacade {

    @Autowired
    private PermissionService permissionService;

    @Override
    public PermissionTemplate findById(Long id) {
        return permissionService.findById(id);
    }

    @Override
    public void save(PermissionTemplate permissionTemplate) {
        permissionService.save(permissionTemplate);
    }
}
