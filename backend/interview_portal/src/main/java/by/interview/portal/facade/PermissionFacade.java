package by.interview.portal.facade;

import by.interview.portal.domain.PermissionTemplate;

public interface PermissionFacade {

    PermissionTemplate findById(Long id);

    void save(PermissionTemplate permissionTemplate);
}
