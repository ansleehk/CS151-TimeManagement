package edu.sjsu.cs151timemanagement.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class User {
    private String id;
    private String firstName;
    private String lastName;
    private String username;

    private String password;

    private LocalDate birthDay;
    private List<Event> events;
    private List<DailyRoutine> dailyRoutines;
    private DaySchedule daySchedules;

    public User() {

    }
    public User(
                String firstName,
                String lastName,
                String username,
                String password,
                LocalDate birthDay) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.birthDay = birthDay;
        this.events = new ArrayList<>();
        this.dailyRoutines = new ArrayList<>();
        this.daySchedules = new DaySchedule();
    }

    public DaySchedule getDaySchedules() {
        return daySchedules;
    }

    public void setDaySchedules(DaySchedule daySchedules) {
        this.daySchedules = daySchedules;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }



    public LocalDate getBirthDay() {
        return birthDay;
    }

    public void setBirthDay(LocalDate birthDay) {
        this.birthDay = birthDay;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public List<DailyRoutine> getDailyRoutines() {
        return dailyRoutines;
    }

    public void setDailyRoutines(List<DailyRoutine> dailyRoutines) {
        this.dailyRoutines = dailyRoutines;
    }



}
