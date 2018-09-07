
<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        # FIX: Replace this email with recipient email
        $mail_to = "sales@distributedlab.com";
        
        # Sender Data
        $subject = "Complete form \"Cryptofund Software\"";
        $firstName = str_replace(array("\r","\n"),array(" "," ") , strip_tags(trim($_POST["first-name"])));
        $lastName = str_replace(array("\r","\n"),array(" "," ") , strip_tags(trim($_POST["last-name"])));
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $phone = trim($_POST["phone"]);
        $message = trim($_POST["message"]);
        $company = trim($_POST["company"]);
        $country = trim($_POST["country"]);
        $website = trim($_POST["website"]);
        $position = trim($_POST["position"]);
        
        if ( empty($firstName) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR empty($phone) OR empty($subject) OR empty($lastName) OR empty($country) OR empty($website) OR empty($position)OR empty($company)) {
            # Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Please complete the form and try again.";
            exit;
        }
        
        # Mail Content
        $content = "First Name: $firstName\n";
        $content .= "Last Name: $lastName\n";
        $content .= "Company: $company\n";
        $content .= "Position: $position\n";
        $content .= "Email: $email\n";
        $content .= "Mobile phone: $phone\n";
        $content .= "Website: $website\n";
        $content .= "Country: $country\n";
        $content .= "Message:\n$message\n";

        # email headers.
        $headers = "From: $firstName &lt;$email&gt;";

        # Send the email.
        $success = mail($mail_to, $subject, $content, $headers);
        if ($success) {
            # Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            # Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong, we couldn't send your message.";
        }

        } else {
            # Not a POST request, set a 403 (forbidden) response code.
            http_response_code(403);
            echo "There was a problem with your submission, please try again.";
        }
?>