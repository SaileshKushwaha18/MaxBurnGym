package org.techforumist.addressbook.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.techforumist.addressbook.domain.GymUser;
import org.techforumist.addressbook.repository.AddressRepository;
import org.techforumist.addressbook.repository.GymUserRepository;

/**
 * @author Sarath Muraleedharan
 *
 */
@RestController
@RequestMapping(value = "/api")
public class GymUserRestController {
	@Autowired
	private GymUserRepository gymUserRepository;

	@Autowired
	private AddressRepository addressRepository;
	
	@RequestMapping(value = "/gym-users", method = RequestMethod.GET)
	public List<GymUser> users() {
		return gymUserRepository.findAll();
	}

	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/gym-users/{id}", method = RequestMethod.GET)
	public ResponseEntity<GymUser> userById(@PathVariable Long id) {
		GymUser gymUser = gymUserRepository.findOne(id);
		if (gymUser == null) {
			return new ResponseEntity<GymUser>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<GymUser>(gymUser, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/gym-users/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<GymUser> deleteUser(@PathVariable Long id) {
		GymUser gymUser = gymUserRepository.findOne(id);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String loggedUsername = auth.getName();
		if (gymUser == null) {
			return new ResponseEntity<GymUser>(HttpStatus.NO_CONTENT);
		} else if (gymUser.getFirstName().equalsIgnoreCase(loggedUsername)) {
			throw new RuntimeException("You cannot delete your account");
		} else {
			gymUserRepository.delete(gymUser);
			return new ResponseEntity<GymUser>(gymUser, HttpStatus.OK);
		}

	}

	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/gym-users", method = RequestMethod.POST)
	public ResponseEntity<GymUser> createUser(@RequestBody GymUser gymUser) {
		if (gymUserRepository.findOneByUserName(gymUser.getUserName()) != null) {
			throw new RuntimeException("Username already exist");
		}
		return new ResponseEntity<GymUser>(gymUserRepository.save(gymUser), HttpStatus.CREATED);
	}

	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/gym-users", method = RequestMethod.PUT)
	public GymUser updateUser(@RequestBody GymUser gymUser) {
		if (gymUserRepository.findOneByUserName(gymUser.getUserName()) != null
				&& gymUserRepository.findOneByUserName(gymUser.getUserName()).getId() != gymUser.getId()) {
			throw new RuntimeException("Username already exist");
		}
		
		if(gymUser.getAddress() !=null){
			gymUser.setAddress(addressRepository.save(gymUser.getAddress()));
		}
		return gymUserRepository.save(gymUser);
	}

}
