# JAVA-PROJ

**Description:** No description provided.

## README

# Mini Social Media Console Application

A console-based social media application built with Spring Boot and MySQL, featuring user registration, posts, comments, likes, and follow functionality.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Database Schema](#database-schema)
- [Example Console Interactions](#example-console-interactions)
- [Sample Data](#sample-data)

## ✨ Features

### User Management
- ✅ User Registration with email validation
- ✅ User Login with password hashing (BCrypt)
- ✅ User Search by name
- ✅ View user profiles

### Posts
- ✅ Create new posts
- ✅ View all posts (chronological order)
- ✅ View my posts
- ✅ Delete own posts

### Likes
- ✅ Like a post
- ✅ Unlike a post
- ✅ View like count for each post

### Comments
- ✅ Comment on posts
- ✅ View all comments for a post
- ✅ Delete own comments

### Social Features
- ✅ Follow other users
- ✅ Unfollow users
- ✅ View followers and following lists

## 🛠 Technology Stack

- **Java**: 17
- **Spring Boot**: 3.2.0
- **Spring Data JPA**: For database operations
- **MySQL**: 8.0+ (Database)
- **Maven**: Build tool
- **Lombok**: For reducing boilerplate code
- **BCrypt**: Password hashing

## 📁 Project Structure

```
mini-social-media/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── socialmedia/
│   │   │           ├── SocialMediaApplication.java
│   │   │           ├── config/
│   │   │           │   └── PasswordEncoderConfig.java
│   │   │           ├── entity/
│   │   │           │   ├── User.java
│   │   │           │   ├── Post.java
│   │   │           │   ├── Comment.java
│   │   │           │   ├── Like.java
│   │   │           │   └── UserFollow.java
│   │   │           ├── repository/
│   │   │           │   ├── UserRepository.java
│   │   │           │   ├── PostRepository.java
│   │   │           │   ├── CommentRepository.java
│   │   │           │   ├── LikeRepository.java
│   │   │           │   └── UserFollowRepository.java
│   │   │           ├── service/
│   │   │           │   ├── UserService.java
│   │   │           │   ├── PostService.java
│   │   │           │   ├── CommentService.java
│   │   │           │   ├── LikeService.java
│   │   │           │   └── UserFollowService.java
│   │   │           ├── exception/
│   │   │           │   ├── ResourceNotFoundException.java
│   │   │           │   ├── ValidationException.java
│   │   │           │   └── GlobalExceptionHandler.java
│   │   │           └── console/
│   │   │               └── SocialMediaConsole.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── schema.sql
│   │       └── data.sql
│   └── test/
├── pom.xml
└── README.md
```

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

1. **Java Development Kit (JDK) 17 or higher**
   ```bash
   java -version
   ```

2. **Maven 3.6+**
   ```bash
   mvn -version
   ```

3. **MySQL Server 8.0+**
   ```bash
   mysql --version
   ```

4. **MySQL Workbench or any MySQL client** (optional, for database management)

## 🔧 Setup Instructions

### Step 1: Clone or Download the Project

```bash
cd C:\JAVA-PROJ
```

### Step 2: Configure MySQL Database

1. **Start MySQL Server**
   ```bash
   # Windows (if MySQL is installed as a service)
   net start MySQL80
   
   # Or use MySQL Workbench/Command Line
   ```

2. **Create Database User** (if not already created)
   ```sql
   CREATE USER 'root'@'localhost' IDENTIFIED BY 'root';
   GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Update Database Configuration** (if needed)
   
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/social_media_db?createDatabaseIfNotExist=true
   spri
