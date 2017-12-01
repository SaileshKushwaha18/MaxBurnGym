package org.techforumist.maxburn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.techforumist.maxburn.domain.Exercise;


/**
 * @author Sailesh
 *
 */
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

}
