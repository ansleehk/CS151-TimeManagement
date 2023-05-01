package edu.sjsu.cs151timemanagement.repository;

import edu.sjsu.cs151timemanagement.model.Event;
import edu.sjsu.cs151timemanagement.model.User;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static edu.sjsu.cs151timemanagement.repository.RepositoryUtils.findUserOrThrow;

@Repository
public class EventRepository {

    private UserRepository userRepository;

    public EventRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void save(Event event, String userId) {
        User user = findUserOrThrow(userId, userRepository);
        user.getEvents().add(event);
        userRepository.save(user);
    }

    public Optional<Event> findById(String eventId, String userId) {
        User user = findUserOrThrow(userId, userRepository);
        return user.getEvents().stream()
                .filter(event -> event.getId().equals(eventId))
                .findFirst();
    }

    public Optional<Event> findByStartTime(LocalDateTime dateTime, String userId) {
        User user = findUserOrThrow(userId, userRepository);
        List<Event> events = user.getEvents();

        return events.stream()
                .filter(event -> event.getStartTime().equals(dateTime))
                .findFirst();
    }

    public void update(String eventId, Event updatedEvent, String userId) {
        User user = findUserOrThrow(userId, userRepository);
        List<Event> events = user.getEvents();

        for (int i = 0; i < events.size(); i++) {
            if (events.get(i).getId().equals(eventId)) {
                events.set(i, updatedEvent);
                userRepository.save(user);
                return;
            }
        }
        throw new RuntimeException("Event not found");
    }

    public void deleteById(String eventId, String userId) {
        User user = findUserOrThrow(userId, userRepository);
        user.getEvents().removeIf(event -> event.getId().equals(eventId));
        userRepository.save(user);
    }


}
