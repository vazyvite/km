<?php
    require("../phpclass/phpToPDF.php");
    require("../phpclass/class.Article.php");
    require("../phpclass/class.Categorie.php");
    require("../phpclass/class.User.php");
    require("../phpclass/class.DBQuery.php");
    require("../phpclass/class.DB.php");
    require("../phpclass/class.ListMotCles.php");
    require("../phpclass/class.MotCle.php");
    require("../phpclass/class.htmlParser.php");

    if(isset($_GET['idArticle'])){
		$idArticle = $_GET['idArticle'];

		$article = new Article();
		$categorie = new Categorie();
		$user = new User();
		$PDF = new phpToPDF();

		$a = $article->GetArticleById($idArticle);

		// paramétrage
		$PDF->AddPage();

		// Titre
		$cat = $categorie->GetCategorieById($a->getIdCategorie());
		$titre = ($cat->GetCategorie() == null) ? $a->GetTitre() : $cat->GetCategorie() . "." . $a->GetTitre();
		TraceTitleElement($PDF, $titre);


		// Informations
		$auth = $user->GetUserById($a->getIdUser());
		if($auth->getFirstName() . " " . $auth->getLastName() != null){
			TraceSimpleElement($PDF, 5, "auteur : ", $auth->getFirstName() . " " . $auth->getLastName(), 0, 0, 'L', 10, '', false);
		}

		$date = $a->getDtCreation();
		if($date != null){
			TraceSimpleElement($PDF, 5, "date de creation : ", $date, 0, 0, 'L', 10, '', false);
		}

        $html = html_entity_decode($a->GetArticle(), ENT_QUOTES);
		$parser = new htmlParser($html);
		$parser->ignoreSingleTags = true;
		$ar = $parser->toArray();
		// var_dump($ar);

		SautLigne($PDF, 10);

		$syn_content = "";
		$res_content = "";
		$art_content = "";

		foreach ($ar as $html_element) {
			if(strlen($html_element['innerHTML']) > 0){
				switch($html_element['tag']){
					case "section": 
						$html_title = "Syntaxe : ";
						$html_content = $html_element['innerHTML'];
						$syn_content = array('title' => $html_title, 'content' => $html_content);
						break;

					case "aside":
						$html_title = "Resume : ";
						$html_content = $html_element['innerHTML'];
						$res_content = array('title' => $html_title, 'content' => $html_content);
						break;

					case "article":
						$html_title = "Article : ";
						$html_content = $html_element['innerHTML'];
						$art_content = array('title' => $html_title, 'content' => $html_content);
						break;

					default: 
						$html_title = "";
						$html_content = $html_element['innerHTML'];
						break;
				}
				
			}
		}

		if($syn_content != ""){
			TraceSimpleElement($PDF, 10, $syn_content['title'], $syn_content['content'], 0, 1, 'L', 12, '', true);
		}

		if($res_content != ""){
			TraceSimpleElement($PDF, 10, $res_content['title'], $res_content['content'], 0, 1, 'L', 12, '', true);
		}

		if($art_content != ""){
			TraceArticleElement($PDF, $art_content['title'], $art_content['content']);
		}

		// export PDF
		$PDF->Output();
		// $PDF->Output("test.PDF", "F");
    }

    function TraceTitleElement($PDF, $content){
    	TraceSimpleElement($PDF, 10, "", $content, 0, 1, 'L', 16, '', false);
    	HorizontalLine($PDF, 20);
    	SautLigne($PDF, 5);
    }

    function TraceArticleElement($PDF, $label, $content){
    	SautLigne($PDF, 10);
    	TraceMultiLineElement($PDF, 8, $label, $content, 0, 'L', 12, '');
    }

    function TraceSimpleElement($PDF, $height, $label, $content, $border, $backline, $alignement, $fontSize, $fontWeight, $fill){

    	$fontFamily = 'Arial';

    	if($content != "" && $label != ""){
    		$lblWidth = 40;
    		if($backline == 0){
    			$cttWidth = 60;
    		}else{
    			$cttWidth = 0;
    		}

    	}else{
    		$lblWidth = 0;
    		$cttWidth = 0;
    	}

    	if($label != ""){
    		$PDF->SetTextColor(100);
	    	$PDF->SetFont($fontFamily,'B', $fontSize - 2);
	    	if($fill){
	    		$PDF->SetFillColor(230);
	    	}
			$PDF->Cell($lblWidth, $height, $label, 0, 0, $alignement, $fill);
		}

		if($content != ""){
			$PDF->SetTextColor(0);
			$PDF->SetFont($fontFamily, $fontWeight, $fontSize);
			if($fill){
	    		$PDF->SetFillColor(230);
	    	}
			$PDF->Cell($cttWidth, $height, utf8_decode(strip_tags(html_entity_decode($content, ENT_QUOTES))), $border, $backline, $alignement, $fill);
		}
    }

    function TraceMultiLineElement($PDF, $height, $label, $content, $border, $alignement, $fontSize, $fontWeight){

    	$fontFamily = 'Arial';

    	if($label != ""){
    		$PDF->SetTextColor(100);
	    	$PDF->SetFont($fontFamily,'B', $fontSize - 2);
			$PDF->MultiCell(0, $height, $label, 0, $alignement);
		}

		if($content != ""){
			$PDF->SetTextColor(0);
			$PDF->SetFont($fontFamily, $fontWeight, $fontSize);
			$PDF->MultiCell(0, $height, utf8_decode(strip_tags(html_entity_decode($content, ENT_QUOTES))), $border, $alignement);
		}
    }

    function SautLigne($PDF, $hauteur){
    	$PDF->Ln($hauteur);
    }

    function HorizontalLine($PDF, $top){
    	$PDF->Line(10, $top, 200, $top);
    }
?>