function Recherche(options){
	this.s = {
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
		this.UI.Build(this);
	},

	/**
	 * Méthode AttachEvents
	 * Méthode d'attachement des évènements associé aux éléments de la class Recherche
	 */
	// AttachEvents: function(){},

	/**
	 * Méthode GetRecherche
	 * Lance la recherche des articles
	 */
	GetResults: function(terms){
		var lvl = "01";
		var idPortail = Data.portail.data.idPortail;

		if(idPortail != null && user.CheckUserAccess(lvl)){

			$.ajax({

				url: "phpforms/results.list.php",
				type: "POST",
				data: {idPortail:idPortail, terms: terms },
				datatype: "json",
				context: this

			}).done(function(msg){

				var json = $.parseJSON(msg);
				this.Data.SetJSON(this,json);
				this.UI.Populate(this,terms);

			});
		}
	},

	/**
	 * Méthode SetRecherche
	 * Force la recherche à partir d'un terms
	 * @param terms:String 		terme à rechercher
	 */
	SetRecherche: function(terms){
		$.watermark.hide("." + this.s.input);
		$("." + this.s.input + " input").val(terms);
		this.GetResults(terms);
	},



	/**
	 * Bloc Action
	 * Gère les éléments d'actions
	 */
	Action: {
		/**
		 * Méthode Action.Reset
		 * Workflow de remise à zéro de l'interface de recherche
		 * @param t:Contexte
		 */
		Reset: function(t, json){
			t.Data.SetJSON(t, null);
			t.UI.Reset(t);
		}
	},



	/**
	 * Bloc Data
	 * Gère les éléments de données
	 */
	Data: {
		/**
		 * Méthode Data.SetJSON
		 * Sauve les données de recherche dans le JSON
		 * @param t:Contexte
		 * @param json:JSON 		données de recherche
		 */
		SetJSON: function(t, json){
			Data.recherche.data = json;
		}
	},



	/**
	 * Bloc UI
	 * Gère les éléments d'UI
	 */
	UI:{
		/**
		 * Méthode UI.Build
		 * Workflow de construction du bloc de recherche
		 * @param t:Contexte
		 */
		Build: function(t){
			t.UI.Reset(t);
			t.UI.SearchInput(t);
		},

		/**
		 * Méthode UI.SearchInput
		 * Construction de l'input de recherche
		 */
		SearchInput: function(t){
			var lvl = "01";
			
			if(user.CheckUserAccess(lvl)){

				var insert = $("<div class='" + t.s.input + "'><input type='search' value='' /></div>")
				$(t.s.bloc).append(insert);

				$("." + t.s.input + " input").watermark(Lang[user.GetLangue()].lbl.search).bind("keyup change", function(){
					t.GetResults($(this).val());
				});
			}
		},

		/**
		 * Méthode UI.Populate
		 * Peuplement du bloc de résulats  de recherche
		 * @param t:Contexte
		 * @param terms:String		élément recherché
		 */
		Populate: function(t, terms){
			var lvl = "01";

			$(".searchResults ul").remove();

			if(terms != "" && user.CheckUserAccess(lvl)){
				var insert = $("<div class='searchResults'><ul></ul></div>")
				$(t.s.bloc).append(insert);

				if(Data.recherche.data.length > 0){

					for(var i = 0; i < Data.recherche.data.length; i++){
						var article = Data.recherche.data[i];
						var insert = $("<li value='" + article.idArticle + "' class='result_article link_article'>" + article.titre + "</li>");
						$(".searchResults ul").append(insert);
					}

					$(".link_article").off("click").on("click", function(){ 
						event.stopPropagation();
						articleContent.LoadArticle($(this).attr("value"));
					});

				}else{
					var insert = $("<li class='result_null'>" + Lang[user.GetLangue()].lbl.no_result + "</li>");
					$(".searchResults ul").append(insert);
				}

			}
		},

		/**
		 * Méthode UI.Reset
		 * Remise à zero de l'interface de recherche
		 * @param t:Contexte
		 */
		Reset: function(t){
			$(t.s.bloc).children().remove();
		},
	}
}

var recherche;