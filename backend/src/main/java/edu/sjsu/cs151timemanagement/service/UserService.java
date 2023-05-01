package edu.sjsu.cs151timemanagement.service;

import edu.sjsu.cs151timemanagement.model.User;
import edu.sjsu.cs151timemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean isUserExist(String id){
        return userRepository.findById(id).isPresent();
    }

    private void setSessionCookieForLoginSuccessUser(User user, HttpServletRequest request, HttpServletResponse response){
        HttpSession session = request.getSession(true);
        session.setAttribute("user", user);

        Cookie sessionCookie = new Cookie("JSESSIONID", session.getId());
        sessionCookie.setMaxAge(60 * 60 * 24);
        sessionCookie.setPath("/");
        response.addCookie(sessionCookie);
    }

    public ResponseEntity<?> createUser(String username,
                                        String password,
                                        LocalDate birthday,
                                        HttpServletRequest request,
                                        HttpServletResponse response){

        User newUser = new User(username, password, birthday);
        newUser.setId(ServiceUtil.generateUUID());
        userRepository.save(newUser);

        setSessionCookieForLoginSuccessUser(newUser, request, response);

        return ResponseEntity.ok(newUser.getId());
    }

    public ResponseEntity<?> login(String username, String password, HttpServletRequest request, HttpServletResponse response) {
        Optional<User> optionalUser = userRepository.findByUsernameAndPassword(username, password);

        if (optionalUser.isEmpty()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect Login Credential");
        } else {
            User user = optionalUser.get();
            setSessionCookieForLoginSuccessUser(user, request, response);
            return ResponseEntity.ok(user.getId());
        }
    }

    public ResponseEntity<Map<String, String>> getUserInfo(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        HashMap<String, String> userInfo = new HashMap<>();
        userInfo.put("username", optionalUser.get().getUsername());
        userInfo.put("birthday", optionalUser.get().getBirthDay().toString());

        return ResponseEntity.ok(userInfo);
    }
}
