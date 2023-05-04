package edu.sjsu.cs151timemanagement.model;

import java.time.LocalDateTime;

public class Event extends Activity {

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public Event(String title,
                 String description,
                 Integer priority,
                 LocalDateTime startTime,
                 LocalDateTime endTime) {

        super(title, description, priority);
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Event() {
        super();

    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }
}
