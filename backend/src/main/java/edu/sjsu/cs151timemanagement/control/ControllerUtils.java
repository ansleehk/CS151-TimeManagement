package edu.sjsu.cs151timemanagement.control;

import edu.sjsu.cs151timemanagement.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ControllerUtils {

    public static void checkUserIdExistsAndSet(String userId, UserService userService) {
        final boolean isUserExist = userService.isUserExist(userId);

        if (!isUserExist) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
}
