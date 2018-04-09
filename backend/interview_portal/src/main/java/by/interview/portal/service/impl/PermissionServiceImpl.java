package by.interview.portal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.interview.portal.domain.PermissionTemplate;
import by.interview.portal.repository.PermissionRepository;
import by.interview.portal.service.PermissionService;

@Service
@Transactional
public class PermissionServiceImpl implements PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    @Override
    public PermissionTemplate findById(Long id) {
        return permissionRepository.findById(id).get();
    }

    @Override
    public void save(PermissionTemplate permissionTemplate) {
        permissionRepository.save(permissionTemplate);
    }
}
