<?php
if(isset($_POST['realname']) && isset($_POST['email']) && isset($_POST['comments'])){

$name = $_POST['realname'];
$email = $_POST['email'];
$comments = $_POST['comments'];



	$subject = 'Заявка з портфоліо';	

	//$headers= "From: noreply <noreply@noreply.ru>\r\n";
	//$headers.= "Reply-To: noreply <noreply@noreply.ru>\r\n";
	$headers.= "X-Mailer: PHP/" . phpversion()."\r\n";
	$headers.= "MIME-Version: 1.0" . "\r\n";
	$headers.= "Content-type: text/plain; charset=utf-8\r\n";

	$to = "Solyasolyasolya3@gmail.com";

	$message = "Имя: $name\n";
	$message .= "Email: $phone\n";
	$message .= "Сообщение: $comments\n";

	mail ($to,$subject,$message,$headers);

	echo 'OK';

}else{

	echo 'ERROR'

}

?>