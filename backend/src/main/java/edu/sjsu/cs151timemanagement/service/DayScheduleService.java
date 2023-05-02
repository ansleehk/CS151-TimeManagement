package edu.sjsu.cs151timemanagement.service;

import edu.sjsu.cs151timemanagement.model.*;
import edu.sjsu.cs151timemanagement.repository.DailyRoutineRepository;
import edu.sjsu.cs151timemanagement.repository.DayScheduleRepository;
import edu.sjsu.cs151timemanagement.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class DayScheduleService {

    @Autowired
    DayScheduleRepository dayScheduleRepository;
    @Autowired
    EventRepository eventRepository;
    @Autowired
    DailyRoutineRepository dailyRoutineRepository;

    public void addActivity(Activity activity, String userId) {
        if (activity instanceof Event) {
            addEvent((Event) activity, userId);
        } else if (activity instanceof DailyRoutine) {
            addDailyRoutine((DailyRoutine) activity, userId);
        } else {
            throw new IllegalArgumentException("Unsupported activity type");
        }
    }

    private void addEvent(Event event, String userId) {
        LocalDate date = event.getStartTime().toLocalDate();
        final var activityId = ServiceUtil.generateUUID();
        ScheduledDayActivity scheduledDayActivity = new ScheduledDayActivity(activityId, ActivityType.Event, event.getId(), event.getStartTime().toLocalTime(), event.getEndTime().toLocalTime());
        dayScheduleRepository.save(scheduledDayActivity, userId, date);
        scheduleActivities(userId, date);
    }

    private void addDailyRoutine(DailyRoutine dailyRoutine, String userId) {
        long numOfDays = ChronoUnit.DAYS.between(dailyRoutine.getStartDate(), dailyRoutine.getEndDate());
        for (int i = 0; i <= numOfDays; i++) {
            LocalDate date = dailyRoutine.getStartDate().plusDays(i);
            if (dailyRoutine.getOccurDay().contains(date.getDayOfWeek())) {
                final var activityId = ServiceUtil.generateUUID();
                ScheduledDayActivity scheduledDayActivity = new ScheduledDayActivity(activityId, ActivityType.DailyRoutine, dailyRoutine.getId(), dailyRoutine.getStartTime(), dailyRoutine.getEndTime());
                dayScheduleRepository.save(scheduledDayActivity, userId, date);
                scheduleActivities(userId, date);
            }
        }
    }

    public void updateActivity(Activity activity, String userId) {
        if (activity instanceof Event) {
            updateEvent((Event) activity, userId);
        } else if (activity instanceof DailyRoutine) {
            updateDailyRoutine((DailyRoutine) activity, userId);
        } else {
            throw new IllegalArgumentException("Unsupported activity type");
        }
    }

    private void updateEvent(Event event, String userId) {
        LocalDate date = event.getStartTime().toLocalDate();
        String activityId = event.getId();
        ScheduledDayActivity updatedActivity = new ScheduledDayActivity(activityId, ActivityType.Event, event.getId(), event.getStartTime().toLocalTime(), event.getEndTime().toLocalTime());
        dayScheduleRepository.update(activityId, updatedActivity, userId, date);
        scheduleActivities(userId, date);
    }

    private void updateDailyRoutine(DailyRoutine dailyRoutine, String userId) {
        long numOfDays = ChronoUnit.DAYS.between(dailyRoutine.getStartDate(), dailyRoutine.getEndDate());
        for (int i = 0; i <= numOfDays; i++) {
            LocalDate date = dailyRoutine.getStartDate().plusDays(i);
            if (dailyRoutine.getOccurDay().contains(date.getDayOfWeek())) {
                String activityId = dailyRoutine.getId();
                ScheduledDayActivity updatedActivity = new ScheduledDayActivity(activityId, ActivityType.DailyRoutine, dailyRoutine.getId(), dailyRoutine.getStartTime(), dailyRoutine.getEndTime());
                dayScheduleRepository.update(activityId, updatedActivity, userId, date);
                scheduleActivities(userId, date);
            }
        }
    }

    public void removeActivity(Activity activity, String userId) {
        if (activity instanceof Event) {
            removeEvent((Event) activity, userId);
        } else if (activity instanceof DailyRoutine) {
            removeDailyRoutine((DailyRoutine) activity, userId);
        } else {
            throw new IllegalArgumentException("Unsupported activity type");
        }
    }

    private void removeEvent(Event event, String userId) {
        LocalDate date = event.getStartTime().toLocalDate();
        dayScheduleRepository.deleteById(event.getId(), userId, date);
        scheduleActivities(userId, date);
    }

    private void removeDailyRoutine(DailyRoutine dailyRoutine, String userId) {
        long numOfDays = ChronoUnit.DAYS.between(dailyRoutine.getStartDate(), dailyRoutine.getEndDate());
        for (int i = 0; i <= numOfDays; i++) {
            LocalDate date = dailyRoutine.getStartDate().plusDays(i);
            if (dailyRoutine.getOccurDay().contains(date.getDayOfWeek())) {
                dayScheduleRepository.deleteById(dailyRoutine.getId(), userId, date);
                scheduleActivities(userId, date);
            }
        }
    }

    public ResponseEntity<List<ScheduledDayActivity>> getDaySchedule(String userId, LocalDate date) {
        scheduleActivities(userId, date);
        ArrayList<ScheduledDayActivity> activities = dayScheduleRepository.findAll(userId, date);
        if (activities == null || activities.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(activities);
        }
    }

    public ResponseEntity<Map<LocalDate, ArrayList<ScheduledDayActivity>>> getAllDayScheduleInMonth(String userId, YearMonth yearMonth) {
        Map<LocalDate, ArrayList<ScheduledDayActivity>> activities = dayScheduleRepository.findAllInMonth(userId, yearMonth);
        if (activities == null || activities.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(activities);
        }
    }




    private long getOriginalDuration(Activity activity) {
        if (activity instanceof Event) {
            Event event = (Event) activity;
            return event.getStartTime().until(event.getEndTime(), ChronoUnit.MINUTES);
        } else if (activity instanceof DailyRoutine) {
            DailyRoutine dailyRoutine = (DailyRoutine) activity;
            return dailyRoutine.getStartTime().until(dailyRoutine.getEndTime(), ChronoUnit.MINUTES);
        } else {
            throw new IllegalArgumentException("Unsupported activity type");
        }
    }

    private Activity getOriginActivity(ScheduledDayActivity scheduledDayActivity, String userId) {
        String originActivityId = scheduledDayActivity.getOriginActivityId();
        ActivityType activityType = scheduledDayActivity.getActivityType();

        if (activityType == ActivityType.Event) {
            return eventRepository.findById(originActivityId, userId).get();
        } else if (activityType == ActivityType.DailyRoutine) {
            return dailyRoutineRepository.findById(originActivityId, userId).get();
        } else {
            throw new IllegalArgumentException("Unsupported activity type");
        }
    }

}
