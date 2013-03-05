<html>
	<head>
		<title>Test</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />

		<link rel="stylesheet" href="./css/main.css" type="text/css" media="screen">
		<link rel="stylesheet" href="./css/button-ui.css" type="text/css" media="screen">
		<link rel="stylesheet" href="./css/redactor.css" />
		<link rel="stylesheet" href="./css/token-input-facebook.css" />
		<link rel="stylesheet" href="./css/jquery.pnotify.default.css" />
		<link rel="stylesheet" href="./css/jquery.pnotify.default.icons.css" />

		<script type="text/javascript" src="./js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="./js/jquery.tools-1.2.7.min.js"></script>
		<script type="text/javascript" src="./js/jquery.livequery.js"></script>
		<script type="text/javascript" src="./js/jquery.cookie.js"></script>
		<script type="text/javascript" src="./js/jquery.watermark.min.js"></script>
		<script type="text/javascript" src="./js/redactor.min.js"></script>
		<script type="text/javascript" src="./js/jquery.tokeninput.js"></script>
		<script type="text/javascript" src="./js/jquery.SearchHighlight.js"></script>
		<script type="text/javascript" src="./js/jquery.pnotify.js"></script>
		
		<script type="text/javascript" src="./js/class/Lang.js"></script>
		<script type="text/javascript" src="./js/class/Data.js"></script>
		<script type="text/javascript" src="./js/class/Popin.js"></script>
		<script type="text/javascript" src="./js/class/Menu.js"></script>
		<script type="text/javascript" src="./js/class/User.js"></script>
		<script type="text/javascript" src="./js/class/Portail.js"></script>
		<script type="text/javascript" src="./js/class/Article.js"></script>
		<script type="text/javascript" src="./js/class/Navigation.js"></script>
		<script type="text/javascript" src="./js/class/Recherche.js"></script>
		<script type="text/javascript" src="./js/class/jsExtends.js"></script>
		<script type="text/javascript" src="./js/class/Rights.js"></script>
		<script type="text/javascript" src="./js/class/UI.js"></script>
		<script type="text/javascript" src="./js/domReady.js"></script>
		
	</head>
	<body>
		<div id="main">
			<div id="header">
				<div id="portail">
					<div class="cache">
						<input type="hidden" id="portaildata_idPortail" value="" />
						<input type="hidden" id="portaildata_portail" value="" />
					</div>
					<div class="bloc_content">
						<div class='portail_action_select'>
							<div class='portail_infos'></div>
							<div class='menu_portail'></div>
						</div>
					</div>
				</div>
				<div id="menu">
					<ul></ul>
				</div>
				<div id="user">
					<div class="cache">
						<input type="hidden" id="userdata_idUser" value="" />
						<input type="hidden" id="userdata_lstName" value="" />
						<input type="hidden" id="userdata_fstName" value="" />
						<input type="hidden" id="userdata_role" value="" />
						<input type="hidden" id="userdata_email" value="" />
						<input type="hidden" id="userdata_login" value="" />
					</div>
					<div class='bloc_content'></div>
				</div>
			</div>
			<div id="body">
				<div id="reference">
					<div id="recherche"></div>
					<div id="navigation"><ul class='bloc_content'></ul></div>
				</div>
				<div id="content">
					<div id="title"></div>
					<div id="informations"></div>
					<div id="article"></div>
					<div id="logos"></div>
				</div>

			</div>
		</div>

		<div id="dialogCache"></div>
	</body>
</html>