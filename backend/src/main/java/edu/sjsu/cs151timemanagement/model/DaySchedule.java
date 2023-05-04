package edu.sjsu.cs151timemanagement.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;

public class DaySchedule {
    
    // Each schedule will be a HashMap where the key is the date of activities, and value is an arraylist of both events and routines.
    private HashMap<LocalDate, ArrayList<ScheduledDayActivity>> schedules;

    public DaySchedule() {
        this.schedules = new HashMap<>();
    }

    public HashMap<LocalDate, ArrayList<ScheduledDayActivity>> getSchedules() {
        return schedules;
    }

    public void setSchedules(HashMap<LocalDate, ArrayList<ScheduledDayActivity>> schedules) {
        this.schedules = schedules;
    }
}
