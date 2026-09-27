<?php
require "config.php";
$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";
$confirm = $_POST["confirm_password"] ?? "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (strlen($password) < 6) {
        die("Password must be at least 6 characters.");
    }

    if ($password !== $confirm) {
        die("Passwords do not match.");
    }

    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        $check->close();
        die("This email is already registered.");
    }

    $check->close();

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
