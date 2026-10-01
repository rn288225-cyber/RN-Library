<?php
require "config.php";

$email = trim($_POST["email"] ?? "");
$token = trim($_POST["token"] ?? "");
$password = $_POST["password"] ?? "";
$confirm = $_POST["confirm_password"] ?? "";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: reset-password.html");
    exit;
}

if ($email === "" || $token === "") {
    die("Email and reset token are required.");
}

if (strlen($password) < 6) {
    die("Password must be at least 6 characters.");
}

if ($password !== $confirm) {
    die("Passwords do not match.");
}

$stmt = $conn->prepare(
    "SELECT id FROM users WHERE email = ? AND reset_token = ? AND reset_expires > NOW()"
);
$stmt->bind_param("ss", $email, $token);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows !== 1) {
    $stmt->close();
    die("Invalid or expired reset token.");
}

$user = $result->fetch_assoc();
$stmt->close();

$hash = password_hash($password, PASSWORD_DEFAULT);

$update = $conn->prepare(
    "UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?"
);
$update->bind_param("si", $hash, $user["id"]);

if ($update->execute()) {
    echo 'Password reset successfully. <a href="login.html">Login now</a>';
} else {
    echo "Password reset failed.";
}

$update->close();
$conn->close();
?>
