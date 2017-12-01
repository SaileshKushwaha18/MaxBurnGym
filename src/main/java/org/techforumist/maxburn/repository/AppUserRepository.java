package org.techforumist.maxburn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.techforumist.maxburn.domain.AppUser;

/**
 * @author Sarath Muraleedharan
 *
 */
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
	public AppUser findOneByUsername(String username);
}
