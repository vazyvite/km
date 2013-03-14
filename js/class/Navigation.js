function Navigation(options){
	this.Init();
}
Navigation.prototype = {

	/**
	 * Méthode Init
	 * Méthode d'initialisation de la class Navigation
	 */
	Init: function(){
		ui.navigation.Clear(ui);
		this.GetNavigation(true);
	},


	/**
	 * Méthode GetNavigation
	 * Créer le contenu de la navigation
	 * @param show:Boolean 			indique si on affiche le résultat de la requête Ajax
	 * @param fnCallback:Function 	fonction de callback [optionnelle]
	 */
	GetNavigation: function(show, fnCallback){
		var lvl = "list";
		var idPortail = Data.portail.data.idPortail;

		if(CheckAccess(lvl)){

			if(idPortail != null){

				$.ajax({

					url: "phpforms/navigation.list.php",
					type: "POST",
					data: { idPortail:idPortail },
					datatype: "json",
					context: this

				}).done(function(msg){

					if(msg != ""){
						var json = $.parseJSON(msg);

						if($.isArray(json)){

							if(show){
								this.Data.SetJSON(this, json);
								this.UI.Populate(this);
							}

							($.isFunction(fnCallback)) ? fnCallback(json) : $.noop();

						}else{
							ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
						}

					}else{
						ui.Notify(Lang[user.GetLangue()].msg.error_no_category_title, Lang[user.GetLangue()].msg.error_no_category_msg, "error");
					}
				});
			}
		}
	},


	/**
	 * Méthode Update
	 * Met à jour une categorie
	 * @param data:JSON 		données correspondant à la categorie à modifier
	 * @param isAdmin:Boolean 	indique si la page d'administration doit être rechargée après le traitement
	 */
	Update: function(data, isAdmin){
		$.ajax({

			url: "phpforms/categorie.update.php",
			type: "POST", 
			context: this,
			data: { idCategorie: data.id, idPortail: data.idPortail, categorie: data.categorie, description: data.description }

		}).done(function(msg){

			if(msg == ""){
				if(isAdmin){
					this.Action.Administration(this);
					ui.Notify(Lang[user.GetLangue()].msg.success_update_category_title, Lang[user.GetLangue()].msg.success_update_category_msg, "success");
				}
			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
			}

			ui.navigation.Refresh(ui, true, null);
		});
	},


	/**
	 * Méthode Delete
	 * Supprime une catégorie
	 * @param id:Int 		Identifiant de la catégorie à supprimer
	 * @param id:Boolean 	Indique s'il faut recharger l'UI de l'Admin après le traitement
	 */
	Delete: function(id, isAdmin){

		$.ajax({

			url: "phpforms/categorie.delete.php",
			type: "POST", 
			context: this,
			data: { idCategorie: id }

		}).done(function(msg){

			if(msg == ""){
				if(isAdmin){
					this.Action.Administration(this);
					ui.Notify(Lang[user.GetLangue()].msg.success_delete_category_title, Lang[user.GetLangue()].msg.success_delete_category_msg, "success");
				}

			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
			}

			ui.navigation.Refresh(ui, true, null);
		});
	},


	/**
	 * Méthode Create
	 * Créé une catégorie
	 * @param id:Int 			Identifiant de la catégorie à supprimer
	 * @param isAdmin:Boolean 	Indique s'il faut recharger l'UI d'Admin après le traitement
	 */
	Create: function(data, isAdmin){

		$.ajax({

			url: "phpforms/categorie.create.php",
			type: "POST", 
			context: this,
			data: { categorie: data.categorie, idPortail: data.idPortail, description: data.description }

		}).done(function(msg){

			if(msg == ""){

				if(isAdmin){
					this.Action.Administration(this);
					ui.Notify(Lang[user.GetLangue()].msg.success_create_category_title, Lang[user.GetLangue()].msg.success_create_category_msg, "success");
				}

			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
			}

			ui.navigation.Refresh(ui, true, null);
		});
	},


	Action: {
		/**
		 * Méthode Action.Reset
		 * Workflow de remise à zéro de l'interface de navigation
		 * @param t:Contexte
		 * @param json:JSON 	données des catégories
		 */
		Reset: function(t, json){
			t.Data.SetJSON(t, null);
			ui.navigation.Clear(ui);
		},


		/**
		 * Méthode Action.Administration
		 * Gestion des Catégories
		 * @param t:Contexte
		 */
		Administration: function(t){
			ui.article.Clear(ui);

			var portails = portail.GetAllPortail(false, function(json){

				var list = Array();
				$.each(json, function(index){
					list.push( {id: json[index].id, name: json[index].portail} );
				});

				t.GetNavigation(false, function(json){
					admin.BuildAdmin(json, t.Data.GetDataStructureCategorie(t, "admin", json, list), Lang[user.GetLangue()].lbl.admin_categorie, "categorie");
					menu.UI.BuildAdminCategorie(menu);
				});
			});
		},


		/**
		 * Méthode Action.Create
		 * Création de Catégories
		 * @param t:Contexte
		 * @param caller:jQueryObject 	indique l'élément jquery appelant de la méthode
		 */
		Create: function(t, caller){			
			var portails = portail.GetAllPortail(false, function(json){

				var list = Array();
				$.each(json, function(index){
					list.push( {id: json[index].id, name: json[index].portail} );
				});

				var strTab = t.Data.GetDataStructureCategorie(t, "create", json, list);

				popin = new Popin(t.Data.PopinDataCategorieCreate(t, caller, strTab), strTab, null);
			});
		}
	},


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


		/**
		 * Méthode Data.PopinDataCategorieEdit
		 * Gère les données nécessaires à la création de la popin d'édition des catégories
		 * @param t:Contexte
		 * @param json:JSON 		données concernant les catégories
		 * @param str:Array 		structure des données des catégories
		 * @return :JSON 		 	Données de la popin d'édition des catégories
		 */
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

					if(verifyData(data)) {
						t.Update(data, ($(".admin_title").size()) ? true : false);
						popin.Action.Hide(popin);
					}
					// if(data.id != "" && data.portail != "" && data.categorie != "" && data.description != ""){ t.Update(data); popin.Action.Hide(popin); }
				},
				onCancel: null, lvlRequise: "admin", closeBtn: true, type: "categorie"
			};
		},


		/**
		 * Méthode Data.PopinDataCategorieDel
		 * Gère les données nécessaires à la création de la popin de suppression des catégories
		 * @param t:Contexte
		 * @param json:JSON 		données concernant les catégories
		 * @return :JSON 			donneés de la popin de suppression des catégories
		 */
		PopinDataCategorieDel: function(t, json){
			return {
				title: Lang[user.GetLangue()].msg.confirm_delete_object + "<input class='p_ID' type='hidden' value='" + json.id + "' />",
				content: "", cmd: ["valide", "cancel"],
				onValidate: function(){
					var id = $(".popin").find(".p_ID").val();

					if(id != ""){ 
						t.Delete(id, ($(".admin_title").size()) ? true : false);
						popin.Action.Hide(popin);
					}
				},
				onCancel: null, lvlRequise: "admin", closeBtn: false, type: "categorie"
			};
		},


		/**
		 * Méthode Data.PopinDataCategorieCreate
		 * Gère les données nécessaires à la création de la popin de création des catégories
		 * @param t:Contexte
		 * @param caller:jQueryObject 	objet jquery appelant de la méthode
		 * @param str:Array 			structure des données des catégories
		 * @return :JSON 				données de la popin de création des catégories
		 */
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

					if(verifyData(data)) {
						navigation.Create(data, ($(".admin_title").size()) ? true : false);
						popin.Action.Hide(popin);
					}
				},
				onCancel: null, lvlRequise: "admin", closeBtn: false, type: "categorie", caller: caller
			};
		},


		/**
		 * Méthode Data.GetDataStructureCategorie
		 * Gère les données nécessaires à la création de la popin de création des catégories
		 * @param t:Contexte
		 * @param type:String 		indique le contexte des données (admin | create)
		 * @param json:JSON 		structure des données des catégories
		 * @param list:Array 		liste de portails existants
		 * @return :JSON 			données de structure des popins de catégorie
		 */
		GetDataStructureCategorie: function(t, type, json, list){
			var str;

			switch(type){
				case "admin":
					str = [
					{ title: Lang[user.GetLangue()].lbl.form_id, key: "id", width: 10, lim: null, editable: false }, 
					{ title: Lang[user.GetLangue()].lbl.form_categorie, key: "categorie", width: 20, lim: 25, editable: true },
					{ title: Lang[user.GetLangue()].lbl.form_portail, key: "idPortail", width: 20, lim: 25, editable: true, list: list },
					{ title: Lang[user.GetLangue()].lbl.form_description, key: "description", width: null, lim: 256, editable: true }, 
					{ title: Lang[user.GetLangue()].lbl.form_nb_article, key: "articles", width: 10, lim: null, editable: false }, 
					{ title: Lang[user.GetLangue()].lbl.form_action, key: null, width: null, lim: null, editable: false }];
					break;

				case "create":
					str = [
					{ title: Lang[user.GetLangue()].lbl.form_categorie, key: "categorie", width: 20, lim: 25, editable: true },
					{ title: Lang[user.GetLangue()].lbl.form_portail, key: "idPortail", width: 20, lim: 25, editable: true, list: list },
					{ title: Lang[user.GetLangue()].lbl.form_description, key: "description", width: null, lim: 256, editable: true }, 
					{ title: Lang[user.GetLangue()].lbl.form_action, key: null, width: null, lim: null, editable: false }];
					break;

				default: break;
			}

			return str;
		}
	},


	UI: {
		/**
		 * Méthode UI.Build
		 * Peuple le bloc de navigation
		 * @param t:Contexte
		 */
		Populate: function(t){
			var lvl = "list";
			var categorie, article;
			var content = $("#navigation");

			if(Data.navigation.data != null && CheckAccess(lvl)){

				ui.navigation.Clear(ui);

				var ul = $("<ul></ul>").addClass("navigation_content");
				content.append(ul);
				
				for(var i = 0; i < Data.navigation.data.length; i++){
					categorie = Data.navigation.data[i];

					if(categorie.articles.length){
						var insCat = $("<li class='categorie_title off'><span>" + categorie.categorie + "</span><ul class='categorie_articles'></ul><li>");

						for(var j = 0; j < categorie.articles.length; j++){
							article = categorie.articles[j];
							var insArt = $("<li></li>").addClass("categorie_article link_article").attr("value", article.idArticle).text(article.titre);
							insCat.find(".categorie_articles").append(insArt);
						}
					}
					
					content.find(".navigation_content").append(insCat);
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
					articleContent.LoadArticle($(this).attr("value"), false);
				});
			}
		}
	}
}

var navigation;