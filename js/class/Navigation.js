function Navigation(options){
	this.settings = {
		bloc: "#navigation",
		data: null
	};

	this.Init();
}
Navigation.prototype = {

	/**
	 * Méthode Init
	 * Méthode d'initialisation de la class Navigation
	 */
	Init: function(){
		this.ClearBloc();
		this.AttachEvents();
		this.GetNavigation();
	},

	/**
	 * Méthode AttachEvents
	 * Méthode d'attachement des évènements associé aux éléments de la class Navigation
	 */
	AttachEvents: function(){
		
	},

	/**
	 * Méthode BuildNavigation
	 * Créer le contenu de la navigation
	 */
	GetNavigation: function(){
		var idPortail = portail.settings.data.idPortail;

		if(idPortail != null){
			$.ajax({
				url: "phpforms/navigation.list.php",
				type: "POST",
				data: {idPortail:idPortail},
				datatype: "json",
				context: this
			}).done(function(msg){
				var json = $.parseJSON(msg);
				this.settings.data = json;
				this.BuildNavigation();
			});
		}
	},

	/**
	 * Méthode ClearBloc
	 * Vider le bloc Navigation
	 */
	ClearBloc: function(){
		$(this.settings.bloc).html(null);
	},

	/**
	 * Méthode BuildNavigation
	 * Affiche le contenu de navigation
	 */
	BuildNavigation: function(){
		if(this.settings.data != null){
			var categorie, article, insertCategorie, insertArticle;
			var content = $(this.settings.bloc);
			var ul = $("<ul class='navigation_content'></ul>");
			content.append(ul);

			for(var i = 0; i < this.settings.data.length; i++){
				//insertCategorie = null;
				categorie = this.settings.data[i];
				insertCategorie = $("<li class='categorie_title off'><span>" + categorie.categorie + "</span><ul class='categorie_articles'></ul></li>");

				for(var j = 0; j < categorie.articles.length; j++){
					insertArticle = null;
					article = categorie.articles[j];
					insertArticle = $("<li class='categorie_article link_article' value='" + article.idArticle + "'>" + article.titre + "</li>");
					insertCategorie.find("ul.categorie_articles").append(insertArticle);
				}
				
				content.find("ul.navigation_content").append(insertCategorie);
			}

			$(".categorie_title").on("click", function(){
				var articles = $(this).find(".categorie_articles");
				if(articles.is(":visible")){
					$(this).removeClass("on").addClass("off");
					articles.hide(200);
				}else{
					$(this).removeClass("off").addClass("on");
					articles.show(200);
				}
			});

			$(".categorie_article").on("click", function(event){
				event.stopPropagation();
				articleContent.LoadArticle($(this).attr("value"));
			});
			
		}
	}
}

var navigation;