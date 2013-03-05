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
		this.GetNavigation(true);
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
	GetNavigation: function(show, fnCallback){
		var idPortail = Data.portail.data.idPortail;
		var lvl = "list";

		if(CheckAccess(lvl)){

			if(idPortail != null){

				$.ajax({

					url: "phpforms/navigation.list.php",
					type: "POST",
					data: {idPortail:idPortail},
					datatype: "json",
					context: this

				}).done(function(msg){

					var json = $.parseJSON(msg);

					if(show){

						this.Data.SetJSON(this, json);
						this.UI.Populate(this);

					}else{
						fnCallback(json);
					}
				});
			}
		}
	},

	/**
	 * Méthode Update
	 * Met à jour une categorie
	 * @param data:JSON 	données correspondant à la categorie à modifier
	 */
	Update: function(data){
		$.ajax({

			url: "phpforms/categorie.update.php",
			type: "POST", 
			context: this,
			data: { idCategorie: data.id, idPortail: data.idPortail, categorie: data.categorie, description: data.description }

		}).done(function(msg){
			this.Action.Administration(this);
			this.GetNavigation(true, null)
		});
	},

	/**
	 * Méthode Delete
	 * Supprime une catégorie
	 * @param id:Int 	Identifiant de la catégorie à supprimer
	 */
	Delete: function(id){

		$.ajax({

			url: "phpforms/categorie.delete.php",
			type: "POST", 
			context: this,
			data: {idCategorie: id}

		}).done(function(msg){
			this.Action.Administration(this);
		});
	},

	/**
	 * Méthode Create
	 * Créé une catégorie
	 * @param id:Int 	Identifiant de la catégorie à supprimer
	 */
	Create: function(data){

		$.ajax({

			url: "phpforms/categorie.create.php",
			type: "POST", 
			context: this,
			data: { categorie: data.categorie, idPortail: data.idPortail, description: data.description }

		}).done(function(msg){
			navigation.GetNavigation(true, null);
		});
	},



	/**
	 * Bloc Action
	 * Gère les éléments d'actions
	 */
	Action: {
		/**
		 * Méthode Action.Reset
		 * Workflow de remise à zéro de l'interface de navigation
		 * @param t:Contexte
		 */
		Reset: function(t, json){
			t.Data.SetJSON(t, null);
			t.UI.Reset(t);
		},

		/**
		 * Méthode Action.AdministrationCategorie
		 * Gestion des Catégories
		 * @param t:Contexte
		 */
		Administration: function(t){
			articleContent.UI.Clear(articleContent);
			var list = Array();

			var portails = portail.GetAllPortail(false, function(json){
				$.each(json, function(index){
					list.push({id: json[index].id, name: json[index].portail});
				});

				var strTabCategorie = [
				{ title: Lang[user.GetLangue()].lbl.form_id, key: "id", width: 10, lim: null, editable: false }, 
				{ title: Lang[user.GetLangue()].lbl.form_categorie, key: "categorie", width: 20, lim: 25, editable: true },
				{ title: Lang[user.GetLangue()].lbl.form_portail, key: "idPortail", width: 20, lim: 25, editable: true, list: list },
				{ title: Lang[user.GetLangue()].lbl.form_description, key: "description", width: null, lim: 256, editable: true }, 
				{ title: Lang[user.GetLangue()].lbl.form_nb_article, key: "articles", width: 10, lim: null, editable: false }, 
				{ title: Lang[user.GetLangue()].lbl.form_action, key: null, width: null, lim: null, editable: false }];
				
				var data = t.GetNavigation(false, function(json){
					articleContent.Action.BuildAdmin(articleContent, json, strTabCategorie, Lang[user.GetLangue()].lbl.admin_categorie, "categorie");
					menu.UI.BuildAdminCategorie(menu);
				});
			});
		},

		/**
		 * Méthode Action.Create
		 * Création de Catégories
		 * @param t:Contexte
		 */
		Create: function(t, caller){
			// articleContent.UI.Clear(articleContent);
			var list = Array();

			var portails = portail.GetAllPortail(false, function(json){
				$.each(json, function(index){
					list.push( {id: json[index].id, name: json[index].portail} );
				});

				var strTab = [
				{ title: Lang[user.GetLangue()].lbl.form_categorie, key: "categorie", width: 20, lim: 25, editable: true },
				{ title: Lang[user.GetLangue()].lbl.form_portail, key: "idPortail", width: 20, lim: 25, editable: true, list: list },
				{ title: Lang[user.GetLangue()].lbl.form_description, key: "description", width: null, lim: 256, editable: true }, 
				{ title: Lang[user.GetLangue()].lbl.form_action, key: null, width: null, lim: null, editable: false }];
				
				popin = new Popin(t.Data.PopinDataCategorieCreate(t, caller, strTab), strTab, null);

			});

		}
	},



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
			Data.navigation.data = json;
		},

		PopinDataCategorieEdit: function(t, json, str){
			return {
				title: Lang[user.GetLangue()].lbl.modif + " " + json.categorie,
				content: "",
				cmd: ["valide", "cancel"],
				onValidate: function(){
					var p = $(".popin");
					var data = {
						id: p.find(".p_" + str[0].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),
						idPortail: p.find(".p_" + str[2].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),
						categorie: p.find(".p_" + str[1].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),
						description: p.find(".p_" + str[3].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),
					}
					if(data.id != "" && data.portail != "" && data.categorie != "" && data.description != ""){ t.Update(data); popin.Action.Hide(popin); }
				},
				onCancel: null, lvlRequise: "admin", closeBtn: true, type: "categorie"
			};
		},

		PopinDataCategorieDel: function(t, json){
			return {
				title: Lang[user.GetLangue()].msg.confirm_delete_object + "<input class='p_ID' type='hidden' value='" + json.id + "' />",
				content: "", cmd: ["valide", "cancel"],
				onValidate: function(){
					var p = $(".popin");
					var id = p.find(".p_ID").val();
					if(id != ""){ t.Delete(id); popin.Action.Hide(popin); }
				},
				onCancel: null, lvlRequise: "admin", closeBtn: false, type: "categorie"
			};
		},

		PopinDataCategorieCreate: function(t, caller, str){
			return {
				title: Lang[user.GetLangue()].lbl.object_create,
				content: "", cmd: ["valide", "cancel"],
				onValidate: function(){
					var p = $(".popin");
					var data = {
						categorie: p.find(".p_" + str[0].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),
						idPortail: p.find(".p_" + str[1].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),
						description: p.find(".p_" + str[2].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val() }

					if(data.categorie != "" && data.idPortail != "" && data.description != ""){ navigation.Create(data); popin.Action.Hide(popin); }
				},
				onCancel: null, lvlRequise: "admin", closeBtn: false, type: "categorie", caller: caller
			};
		},
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
			var lvl = "list";
			var content = $(t.s.bloc);

			if(Data.navigation.data != null && CheckAccess(lvl)){

				var ul = $("<ul class='navigation_content'></ul>");
				content.children().remove();
				content.append(ul);

				for(var i = 0; i < Data.navigation.data.length; i++){
					categorie = Data.navigation.data[i];

					if(categorie.articles.length){
						insertCategorie = $("<li class='categorie_title off'><span>" + categorie.categorie + "</span><ul class='categorie_articles'></ul></li>");

						for(var j = 0; j < categorie.articles.length; j++){
							insertArticle = null;
							article = categorie.articles[j];
							insertArticle = $("<li class='categorie_article link_article' value='" + article.idArticle + "'>" + article.titre + "</li>");
							insertCategorie.find("ul.categorie_articles").append(insertArticle);
						}
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
		},

		/**
		 * Méthode UI.Reset
		 * Remise à zero de l'interface de navigation
		 * @param t:Contexte
		 */
		Reset: function(t){
			$(t.s.bloc).children().remove();
		}
	}
}

var navigation;