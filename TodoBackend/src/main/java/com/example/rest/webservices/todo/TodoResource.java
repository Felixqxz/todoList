package com.example.rest.webservices.todo;

import com.example.rest.webservices.todo.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://localhost:4200")
public class TodoResource {

    @Autowired
    private TodoHardCodeService todoHardCodeService;

    @GetMapping("/user/{username}/todos")
    public List<Todo> getAllTodos(@PathVariable String username) {
        return todoHardCodeService.findAll();

    }
}
