package org.techforumist.addressbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.techforumist.addressbook.domain.GymUser;

/**
 * @author Sarath Muraleedharan
 *
 */
public interface GymUserRepository extends JpaRepository<GymUser, Long> {
	public GymUser findOneByUserName(String userName);
}
