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
		this.GetAllPortail(true, function(){
			// articleContent.GetArticleByUser(user.s.data.idUser, null); // JJA
			articleContent.GetArticleByUser(Data.user.data.idUser, null);
		});
	},

	/** 
	 * Méthode AttachEvents
	 * Méthode d'attachement des évènements associé aux éléments de la class User
	 */
	// AttachEvents: function(){ var t = this; },

	/** 
	 * Méthode GetAllPortail
	 * Affiche la liste des portails disponibles
	 * @param show:Boolean 			true: indique que le résultat doit être affiché, false: le résultat est traité indépendemment
	 * @param fnCallback:function	optionnelle - fonction de callback permettant de récupérer le résultat de l'Ajax
	 */
	GetAllPortail: function(show, fnCallback){
		var lvl = "01";

		if(user.CheckUserAccess(lvl)){

			$.ajax({

				url: "phpforms/portail.list.php",
				type: "POST",
				context: this

			}).done(function(msg){

				if(msg != ""){
					var json = $.parseJSON(msg);

					if(show){
						this.s.listPortail = json;
						this.UI.PortailList(this);
					}
					if(fnCallback != undefined){
						fnCallback(json);
					}
				}
			});
		}
	},

	/**
	 * Méthode Update
	 * Met à jour un portail
	 * @param data:JSON 	données correspondant au portail à modifier
	 */
	Update: function(data){

		$.ajax({

			url: "phpforms/portail.update.php",
			type: "POST", 
			context: this,
			data: {id: data.id, portail: data.portail}

		}).done(function(msg){
			this.Action.Administration(this);
			this.GetAllPortail(true, null);
		});
	},

	/**
	 * Méthode Delete
	 * Supprime un portail
	 * @param id:Int 	Identifiant du portail à supprimer
	 */
	Delete: function(id){

		$.ajax({

			url: "phpforms/portail.delete.php",
			type: "POST", 
			context: this,
			data: {id: id}

		}).done(function(msg){
			this.Action.Administration(this);
			this.GetAllPortail(true, null);
		});
	},

	/**
	 * Méthode Create
	 * Créé un portail
	 * @param p:Int 	nom du portail à créer
	 */
	Create: function(data){

		$.ajax({

			url: "phpforms/portail.create.php",
			type: "POST", 
			context: this,
			data: {portail: data.portail}

		}).done(function(msg){
			this.GetAllPortail(true, null);
		});
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
		Open: function(t, new_portail, fnCallback){
			// var accord = (t.s.data.idPortail != null && new_portail.value != t.s.data.idPortail) ? confirm(Lang[user.GetLangue()].msg.confirm_leave_portail1 + " " + t.s.data.portail + ", " + Lang[user.GetLangue()].msg.confirm_leave_portail2 + " " + new_portail.text + " ?") : true; // JJA
			var accord = (Data.portail.data.idPortail != null && new_portail.value != Data.portail.data.idPortail) ? confirm(Lang[user.GetLangue()].msg.confirm_leave_portail1 + " " + Data.portail.data.portail + ", " + Lang[user.GetLangue()].msg.confirm_leave_portail2 + " " + new_portail.text + " ?") : true;
			// var isNewInterface = (t.s.data.idPortail == null) ? true : false;
			var isNewInterface = (Data.portail.data.idPortail == null) ? true : false;

			t.Data.SetJSON(t, { idPortail: new_portail.value, portail: new_portail.text });

			if(accord && new_portail.value != 0){
				t.UI.PortailInfos(t);
				if(articleContent && !isNewInterface){
					articleContent.UI.Close(articleContent, function(){
						articleContent.GetArticleByUser(Data.user.data.idUser, Data.portail.data.idPortail);
					});
				}else{
					if(!fnCallback && typeof fnCallback != "function"){
						articleContent.GetArticleByUser(Data.user.data.idUser, new_portail.value);
					}else if(typeof fnCallback == "function"){
						fnCallback();
					}

				}
			}

			menu.UI.BuildPortail(menu);
		},

		/**
		 * Méthode Action.Administration
		 * Gestion des Portails
		 * @param t:Contexte
		 */
		Administration: function(t){
			articleContent.UI.Clear(articleContent);

			var strTabPortail = [ 
			{ title: Lang[user.GetLangue()].lbl.form_id, key: "id", width: 10, lim: null, editable: false }, 
			{ title: Lang[user.GetLangue()].lbl.form_portail, key: "portail", width: null, lim: 25, editable: true },
			{ title: Lang[user.GetLangue()].lbl.form_action, key: null, width: null, lim: null, editable: false }];
			
			var data = t.GetAllPortail(false, function(json){
				articleContent.Action.BuildAdmin(articleContent, json, strTabPortail, Lang[user.GetLangue()].lbl.admin_portail, "portail");
				menu.UI.BuildAdminPortail(menu);
			});
		},

		/**
		 * Méthode Action.Create
		 * Création de Portails
		 * @param t:Contexte
		 */
		Create: function(t, caller){
			// articleContent.UI.Clear(articleContent);

			var strTab = [ 
			{ title: Lang[user.GetLangue()].lbl.form_portail, key: "portail", width: null, lim: 25, editable: true }];
			
			popin = new Popin(t.Data.PopinDataPortailCreate(t, caller, strTab), strTab, null);
		},
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
			Data.portail.data = json;
		},

		/**
		 * Méthode Data.SetHTML
		 * Gère les informations concernant le portail sélectionné au niveau HTML
		 * @param t:Contexte
		 */
		SetHTML: function(t){
			$("#portaildata_idPortail").val(Data.portail.data.idPortail);
			$("#portaildata_portail").val(Data.portail.data.portail);
		},

		PopinDataPortailEdit: function(t, json, str){
			return {
				title: Lang[user.GetLangue()].lbl.modif + " " + json.portail,
				content: "",
				cmd: ["valide", "cancel"],
				onValidate: function(){
					var p = $(".popin");
					var data = {
						id: p.find(".p_" + str[0].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),
						portail: p.find(".p_" + str[1].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val()
					}
					if(data.id != "" && data.portail != ""){ portail.Update(data); popin.Action.Hide(popin); }
				},
				onCancel: null, lvlRequise: "11", closeBtn: true, type: "portail"
			};
		},

		PopinDataPortailDel: function(t, json){
			return {
				title: Lang[user.GetLangue()].msg.confirm_delete_object + "<input class='p_ID' type='hidden' value='" + json.id + "' />",
				content: "", cmd: ["valide", "cancel"],
				onValidate: function(){
					var p = $(".popin");
					var id = p.find(".p_ID").val();
					if(id != ""){ portail.Delete(id); popin.Action.Hide(popin); }
				},
				onCancel: null, lvlRequise: "11", closeBtn: false, type: "portail"
			};
		},

		PopinDataPortailCreate: function(t, caller, str){
			return {
				title: Lang[user.GetLangue()].lbl.object_create,
				content: "", cmd: ["valide", "cancel"],
				onValidate: function(){
					var p = $(".popin");
					var data = {
						portail: p.find(".p_" + str[0].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val() }

					if(data.portail != ""){ portail.Create(data); popin.Action.Hide(popin); }
				},
				onCancel: null, lvlRequise: "11", closeBtn: false, type: "portail", caller: caller
			};
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
			bloc_list.children().remove();

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

				if(Data.portail.data.portail != null){

					bloc_info.text(Data.portail.data.portail).attr("value", Data.portail.data.idPortail).parent().addClass("portail_selected");
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