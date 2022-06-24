package com.example.rest.webservices.todo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoHardCodeService {

    private static List<Todo> todos = new ArrayList<>();
    private static int idCounter = 0;

    static {
        todos.add(new Todo(++idCounter, "in28minutes", "Lear to dance", new Date(), false));
        todos.add(new Todo(++idCounter, "in28minutes", "Lear to dance", new Date(), false));
        todos.add(new Todo(++idCounter, "in28minutes", "Lear to dance", new Date(), false));
    }

    public static List<Todo> findAll() {
        return todos;
    }
}
