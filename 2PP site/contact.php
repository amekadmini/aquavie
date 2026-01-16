<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = isset($_POST['nom']) ? trim($_POST['nom']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Validation
    if (empty($nom) || empty($email) || empty($message)) {
        echo "<script>alert('Erreur : Tous les champs doivent être remplis.'); window.history.back();</script>";
        exit();
    }

    // Validation email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Erreur : Email invalide.'); window.history.back();</script>";
        exit();
    }

    $to = "amekadmini.eleve@ec-tunis.com";
    $subject = "Nouveau message - " . htmlspecialchars($nom, ENT_QUOTES, 'UTF-8');
    
    // Crée le contenu du mail en HTML
    $body = "<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
</head>
<body style='font-family: Arial, sans-serif; color: #333;'>
    <h2>Nouveau message de contact</h2>
    <p><strong>Nom:</strong> " . htmlspecialchars($nom, ENT_QUOTES, 'UTF-8') . "</p>
    <p><strong>Email:</strong> " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "</p>
    <hr>
    <p><strong>Message:</strong></p>
    <p>" . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . "</p>
</body>
</html>";

    $headers = "From: noreply@aquavie.com\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";

    // Essayer d'envoyer l'email
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Message envoyé avec succès !'); window.location.href='contact.html';</script>";
    } else {
        // Sauvegarder en fichier si mail() échoue
        $backup_file = __DIR__ . '/messages_backup.json';
        $messages = [];
        
        if (file_exists($backup_file)) {
            $messages = json_decode(file_get_contents($backup_file), true) ?? [];
        }
        
        $messages[] = [
            'nom' => $nom,
            'email' => $email,
            'message' => $message,
            'date' => date('Y-m-d H:i:s')
        ];
        
        file_put_contents($backup_file, json_encode($messages, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        echo "<script>alert('Message reçu et sauvegardé !'); window.location.href='contact.html';</script>";
    }
} else {
    header("Location: contact.html");
    exit();
}
?>
