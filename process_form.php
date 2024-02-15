<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $comments = $_POST["comments"];

    // Process the data (you can add your processing logic here)

    // For demonstration purposes, just print the data
    echo "Name: $name<br>";
    echo "Email: $email<br>";
    echo "Comments: $comments<br>";

    // Email configuration
    $to = "krish.chhajer@hotmail.com";  // Replace with your email address
    $subject = "New Contact Form Submission";
    $message = "Name: $name\nEmail: $email\nComments: $comments";

    // Send email
    mail($to, $subject, $message);

    echo "<p>Thank you for your submission. We will get back to you soon.</p>";
} else {
    // Redirect to the form page if accessed directly
    header("Location: contactme.html");
    exit();
}
?>