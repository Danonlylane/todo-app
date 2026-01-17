package com.example.todo.repository;

import com.example.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByCompleted(Boolean completed);

    List<Todo> findByPriority(String priority);

    List<Todo> findByStarred(Boolean starred);

    @Query("SELECT t FROM Todo t WHERE t.title LIKE %:keyword% OR t.description LIKE %:keyword%")
    List<Todo> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT t FROM Todo t JOIN t.tags tag WHERE tag = :tag")
    List<Todo> findByTag(@Param("tag") String tag);

    List<Todo> findByDueDateBefore(LocalDateTime date);

    List<Todo> findByDueDateBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT t FROM Todo t WHERE t.completed = false AND t.dueDate < :now ORDER BY t.dueDate ASC")
    List<Todo> findOverdueTodos(@Param("now") LocalDateTime now);

    @Query("SELECT t FROM Todo t ORDER BY " +
           "CASE t.priority " +
           "WHEN 'HIGH' THEN 1 " +
           "WHEN 'MEDIUM' THEN 2 " +
           "WHEN 'LOW' THEN 3 " +
           "END, t.createdAt DESC")
    List<Todo> findAllOrderedByPriority();
}
