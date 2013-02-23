function Navigation(options){
	this.s = {
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
		this.UI.Clear(this);
		this.GetNavigation();
	},

	/**
	 * Méthode AttachEvents
	 * Méthode d'attachement des évènements associé aux éléments de la class Navigation
	 */
	// AttachEvents: function(){ },

	/**
	 * Méthode GetNavigation
	 * Créer le contenu de la navigation
	 */
	GetNavigation: function(){
		var idPortail = portail.s.data.idPortail;
		var lvl = "01";

		if(user.CheckUserAccess(lvl)){

			if(idPortail != null){

				$.ajax({

					url: "phpforms/navigation.list.php",
					type: "POST",
					data: {idPortail:idPortail},
					datatype: "json",
					context: this

				}).done(function(msg){

					var json = $.parseJSON(msg);
					this.Data.SetJSON(this, json);
					this.UI.Populate(this);

				});
			}
		}
	},

	Action: {},



	/**
	 * Bloc Data
	 * Gère les éléments se rapportant aux données
	 */
	Data: {
		/**
		 * Méthode Data.SetJSON
		 * Gère la sauvegarde des données dans le JSON
		 * @param t:Contexte
		 * @param json:JSON 		données concernant la navigation
		 */
		SetJSON: function(t, json){
			t.s.data = json;
		}
	},



	/**
	 * Bloc UI
	 * Gestion les éléments se rapportant à l'UI
	 */
	UI: {
		/**
		 * Méthode UI.Clear
		 * Vide le bloc de navigation
		 * @param t:Contexte
		 */
		Clear: function(t){
			$(t.s.bloc).html(null);
		},

		/**
		 * Méthode UI.Build
		 * Peuple le bloc de navigation
		 * @param t:Contexte
		 */
		Populate: function(t){
			var categorie, article, insertCategorie, insertArticle;
			var lvl = "01";
			var content = $(t.s.bloc);

			if(t.s.data != null && user.CheckUserAccess(lvl)){

				var ul = $("<ul class='navigation_content'></ul>");
				content.append(ul);

				for(var i = 0; i < t.s.data.length; i++){
					categorie = t.s.data[i];
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
	/**
	 * Méthode ClearBloc
	 * Vider le bloc Navigation
	 */
	/*ClearBloc: function(){
		$(this.s.bloc).html(null);
	},*/

	/**
	 * Méthode BuildNavigation
	 * Affiche le contenu de navigation
	 */
	/*BuildNavigation: function(){
		var lvl = "01";
		if(user.CheckUserAccess(lvl)){
			if(this.s.data != null){
				var categorie, article, insertCategorie, insertArticle;
				var content = $(this.s.bloc);
				var ul = $("<ul class='navigation_content'></ul>");
				content.append(ul);

				for(var i = 0; i < this.s.data.length; i++){
					//insertCategorie = null;
					categorie = this.s.data[i];
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
	}*/
}

var navigation;