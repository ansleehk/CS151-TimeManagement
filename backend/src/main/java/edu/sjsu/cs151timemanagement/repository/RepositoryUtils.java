package edu.sjsu.cs151timemanagement.repository;

import edu.sjsu.cs151timemanagement.model.User;

import java.util.Optional;

public class RepositoryUtils {
    public static User findUserOrThrow(String userId, UserRepository userRepository) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
