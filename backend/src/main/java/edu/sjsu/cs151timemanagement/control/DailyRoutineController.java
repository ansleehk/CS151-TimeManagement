package edu.sjsu.cs151timemanagement.control;

import edu.sjsu.cs151timemanagement.model.Day;
import edu.sjsu.cs151timemanagement.model.DailyRoutine;
import edu.sjsu.cs151timemanagement.service.DailyRoutineService;
import edu.sjsu.cs151timemanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/{userId}/daily-routine")
public class DailyRoutineController {

    @Autowired
    private DailyRoutineService dailyRoutineService;

    @Autowired
    private UserService userService;

    private String userId;

    @ModelAttribute
    private void checkUserIdExistsAndSet(@PathVariable String userId) {
        ControllerUtils.checkUserIdExistsAndSet(userId, userService);
        this.userId = userId;
    }

    @PostMapping
    public ResponseEntity<String> createDailyRoutine(@RequestBody Map<String, Object> routineInfo) {
        List<String> occurDayStrings = (List<String>) routineInfo.get("occurDay");
        List<Day> occurDays = new ArrayList<>();

        for (String dayString : occurDayStrings) {
            Day day = Day.valueOf(dayString);
            occurDays.add(day);
        }

        return dailyRoutineService.createDailyRoutine(
                (String) routineInfo.get("title"),
                (String) routineInfo.get("description"),
                (Integer) routineInfo.get("priority"),
                occurDays,
                LocalTime.parse((String) routineInfo.get("startTime")),
                LocalTime.parse((String) routineInfo.get("endTime")),
                this.userId);
    }



    @GetMapping("/{routineId}")
    public ResponseEntity<DailyRoutine> getDailyRoutine(@PathVariable String routineId) {
        return dailyRoutineService.getDailyRoutine(routineId, userId);
    }

    @PutMapping("/{routineId}")
    public ResponseEntity<DailyRoutine> updateDailyRoutine(@PathVariable String routineId, @RequestBody Map<String, Object> routineInfo) {
        List<String> occurDayStrings = (List<String>) routineInfo.get("occurDay");
        List<Day> occurDays = new ArrayList<>();

        for (String dayString : occurDayStrings) {
            Day day = Day.valueOf(dayString);
            occurDays.add(day);
        }


        return dailyRoutineService.updateDailyRoutine(
                routineId,
                (String) routineInfo.get("title"),
                (String) routineInfo.get("description"),
                (Integer) routineInfo.get("priority"),
                occurDays,
                LocalTime.parse((String) routineInfo.get("startTime")),
                LocalTime.parse((String) routineInfo.get("endTime")),
                userId
        );
    }

    @DeleteMapping("/{routineId}")
    public ResponseEntity<String> deleteDailyRoutine(@PathVariable String routineId) {
        return dailyRoutineService.deleteDailyRoutine(routineId, userId);
    }

    @GetMapping
    public ResponseEntity<List<DailyRoutine>> getAllDailyRoutine(){
        return dailyRoutineService.getAllDailyRoutines(userId);
    }
}
