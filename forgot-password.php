<?php
require "config.php";
date_default_timezone_set("Asia/Kolkata");

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

if ($result->num_rows !== 1) {
    $stmt->close();
    die("No account found with this email.");
}

$user = $result->fetch_assoc();
$stmt->close();

$token = bin2hex(random_bytes(32));
$expires = date("Y-m-d H:i:s", time() + 1800);

$update = $conn->prepare(
    "UPDATE users SET reset_token = ?, reset_expires = ? WHERE id = ?"
);
$update->bind_param("ssi", $token, $expires, $user["id"]);

if ($update->execute()) {
    echo "Reset token generated successfully.";
} else {
    echo "Could not create reset token.";
}

$update->close();
$conn->close();
?>
