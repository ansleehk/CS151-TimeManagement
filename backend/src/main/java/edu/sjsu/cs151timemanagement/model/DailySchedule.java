package edu.sjsu.cs151timemanagement.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;

public class DailySchedule {
    private HashMap<LocalDate, HashMap<LocalTime, Activity>> schedules;

    public HashMap<LocalTime, Activity> getDaySchedule(LocalDate date){
        return schedules.get(date);
    }


    public void addActivity(LocalDate date, LocalTime time, Activity activity){
        var daySchedule = getDaySchedule(date);
        daySchedule.put(time, activity);
    }

    public void deleteActivity(LocalDate date, LocalTime time){
        getDaySchedule(date).remove(time);
    }


    public HashMap<LocalDate, HashMap<LocalTime, Activity>> getDailySchedule() {
        return schedules;
    }
}
