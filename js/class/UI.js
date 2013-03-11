function UI(){
	this.s = {

	}

	this.Init();
}

UI.prototype = {
	Init: function(){

	},


	/**
	 * Méthode ShowReferenceBloc
	 * Affiche le bloc de référence et ajuste le bloc de contenu
	 * @param fnCallBack:Function 		fonction de callback [optionnel]
	 */
	ShowReferenceBloc: function(fnCallBack){
		var lvl = "show";
		var ref = $("#reference");
		var content = $("#content");
		var t = this;

		if(CheckAccess(lvl)){

			navigation = new Navigation();
			recherche = new Recherche();

			if(!ref.is(":visible")){
				ref.show().css({ "left": -ref.outerWidth(true) }).animate({ "left": 0 }, 300, "swing");
				content.animate({ "width": $(window).width() - ref.outerWidth(true) }, 300, "swing", function(){
					if($.isFunction(fnCallBack)){
						fnCallBack();
					}else{
						t.CallBacks.cb_ShowReferenceBloc(this);
					}
				});
			}
		}
	},

	/**
	 * Méthode UI.HideReferenceBloc
	 * Cache le bloc de référence et ajuste le bloc de contenu
	 * @param fnCallBack:Function 		fonction de callback [optionnel]
	 */
	HideReferenceBloc: function(fnCallBack){
		var ref = $("#reference");
		var content = $("#content");
		var t = this;

		if(ref.is(":visible")){
			ref.css({ "left": 0 }).animate({ "left": -ref.outerWidth(true) }, 300, "swing", function(){
				t.CallBacks.cb_HideReferenceBloc(t);

				if($.isFunction(fnCallBack)){
					fnCallBack();
				}
			});
			content.animate({ "width": $(window).width() }, 300, "swing");

		}else{
			if($.isFunction(fnCallBack)){
				fnCallBack();
			}
		}
	},


	GetCurrentStateUI: function(){
		
		var current_state = "";
		
		if(Data.user.data.idUser == 0){
			// aucun utilisateur connecté
			current_state = { id: 0, label: "connexion" };

		}else if(Data.portail.data == null && $(".admin_content").size() == 0){
			// un utilisateur est connecté mais aucun portail sélectionné ni de page d'administration
			current_state = { id: 1, label: "Home" };

		}else if(Data.portail.data == null && $(".admin_content").size()){
			// un utilisateur est connecté mais aucun portail sélectionné mais une page d'administation
			current_state = { id: 2, label: "AdminPortail" };

		/*}else if($(".admin_content").size()){
			// un utilisateur est connecté mais aucun portail sélectionné mais une page d'administation
			current_state = { id: 3, label: "AdminUser" };*/

		}else if($(".admin_content").size() == 0 && $(".article_content").size() == 0){
			// un utilisateur est connecté, un portail est sélectionné mais aucun article sélectionné ni d'écran d'administration
			current_state = { id: 4, label: "PortailScreen" };

		}else if($(".article_content").size()){
			// un utilisateur est connecté, un portail est sélectionné et un article est présent
			current_state = { id: 5, label: "Article" };

		}else if($(".admin_content").size()){
			// un utilisateur est connecté, un portail est séleciotnné et un écran d'administration est présent
			current_state = { id: 6, label: "AdminCategorie" };
		/*}else if($(".admin_content").size()){
			// un utilisateur est connecté, un portail est sélectionné, un écran d'administration est présent
			current_state = { id: 7, label: "EditArticle" };
		
		}else if($(".admin_content").size()){
			// un utilisateur est connecté, un portail est sélectionné, un écran d'administration est présent
			current_state = { id: 7, label: "CreateArticle" };*/
		}
	},


	/**
	 * Méthode Notify
	 * Lance une notification
	 * @param text:String 		texte affiche dans la notification
	 * @param type:String		type de notification (alert, success, error, warning, information, confirm)
	 */
	Notify: function(title, text, type){
		$.pnotify({
			title: title,
    		text: text,
			type: type
		});
	},

	/**
	 * Méthode DrawVersionInLogos
	 * Indique la version de l'application à côté du logo
	 * @param t:Context
	 */
	DrawVersionInLogos: function(t){
		$("#logos").html(Lang["app"].appName + "<span>v" + Lang["app"].appVersion + "</span>");
	},

	ClearInterface: function(t, fnCallback){

		if(portail){
			portail.Action.Reset(portail);
		}
		
		//this.article.Close(this);
		if(articleContent){
			articleContent.UI.Close(articleContent);
		}

		if(menu){
			menu.UI.Clear(menu);
		}

		t.HideReferenceBloc(fnCallback);
	},

	/**
	 * Méthode ShowLogo
	 * Affiche le logo
	 * @param t:Contexte
	 */
	ShowLogo: function(t){
		$("#logos").css("opacity", 0).show().animate({"opacity": 1}, 1000);
	},

	/**
	 * Méthode HideLogo
	 * Cache le logo
	 * @param t:Contexte
	 */
	HideLogo: function(t){
		$("#logos").animate({"opacity": 0}, 100, function(){
			$(this).hide().css("opacity", 1); 
		});
	},


	portail: {
		/**
		 * Méthode portail.Reset
		 * Remise à 0 de l'UI portails
		 * @param t:Context
		 */
		Reset: function(t){

			// on récupère les informations de portail par défault (message de sélection)
			portail.UI.PortailInfos(portail);

			// nettoyage de la liste des portails
			t.portail.ClearList(t);

			// on reconstruit la liste des portails après nettoyage
			portail.UI.PortailList(portail);

			// on cache l'interface de référence inutile dans ce cas
			t.HideReferenceBloc();
		},

		/**
		 * Méthode portail.ClearList
		 * Supprime les éléments de la liste des portails
		 * @param t:Context
		 */
		ClearList: function(t){
			$("#portail .bloc_content .menu_portail").children().remove();
		}
	},

	article: {
		/**
		 * Méthode article.Clear
		 * Suppression de tous les éléments relatifs à l'UI d'un article
		 * @param t:Context
		 */
		Clear: function(t){
			$("#article, #informations, #title").children().remove();
		},


		/**
		 * Méthode article.Close
		 * Referme les éléments constitutifs d'un article
		 * @param t:Context
		 */
		Close: function(t, fnCallback){
			var art_elts = $(".article_content, .article_header");

			articleContent.Data.SetJSON(t, null);
			// $("#content").css({"position": "absolute"}).animate({"right":-5000}, 500, function(){ 

			if(art_elts.size()){
				art_elts.css({"position": "absolute"}).animate({"right":-5000}, 500, function(){ 
					$(this).css({"position": "absolute","right":0});
					// t.UI.Clear(t);
					t.article.Clear(t);
					t.ShowLogo(t);

					if($.isFunction(fnCallback)) { fnCallback(); }
				});

			}else{
				t.article.Clear(t);
				t.ShowLogo(t);

				if($.isFunction(fnCallback)) { fnCallback(); }
			}
		}
	},

	navigation: {
		/**
		 * Méthode navigation.Clear
		 * Suppression de tous les éléments relatifs à l'UI de navigation
		 * @param t:Context
		 */
		Clear: function(t){
			$("#navigation").children().remove();
		},

		/**
		 * Méthode navigation.Refresh
		 * Mise à jour du bloc de navigation
		 * @param t:Context
		 * @param show:Boolean 			indique s'il faut afficher la liste des catégories après le traitement
		 * @param fnCallback:Function 	fonction de callback [optionnelle]
		 */
		Refresh: function(t, show, fnCallback){
			fnCallback = ($.isFunction(fnCallback)) ? fnCallback : $.noop;
			navigation.GetNavigation(show, fnCallback);
		}
	},

	recherche: {
		/**
		 * Méthode recherche.ClearInput
		 * Vidage de l'input de recherche
		 * @param t:Context
		 * @param terms:String 		chaine de caractères recherchée à insérer dans l'input de recherche 
		 **/
		ClearInput: function(t, terms){
			$.watermark.hide(".searchInput");
			$(".searchInput input").val(terms);
		},

		/**
		 * Méthode recherche.Clear
		 * Vidage du bloc de recherche
		 * @param t:Context 
		 **/
		Clear: function(t){
			$("#recherche").children().remove();
		}
	},

	menu: {
		/**
		 * Méthode menu.Clear
		 * Vidage du bloc de menu
		 * @param t:Context 
		 **/
		Clear: function(t){
			$("#menu ul").children().remove();
		}
	},
	
	CallBacks: {
		/**
		 * Méthode CallBacks.cb_ShowReferenceBLoc
		 * fonction de callback de ShowReferenceBloc
		 * @param t:Context
		 */
		cb_ShowReferenceBloc: function(t){ },


		/**
		 * Méthode CallBacks.cb_HideReferenceBloc
		 * fonction de callback de HideReferenceBloc
		 * @param t:Context
		 */
		cb_HideReferenceBloc: function(t){
			$("#reference").hide();
			recherche.Action.Reset(recherche);
			navigation.Action.Reset(navigation);
		},
	}
}

var ui;
$(document).ready(function(){
	ui = new UI();
});