function Article(){
	this.settings = {
		bloc: "#article",
		blocCmd: "#informations",
		blocTil: "#title",
		data: null,
		fontSize: 1,
		minFontSize: .7,
		maxFontSize: 1.3
	};

	this.Init();
}

Article.prototype = {
	/**
	 * Méthode Init
	 * Méthode d'initialisation de la class Recherche
	 */
	Init: function(){
		this.OpenScreen();
	},

	/**
	 * Méthode OpenScreen
	 * Affiche l'écran de démarrage de l'application
	 */
	OpenScreen: function(){

	},

	/**
	 * Méthode LoadArticle
	 * Charge un article
	 * @param id:Int 		Identifiant de l'article à charger
	 */
	LoadArticle: function(id){
		$.ajax({
			url: "phpforms/article.show.php",
			type: "POST",
			data: {idArticle:id},
			datatype: "json",
			context: this
		}).done(function(msg){
			var json = $.parseJSON(msg);
			this.settings.data = json;
			this.BuildArticle();
		});
	},

	/**
	 * Méthode BuildArticle
	 * Construction de l'article
	 */
	BuildArticle: function(){
		$(this.settings.bloc).html(null);
		$(this.settings.blocCmd).html(null);
		$(this.settings.blocTil).html(null);
		this.BuildTitle();
		this.BuildContent();
		this.BuildCommands();

		$("#logos").animate({"opacity": 0}, 50, function(){ $(this).hide().css("opacity", 1); });
	},

	/**
	 * Méthode BuildTitle
	 * Construction de l'en-tête de l'article
	 */
	BuildTitle: function(){
		var json = this.settings.data;
		var insert = $("<div></div>");
			insert.addClass("article_header");

		var infos = $("<div></div>");
			infos.addClass("article_infos");

		var author = $("<span></span>");
			author.addClass("article_author").text(" créé par " + json.user);

		var type = $("<span></span>");
			type.addClass("article_type").text(json.type);

		var date = $("<span></span>");
			date.addClass("article_date").text(" le " + json.dateCreation);

		var mc = $("<div></div>");
			mc.addClass("article_listMotCles");

		for(var i = 0; i < json.motcles.length; i++){
			var motcle = $("<a></a>");
				motcle.addClass("motcle").attr("value", json.motcles[i].idMotCle).text(json.motcles[i].motcle);
				mc.append(motcle);
				motcle.on("click", function(){ recherche.SetRecherche($(this).text()); });
		}

		var title = $("<div></div>");
			title.addClass("article_title").text(json.titre);

		infos.append(type).append(author).append(date);
		insert.append(title).append(infos).append(mc);
		$(this.settings.bloc).append(insert);
	},

	/**
	 * Méthode BuildContent
	 * Construction du contenu de l'article
	 */
	BuildContent: function(){
		var json = this.settings.data;
		var insert = $("<div></div>");
			insert.addClass("article_content").html(json.article);
		$(this.settings.bloc).append(insert);

		insert.height($(this.settings.bloc).outerHeight(true) - ($(this.settings.blocCmd).outerHeight(true)));
	},

	/**
	 * Méthode BuildContent
	 * Construction du contenu de l'article
	 */
	BuildCommands: function(){
		this.BuildAccessibility();
		var t = this;
		var json = this.settings.data;

		// bouton de fermeture
		var btnClose = $("<button class='return_btn'>Retour</button>");
			btnClose.on("click", function(){ t.ClearArticle(); });
		$(this.settings.blocCmd).append(btnClose);

		// bouton de modification 
		var btnModif = $("<button>Modifier</button>");
			btnModif.attr("value", json.idArticle);
			btnModif.on("click", function(){ 
				$('#article .article_content').redactor({ focus: true });
			});
		$(this.settings.blocCmd).append(btnModif);

		$("#accessibility .btn_access_fontSize.smallFont").on("click", function(){
			var fs = t.settings.fontSize;
			fs = (fs - .1 > t.settings.minFontSize) ? fs - .1 : fs;
			t.settings.fontSize = fs;
			$("#article .article_content").css("font-size", fs + "em");
		});
		$("#accessibility .btn_access_fontSize.mediumFont").on("click", function(){
			t.settings.fontSize = 1;
			$("#article .article_content").css("font-size", t.settings.fontSize + "em");
		});
		$("#accessibility .btn_access_fontSize.largeFont").on("click", function(){
			var fs = t.settings.fontSize;
			fs = (fs + .1 < t.settings.maxFontSize) ? fs + .1 : fs;
			t.settings.fontSize = fs;
			$("#article .article_content").css("font-size", fs + "em");
		});
	},

	/**
	 * Méthode ClearArticle
	 * Suppression des infos de l'article dans l'IHM
	 */
	ClearArticle: function(){
		this.settings.data = null;
		$("#informations").children().remove();
		$("#article").css({"position": "absolute", "margin": 0}).animate({"left":5000}, 500, function(){ $(this).css({"position": "static","left":0, "margin": "5px"}).children().remove(); });
		$("#logos").css("opacity", 0).show().animate({"opacity": 1}, 1000);
	},

	/*
	* Méthode BuildAccessibility
	* Construction du bloc d'accessibilité
	*/
	BuildAccessibility: function(){
		var insert = $("<ul id='accessibility'><li class='btn_access_fontSize smallFont'></li><li class='btn_access_fontSize mediumFont'></li><li class='btn_access_fontSize largeFont'></li></ul>");
		$(this.settings.blocCmd).append(insert);
	}
}

var articleContent;
$(document).ready(function(){
	articleContent = new Article();
});