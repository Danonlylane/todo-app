package com.example.todo.controller;

import com.example.todo.model.Todo;
import com.example.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3010")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos(@RequestParam(required = false) String sort) {
        if ("priority".equals(sort)) {
            return ResponseEntity.ok(todoService.getAllTodosOrderedByPriority());
        }
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        return todoService.getTodoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{completed}")
    public ResponseEntity<List<Todo>> getTodosByStatus(@PathVariable Boolean completed) {
        return ResponseEntity.ok(todoService.getTodosByStatus(completed));
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<Todo>> getTodosByPriority(@PathVariable String priority) {
        return ResponseEntity.ok(todoService.getTodosByPriority(priority));
    }

    @GetMapping("/starred")
    public ResponseEntity<List<Todo>> getStarredTodos() {
        return ResponseEntity.ok(todoService.getStarredTodos());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Todo>> searchTodos(@RequestParam String q) {
        return ResponseEntity.ok(todoService.searchTodos(q));
    }

    @GetMapping("/tag/{tag}")
    public ResponseEntity<List<Todo>> getTodosByTag(@PathVariable String tag) {
        return ResponseEntity.ok(todoService.getTodosByTag(tag));
    }

    @GetMapping("/tags")
    public ResponseEntity<Set<String>> getAllTags() {
        return ResponseEntity.ok(todoService.getAllTags());
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<Todo>> getOverdueTodos() {
        return ResponseEntity.ok(todoService.getOverdueTodos());
    }

    @GetMapping("/today")
    public ResponseEntity<List<Todo>> getTodosDueToday() {
        return ResponseEntity.ok(todoService.getTodosDueToday());
    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Long>> getStatistics() {
        return ResponseEntity.ok(todoService.getStatistics());
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        Todo createdTodo = todoService.createTodo(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTodo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todoDetails) {
        try {
            Todo updatedTodo = todoService.updateTodo(id, todoDetails);
            return ResponseEntity.ok(updatedTodo);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/star")
    public ResponseEntity<Todo> toggleStarred(@PathVariable Long id) {
        try {
            Todo updatedTodo = todoService.toggleStarred(id);
            return ResponseEntity.ok(updatedTodo);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        try {
            todoService.deleteTodo(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
