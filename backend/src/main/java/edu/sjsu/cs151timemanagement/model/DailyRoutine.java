package edu.sjsu.cs151timemanagement.model;

import java.time.LocalTime;
import java.util.List;

public class DailyRoutine extends Activity {

    private List<Day> occurDay;
    private LocalTime startTime;
    private LocalTime endTime;

    public DailyRoutine(String title,
                        String description,
                        Integer priority,
                        List<Day> occurDay,
                        LocalTime startTime,
                        LocalTime endTime) {

        super(title, description, priority);
        this.occurDay = occurDay;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public DailyRoutine(){}

    public List<Day> getOccurDay() {
        return occurDay;
    }

    public void setOccurDay(List<Day> occurDay) {
        this.occurDay = occurDay;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }
}
