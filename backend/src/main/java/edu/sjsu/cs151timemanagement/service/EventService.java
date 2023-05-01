package edu.sjsu.cs151timemanagement.service;

import edu.sjsu.cs151timemanagement.model.Day;
import edu.sjsu.cs151timemanagement.model.Event;
import edu.sjsu.cs151timemanagement.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    private Event verifyIsEventExist(String eventId, String userId) {
        Optional<Event> optionalEvent = eventRepository.findById(eventId, userId);

        if (optionalEvent.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found");
        }

        return optionalEvent.get();
    }

    public ResponseEntity<String> createEvent(
            String title,
            String description,
            Integer priority,
            LocalDateTime startTime,
            LocalDateTime endTime,
            String userId) {

        Event newEvent = new Event(title, description, priority, startTime, endTime);
        newEvent.setId(ServiceUtil.generateUUID());
        eventRepository.save(newEvent, userId);
        return ResponseEntity.ok(newEvent.getId());
    }

    public ResponseEntity<Event> getEvent(String eventId, String userId) {
        Event event = verifyIsEventExist(eventId, userId);
        return ResponseEntity.ok(event);

    }

    public ResponseEntity<List<Event>> getAllEvents(String userId) {
        return ResponseEntity.ok(eventRepository.findAll(userId));
    }

    public ResponseEntity<Event> updateEvent(String eventId,
                                             String title,
                                             String description,
                                             Integer priority,
                                             LocalDateTime startTime,
                                             LocalDateTime endTime,
                                             String userId) {
        Event event = verifyIsEventExist(eventId, userId);

        event.setTitle(title);
        event.setDescription(description);
        event.setPriority(priority);
        event.setStartTime(startTime);
        event.setEndTime(endTime);

        eventRepository.update(eventId, event, userId);
        return ResponseEntity.ok(event);

    }

    public ResponseEntity<String> deleteEvent(String eventId, String userId){
        Event event = verifyIsEventExist(eventId, userId);
        eventRepository.deleteById(eventId, userId);
        return ResponseEntity.ok("Successfully deleted");
    }

    // ...

    public ResponseEntity<Event> findByStartTime(LocalDateTime startTime, String userId) {
        Optional<Event> optionalEvent = eventRepository.findByStartTime(startTime, userId);

        if (optionalEvent.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found");
        }

        return ResponseEntity.ok(optionalEvent.get());
    }




}
