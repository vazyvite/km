function Recherche(options){
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
	 * Méthode GetRecherche
	 * Lance la recherche des articles
	 */
	GetResults: function(terms, show, fnCallback){
		var lvl = "list";
		var idPortail = Data.portail.data.idPortail;

		if(idPortail != null && CheckAccess(lvl)){

			$.ajax({

				url: "phpforms/results.list.php",
				type: "POST",
				data: {idPortail:idPortail, terms: terms },
				datatype: "json",
				context: this

			}).done(function(msg){

				if(msg != ""){
					var json = $.parseJSON(msg);

					if($.isArray(json)){

						if(show){
							this.Data.SetJSON(this, json);
							this.UI.Populate(this, terms);
						}

						($.isFunction(fnCallback)) ? fnCallback(json) : $.noop();

					}else{
						ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
					}

				}else{
					ui.Notify(Lang[user.GetLangue()].msg.error_no_result_title, Lang[user.GetLangue()].msg.error_no_result_msg, "error");
				}
			});
		}
	},


	/**
	 * Méthode SetRecherche
	 * Effectue une recherche à partir d'un terme
	 * @param terms:String 		terme à rechercher
	 */
	SetRecherche: function(terms){
		ui.recherche.ClearInput(ui, terms);
		this.GetResults(terms, true, $.noop());
	},


	Action: {
		/**
		 * Méthode Action.Reset
		 * Workflow de remise à zéro de l'interface de recherche
		 * @param t:Contexte
		 */
		Reset: function(t, json){
			t.Data.SetJSON(t, null);
			ui.recherche.Clear(ui);
		}
	},


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


	UI:{
		/**
		 * Méthode UI.Build
		 * Workflow de construction du bloc de recherche
		 * @param t:Contexte
		 */
		Build: function(t){
			ui.recherche.Clear(ui);
			t.UI.SearchInput(t);
		},


		/**
		 * Méthode UI.SearchInput
		 * Construction de l'input de recherche
		 * @param t:Context
		 */
		SearchInput: function(t){
			var lvl = "show";
			
			if(CheckAccess(lvl)){

				var insert = $("<div class='searchInput'><input type='search' value='' /></div>")
				$("#recherche").append(insert);

				$(".searchInput input").watermark(Lang[user.GetLangue()].lbl.search).bind("keyup change", function(){
					t.GetResults($(this).val(), true, $.noop());
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
			var lvl = "list";

			$(".searchResults ul").remove();

			if(terms != "" && CheckAccess(lvl)){

				$("#recherche").append($("<div class='searchResults'><ul></ul></div>"));

				if(Data.recherche.data.length){

					for(var i = 0; i < Data.recherche.data.length; i++){
						var article = Data.recherche.data[i];
						$(".searchResults ul").append($("<li value='" + article.idArticle + "' class='result_article link_article'>" + article.titre + "</li>"));
					}

					$(".link_article").off("click").on("click", function(){ 
						event.stopPropagation();
						articleContent.LoadArticle($(this).attr("value"), false);
					});

				}else{
					$(".searchResults ul").append($("<li class='result_null'>" + Lang[user.GetLangue()].lbl.no_result + "</li>"));
				}

			}
		}
	}
}

var recherche;