package edu.sjsu.cs151timemanagement.service;

import edu.sjsu.cs151timemanagement.model.DailyRoutine;
import edu.sjsu.cs151timemanagement.repository.DailyRoutineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class DailyRoutineService {

    @Autowired
    private DailyRoutineRepository dailyRoutineRepository;
    @Autowired
    private DayScheduleService dayScheduleService;

    // Method to help see if DailyRoutine exists. 
    private DailyRoutine verifyIsRoutineExist(String routineId, String userId) {
        Optional<DailyRoutine> optionalRoutine = dailyRoutineRepository.findById(routineId, userId);

        if (optionalRoutine.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Routine not found");
        }

        return optionalRoutine.get();
    }
    // Creating a DailyRoutine object that'll be used to display information onto the calendar. 
    public ResponseEntity<String> createDailyRoutine(
            String title,
            String description,
            Integer priority,
            List<DayOfWeek> occurDay,
            LocalDate startDate,
            LocalDate endDate,
            LocalTime startTime,
            LocalTime endTime,
            String userId) {

        DailyRoutine newRoutine = new DailyRoutine(title, description, priority, occurDay, startDate, endDate, startTime, endTime);
        newRoutine.setId(ServiceUtil.generateUUID());
        dailyRoutineRepository.save(newRoutine, userId);
        dayScheduleService.addActivity(newRoutine, userId);
        return ResponseEntity.ok(newRoutine.getId());
    }

    public ResponseEntity<DailyRoutine> getDailyRoutine(String routineId, String userId) {
        DailyRoutine routine = verifyIsRoutineExist(routineId, userId);
        return ResponseEntity.ok(routine);
    }
    // Updates the DailyRoutine if the user decides to change it with new information. 
    public ResponseEntity<DailyRoutine> updateDailyRoutine(String routineId,
                                                           String title,
                                                           String description,
                                                           Integer priority,
                                                           List<DayOfWeek> occurDay,
                                                           LocalDate startDate,
                                                           LocalDate endDate,
                                                           LocalTime startTime,
                                                           LocalTime endTime,
                                                           String userId) {
        DailyRoutine routine = verifyIsRoutineExist(routineId, userId);

        routine.setTitle(title);
        routine.setDescription(description);
        routine.setPriority(priority);
        routine.setOccurDay(occurDay);
        routine.setStartDate(startDate);
        routine.setEndDate(endDate);
        routine.setStartTime(startTime);
        routine.setEndTime(endTime);

        dailyRoutineRepository.update(routineId, routine, userId);
        dayScheduleService.updateActivity(routine, userId);
        return ResponseEntity.ok(routine);
    }
    // Checks to see if the daily routine exists and deletes accordingly if it matches with the routineId and user's account. 
    public ResponseEntity<String> deleteDailyRoutine(String routineId, String userId) {
        DailyRoutine routine = verifyIsRoutineExist(routineId, userId);
        dailyRoutineRepository.deleteById(routineId, userId);
        dayScheduleService.removeActivity(routine, userId);
        return ResponseEntity.ok("Successfully deleted");
    }

    public ResponseEntity<List<DailyRoutine>> getAllDailyRoutines(String userId){
        return ResponseEntity.ok(dailyRoutineRepository.findAll(userId));
    }
}
