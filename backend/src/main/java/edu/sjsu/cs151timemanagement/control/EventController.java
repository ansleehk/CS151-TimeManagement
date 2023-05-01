package edu.sjsu.cs151timemanagement.control;


import edu.sjsu.cs151timemanagement.model.Event;
import edu.sjsu.cs151timemanagement.service.EventService;
import edu.sjsu.cs151timemanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/{userId}/event")
public class EventController {

    @Autowired
    private EventService eventService;
    @Autowired
    private UserService userService;

    private String userId;

    @ModelAttribute
    private void checkUserIdExistsAndSet(@PathVariable String userId) {
        ControllerUtils.checkUserIdExistsAndSet(userId, userService);
        this.userId = userId;
    }

    @PostMapping
    public ResponseEntity<String> createEvent(@RequestBody Map<String, ?> eventInfo) {
        return eventService.createEvent(
                (String) eventInfo.get("title"),
                (String) eventInfo.get("description"),
                (Integer) eventInfo.get("priority"),
                LocalDateTime.parse((String) eventInfo.get("startTime")),
                LocalDateTime.parse((String) eventInfo.get("endTime")),
                this.userId);
    }

    @GetMapping("/")
    public ResponseEntity<List<Event>> getAllEvents(){
        return eventService.getAllEvents(userId);
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEvent(@PathVariable String eventId,
                                      @RequestParam(required = false) String startTime) {
        if (startTime != null) {
            LocalDateTime parsedStartTime = LocalDateTime.parse(startTime);
            return eventService.findByStartTime(parsedStartTime, userId);
        } else {
            return eventService.getEvent(eventId, userId);
        }
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<Event> updateEvent(@PathVariable String eventId,
                                         @RequestBody Map<String, ?> eventInfo) {
        return eventService.updateEvent(
                eventId,
                (String) eventInfo.get("title"),
                (String) eventInfo.get("description"),
                (Integer) eventInfo.get("priority"),
                LocalDateTime.parse((String) eventInfo.get("startTime")),
                LocalDateTime.parse((String) eventInfo.get("endTime")),
                userId
        );
    }
    @DeleteMapping("/{eventId}")
    public ResponseEntity<String> deleteEvent(@PathVariable String eventId){
        return eventService.deleteEvent(eventId, userId);
    }


}
