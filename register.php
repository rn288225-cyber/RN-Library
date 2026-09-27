<?php
require "config.php";
$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";
$confirm = $_POST["confirm_password"] ?? "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if ($password !== $confirm) {
        die("Passwords do not match.");
    }
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hash);
    if ($stmt->execute()) {
        echo "Account created successfully!";
    } else {
        echo "Registration failed.";
    }
    $stmt->close();
}
?>
