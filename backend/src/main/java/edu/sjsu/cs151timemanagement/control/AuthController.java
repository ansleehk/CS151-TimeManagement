package edu.sjsu.cs151timemanagement.control;


import edu.sjsu.cs151timemanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody Map<String, String> userInfo,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        return userService.createUser(
                userInfo.get("username"),
                userInfo.get("password"),
                LocalDate.parse(userInfo.get("birthday")),
                request,
                response
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginInfo, HttpServletRequest request, HttpServletResponse response) {
        return userService.login(
                loginInfo.get("username"),
                loginInfo.get("password"),
                request,
                response
        );
    }
    @GetMapping("/{userId}/info")
    public ResponseEntity<?> getUserInfo(@PathVariable String userId){
        return userService.getUserInfo(userId);
    }
}
