function Article(){
	this.s = {
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
	OpenScreen: function(){	},

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
			this.Data.SetJSON(this, json);
			this.UI.Build(this, json);

		});
	},

	GetArticleByUser: function(iduser){
		$.ajax({

			url: "phpforms/article.listUser.php",
			type: "POST",
			data: {idUser:iduser},
			datatype: "json",
			context: this

		}).done(function(msg){

			var json = $.parseJSON(msg);
			this.UI.BuildHome(this, json);

		});
	},

	UpdateArticle: function(){
		var data = this.s.data;
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
			data: {idArticle:data.idArticle, titre:data.titre, content:data.article, idmotcles:idmc, motcles:mc },
			datatype: "json",
			context: this

		}).done(function(msg){

			var json = $.parseJSON(msg);

			this.LoadArticle(this.s.data.idArticle);
			navigation.GetNavigation(true, null);
		});
	},

	Delete: function(data){

		$.ajax({

			url: "phpforms/article.delete.php",
			type: "POST",
			data: { idArticle:data },
			datatype: "json",
			context: this

		}).done(function(msg){

			var json = $.parseJSON(msg);

			navigation.GetNavigation(true, null);
			this.UI.Clear(this);
		});
	},

	Create: function(data, fnCallBack){
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
			
			if(msg != "" && !isNaN(parseInt(msg))){
				fnCallBack(msg);
			}
		});
	},

	GetAssociatedArticles: function(motcles, fnCallBack){

		var mc = Array();
		for(var i = 0; i < motcles.length; i++){
			mc.push(motcles[i].motcle);
		}
		mc = mc.join(";");

		if(articleContent && articleContent.s.data && articleContent.s.data.idCategorie && mc.length){
			$.ajax({

				url: "phpforms/article.assoc.php",
				type: "POST",
				context: this,
				data: { idCategorie: this.s.data.idCategorie, motcles: mc }

			}).done(function(msg){

				var json = $.parseJSON(msg);
				// var json = $.parseJSON(msg)[0];
				fnCallBack(json);
			});
		}
	},

	Action: {
		/**
		 * Méthode Action.Edit
		 * Lance le workflow d'édition de l'article
		 * @param t:Contexte
		 */
		Edit: function(t, json){
			var lvl = "10";
			var article = $("#article");
			var infos = $("#informations");
			var access = $("#accessibility");
			var arr_mc = Array();

			if(user.CheckUserAccess(lvl)){
				
				var gabarit = { 
					description: "<aside title='" + Lang[user.GetLangue()].lbl.desc_article + "'>description</aside>",
					syntaxe: "<section title='" + Lang[user.GetLangue()].lbl.syntaxe_code + "'><code>syntaxe</code></section>",
					article: "<article title='" + Lang[user.GetLangue()].lbl.corps_article + "'>corps de l'article</article>",
					//navigation: "<nav title='" + Lang[user.GetLangue()].lbl.near_articles + "'>liens vers d'autres articles proches</nav>"
					navigation: ""
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
									if(confirm("En continuant vous allez effacer le contenu de l'article, souhaitez-vous continuer ?")){
										article.find('.article_content').setCode(gabarit.description + gabarit.syntaxe + gabarit.article + gabarit.navigation);
									}
								}else{
									article.find('.article_content').setCode(gabarit.description + gabarit.syntaxe + gabarit.article + gabarit.navigation);
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
									// alert("impossible d'ajouter un deuxième bloc de syntaxe");
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
									// alert("impossible d'ajouter un deuxième bloc de description");
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
									// alert("impossible d'ajouter un deuxième bloc d'article");
								}
							} 
						},
						/*button_navigation: {
							title: Lang[user.GetLangue()].btn.nav, 
							callback: function(obj, event, key) {
								var c = article.find('.article_content');
								if(!c.find('nav').size()){
									c.insertHtml( (c.getSelected() == "") ? gabarit.navigation : gabarit.navigation.replace($(gabarit.navigation).text(), c.getSelected()));
								}else{
									// alert("impossible d'ajouter un deuxième bloc d'information")
								}
							} 
						}*/
           			 }
				})

				if(json.idArticle == -1){
					article.find('.article_content').setCode(gabarit.description + gabarit.syntaxe + gabarit.article + gabarit.navigation);
				}

				article.find('.article_title').replaceWith( "<input type='text' class='article_title_edit' value='" + article.find('.article_title').text() + "' />" );
				
				var data_mc;
				if(json && json.idArticle == -1){
					
					if(json.motcles && json.motcles.length){
						data_mc = json.motcles;
					}else{
						data_mc = Array();
					}
					
				}else if(t.s.data != null && t.s.data.motcles && t.s.data.motcles.length){
					data_mc = t.s.data.motcles;

				}else{
					data_mc = Array();
				}

				for(var i = 0; i < data_mc.length; i++){
					var motcle = data_mc[i];
					arr_mc.push({id: motcle.idMotCle, name: motcle.motcle});
				}

				if(json.idArticle == -1){
					var select = $("<select></select>").addClass('article_categorie_edit');
					for(var i = 0; i < navigation.s.data.length; i++){
						var cat = navigation.s.data[i];

						select.append($("<option value='" + cat.id + "' title='" + cat.description + "'>" + cat.categorie + "</option>"));
					}
					article.find(".article_title_edit").after(select);
				}

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

				infos.find('button.btn_modif, button.btn_pdf').hide();
				access.hide();

				if(json.idArticle != -1){
					infos.find('button.btn_create, button.btn_cancelCreate').hide();
					infos.find('button.btn_save, button.btn_cancel, button.btn_delete').show();
				}else{
					infos.find('button.btn_create, button.btn_cancelCreate').show();
					infos.find('button.btn_save, button.btn_cancel, button.btn_delete').hide();
				}
			}
		},

		BuildCreate: function(t){
			var lvl = "10";
			var article = $("#article");
			var infos = $("#informations");
			var access = $("#accessibility");
			var access = $("#accessibility");
			var arr_mc = Array();

			if(user.CheckUserAccess(lvl)){

				var json = {
					idArticle: -1,
					idType: 1,
					idUser: user.s.data.idUser,
					type: "Article",
					user: user.s.data.fstName + " " + user.s.data.lstName,
					dateCreation: Lang[user.GetLangue()].lbl.now,
					titre: "",
					article: "",
					motcles: Array()
				};

				t.UI.Build(t, json);
				t.Action.Edit(t, json);
			}
		},

		Create: function(t){
			var lvl = "10";
			var article = $("#article");
			var motcle = Array();

			if(user.CheckUserAccess(lvl)){

				var content = article.find(".article_content").getCode();
				var titre = article.find(".article_title_edit").val();
				var mc = article.find("input.article_listMotCles_edit").tokenInput("get");
				var categorie = article.find(".article_categorie_edit").val();

				if(content != "" && titre != "" && mc.length && categorie != ""){
					for(var i = 0; i < mc.length; i++){
						motcle.push({idArticle: -1, idMotCle: -1, motcle: mc[i].name});
					}

					var data = {
						idArticle: -1,
						idType: 1,
						idUser: user.s.data.idUser,
						type: "Article",
						user: user.s.data.fstName + " " + user.s.data.lstName,
						dateCreation: Lang[user.GetLangue()].lbl.now,
						titre: titre,
						article: content,
						motcles: motcle,
						idCategorie: categorie
					};

					t.Create(data, function(idArticle){
						t.LoadArticle(idArticle);
						navigation.GetNavigation(true, null);
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
			var lvl = "10";
			var article = $("#article");
			var motcle = Array();

			if(user.CheckUserAccess(lvl)){
				
				var content = article.find(".article_content").getCode();
				var titre = article.find(".article_title_edit").val();
				var mc = article.find("input.article_listMotCles_edit").tokenInput("get");

				if(content != "" && titre != "" && mc.length){

					if(!isCancel){
						for(var i = 0; i < mc.length; i++){
							motcle.push({idArticle: t.s.data.idArticle, idMotCle: mc[i].id, motcle: mc[i].name});
						}

						t.Data.Update(t, titre, content, motcle);
						t.UpdateArticle();

					}else{
						article.find(".article_content").html(t.s.data.article);
						article.find(".article_title").text(t.s.data.titre);

						for(var i = 0; i < t.s.data.motcles.length; i++){
							var motcle = t.s.data.motcles[i];
							var insert = $("<a></a>").addClass("motcle").attr("value", motcle.idMotCle).text(motcle.motcle);
							article.find('.article_listMotCles').append(insert);

							insert.on("click", function(){ 
								recherche.SetRecherche($(this).text());
							});
						}

						t.LoadArticle(t.s.data.idArticle);
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
			var lvl = "11";

			if(user.CheckUserAccess(lvl)){
				var str = {
					title: Lang[user.GetLangue()].msg.confirm_delete_object + "<input class='p_ID' type='hidden' value='" + t.s.data.idArticle + "' />",
					content: "", cmd: ["valide", "cancel"],
					onValidate: function(){
						var p = $(".popin");
						var id = p.find(".p_ID").val();
						if(id != ""){ t.Delete(id); popin.Action.Hide(popin); }
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
		 */
		BuildAdmin: function(t, json, strTab, titre, type){
			var lvl = "11";
			var table = t.UI.TablePortail(t, strTab);

			if(table != null && user.CheckUserAccess(lvl)){
				for(var i = 0; i < json.length; i++){
					var line = t.UI.LinePortail(t, strTab, json[i], type);
					if(line != null){ table.find("tbody").append(line); }
				}

				t.UI.AdminTitle(t, titre);
				t.UI.AdminContent(t, table);
			}
		},
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
			t.s.data = json;
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
			t.s.data.titre = titre;
			t.s.data.article = content;
			t.s.data.motcles = motcle;
		},

		/**
		 * Méthode Data.ReturnDataFormTypeOfAdmin
		 * Retourne les données nécessaires à la construction d'une ligne d'administration en fonction du type d'administration
		 * @param t:Contexte
		 * @parma json:JSON 	Données d'administration
		 * @parma type:String 	Type d'administration
		 */
		ReturnDataFormTypeOfAdmin: function(t, json, type, str){
			switch(type){
				case "portail": 
					return { edit: portail.Data.PopinDataPortailEdit(portail, json, str), del: portail.Data.PopinDataPortailDel(portail, json) }; break;
				case "categorie":
					return { edit: navigation.Data.PopinDataCategorieEdit(navigation, json, str), del: navigation.Data.PopinDataCategorieDel(navigation, json) }; break;
				case "user":
					return { edit: user.Data.PopinDataUserEdit(navigation, json, str, true), del: user.Data.PopinDataUserDel(navigation, json) }; break;
			}
		},

		GetDataForHighLightTooltip: function(t, json, cible, idCategorie, categorie){
			var insert = null;

			for(var i = 0; i < json.length; i++){
				if(cible.text() == json[i].titre){
					insert = $("<div></div>");
					var title = $("<h4></h4>").text(categorie.toLowerCase() + "." + json[i].titre.toLowerCase());
					var art = json[i].article;
					var art_html = $("<div></div>").append(art).text();
					var jq_art = $("<div></div>").append(art_html);

					var syntaxe = $(jq_art).find("section code");
					var description = $(jq_art).find("aside");

					var link = $("<span></span>").addClass("tooltip_link").attr("value", json[i].idArticle).text(Lang[user.GetLangue()].lbl.voir_article);

					insert.append(title).append(syntaxe).append(description).append(link);

				}
			}
			var tooltip = insert.find(".tooltip_link");
			tooltip.on("click", function(){
				var idArticle = $(this).attr("value");
				articleContent.LoadArticle(idArticle);
			});

			return insert;
		}
	},
	


	/**
	 * Bloc UI
	 * Gestion des éléments se rapportant à l'UI
	 */
	UI: {
		/**
		 * Méthode UI.Build
		 * Workflow de construction de l'article
		 * @param t:Contexte
		 * @param json:JSON 	les données de l'article
		 */
		Build: function(t, json){
			t.UI.Clear(t);
			t.UI.Header(t, json);
			t.UI.Content(t, json);
			t.UI.Commands(t, json);
			t.UI.HideLogo(t);
			menu.UI.BuildCategorie(menu);
			
			$(".article_content").height($(t.s.bloc).innerHeight() - $(".article_header").outerHeight(true) - 30);
		},

		/**
		 * Méthode UI.Header
		 * Construction de l'entête de l'article
		 * @param t:Contexte
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
			$(t.s.bloc).append(insert);
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
				if(t.s.data.motcles.length){
					t.GetAssociatedArticles(t.s.data.motcles, function(json_assoc){
						t.UI.ShowAssociatedArticles(t, content, json_assoc);
						t.UI.HighlightArticles(t, content);

						$(t.s.bloc).find(".highlight").on("mouseover", function(){
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
			
			$(t.s.bloc).append(container);
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
			var commands = $(t.s.blocCmd);
			var del = t.UI.BtnDelete(t);
			var create = t.UI.BtnCreate(t, json);
			var cclCreate = t.UI.BtnCancelCreate(t);
			var pdf = t.UI.BtnPDF(t, json);
			
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
			var lvl = "01";
			var btnClose = null;

			if(user.CheckUserAccess(lvl)){
				btnClose = $("<button class='return_btn'>" + Lang[user.GetLangue()].btn.back + "</button>").on("click", function(){ 
					t.UI.Close(t); 
					menu.UI.BuildPortail(menu);
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
			var lvl = "10";
			var btnModif = null;

			if(user.CheckUserAccess(lvl)){
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

			if(user.CheckUserAccess(lvl)){
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
			var lvl = "10";
			var btnSave = null;

			if(user.CheckUserAccess(lvl)){
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
			var lvl = "10";
			var btnModif = null;

			if(user.CheckUserAccess(lvl)){
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
			var lvl = "10";
			var btnCancel = null;

			if(user.CheckUserAccess(lvl)){
				btnCancel = $("<button class='btn_cancel'>" + Lang[user.GetLangue()].btn.cancel + "</button>").hide().on("click", function(){ 
					t.Action.Save(t, true);
				});
			}
			return btnCancel;
		},

		/**
		 * Méthode UI.BtnCancel
		 * Création du bouton d'annulation des modifs de l'article
		 * @param t:Contexte
		 * @return jQueryObject 	objet jQuery correspondant au bouton d'annulation
		 */
		BtnCancelCreate: function(t){
			var lvl = "10";
			var btnCancel = null;

			if(user.CheckUserAccess(lvl)){
				btnCancel = $("<button class='btn_cancelCreate'>" + Lang[user.GetLangue()].btn.cancel + "</button>").hide().on("click", function(){ 
					t.UI.Close(t); 
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
			var lvl = "10";
			var btnDel = null;

			if(user.CheckUserAccess(lvl)){
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
			var lvl = "01";
			var insert = null;
			

			if(user.CheckUserAccess(lvl)){
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
		Clear: function(t){
			$(t.s.bloc).children().remove();
			$(t.s.blocCmd).children().remove();
			$(t.s.blocTil).children().remove();
		},

		/**
		 * Méthode UI.Close
		 * Suppression des infos de l'article dans l'IHM
		 * @param t:Contexte
		 */
		Close: function(t, fnCallBack){
			if(fnCallBack == undefined){
				fnCallBack = null;
			}
			t.Data.SetJSON(t, null);
			$("#content").css({"position": "absolute"}).animate({"right":-5000}, 500, function(){ 
				$(this).css({"position": "absolute","right":0});
				t.UI.Clear(t);
				t.UI.ShowLogo(t);
				if(fnCallBack) { fnCallBack(); }
			});
		},

		/**
		 * Méthode UI.ShowLogo
		 * Affiche le logo
		 * @param t:Contexte
		 */
		ShowLogo: function(t){
			$("#logos").css("opacity", 0).show().animate({"opacity": 1}, 1000);
		},

		/**
		 * Méthode UI.HideLogo
		 * Cache le logo
		 * @param t:Contexte
		 */
		HideLogo: function(t){
			$("#logos").animate({"opacity": 0}, 100, function(){ $(this).hide().css("opacity", 1); });
		},

		/**
		 * Méthode UI.TablePortail
		 * Constuction de la table d'administration des portails
		 * @param t:Contexte
		 * @param str:Array[String] 	Structure de la table d'administration des portails
		 */
		TablePortail: function(t, str){
			var table = null;
			var lvl = "11";
			var w, className;

			if(str.length && user.CheckUserAccess(lvl)){

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
		},

		/**
		 * Méthode UI.LinePortail
		 * Constuction d'une ligne du tableau d'administration des portails
		 * @param t:Contexte
		 * @param str:Array[String] 	Structure de la table d'administration des portails
		 * @param json:JSON 	 		Données du portail à afficher
		 */
		LinePortail: function(t, str, json, type){
			var line = null;
			var lvl = "11";
			var page = "portail"

			if(str.length && user.CheckUserAccess(lvl)){

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
		},

		/**
		 * Méthode AdminTitle
		 * Construction du titre des pages d'administration
		 * @param t:Contexte
		 * @parma title:String 			Titre de la page
		 */
		AdminTitle: function(t, title){
			var lvl = "11";
			
			if(user.CheckUserAccess(lvl) && title != ""){
				var insert = $("<div></div>").addClass("admin_title").html(title);
				$(t.s.bloc).append(insert);
			}
		},

		/**
		 * Méthode AdminContent
		 * Construction du contenu des pages d'administration
		 * @param t:Contexte
		 * @parma section:jQueryObject 	Contenu de la page
		 */
		AdminContent: function(t, section){
			var lvl = "11";

			if(user.CheckUserAccess(lvl) && title != ""){
				var insert = $("<div></div>").addClass("admin_content").html(section);
				$(t.s.bloc).append(insert);
			}
		},

		/** obsolète
		 * Méthode AdminStat
		 * Construction de la partie Stat des pages administration
		 * @param t:Contexte
		 * @parma section:jQueryObject 	Contenu de la page
		 */
		AdminStat: function(t){
			var lvl = "11";

			if(user.CheckUserAccess(lvl)){
				var insert = $("<div></div>").addClass("admin_stat");
				$(t.s.bloc).append(insert);
			}
		},

		/**
		 * Méthode AdminBtnEdit
		 * Construction des boutons de modification des pages d'administration
		 * @param t:Contexte
		 */
		AdminBtnEdit: function(t, page, popin_data, str, json){
			var lvl = "11";
			var insert = null;

			if(user.CheckUserAccess(lvl)){
				insert = $("<a></a>").addClass(page + " btn_edit");
				insert.on("click", function(){
					popin = new Popin(popin_data, str, json);
				});
				$(t.s.bloc).append(insert);
			}

			return insert;
		},

		/**
		 * Méthode AdminBtnDel
		 * Construction des boutons de suppression des pages d'administration
		 * @param t:Contexte
		 */
		AdminBtnDel: function(t, page, popin_data){
			var lvl = "11";
			var insert = null;

			if(user.CheckUserAccess(lvl)){
				insert = $("<a></a>").addClass(page + " btn_del");
				insert.on("click", function(){
					popin = new Popin(popin_data, null, null);
				});
				$(t.s.bloc).append(insert);
			}

			return insert;
		},

		/**
		 * Méthode HighlightArticles
		 * Encapsule les titre des articles partageant la même catégorie
		 * @param t:Contexte
		 * @param cible:jQueryObject 		objet jquery correspondant à l'élément dans lequel on doit rechercher les termes
		 */
		HighlightArticles: function(t, cible){
			var idCategorie = t.s.data.idCategorie;
			var terms = Array();
			var termsStr = Array();
			var className = "highlight";

			for(var i = 0; i < navigation.s.data.length; i++){
				if(navigation.s.data[i].id == idCategorie){
					terms = navigation.s.data[i].articles;
					categorie = navigation.s.data[i].categorie;
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
		 * @param json:JSON 				données concernant les articles
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

		ShowAssociatedArticles: function(t, cible, json){
			var insert = $("<nav></nav>");

			for(var i = 0; i < json.length; i++){
				if(json[i].id != t.s.data.idArticle){
					var virgule = (insert.text() == "") ? "" : ", ";
					insert.append(virgule + json[i].titre);
				}
			}

			t.UI.HighlightArticles(t, insert);

			cible.last().after(insert);
		},

		BuildHome: function(t, json){
			for(var i = 0; i < json.length; i++){
				var article = json[i];
				t.UI.TraceHomeTuileArticle(t, article);
			}
		},

		TraceHomeTuileArticle: function(t, article){
			var insert = $("<div></div>").addClass("tuile").attr("value", article.idArticle);

			var title = $("<div></div>").addClass("tuile_title").text(article.titre);

			var art = article.article;
			var art_html = $("<div></div>").append(art).text();
			var jq_art = $("<div></div>").append(art_html);

			var description = $("<div></div>").addClass("tuile_content").html(jq_art.find("aside"));

			insert.append(title).append(description);
			$("#article").append(insert);
		}
	}
}

var articleContent;
$(document).ready(function(){ articleContent = new Article(); });