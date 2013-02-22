function Recherche(options){
	this.settings = {
		bloc: "#recherche",
		data: null,
		minCharToStartSearch: 0,
		input: "searchInput"
	};

	this.Init();
}

Recherche.prototype = {
	
	/**
	 * Méthode Init
	 * Méthode d'initialisation de la class Recherche
	 */
	Init: function(){
		this.Build();
	},

	/**
	 * Méthode AttachEvents
	 * Méthode d'attachement des évènements associé aux éléments de la class Recherche
	 */
	AttachEvents: function(){
		var t = this;

		$("." + this.settings.input + " input").bind("keyup change", function(){
			t.GetResults($(this).val());
		});
	},

	/**
	 * Méthode Build
	 * Construction du bloc de recherche
	 */
	Build: function(){
		this.BuildInput();
		this.BuildResults();
		this.AttachEvents();
	},

	/**
	 * Méthode BuildInput
	 * Construction du bloc de recherche
	 */
	BuildInput: function(){
		var insert = $("<div class='" + this.settings.input + "'><input type='search' value='' /></div>")
		$(this.settings.bloc).append(insert);

		$("." + this.settings.input + " input").watermark("Recherche");
	},

	/**
	 * Méthode BuildResults
	 * Construction du bloc de recherche
	 */
	BuildResults: function(){
		var insert = $("<div class='searchResults'><ul></ul></div>")
		$(this.settings.bloc).append(insert);
	},

	/**
	 * Méthode GetRecherche
	 * Lance la recherche des articles
	 */
	GetResults: function(terms){
		var idPortail = portail.settings.data.idPortail;

		if(idPortail != null){
			$.ajax({
				url: "phpforms/results.list.php",
				type: "POST",
				data: {idPortail:idPortail, terms: terms },
				datatype: "json",
				context: this
			}).done(function(msg){
				var json = $.parseJSON(msg);
				this.settings.data = json;
				this.DrawResults(terms);
			});
		}
	},

	/**
	 * Méthode DrawResults
	 * 
	 */
	DrawResults: function(terms){
		$(".searchResults ul").html(null);
		if(terms != ""){
			if(this.settings.data.length > 0){
				for(var i = 0; i < this.settings.data.length; i++){
					var article = this.settings.data[i];
					var insert = $("<li value='" + article.idArticle + "' class='result_article link_article'>" + article.titre + "</li>");
					$(".searchResults ul").append(insert);
				}

				$(".link_article").off("click").on("click", function(){ 
					event.stopPropagation();
					articleContent.LoadArticle($(this).attr("value"));
				});

			}else{
				var insert = $("<li class='result_null'>aucun résultat</li>");
				$(".searchResults ul").append(insert);
			}
		}else{
			
		}
	},

	/**
	 * Méthode SetRecherche
	 * Force la recherche à partir d'un terms
	 * @param terms:String 		terme à rechercher
	 */
	SetRecherche: function(terms){
		$.watermark.hide("." + this.settings.input);
		$("." + this.settings.input + " input").val(terms);
		this.GetResults(terms);
	}
}

var recherche;
$(document).ready(function(){
	recherche = new Recherche();
});