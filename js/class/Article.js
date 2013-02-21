function Article(){
	this.settings = {
		bloc: "#article",
		blocCmd: "#informations",
		data: null
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
		this.BuildTitle();
		this.BuildContent();
		this.BuildCommands();
	},

	/**
	 * Méthode BuildTitle
	 * Construction de l'en-tête de l'article
	 */
	BuildTitle: function(){
		var json = this.settings.data;
		var insert = $("<div></div>");
			insert.addClass("article_header");

		var title = $("<div></div>");
			title.addClass("article_title").text(json.titre);

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
	},

	/**
	 * Méthode BuildContent
	 * Construction du contenu de l'article
	 */
	BuildCommands: function(){
		var json = this.settings.data;
		var insert = $("<button></button>");
			insert.attr("value", json.idArticle).text("Modifier");
			insert.on("click", function(){ alert("Modification de l'article"); });
		$(this.settings.blocCmd).append(insert);
	}
}

var articleContent;
$(document).ready(function(){
	articleContent = new Article();
});