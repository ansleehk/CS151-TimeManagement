package edu.sjsu.cs151timemanagement.repository;

import edu.sjsu.cs151timemanagement.model.DaySchedule;
import edu.sjsu.cs151timemanagement.model.ScheduledDayActivity;
import edu.sjsu.cs151timemanagement.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Repository
public class DayScheduleRepository {

    @Autowired
    private UserRepository userRepository;

    public void save(ScheduledDayActivity scheduledActivity, String userId, LocalDate date) {
        User user = RepositoryUtils.findUserOrThrow(userId, userRepository);
        DaySchedule daySchedule = user.getDaySchedules();
        if (daySchedule == null) {
            daySchedule = new DaySchedule();
            user.setDaySchedules(daySchedule);
        }
        daySchedule.getSchedules().computeIfAbsent(date, k -> new ArrayList<>()).add(scheduledActivity);
        userRepository.save(user);
    }

    public void update(String originActivityId, ScheduledDayActivity updatedActivity, String userId, LocalDate date) {
        User user = RepositoryUtils.findUserOrThrow(userId, userRepository);
        DaySchedule daySchedule = user.getDaySchedules();
        if (daySchedule != null) {
            ArrayList<ScheduledDayActivity> activities = daySchedule.getSchedules().get(date);
            if (activities != null) {
                int index = -1;
                for (int i = 0; i < activities.size(); i++) {
                    if (activities.get(i).getOriginActivityId().equals(originActivityId)) {
                        index = i;
                        break;
                    }
                }
                if (index != -1) {
                    activities.set(index, updatedActivity);
                    userRepository.save(user);
                }
            }
        }
    }

    public void deleteById(String originActivityId, String userId, LocalDate date) {
        User user = RepositoryUtils.findUserOrThrow(userId, userRepository);
        DaySchedule daySchedule = user.getDaySchedules();
        if (daySchedule != null) {
            ArrayList<ScheduledDayActivity> activities = daySchedule.getSchedules().get(date);
            if (activities != null) {
                activities.removeIf(activity -> activity.getOriginActivityId().equals(originActivityId));
                userRepository.save(user);
            }
        }
    }

    public ArrayList<ScheduledDayActivity> findAll(String userId, LocalDate date) {
        User user = RepositoryUtils.findUserOrThrow(userId, userRepository);
        DaySchedule daySchedule = user.getDaySchedules();
        if (daySchedule != null) {
            return daySchedule.getSchedules().getOrDefault(date, new ArrayList<>());
        }
        return new ArrayList<>();
    }

    public Map<LocalDate, ArrayList<ScheduledDayActivity>> findAllInMonth(String userId, YearMonth yearMonth) {
        User user = RepositoryUtils.findUserOrThrow(userId, userRepository);
        DaySchedule daySchedule = user.getDaySchedules();

        // If the user doesn't have a day schedule, return an empty map
        if (daySchedule == null) {
            return new HashMap<>();
        }

        // Get the first and last days of the month
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        // Filter schedules that fall within the given month
        Map<LocalDate, ArrayList<ScheduledDayActivity>> monthActivities = new HashMap<>();
        daySchedule.getSchedules().forEach((date, activities) -> {
            if (!date.isBefore(startDate) && !date.isAfter(endDate)) {
                monthActivities.put(date, activities);
            }
        });

        return monthActivities;
    }

}
