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
				if($.isFunction(fnCallBack)){
					fnCallBack();
				}else{
					t.CallBacks.cb_HideReferenceBloc(t);
				}
			});
			content.animate({ "width": $(window).width() }, 300, "swing");
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
			this.HideReferenceBloc();
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
		 * Suppression de tous les éléments relatifs à un article
		 * @param t:Context
		 */
		Clear: function(t){
			$("#article, #informations, #title").children().remove();
		}
	},

	navigation: {

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