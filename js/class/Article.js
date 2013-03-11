function Article(){
	this.s = {
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
		
	},

	/**
	 * Méthode LoadArticle
	 * Charge un article à partir de son identifiant et lance la construction de l'article
	 * @param id:Int 		Identifiant de l'article à charger
	 */
	LoadArticle: function(id){
		$.ajax({

			url: "phpforms/article.show.php",
			type: "POST",
			data: { idArticle:id },
			datatype: "json",
			context: this

		}).done(function(msg){

			if(msg != ""){

				var json = $.parseJSON(msg);

				if($.isArray(json)){

					this.Data.SetJSON(this, json);
					this.UI.Build(this, json);

				}else{
					ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
				}

			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_no_article_title, Lang[user.GetLangue()].msg.error_no_article_msg, "error");
			}
		});
	},


	/**
	 * Méthode GetArticleByUser
	 * Récupère tous les articles d'un utilisateur pour un portail donné
	 * @param iduser:Int 		Identifiant de l'utilisateur courant
	 * @param idPortail:Int 	Identifiant du portail courant, dans le cas où il n'y a pas de portail courant, idPortail doit valloir null
	 */
	GetArticleByUser: function(iduser, idPortail){
		$.ajax({

			url: "phpforms/article.listUser.php",
			type: "POST",
			data: {idUser:iduser, idPortail: idPortail},
			datatype: "json",
			context: this

		}).done(function(msg){

			if(msg != ""){

				var json = $.parseJSON(msg);

				if($.isArray(json)){

					this.UI.BuildHome(this, json);

				}else{
					ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
				}

			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_no_article_title, Lang[user.GetLangue()].msg.error_no_article_msg, "error");
			}
		});
	},


	/**
	 * Méthode UpdateArticle
	 * Met à jour un article à partir des données courante d'édition
	 * @param data:JSON 		Données de l'article
	 */
	UpdateArticle: function(data){
		var idmc = Array();
		var mc = Array();

		for(var i = 0; i < data.motcles.length; i++){
			idmc.push(data.motcles[i].idMotCle);
			mc.push(data.motcles[i].motcle);
		}
		idmc = idmc.join(";");
		mc = mc.join(";");

		$.ajax({

			url: "phpforms/article.update.php",
			type: "POST",
			data: { idArticle:data.idArticle, titre:data.titre, content:data.article, idmotcles:idmc, motcles:mc },
			datatype: "json",
			context: this

		}).done(function(msg){

			if(msg != ""){

				var json = $.parseJSON(msg);

				if($.isArray(json)){

					this.LoadArticle(Data.article.data.idArticle);
					navigation.GetNavigation(true, $.noop());
					ui.Notify(Lang[user.GetLangue()].msg.success_update_article_title, Lang[user.GetLangue()].msg.success_update_article_msg, "success");

				}else{
					ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
				}

			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_update_article_title, Lang[user.GetLangue()].msg.error_update_article_msg, "error");
			}
		});
	},


	/**
	 * Méthode Delete
	 * Supprime un article en base
	 * @param data:JSON 		Données de l'article
	 */
	Delete: function(data){

		$.ajax({

			url: "phpforms/article.delete.php",
			type: "POST",
			data: { idArticle:data },
			datatype: "json",
			context: this

		}).done(function(msg){

			if(msg == ""){

				var json = $.parseJSON(msg);

				if($.isArray(json)){

					navigation.GetNavigation(true, null);
					ui.article.Clear(ui);

					ui.Notify(Lang[user.GetLangue()].msg.success_delete_article_title, Lang[user.GetLangue()].msg.success_delete_article_msg, "success");

				}else{
					ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
				}

			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_delete_article_title, Lang[user.GetLangue()].msg.error_delete_article_msg, "error");
			}
		});
	},


	/**
	 * Méthode Create
	 * Créé un article en base
	 * @param data:JSON 			Données de l'article
	 * @param fnCallback:Function	fonction de callback [optionnelle]
	 */
	Create: function(data, fnCallback){
		var mc = Array();
		for(var i = 0; i < data.motcles.length; i++){
			mc.push(data.motcles[i].motcle);
		}
		mc = mc.join(";");

		$.ajax({

			url: "phpforms/article.create.php",
			type: "POST",
			data: { titre: data.titre, idType: data.idType, idUser: data.idUser, idCategorie: data.idCategorie, article: data.article, motcles: mc },
			datatype: "json",
			context: this

		}).done(function(msg){
			
			if(msg != ""){

				if(!isNaN(parseInt(msg))){

					if($.isFunction(fnCallback)){ 
						fnCallback(msg);
					}
					ui.Notify(Lang[user.GetLangue()].msg.success_create_article_title, Lang[user.GetLangue()].msg.success_create_article_msg, "success");

				}else{
					ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
				}

			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_create_article_title, Lang[user.GetLangue()].msg.error_create_article_msg, "error");
			}
		});
	},


	/**
	 * Méthode GetAssociatedArticles
	 * Récupère les articles associés d'un article
	 * @param motcles:JSON 			Données de l'article
	 * @param fnCallback:Function	fonction de callback [optionnelle]
	 */
	GetAssociatedArticles: function(motcles, fnCallback){

		var mc = Array();
		for(var i = 0; i < motcles.length; i++){
			mc.push(motcles[i].motcle);
		}
		mc = mc.join(";");

		if(Data.article && Data.article.data && Data.article.data.idCategorie && mc.length){
			$.ajax({

				url: "phpforms/article.assoc.php",
				type: "POST",
				context: this,
				data: { idCategorie: Data.article.data.idCategorie, motcles: mc }

			}).done(function(msg){

				if(msg != ""){

					var json = $.parseJSON(msg);

					if(!$.isArray(json)){

						if($.isFunction(fnCallback)){
							fnCallback(json);
						}

					}else{
						ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
					}

				}else{
					ui.Notify(Lang[user.GetLangue()].msg.error_no_article_title, Lang[user.GetLangue()].msg.error_no_article_msg, "error");
				}
			});
		}
	},


	/**
	 * Méthode GetPortailForArticle
	 * Récupère le portail dans lequel se trouve l'article
	 * @param id_article:Int 	identifiant de l'article
	 * @param id_portail:Int 	identifiant du portail
	 */
	GetPortailForArticle: function(id_article, id_portail){

		if(!id_portail || id_portail == null || id_portail === 0){

			$.ajax({

				url: "phpforms/article.getPortail.php",
				type: "POST",
				context: this,
				data: { idArticle: id_article }

			}).done(function(msg){

				var idPortail = msg;

				if(idPortail != ""){

					if(!isNaN(parseInt(idPortail))){

						if(idPortail != Data.portail.data.idPortail){
							var json = {
								value: msg,
								text: $("#portail .menu_portail li[value='" + idPortail + "']").text()
							};

							portail.Action.Open(portail, json, function(){
								articleContent.LoadArticle(id_article);
							});
						}

					}else{
						ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
					}

				}else{
					ui.Notify(Lang[user.GetLangue()].msg.error_no_portail_title, Lang[user.GetLangue()].msg.error_no_portail_msg, "error");
				}
			});

		}else{
			articleContent.LoadArticle(id_article);
		}
	},


	Action: {
		/**
		 * Méthode Action.Edit
		 * Lance le workflow d'édition de l'article
		 * @param t:Contexte
		 * @param json:JSON 	données éditées
		 */
		Edit: function(t, json){
			var lvl = "edit";
			var article = $("#article");
			var infos = $("#informations");
			var arr_mc = Array();
			var data_mc;

			if(CheckAccess(lvl)){
				
				var gabarit = { 
					description: "<aside title='" + Lang[user.GetLangue()].lbl.desc_article + "'>description</aside>",
					syntaxe: "<section title='" + Lang[user.GetLangue()].lbl.syntaxe_code + "'><code>syntaxe</code></section>",
					article: "<article title='" + Lang[user.GetLangue()].lbl.corps_article + "'>corps de l'article</article>"
				};

				article.find('.article_content nav').remove();

				article.find('.article_content').unhighlight().redactor({
					focus: true,
					buttons: ['html', '|', 'formatting', 'button_template', 'button_syntaxe', 'button_resume', 'button_article', 'button_navigation', '|', 'bold', 'italic', 'underline', 'deleted', '|', 'fontcolor', 'backcolor', '|', 'alignment', '|', 'unorderedlist', 'orderedlist', 'indent', 'outdent', '|', 'link', 'image', 'video', 'file', 'table', '|', 'horizontalrule'],
					buttonsCustom: {
						button_template: {
							title: Lang[user.GetLangue()].btn.gabarit, 
							callback: function(obj, event, key) {
								if(article.find('.article_content').getCode() != ""){
									if(confirm(Lang[user.GetLangue()].msg.confirm_perte_infos)){
										article.find('.article_content').setCode(gabarit.description + gabarit.syntaxe + gabarit.article);
									}
								}else{
									article.find('.article_content').setCode(gabarit.description + gabarit.syntaxe + gabarit.article);
								}
							} 
						},
						button_syntaxe: {
							title: Lang[user.GetLangue()].btn.syntaxe, 
							callback: function(obj, event, key) {
								var c = article.find('.article_content');
								if(!c.find('section code').size()){
									c.insertHtml( (c.getSelected() == "") ? gabarit.syntaxe : gabarit.syntaxe.replace($(gabarit.syntaxe).text(), c.getSelected()));
								}else{
									ui.Notify(Lang[user.GetLangue()].msg.warning_add_bloc_syntax_title, Lang[user.GetLangue()].msg.warning_add_bloc_syntax_msg, "warning");
								}
							} 
						},
						button_resume: {
							title: Lang[user.GetLangue()].btn.resume, 
							callback: function(obj, event, key) {
								var c = article.find('.article_content');
								if(!c.find("aside").size()){
									c.insertHtml( (c.getSelected() == "") ? gabarit.description : gabarit.description.replace($(gabarit.description).text(), c.getSelected()));
								}else{
									ui.Notify(Lang[user.GetLangue()].msg.warning_add_bloc_description_title, Lang[user.GetLangue()].msg.warning_add_bloc_description_msg, "warning");
								}
							} 
						},
						button_article: {
							title: Lang[user.GetLangue()].btn.article, 
							callback: function(obj, event, key) {
								var c = article.find('.article_content');
								if(!c.find('article').size()){
									c.insertHtml( (c.getSelected() == "") ? gabarit.article : gabarit.article.replace($(gabarit.article).text(), c.getSelected()));
								}else{
									ui.Notify(Lang[user.GetLangue()].msg.warning_add_bloc_article_title, Lang[user.GetLangue()].msg.warning_add_bloc_article_msg, "warning");
								}
							} 
						}
           			 }
				});
				
				// if creation
				if(json && json.idArticle == -1){
					data_mc = (json.motcles && json.motcles.length) ? json.motcles : Array();

					article.find('.article_content').setCode(gabarit.description + gabarit.syntaxe + gabarit.article);

					var select = $("<select></select>").addClass('article_categorie_edit');
					for(var i = 0; i < Data.navigation.data.length; i++){
						var cat = Data.navigation.data[i];

						select.append($("<option value='" + cat.id + "' title='" + cat.description + "'>" + cat.categorie + "</option>"));
					}
					article.find(".article_title_edit").after(select);
					
				}else if(Data.article.data != null && Data.article.data.motcles && Data.article.data.motcles.length){
					data_mc = Data.article.data.motcles;

				}else{
					data_mc = Array();
				}

				for(var i = 0; i < data_mc.length; i++){
					var motcle = data_mc[i];
					arr_mc.push({id: motcle.idMotCle, name: motcle.motcle});
				}


				article.find('.article_title').replaceWith( "<input type='text' class='article_title_edit' value='" + article.find('.article_title').text() + "' />" );
				article.find('.article_listMotCles').replaceWith( "<input type='text' class='article_listMotCles_edit' value='' />" );
				article.find("input.article_listMotCles_edit").tokenInput(
					"phpforms/motcle.autocomplete.php", 
					{ 	method: "POST",
						prePopulate: arr_mc,
						preventDuplicates: true,
						theme: "facebook"
					}
		        );

				$(".article_title_edit").watermark(Lang[user.GetLangue()].lbl.title);

				infos.find("button.btn_modif, button.btn_pdf").hide();
				$("#accessibility").hide();

				if(json.idArticle != -1){
					infos.find('button.btn_create, button.btn_cancelCreate').hide();
					infos.find('button.btn_save, button.btn_cancel, button.btn_delete').show();
				}else{
					infos.find('button.btn_create, button.btn_cancelCreate').show();
					infos.find('button.btn_save, button.btn_cancel, button.btn_delete').hide();
				}
			}
		},


		/**
		 * Méthode Action.BuildCreate
		 * Lance le workflow de création de l'interface de création d'article
		 * @param t:Context
		 */
		BuildCreate: function(t){
			var lvl = "create";
			var article = $("#article");

			if(CheckAccess(lvl)){

				var json = {
					idArticle: -1,
					idType: 1,
					idUser: Data.user.data.idUser,
					type: "Article",
					user: Data.user.data.fstName + " " + Data.user.data.lstName,
					dateCreation: Lang[user.GetLangue()].lbl.now,
					titre: "",
					article: "",
					motcles: Array()
				};

				t.UI.Build(t, json);
				t.Action.Edit(t, json);
			}
		},


		/**
		 * Méthode Action.Create
		 * Lance le workflow de création d'article à partir des données issues du formulaire de création 
		 * @param t:Context
		 */
		Create: function(t){
			var lvl = "create";
			var article = $("#article");
			var motcle = Array();

			if(CheckAccess(lvl)){

				var data = {
					content: article.find(".article_content").getCode(),
					titre: article.find(".article_title_edit").val(),
					mc: article.find("input.article_listMotCles_edit").tokenInput("get"),
					categorie: article.find(".article_categorie_edit").val()
				};

				if(verifyData(data)){
					for(var i = 0; i < mc.length; i++){
						motcle.push({idArticle: -1, idMotCle: -1, motcle: data.mc[i].name});
					}

					var data = {
						idArticle: -1,
						idType: 1,
						idUser: Data.user.data.idUser,
						type: "Article",
						user: Data.user.data.fstName + " " + Data.user.data.lstName,
						dateCreation: Lang[user.GetLangue()].lbl.now,
						titre: data.titre,
						article: data.content,
						motcles: motcle,
						idCategorie: data.categorie
					};

					t.Create(data, function(idArticle){
						t.LoadArticle(idArticle);
						navigation.GetNavigation(true, $.noop());
					});
				}
			}
		},


		/**
		 * Méthode Action.Save
		 * Lance le workflow de sauvegarde de l'article
		 * @param t:Contexte
		 * @param isCancel:Boolean 		indique si l'action est un cancel ou une sauvegarde de la modification
		 */
		Save: function(t, isCancel){
			var lvl = "edit";
			var article = $("#article");
			var motcle = Array();

			if(CheckAccess(lvl)){
				
				var data = {
					content: article.find(".article_content").getCode(),
					titre: article.find(".article_title_edit").val(),
					mc: article.find("input.article_listMotCles_edit").tokenInput("get")
				};

				if(verifyData(data)){

					if(!isCancel){
						for(var i = 0; i < mc.length; i++){
							motcle.push({idArticle: Data.article.data.idArticle, idMotCle: mc[i].id, motcle: mc[i].name});
						}

						t.Data.Update(t, titre, content, motcle);
						t.UpdateArticle(Data.article.data);

					}else{
						article.find(".article_content").html(Data.article.data.article);
						article.find(".article_title").text(Data.article.data.titre);

						for(var i = 0; i < Data.article.data.motcles.length; i++){
							var motcle = Data.article.data.motcles[i];
							var insert = $("<a></a>").addClass("motcle").attr("value", motcle.idMotCle).text(motcle.motcle);
							article.find('.article_listMotCles').append(insert);

							insert.on("click", function(){ 
								recherche.SetRecherche($(this).text());
							});
						}

						t.LoadArticle(Data.article.data.idArticle);
					}
				}
			}
		},


		/** 
		 * Méthode Action.Delete
		 * Lance le workflow de suppression d'article
		 * @param t:Contexte
		 */
		Delete: function(t){
			var lvl = "delete";

			if(CheckAccess(lvl)){
				var str = {
					title: Lang[user.GetLangue()].msg.confirm_delete_object + "<input class='p_ID' type='hidden' value='" + Data.article.data.idArticle + "' />",
					content: "", cmd: ["valide", "cancel"],
					onValidate: function(){
						var id = $(".popin").find(".p_ID").val();
						if(id != ""){ 
							t.Delete(id);
							popin.Action.Hide(popin);
						}
					},
					onCancel: null, lvlRequise: lvl, closeBtn: false, type: "article"
				};
				popin = new Popin(str, null, null);
			}
		},


		/**
		 * Méthode Action.BuildAdmin
		 * Workflow de construction de la page d'administration
		 * @param t:Contexte
		 * @param json:JSON 			données concernant les portails
		 * @param strTab:Array[JSON] 	données concernant la structure du tableau
		 * @param titre:String 			titre de la popin
		 * @param type:String 			type de popin : domaine auquel elle s'applique (user | portail | categorie)
		 */
		/*BuildAdmin: function(t, json, strTab, titre, type){
			var lvl = "admin";
			var table = t.UI.TablePortail(t, strTab);

			if(table != null && CheckAccess(lvl)){
				for(var i = 0; i < json.length; i++){
					var line = t.UI.LinePortail(t, strTab, json[i], type);
					if(line != null){ table.find("tbody").append(line); }
				}

				t.UI.AdminTitle(t, titre);
				t.UI.AdminContent(t, table);
			}
		}*/
	},



	/**
	 * Bloc Data
	 * Gestion des éléments se rapportant aux données
	 */
	Data: {
		/**
		 * Méthode Data.SetJSON
		 * Sauve les données de l'article dans le JSON
		 * @param t:Contexte
		 * @param json:JSON 		données de l'article
		 */
		SetJSON: function(t, json){
			Data.article.data = json;
		},


		/**
		 * Méthode Data.Update
		 * Modifie les données JSON dans le cadre d'un Update
		 * @param t:Contexte
		 * @param titre:String 			titre de l'article
		 * @param content:String 		contenu de l'article
		 * @param motcle:String 		mots clés de l'article
		 */
		Update: function(t, titre, content, motcle){
			Data.article.data.titre = titre;
			Data.article.data.article = content;
			Data.article.data.motcles = motcle;
		},


		/**
		 * Méthode Data.ReturnDataFormTypeOfAdmin
		 * Retourne les données nécessaires à la construction d'une ligne d'administration en fonction du type d'administration
		 * @param t:Contexte
		 * @param json:JSON 	Données d'administration
		 * @param type:String 	Type d'administration
		 * @param str:Array 	Structure des données
		 */
		/*ReturnDataFormTypeOfAdmin: function(t, json, type, str){
			switch(type){
				case "portail": 
					return { edit: portail.Data.PopinDataPortailEdit(portail, json, str), del: portail.Data.PopinDataPortailDel(portail, json) };
					break;

				case "categorie":
					return { edit: navigation.Data.PopinDataCategorieEdit(navigation, json, str), del: navigation.Data.PopinDataCategorieDel(navigation, json) };
					break;

				case "user":
					return { edit: user.Data.PopinDataUserEdit(navigation, json, str, true), del: user.Data.PopinDataUserDel(navigation, json) };
					break;

				default: break;
			}
		},*/


		/**
		 * Méthode GetDataForHighLightTooltip
		 * Renvoi les données nécessaires aux tooltips de surlignement
		 * @param t:Context 
		 * @param json:JSON 			données de l'article
		 * @param cible:jQueryObject 	objet jquery contenant un élément devant se référer à un article de la même catégorie que l'article courant
		 * @param idCategorie:Int 		identifiant de la catégorie
		 * @param categorie:String 		Nom de la catégorie
		 */
		GetDataForHighLightTooltip: function(t, json, cible, idCategorie, categorie){
			var insert = null;

			for(var i = 0; i < json.length; i++){
				if(cible.text() == json[i].titre){
					insert = $("<div></div>");
					var title = $("<h4></h4>").text(categorie.toLowerCase() + "." + json[i].titre.toLowerCase());
					var art_html = $("<div></div>").append(json[i].article).text();
					var jq_art = $("<div></div>").append(art_html);

					var syntaxe = $(jq_art).find("section code");
					var description = $(jq_art).find("aside");

					var link = $("<span></span>").addClass("tooltip_link").attr("value", json[i].idArticle).text(Lang[user.GetLangue()].lbl.voir_article);

					insert.append(title).append(syntaxe).append(description).append(link);
				}
			}

			if(insert != null){
				var tooltip = insert.find(".tooltip_link");
				tooltip.on("click", function(){
					articleContent.LoadArticle($(this).attr("value"));
				});
			}

			return insert;
		}
	},
	

	UI: {
		/**
		 * Méthode UI.Build
		 * Workflow de construction de l'article
		 * @param t:Contexte
		 * @param json:JSON 	les données de l'article
		 */
		Build: function(t, json){
			ui.article.Clear(ui);
			// t.UI.Clear(t);
			t.UI.Header(t, json);
			t.UI.Content(t, json);
			t.UI.Commands(t, json);
			// t.UI.HideLogo(t);
			ui.HideLogo(ui);
			menu.UI.BuildCategorie(menu);
			
			$(".article_content").height($("#article").innerHeight() - $(".article_header").outerHeight(true) - 30);
		},


		/**
		 * Méthode UI.Header
		 * Construction de l'entête de l'article
		 * @param t:Contexte
		 * @param json:JSON 	données de l'article
		 */
		Header: function(t, json){
			var insert = $("<div></div>").addClass("article_header");
			var titre = t.UI.Title(t, json);
			var infos = t.UI.Infos(t, json);
			var author = t.UI.Author(t, json);
			var type = t.UI.Type(t, json);
			var date = t.UI.CreateDate(t, json);
			var mc = t.UI.MotCles(t, json);

			infos.append(type).append(author).append(date);
			insert.append(titre).append(infos).append(mc);
			$("#article").append(insert);
		},


		/**
		 * Méthode UI.Title
		 * Construction du titre de l'article
		 * @param t:Contexte
		 * @param json:JSON 		données de l'article
		 * @return jQueryObject 	objet jQuery correspondant au titre
		 */
		Title: function(t, json){
			return $("<div></div>").addClass("article_title").text(json.titre);
		},


		/**
		 * Méthode UI.Infos
		 * Construction des informations de l'article
		 * @param t:Contexte
		 * @param json:JSON 		données de l'article
		 * @return jQueryObject 	objet jQuery correspondant aux informations de l'article
		 */
		Infos: function(t, json){
			return $("<div></div>").addClass("article_infos");
		},


		/**
		 * Méthode UI.Author
		 * Construction de l'auteur de l'article
		 * @param t:Contexte
		 * @param json:JSON 		données de l'article
		 * @return jQueryObject 	objet jQuery correspondant à l'auteur
		 */
		Author: function(t, json){
			return $("<span></span>").addClass("article_author").text(" " + Lang[user.GetLangue()].lbl.createdby + " " + json.user);
		},


		/**
		 * Méthode UI.Type
		 * Construction du type de l'article
		 * @param t:Contexte
		 * @param json:JSON 		données de l'article
		 * @return jQueryObject 	objet jQuery correspondant au type
		 */
		Type: function(t, json){
			return $("<span></span>").addClass("article_type").text(json.type);
		},


		/**
		 * Méthode UI.CreateDate
		 * Construction de la date de création de l'article
		 * @param t:Contexte
		 * @param json:JSON 		données de l'article
		 * @return jQueryObject 	objet jQuery correspondant à la date de création
		 */
		CreateDate: function(t, json){
			return $("<span></span>").addClass("article_date").text("  " + Lang[user.GetLangue()].lbl.date_intro + " " + json.dateCreation);
		},


		/**
		 * Méthode UI.MotCles
		 * Construction des mots clés de l'article
		 * @param t:Contexte
		 * @param json:JSON 		données de l'article
		 * @return jQueryObject 	objet jQuery correspondant aux mots clés
		 */
		MotCles: function(t, json){

			var mc = $("<div></div>").addClass("article_listMotCles");

			if(json.motcles.length){
				for(var i = 0; i < json.motcles.length; i++){
					var motcle = $("<a></a>").addClass("motcle").attr("value", json.motcles[i].idMotCle).text(json.motcles[i].motcle);
					mc.append(motcle);

					motcle.on("click", function(){ 
						recherche.SetRecherche($(this).text());
					});
				}
			}

			return mc;
		},


		/**
		 * Méthode UI.Content
		 * Construction du contenu de l'article
		 * @param t:Contexte
		 * @param json:JSON 		données de l'article
		 */
		Content: function(t, json){
			var content = $(json.article);
			var container = $("<div></div>").addClass("article_content").append(content);

			if(json.idArticle != -1){

				if(Data.article.data.motcles.length){

					t.GetAssociatedArticles(Data.article.data.motcles, function(json_assoc){
						t.UI.ShowAssociatedArticles(t, content, json_assoc);
						t.UI.HighlightArticles(t, content);

						$("#article .highlight").on("mouseover", function(){

							var child = $(this).find(".hl_tooltip");

							if($(this).offset().left + child.outerWidth(true) >= $(window).width() - 37){
								child.css("left", $(window).width() - (child.outerWidth(true) + $(this).offset().left + 37) + "px");

							}else{
								child.css("left", "5px");
							}

							if($(this).offset().top + child.find(".hl_tooltip").outerHeight(true) >= $(window).height()){
								child.css("top", $(window).height() - (child.outerHeight(true) + $(this).offset().top + 37) + "px");

							}else{
								child.css("top", $(this).height() + "px");
							}
						});
					});
				}
			}
			$("#article").append(container);
		},


		/**
		 * Méthode UI.Command
		 * Construction du contenu de l'article
		 * @param t:Contexte
		 * @param json:JSON 		données de l'article
		 */
		Commands: function(t, json){
			var retour = t.UI.BtnRetour(t);
			var modif = t.UI.BtnModifier(t, json);
			var save = t.UI.BtnSave(t, json);
			var cancel = t.UI.BtnCancel(t);
			var access = t.UI.Accessibility(t);
			var del = t.UI.BtnDelete(t);
			var create = t.UI.BtnCreate(t, json);
			var cclCreate = t.UI.BtnCancelCreate(t);
			var pdf = t.UI.BtnPDF(t, json);
			
			var commands = $("#informations");

			if(retour != null){ commands.append(retour); }
			if(modif != null){ commands.append(modif); }
			if(save != null){ commands.append(save); }
			if(create != null){ commands.append(create); }
			if(cancel != null){ commands.append(cancel); }
			if(cclCreate != null){ commands.append(cclCreate); }
			if(del != null){ commands.append(del); }
			if(pdf != null){ commands.append(pdf); }
			if(access != null){ commands.append(access); }
		},


		/**
		 * Méthode UI.BtnRetour
		 * Création du bouton de retour (fermeture de l'article)
		 * @param t:Contexte
		 * @return jQueryObject 	objet jQuery correspondant au bouton de retour
		 */
		BtnRetour: function(t){
			var lvl = "show";
			var btnClose = null;

			if(CheckAccess(lvl)){
				btnClose = $("<button class='return_btn'>" + Lang[user.GetLangue()].btn.back + "</button>").on("click", function(){
					ui.article.Close(ui, function(){
						articleContent.GetArticleByUser(Data.user.data.idUser, Data.portail.data.idPortail);
						menu.UI.BuildPortail(menu);
					}); 
					/*t.UI.Close(t, function(){
						articleContent.GetArticleByUser(Data.user.data.idUser, Data.portail.data.idPortail);
					});*/ 
					// menu.UI.BuildPortail(menu);
				});
			}
			return btnClose;
		},


		/**
		 * Méthode UI.BtnModifier
		 * Création du bouton de modification de l'article
		 * @param t:Contexte
		 * @param json:JSON 		données de l'article
		 * @return jQueryObject 	objet jQuery correspondant au bouton de modification
		 */
		BtnModifier: function(t, json){
			var lvl = "edit";
			var btnModif = null;

			if(CheckAccess(lvl)){
				btnModif = $("<button class='btn_modif'>" + Lang[user.GetLangue()].btn.modify + "</button>").attr("value", json.idArticle).on("click", function(){ 
					t.Action.Edit(t, json);
				});
			}
			return btnModif;
		},


		/**
		 * Méthode UI.BtnPDF
		 * Création du bouton de modification de l'article
		 * @param t:Contexte
		 * @param json:JSON 		données de l'article
		 * @return jQueryObject 	objet jQuery correspondant au bouton de modification
		 */
		BtnPDF: function(t, json){
			var lvl = "01";
			var btnModif = null;

			if(CheckAccess(lvl)){
				btnModif = $("<button class='btn_pdf'>" + Lang[user.GetLangue()].btn.pdf + "</button>").attr("value", json.idArticle).on("click", function(){
						window.open('./phpforms/article.exportPDF.php?idArticle=' + $(this).attr("value"), '_blank');
				});
			}
			return btnModif;
		},


		/**
		 * Méthode UI.BtnSave
		 * Création du bouton de sauvegarde des modifs de l'article
		 * @param t:Contexte
		 * @param json:JSON 		données de l'article
		 * @return jQueryObject 	objet jQuery correspondant au bouton de sauvegarde
		 */
		BtnSave: function(t, json){
			var lvl = "edit";
			var btnSave = null;

			if(CheckAccess(lvl)){
				btnSave = $("<button class='btn_save'>" + Lang[user.GetLangue()].btn.save + "</button>").attr("value", json.idArticle).hide().on("click", function(){ 
					t.Action.Save(t, false);
				});
			}
			return btnSave;
		},


		/**
		 * Méthode UI.BtnCreate
		 * Création du bouton de création de l'article
		 * @param t:Contexte
		 * @param json:JSON 		données de l'article
		 * @return jQueryObject 	objet jQuery correspondant au bouton de modification
		 */
		BtnCreate: function(t, json){
			var lvl = "create";
			var btnModif = null;

			if(CheckAccess(lvl)){
				btnModif = $("<button class='btn_create'>" + Lang[user.GetLangue()].btn.create + "</button>").hide().on("click", function(){ 
					t.Action.Create(t);
				});
			}
			return btnModif;
		},


		/**
		 * Méthode UI.BtnCancel
		 * Création du bouton d'annulation des modifs de l'article
		 * @param t:Contexte
		 * @return jQueryObject 	objet jQuery correspondant au bouton d'annulation
		 */
		BtnCancel: function(t){
			var lvl = "show";
			var btnCancel = null;

			if(CheckAccess(lvl)){
				btnCancel = $("<button class='btn_cancel'>" + Lang[user.GetLangue()].btn.cancel + "</button>").hide().on("click", function(){ 
					t.Action.Save(t, true);
				});
			}
			return btnCancel;
		},


		/**
		 * Méthode UI.BtnCancelCreate
		 * Création du bouton d'annulation de la création de l'article
		 * @param t:Contexte
		 * @return jQueryObject 	objet jQuery correspondant au bouton d'annulation
		 */
		BtnCancelCreate: function(t){
			var lvl = "create";
			var btnCancel = null;

			if(CheckAccess(lvl)){
				btnCancel = $("<button></button>").addClass("btn_cancelCreate").text(Lang[user.GetLangue()].btn.cancel).hide().on("click", function(){ 
					// t.UI.Close(t); 
					ui.article.Close(ui);
					menu.UI.BuildPortail(menu); 
				});
			}
			return btnCancel;
		},


		/**
		 * Méthode UI.BtnDelete
		 * Création du bouton de suppression de l'article
		 * @param t:Contexte
		 * @return jQueryObject 	objet jQuery correspondant au bouton de suppression
		 */
		BtnDelete: function(t){
			var lvl = "delete";
			var btnDel = null;

			if(CheckAccess(lvl)){
				btnDel = $("<button class='btn_delete delete'>" + Lang[user.GetLangue()].btn.delete + "</button>").hide().on("click", function(){ 
					t.Action.Delete(t);
				});
			}
			return btnDel;
		},


		/*
		* Méthode UI.Accessibility
		* Construction du bloc d'accessibilité
		* @param t:Contexte
		* @return jQueryObject 	objet jQuery correspondant au bloc d'accessibilité
		*/
		Accessibility: function(t){
			var lvl = "show";
			var insert = null;
			

			if(CheckAccess(lvl)){
				insert = $("<ul id='accessibility'><li class='btn_access_fontSize smallFont'></li><li class='btn_access_fontSize mediumFont'></li><li class='btn_access_fontSize largeFont'></li></ul>");

				insert.find(".smallFont").on("click", function(){
					var fs = t.s.fontSize;
					t.s.fontSize = (fs - .1 > t.s.minFontSize) ? fs - .1 : fs;
					$("#article .article_content").css("font-size", t.s.fontSize + "em");
				});

				insert.find(".mediumFont").on("click", function(){
					t.s.fontSize = 1;
					$("#article .article_content").css("font-size", t.s.fontSize + "em");
				});

				insert.find(".largeFont").on("click", function(){
					var fs = t.s.fontSize;
					t.s.fontSize = (fs + .1 < t.s.maxFontSize) ? fs + .1 : fs;
					$("#article .article_content").css("font-size", t.s.fontSize + "em");
				});
			}
			return insert;
		},


		/**
		 * Méthode UI.Clear
		 * Vide l'article
		 * @param t:Contexte
		 */
		/*Clear: function(t){
			$(t.s.bloc).children().remove();
			$(t.s.blocCmd).children().remove();
			$(t.s.blocTil).children().remove();
		},*/

		/**
		 * Méthode UI.Close
		 * Suppression des infos de l'article dans l'IHM
		 * @param t:Contexte
		 */
		/*Close: function(t, fnCallBack){
			if(fnCallBack == undefined){
				fnCallBack = null;
			}
			t.Data.SetJSON(t, null);
			// $("#content").css({"position": "absolute"}).animate({"right":-5000}, 500, function(){ 
			if($(".article_content, .article_header").size() > 0){
				$(".article_content, .article_header").css({"position": "absolute"}).animate({"right":-5000}, 500, function(){ 
					$(this).css({"position": "absolute","right":0});
					t.UI.Clear(t);
					t.UI.ShowLogo(t);
					if(fnCallBack) { fnCallBack(); }
				});
			}else{
				t.UI.Clear(t);
				t.UI.ShowLogo(t);
				if(fnCallBack) { fnCallBack(); }
			}
			$("#informations").children().remove();
		},*/

		/**
		 * Méthode UI.ShowLogo
		 * Affiche le logo
		 * @param t:Contexte
		 */
		/*ShowLogo: function(t){
			$("#logos").css("opacity", 0).show().animate({"opacity": 1}, 1000);
		},*/

		/**
		 * Méthode UI.HideLogo
		 * Cache le logo
		 * @param t:Contexte
		 */
		/*HideLogo: function(t){
			$("#logos").animate({"opacity": 0}, 100, function(){ $(this).hide().css("opacity", 1); });
		},*/


		/**
		 * Méthode UI.TablePortail
		 * Constuction de la table d'administration des portails
		 * @param t:Contexte
		 * @param str:Array[String] 	Structure de la table d'administration des portails
		 */
		/*TablePortail: function(t, str){
			var table = null;
			var lvl = "admin";
			var w, className;

			if(str.length && CheckAccess(lvl)){

				table = $("<table><thead></thead><tbody></tbody></table>");
				line = $("<tr></tr>");

				for(var i = 0; i < str.length; i++){
					w = 0;
					className = "";
					
					if(str[i].key == null){
						w = "80px";
						className = "class='action'";
					}else{
						w = (str[i].width == null) ? "auto" : str[i].width + "%";
					}

					line.append($("<th " + className + " style='width:" + w + "'>" + str[i].title + "</th>"));
				}

				table.find("thead").append(line);
			}

			return table;
		},*/

		/**
		 * Méthode UI.LinePortail
		 * Constuction d'une ligne du tableau d'administration des portails
		 * @param t:Contexte
		 * @param str:Array[String] 	Structure de la table d'administration des portails
		 * @param json:JSON 	 		Données du portail à afficher
		 */
		/*LinePortail: function(t, str, json, type){
			var line = null;
			var lvl = "admin";
			var page = "portail"

			if(str.length && CheckAccess(lvl)){

				line = ($("<tr value='" + json.id + "'></tr>"));

				for(var i = 0; i < str.length; i++){
					var popin_data_edit, popin_data_del;

					var data = t.Data.ReturnDataFormTypeOfAdmin(t, json, type, str);

					if(str[i].key != null){
						if(typeof(json[str[i].key]) == 'object' && (json[str[i].key] instanceof Array)){
							line.append($("<td>" + json[str[i].key].length + "</td>"));
						}else{
							if(str[i].list && str[i].list.length){
								for(var o = 0; o < str[i].list.length; o++){
									if(str[i].list[o].id == json[str[i].key]){
										line.append($("<td>" + str[i].list[o].name + "</td>"));
									}
								}
							}else{
								line.append($("<td>" + json[str[i].key] + "</td>"));
							}
						}
					}else{
						var td = $("<td class='action'></td>").append(t.UI.AdminBtnEdit(t, page, data.edit, str, json)).append(t.UI.AdminBtnDel(t, page, data.del));
						line.append(td);
					}
				}
			}

			return line;
		},*/

		/**
		 * Méthode AdminTitle
		 * Construction du titre des pages d'administration
		 * @param t:Contexte
		 * @parma title:String 			Titre de la page
		 */
		/*AdminTitle: function(t, title){
			var lvl = "admin";
			
			if(CheckAccess(lvl) && title != ""){
				var insert = $("<div></div>").addClass("admin_title").html(title);
				$(t.s.bloc).append(insert);
			}
		},*/

		/**
		 * Méthode AdminContent
		 * Construction du contenu des pages d'administration
		 * @param t:Contexte
		 * @parma section:jQueryObject 	Contenu de la page
		 */
		/*AdminContent: function(t, section){
			var lvl = "admin";

			if(CheckAccess(lvl) && title != ""){
				var insert = $("<div></div>").addClass("admin_content").html(section);
				$(t.s.bloc).append(insert);
			}
		},*/

		/** obsolète
		 * Méthode AdminStat
		 * Construction de la partie Stat des pages administration
		 * @param t:Contexte
		 * @parma section:jQueryObject 	Contenu de la page
		 */
		/*AdminStat: function(t){
			var lvl = "admin";

			if(CheckAccess(lvl)){
				var insert = $("<div></div>").addClass("admin_stat");
				$(t.s.bloc).append(insert);
			}
		},*/

		/**
		 * Méthode AdminBtnEdit
		 * Construction des boutons de modification des pages d'administration
		 * @param t:Contexte
		 */
		/*AdminBtnEdit: function(t, page, popin_data, str, json){
			var lvl = "admin";
			var insert = null;

			if(CheckAccess(lvl)){
				insert = $("<a></a>").addClass(page + " btn_edit");
				insert.on("click", function(){
					popin = new Popin(popin_data, str, json);
				});
				$(t.s.bloc).append(insert);
			}

			return insert;
		},*/

		/**
		 * Méthode AdminBtnDel
		 * Construction des boutons de suppression des pages d'administration
		 * @param t:Contexte
		 */
		/*AdminBtnDel: function(t, page, popin_data){
			var lvl = "admin";
			var insert = null;

			if(CheckAccess(lvl)){
				insert = $("<a></a>").addClass(page + " btn_del");
				insert.on("click", function(){
					popin = new Popin(popin_data, null, null);
				});
				$(t.s.bloc).append(insert);
			}

			return insert;
		},*/

		/**
		 * Méthode HighlightArticles
		 * Encapsule les titre des articles partageant la même catégorie
		 * @param t:Contexte
		 * @param cible:jQueryObject 		objet jquery correspondant à l'élément dans lequel on doit rechercher les termes
		 */
		HighlightArticles: function(t, cible){
			var idCategorie = Data.article.data.idCategorie;
			var terms = Array();
			var termsStr = Array();
			var className = "highlight";

			for(var i = 0; i < Data.navigation.data.length; i++){
				if(Data.navigation.data[i].id == idCategorie){
					terms = Data.navigation.data[i].articles;
					categorie = Data.navigation.data[i].categorie;
					break;
				}
			}

			if(terms.length){
				for(var i = 0; i < terms.length; i ++){
					termsStr.push(terms[i].titre);
				}

				cible.highlight(termsStr, { wordsOnly: true });
				t.UI.BuildHighLightTooltip(t, cible, className, terms, idCategorie, categorie);
			}
		},

		/**
		 * Méthode BuildHighLightTooltip
		 * Attache une tooltip à chaque élément highlighté
		 * @param t:Contexte
		 * @param cible:jQueryObject 		objet jquery sur lequel s'exécute la fonction d'HighLight
		 * @param className:String 			className des éléments surlignés
		 * @param json:JSON 				données concernant les articles
		 * @param idCategorie:Int 			identifiant de la catégorie courante
		 * @param categorie:String 			nom de la catégorie courante
		 */
		BuildHighLightTooltip: function(t, cible, className, json, idCategorie, categorie){
			var cN = cible.find("." + className);
			
			if(cN.size()){
				cN.each(function(){
					var insert = $("<div></div>").addClass("hl_tooltip");

					insert.html(t.Data.GetDataForHighLightTooltip(t, json, $(this), idCategorie, categorie));

					$(this).append(insert);
				});
			}
		},


		/**
		 * Méthode ShowAssociatedArticles
		 * Affiche les articles associés à l'article courant
		 * @param t:Context
		 * @param cible:jQueryObject 	objet jquery cible de la méthode
		 * @param json:JSON 			données de l'article associé
		 */
		ShowAssociatedArticles: function(t, cible, json){
			var insert = $("<nav></nav>");

			for(var i = 0; i < json.length; i++){
				if(json[i].id != Data.article.data.idArticle){
					var virgule = (insert.text() == "") ? "" : ", ";
					insert.append(virgule + json[i].titre);
				}
			}

			t.UI.HighlightArticles(t, insert);

			cible.last().after(insert);
		},


		/**
		 * Méthode BuildHome
		 * Construit la page d'accueil
		 * @param t:Context
		 * @param json:JSON 	données nécessaires à la construction de la page d'accueil
		 */
		BuildHome: function(t, json){
			$("#article").children().remove();
			for(var i = 0; i < json.length; i++){
				var article = json[i];
				t.UI.TraceHomeTuileArticle(t, article);
			}
		},


		/**
		 * Méthode TraceHomeTuileArticle
		 * Création des tuiles représentant les articles sur la page d'accueil
		 * @param t:Context
		 * @param article:JSON  	données de l'article
		 */
		TraceHomeTuileArticle: function(t, article){
			var insert = $("<div></div>").addClass("tuile").attr("value", article.idArticle);

			var title = $("<div></div>").addClass("tuile_title").text(article.titre);

			var art_html = $("<div></div>").append(article.article).text();
			var jq_art = $("<div></div>").append(art_html);

			var description = $("<div></div>").addClass("tuile_content").html(jq_art.find("aside"));

			insert.append(title).append(description);
			$("#article").append(insert);

			insert.on("click", function(){
				var idPortail = (Data.portail && Data.portail.data && Data.portail.data.idPortail != null)? Data.portail.data.idPortail : null ;
				t.GetPortailForArticle($(this).attr("value"), idPortail);
			});
		}
	}
}

var articleContent;
$(document).ready(function(){ articleContent = new Article(); });