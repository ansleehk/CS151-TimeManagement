package edu.sjsu.cs151timemanagement.repository;

import edu.sjsu.cs151timemanagement.model.DailyRoutine;
import edu.sjsu.cs151timemanagement.model.User;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static edu.sjsu.cs151timemanagement.repository.RepositoryUtils.findUserOrThrow;

@Repository
public class DailyRoutineRepository {

    private UserRepository userRepository;

    public DailyRoutineRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void save(DailyRoutine routine, String userId) {
        User user = findUserOrThrow(userId, userRepository);
        user.getDailyRoutines().add(routine);
        userRepository.save(user);
    }

    public Optional<DailyRoutine> findById(String routineId, String userId) {
        User user = findUserOrThrow(userId, userRepository);
        return user.getDailyRoutines().stream()
                .filter(routine -> routine.getId().equals(routineId))
                .findFirst();
    }

    public Optional<DailyRoutine> findByStartTime(LocalTime startTime, String userId) {
        User user = findUserOrThrow(userId, userRepository);
        List<DailyRoutine> routines = user.getDailyRoutines();

        return routines.stream()
                .filter(routine -> routine.getStartTime().equals(startTime))
                .findFirst();
    }

    public void update(String routineId, DailyRoutine updatedRoutine, String userId) {
        User user = findUserOrThrow(userId, userRepository);
        List<DailyRoutine> routines = user.getDailyRoutines();

        for (int i = 0; i < routines.size(); i++) {
            if (routines.get(i).getId().equals(routineId)) {
                routines.set(i, updatedRoutine);
                userRepository.save(user);
                return;
            }
        }
        throw new RuntimeException("Routine not found");
    }

    public void deleteById(String routineId, String userId) {
        User user = findUserOrThrow(userId, userRepository);
        user.getDailyRoutines().removeIf(routine -> routine.getId().equals(routineId));
        userRepository.save(user);
    }
}
