<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    header("Location: login.html");
    exit;
}
$name = htmlspecialchars($_SESSION["user_name"]);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard - RN Library</title>
<link rel="stylesheet" href="css/style.css?v=7">
</head>
<body>
<header class="navbar">
<div class="logo">📚 RN Library</div>
<a href="index.html" class="back-btn">← Back to Library</a>
</header>
<main class="auth-page">
<section class="auth-card">
<p class="section-tag">MY ACCOUNT</p>
<h1>Welcome, <?php echo $name; ?> 👋</h1>
<p class="auth-intro">You are successfully logged in to RN Library.</p>
<a href="logout.php" class="auth-submit" style="display:block;text-align:center;text-decoration:none;">Logout</a>
</section>
</main>
<footer>
<p>© 2026 RN Library. All rights reserved.</p>
</footer>
</body>
</html>
