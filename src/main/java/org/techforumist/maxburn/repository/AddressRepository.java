package org.techforumist.maxburn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.techforumist.maxburn.domain.Address;

/**
 * @author Sarath Muraleedharan
 *
 */
public interface AddressRepository extends JpaRepository<Address, Long> {

}
