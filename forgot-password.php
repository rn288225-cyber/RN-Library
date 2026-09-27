<?php
require "config.php";

$email = trim($_POST["email"] ?? "");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: forgot-password.html");
    exit;
}

if ($email === "") {
    die("Please enter your email address.");
}

$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    echo "Email verified. Password reset can continue.";
} else {
    echo "No account found with this email.";
}

$stmt->close();
$conn->close();
?>
