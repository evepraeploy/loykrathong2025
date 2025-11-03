-- Loy Krathong Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS loykrathong CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE loykrathong;

-- Create krathongs table
CREATE TABLE IF NOT EXISTS krathongs (
  krathong_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  krathong_type INT NOT NULL COMMENT 'Type of krathong (1-5)',
  emp_name VARCHAR(50) NOT NULL COMMENT 'Employee name',
  emp_department VARCHAR(50) NOT NULL COMMENT 'Employee department',
  emp_wish TEXT COMMENT 'Employee wish',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  INDEX idx_created_at (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data (optional)
INSERT INTO krathongs (krathong_type, emp_name, emp_department, emp_wish) VALUES
(1, 'Somchai Prasert', 'Engineering', 'May our projects succeed'),
(2, 'Suda Wongsa', 'Marketing', 'Wishing for prosperity'),
(3, 'Niran Chaiyaporn', 'HR', 'Health and happiness for all'),
(1, 'Apinya Srisawat', 'Finance', 'Financial stability'),
(2, 'Krit Boonmee', 'IT', 'Innovation and growth');
