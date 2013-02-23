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

	Action: {
		/**
		 * Méthode Action.Edit
		 * Lance le workflow d'édition de l'article
		 * @param t:Contexte
		 */
		Edit: function(t){
			var lvl = "10";
			var article = $("#article");
			var infos = $("#informations");

			if(user.CheckUserAccess(lvl)){
				article.find('.article_content').redactor({ focus: true });
				article.find('.article_title').replaceWith( "<input type='text' class='article_title_edit' value='" + article.find('.article_title').text() + "' />" );
				//article.find('.article_listMotCles').replaceWith( "<input type='text' class='article_title_edit' value='" + article.find('.article_title').text() + "' />" );

				$(".article_title_edit").watermark(Lang[user.GetLangue()].lbl.title);

				infos.find('button.btn_modif').hide();
				infos.find('button.btn_save').show();
			}
		},

		/**
		 * Méthode Action.Save
		 * Lance le workflow de sauvegarde de l'article
		 * @param t:Contexte
		 */
		Save: function(t){
			var lvl = "10";
			var article = $("#article");
			var infos = $("#informations");

			if(user.CheckUserAccess(lvl)){
				
				var content = article.find(".article_content").getText();
				var titre = article.find(".article_title_edit").val();
				// var motcle = "";

				article.find('.article_title_edit').replaceWith( "<div class='article_title'>" + titre + "</div>" );
				article.find('.article_content').destroyEditor();

				infos.find('button.btn_modif').show();
				infos.find('button.btn_save').hide();

				t.s.data = {
					titre: titre,
					article: content,
					// motcles: Array[2],
				};
			}
		}
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
		 */
		Build: function(t, json){
			t.UI.Clear(t);
			t.UI.Header(t, json);
			t.UI.Content(t, json);
			t.UI.Commands(t, json);
			t.UI.HideLogo(t);
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

			for(var i = 0; i < json.motcles.length; i++){
				var motcle = $("<a></a>").addClass("motcle").attr("value", json.motcles[i].idMotCle).text(json.motcles[i].motcle);
				mc.append(motcle);

				motcle.on("click", function(){ 
					recherche.SetRecherche($(this).text());
				});
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
			var insert = $("<div></div>").addClass("article_content").html(json.article);
			$(t.s.bloc).append(insert);

			insert.height($(t.s.bloc).outerHeight(true) - ($(t.s.blocCmd).outerHeight(true)));
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
			var access = t.UI.Accessibility(t);
			var commands = $(t.s.blocCmd);
			
			if(retour != null){ commands.append(retour); }
			if(modif != null){ commands.append(modif); }
			if(save != null){ commands.append(save); }
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
				btnClose = $("<button class='return_btn'>" + Lang[user.GetLangue()].btn.back + "</button>").on("click", function(){ t.UI.Close(t); });
			}
			return btnClose;
		},

		/**
		 * Méthode UI.nModifier
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
					t.Action.Edit(t);
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
					t.Action.Save(t);
				});
			}
			return btnSave;
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
		Close: function(t){
			t.Data.SetJSON(t, null);
			$("#content").css({"position": "absolute"}).animate({"right":-5000}, 500, function(){ $(this).css({"position": "absolute","right":0}); t.UI.Clear(t) });
			t.UI.ShowLogo(t);
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
		}
	}
}

var articleContent;
$(document).ready(function(){ articleContent = new Article(); });