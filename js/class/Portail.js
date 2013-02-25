function Portail(options){
	this.s = {
		bloc: "#portail",
		content: "#portail .bloc_content",
		cache: "#portail .cache",
		listPortail: null,
		jqs: {
			idPortail: "#portaildata_idPortail",
			portail: "#portaildata_portail"
		},
		data: {
			idPortail: null,
			portail: null
		}
	}

	this.Init();
}

Portail.prototype = {

	/** 
	 * Méthode Init
	 * Méthode d'initialisation de la class User
	 */
	Init: function(){
		this.GetAllPortail();
	},

	/** 
	 * Méthode AttachEvents
	 * Méthode d'attachement des évènements associé aux éléments de la class User
	 */
	// AttachEvents: function(){ var t = this; },

	/** 
	 * Méthode GetAllPortail
	 * Affiche la liste des portails disponibles
	 */
	GetAllPortail: function(){
		var lvl = "01";

		if(user.CheckUserAccess(lvl)){

			$.ajax({

				url: "phpforms/portail.list.php",
				type: "POST",
				context: this

			}).done(function(msg){

				if(msg != ""){
					var json = $.parseJSON(msg);
					this.s.listPortail = json;
					this.UI.PortailList(this);
				}
			});
		}
	},



	/**
	 * Bloc Action
	 * Méthodes concernant les actions
	 */
	Action: {
		/**
		 * Méthode Action.Reset
		 * Reset l'affichage et les données du portail
		 * @param t:Contexte
		 */
		Reset: function(t){
			t.Data.SetJSON(t, { idPortail: null, portail: null });
			t.Data.SetHTML(t);
			t.UI.Reset(t);
			menu.UI.BuildEmpty(menu);
		},

		/** 
		 * Méthode Action.Open
		 * Ouverture d'un portail
		 * @param t:Contexte
		 * @param element:JSON 		Informations sur le nouveau portail
		 */
		Open: function(t, new_portail){
			var accord = (t.s.data.idPortail != null && new_portail.value != t.s.data.idPortail) ? confirm(Lang[user.GetLangue()].msg.confirm_leave_portail1 + " " + t.s.data.portail + ", " + Lang[user.GetLangue()].msg.confirm_leave_portail2 + " " + new_portail.text + " ?") : true;
			var isNewInterface = (t.s.data.idPortail == null) ? true : false;

			t.Data.SetJSON(t, { idPortail: new_portail.value, portail: new_portail.text });

			if(accord && new_portail.value != 0){
				t.UI.PortailInfos(t);
				if(articleContent && !isNewInterface){
					articleContent.UI.Close(articleContent);
				}
			}

			menu.UI.BuildPortail(menu);
		}
	},


	/**
	 * Bloc Data
	 * Méthodes concernant les données
	 */
	Data: {
		/**
		 * Méthode Data.SetJSON
		 * Gère les informations concernant le portail sélectionné au niveau HTML
		 * @param t:Contexte
		 * @param json:JSON 			données JSON du portail sélectionné
		 */
		SetJSON: function(t, json){
			t.s.data = { idPortail: json.idPortail, portail: json.portail };
		},

		/**
		 * Méthode Data.SetHTML
		 * Gère les informations concernant le portail sélectionné au niveau HTML
		 * @param t:Contexte
		 */
		SetHTML: function(t){
			$("#portaildata_idPortail").val(t.s.data.idPortail);
			$("#portaildata_portail").val(t.s.data.portail);
		}
	},



	/**
	 * Bloc UI
	 * Méthodes concernant l'UI
	 */
	UI: {
		/**
		 * Méthode UI.PortailList
		 * Affiche la liste des portails sous forme de selectbox
		 * @param t:Contexte
		 */
		PortailList: function(t){
			var lvl = "01";
			var insert, bloc_list;

			bloc_list = $(t.s.content).find(".menu_portail");

			if(t.s.listPortail != null && user.CheckUserAccess(lvl)){

				bloc_list.append("<ul></ul>");

				for(var i = 0; i < t.s.listPortail.length; i++){
					var portail = t.s.listPortail[i];
					insert = "<li value='" + portail.id + "'>" + portail.portail + "</li>";
					bloc_list.find("ul").append(insert);
				}

				t.UI.PortailInfos(t);

				// navigation = new Navigation();

				$(".portail_action_select li").on("click", function(){
					t.Action.Open(t, { value: $(this).val(), text: $(this).text() });
				});
			}else{
				bloc_list.html(null);
			}
		},

		/**
		 * Méthode UI.PortailInfos
		 * Gère les informations concernant le portail sélectionné
		 * @param t:Contexte
		 */
		PortailInfos: function(t){
			var lvl = "01";
			var bloc_info = $(t.s.content).find(".portail_infos");

			if(user.CheckUserAccess(lvl)){

				if(t.s.data.portail != null){

					bloc_info.text(t.s.data.portail).attr("value", t.s.data.idPortail).parent().addClass("portail_selected");
					t.Data.SetHTML(t);
					t.UI.ShowInterface(t);

				}else{ // aucun portail sélectionné
					bloc_info.text(Lang[user.GetLangue()].lbl.portail_select).removeAttr("value").parent().removeClass("portail_selected");
				}
			}else{
				bloc_info.text("").removeAttr("value").parent().removeClass("portail_selected");
			}
		},

		/**
		 * Méthode UI.ShowInterface
		 * Affiche l'ensemble de l'interface à la sélection d'un portail
		 * @param t:Contexte
		 */
		ShowInterface: function(t){
			var lvl = "01";
			var ref = $("#reference");
			var content = $("#content");

			if(user.CheckUserAccess(lvl)){

				navigation = new Navigation();
				recherche = new Recherche();

				if(!ref.is(":visible")){
					ref.show().css({ "left": -ref.outerWidth(true) }).animate({ "left": 0 }, 300, "swing");
					content.animate({ "width": $(window).width() - ref.outerWidth(true) }, 300, "swing");
				}
			}
		},

		/**
		 * Méthode UI.HideInterface
		 * Cache l'ensemble de l'interface à la désélection d'un portail
		 * @param t:Contexte
		 */
		HideInterface: function(t){
			var ref = $("#reference");
			var content = $("#content");

			if(ref.is(":visible")){
				ref.css({ "left": 0 }).animate({ "left": -ref.outerWidth(true) }, 300, "swing", function(){ ref.hide(); recherche.Action.Reset(recherche); navigation.Action.Reset(navigation); });
				content.animate({ "width": $(window).width() }, 300, "swing");
			}
		},

		/**
		 * Méthode UI.Reset
		 * Reset l'affichage
		 * @param t:Contexte
		 */
		Reset: function(t){
			$(t.s.content).find(".menu_portail").children().remove();
			t.UI.PortailInfos(t);
			t.UI.PortailList(t);
			t.UI.HideInterface(t);
		}
	}
}

var portail;

$(document).ready(function(){
	portail = new Portail();
});