<?php
	// 文字化け防止
	mb_language("ja");
	mb_internal_encoding('UTF-8');

	// Ajaxから渡ってきた各値を分かりやすいように格納
	$sender_name = $_POST['qname'];
	$sender_mail_address = $_POST['qmail'];
	$contact_body  = '[送信者名]' . "\n" . $sender_name . "\n\r";
	$contact_body .= '[お問い合わせの種類]' . "\n" . $_POST['qtype'] . "\n\r";
	$contact_body .= '[お問い合せ内容]' . "\n" . $_POST['qcomment'];


	// 入力エラーチェック
	$error_massage = array();

	if(empty($error_massage)){
		$subject = 'rish-designに対する問い合わせ[問い合わせフォームより]';

		// コンタクトフォームに入力されたメールアドレスを送信者として設定
		$header = 'From: <'.$sender_mail_address.'>';

		// mb_send_mail()関数でメールを送信
		if(mb_send_mail('yat@rish-design.com', $subject, $contact_body, $header)){
			// 送信成功処理
			echo '送信が成功しました。';
		} else {
			// 送信失敗処理
			echo '送信が失敗しました。';
		}
	} else {
		// 名前、メールアドレス、本文のいずれかが空だったなどのエラー
		echo $error_massage['qname'];
		echo $error_massage['qmail'];
		echo $error_massage['qcomment'];
	}
?>
