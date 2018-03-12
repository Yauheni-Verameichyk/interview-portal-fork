package by.interview.portal.service;

import by.interview.portal.domain.PermissionTemplate;

public interface PermissionService {

    PermissionTemplate findById(Long id);

    void save(PermissionTemplate permissionTemplate);
}
