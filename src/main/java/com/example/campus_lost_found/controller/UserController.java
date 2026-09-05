package com.example.campus_lost_found.controller;

import com.example.campus_lost_found.entity.User;
import com.example.campus_lost_found.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {

        User savedUser = userService.registerUser(user);

        return ResponseEntity.ok(savedUser);
    }
    @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody User user) {

    try {

        User loggedInUser =
                userService.loginUser(
                        user.getEmail(),
                        user.getPassword()
                );

        return ResponseEntity.ok(loggedInUser);

    } catch (RuntimeException e) {

        return ResponseEntity
                .status(401)
                .body("Invalid email or password");
    }
}
}
