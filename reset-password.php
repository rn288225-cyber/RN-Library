<?php
require "config.php";

$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";
$confirm = $_POST["confirm_password"] ?? "";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: reset-password.html");
    exit;
}

if ($email === "") {
    die("Email is required.");
}

if (strlen($password) < 6) {
    die("Password must be at least 6 characters.");
}

if ($password !== $confirm) {
    die("Passwords do not match.");
}

$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows !== 1) {
    $check->close();
    die("No account found with this email.");
}

$user = $result->fetch_assoc();
$check->close();

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
$stmt->bind_param("si", $hash, $user["id"]);

if ($stmt->execute()) {
    echo 'Password reset successfully. <a href="login.html">Login now</a>';
} else {
    echo "Password reset failed.";
}

$stmt->close();
$conn->close();
?>
