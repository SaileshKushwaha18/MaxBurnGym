package org.techforumist.maxburn.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.techforumist.maxburn.domain.Exercise;
import org.techforumist.maxburn.repository.ExerciseRepository;


/**
 * @author Sailesh
 *
 */
@RestController
@RequestMapping(value = "/api")
public class ExerciseRestController {
	@Autowired
	private ExerciseRepository exerciseRepository;

	@RequestMapping(value = "/exercises", method = RequestMethod.GET)
	public List<Exercise> exercises() {
		return exerciseRepository.findAll();
	}

	@RequestMapping(value = "/exercises/{id}", method = RequestMethod.GET)
	public ResponseEntity<Exercise> exercisesById(@PathVariable Long id) {
		Exercise exercise = exerciseRepository.findOne(id);
		if (exercise == null) {
			return new ResponseEntity<Exercise>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<Exercise>(exercise, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/exercises/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Exercise> deleteAddress(@PathVariable Long id) {
		Exercise exercise = exerciseRepository.findOne(id);
		if (exercise == null) {
			return new ResponseEntity<Exercise>(HttpStatus.NO_CONTENT);
		} else {
			exerciseRepository.delete(exercise);
			return new ResponseEntity<Exercise>(exercise, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/exercises", method = RequestMethod.POST)
	public ResponseEntity<Exercise> createExercise(@RequestBody Exercise exercise) {
		return new ResponseEntity<Exercise>(exerciseRepository.save(exercise), HttpStatus.CREATED);
	}

	@RequestMapping(value = "/exercises", method = RequestMethod.PUT)
	public Exercise updateExercise(@RequestBody Exercise exercise) {
		return exerciseRepository.save(exercise);
	}

}
