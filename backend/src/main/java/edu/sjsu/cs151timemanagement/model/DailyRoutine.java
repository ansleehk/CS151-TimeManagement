package edu.sjsu.cs151timemanagement.model;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class DailyRoutine extends Activity{

    private List<DayOfWeek> occurDay;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;

    public DailyRoutine(String title,
                        String description,
                        Integer priority,
                        List<DayOfWeek> occurDay,
                        LocalDate startDate,
                        LocalDate endDate,
                        LocalTime startTime,
                        LocalTime endTime) {

        super(title, description, priority);
        this.occurDay = occurDay;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public DailyRoutine(){}

    public List<DayOfWeek> getOccurDay() {
        return occurDay;
    }

    public void setOccurDay(List<DayOfWeek> occurDay) {
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
