package edu.sjsu.cs151timemanagement.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import edu.sjsu.cs151timemanagement.model.User;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Repository
public class UserRepository {
    private final String DATA_DIRECTORY = "data/users/";
    private ObjectMapper objectMapper;

    public UserRepository() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    public void save(User user) {
        File file = new File(DATA_DIRECTORY + user.getId() + ".json");
        try {
            if (!file.exists()) {
                file.createNewFile();
            }
            objectMapper.writeValue(file, user);
        } catch (IOException e) {
            throw new RuntimeException("Error while saving user data", e);
        }
    }

    public Optional<User> findByUsernameAndPassword(String username, String password) {
        File folder = new File(DATA_DIRECTORY);
        File[] files = folder.listFiles();
        if (files != null) {
            for (File file : files) {
                try {
                    User user = objectMapper.readValue(file, User.class);
                    if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
                        return Optional.of(user);
                    }
                } catch (IOException e) {
                    throw new RuntimeException("Error while reading user data", e);
                }
            }
        }
        return Optional.empty();
    }


    public Optional<User> findById(String userId) {
        File file = new File(DATA_DIRECTORY + userId + ".json");
        if (file.exists()){
            try {
                User user = objectMapper.readValue(file, User.class);
                return Optional.of(user);
            } catch (IOException e){
                throw new RuntimeException("Error while reading user data", e);
            }
        }
        return Optional.empty();
    }
    public void deleteById(String userId) {
        File file = new File(DATA_DIRECTORY + userId + ".json");
        if (file.exists()) {
            if (!file.delete()) {
                throw new RuntimeException("Error while deleting user data");
            }
        }
    }
}
