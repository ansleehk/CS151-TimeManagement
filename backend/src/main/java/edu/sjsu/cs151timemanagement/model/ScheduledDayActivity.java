package edu.sjsu.cs151timemanagement.model;

import java.time.LocalDateTime;
import java.time.LocalTime;

public class ScheduledDayActivity {
    String id;

    private LocalTime startTime;
    private LocalTime endTime;
    private ActivityType activityType;
    private String originActivityId;

    public ScheduledDayActivity(
            String id,
            ActivityType activityType,
            String originActivityId,
            LocalTime startTime,
            LocalTime endTime
    ){
        this.id = id;
        this.activityType = activityType;
        this.originActivityId = originActivityId;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public ScheduledDayActivity(){}

    public ActivityType getActivityType() {
        return activityType;
    }

    public void setActivityType(ActivityType activityType) {
        this.activityType = activityType;
    }

    public String getOriginActivityId() {
        return originActivityId;
    }

    public void setOriginActivityId(String originActivityId) {
        this.originActivityId = originActivityId;
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
