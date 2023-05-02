package edu.sjsu.cs151timemanagement.control;

import edu.sjsu.cs151timemanagement.model.ScheduledDayActivity;
import edu.sjsu.cs151timemanagement.service.DayScheduleService;
import edu.sjsu.cs151timemanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/{userId}/day-schedule")
public class DayScheduleController {

    @Autowired
    private DayScheduleService dayScheduleService;

    @Autowired
    private UserService userService;

    private String userId;

    @ModelAttribute
    private void checkUserIdExistsAndSet(@PathVariable String userId) {
        ControllerUtils.checkUserIdExistsAndSet(userId, userService);
        this.userId = userId;
    }

    @GetMapping("/day/{date}")
    public ResponseEntity<List<ScheduledDayActivity>> getDaySchedule(@PathVariable String date){
        return dayScheduleService.getDaySchedule(userId, LocalDate.parse(date));
    }

    @GetMapping("/month/{month}")
    public ResponseEntity<Map<LocalDate, ArrayList<ScheduledDayActivity>>> getDayScheduleInMonth(@PathVariable String month){
        return dayScheduleService.getAllDayScheduleInMonth(userId, YearMonth.parse(month));
    }


}
