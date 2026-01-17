package com.example.todo.service;

import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public List<Todo> getAllTodosOrderedByPriority() {
        return todoRepository.findAllOrderedByPriority();
    }

    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    public List<Todo> getTodosByStatus(Boolean completed) {
        return todoRepository.findByCompleted(completed);
    }

    public List<Todo> getTodosByPriority(String priority) {
        return todoRepository.findByPriority(priority);
    }

    public List<Todo> getStarredTodos() {
        return todoRepository.findByStarred(true);
    }

    public List<Todo> searchTodos(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllTodos();
        }
        return todoRepository.searchByKeyword(keyword);
    }

    public List<Todo> getTodosByTag(String tag) {
        return todoRepository.findByTag(tag);
    }

    public List<Todo> getOverdueTodos() {
        return todoRepository.findOverdueTodos(LocalDateTime.now());
    }

    public List<Todo> getTodosDueToday() {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        return todoRepository.findByDueDateBetween(startOfDay, endOfDay);
    }

    public Set<String> getAllTags() {
        return todoRepository.findAll().stream()
                .flatMap(todo -> todo.getTags().stream())
                .collect(Collectors.toSet());
    }

    public Map<String, Long> getStatistics() {
        List<Todo> allTodos = todoRepository.findAll();
        Map<String, Long> stats = new HashMap<>();

        stats.put("total", (long) allTodos.size());
        stats.put("completed", allTodos.stream().filter(Todo::getCompleted).count());
        stats.put("active", allTodos.stream().filter(t -> !t.getCompleted()).count());
        stats.put("high_priority", allTodos.stream().filter(t -> "HIGH".equals(t.getPriority())).count());
        stats.put("overdue", getOverdueTodos().size() * 1L);
        stats.put("starred", allTodos.stream().filter(t -> t.getStarred() != null && t.getStarred()).count());

        return stats;
    }

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo todoDetails) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));

        todo.setTitle(todoDetails.getTitle());
        todo.setDescription(todoDetails.getDescription());
        todo.setCompleted(todoDetails.getCompleted());
        todo.setPriority(todoDetails.getPriority());
        todo.setDueDate(todoDetails.getDueDate());
        todo.setTags(todoDetails.getTags());
        todo.setColor(todoDetails.getColor());
        todo.setStarred(todoDetails.getStarred());

        return todoRepository.save(todo);
    }

    public Todo toggleStarred(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        todo.setStarred(!todo.getStarred());
        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        todoRepository.delete(todo);
    }
}
