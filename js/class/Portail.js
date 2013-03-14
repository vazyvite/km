function Portail(options){
	this.s = { }
	this.Init();
}

Portail.prototype = {

	/** 
	 * Méthode Init
	 * Méthode d'initialisation de la class User
	 */
	Init: function(){
		this.GetAllPortail(true, function(){
			articleContent.GetArticleByUser(Data.user.data.idUser, null);
		});
	},


	/** 
	 * Méthode GetAllPortail
	 * Affiche la liste des portails disponibles
	 * @param show:Boolean 			true: indique que le résultat doit être affiché, false: le résultat est traité indépendemment
	 * @param fnCallback:function	optionnelle - fonction de callback permettant de récupérer le résultat de l'Ajax
	 */
	GetAllPortail: function(show, fnCallback){
		var lvl = "list";
		var ajaxOptions = {
			url: "phpforms/portail.list.php",
			type: "POST",
			context: this
		};

		if(CheckAccess(lvl)){

			$.ajax(ajaxOptions).done(function(msg){
				var error = false;

				if(msg != ""){
					
					var json = $.parseJSON(msg);

					if($.isArray(json)){
						if(show){
							this.Data.SetListPortail(this, json);
							this.UI.PortailList(this);
							this.UI.PortailInfos(this);
						}

						($.isFunction(fnCallback)) ? fnCallback(json) : $.noop();

					}else{
						error = true;
					}

				}else{
					error = true;
				}

				if(error){
					ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
				}
			});
		}
	},


	/**
	 * Méthode Update
	 * Met à jour un portail en db
	 * @param data:JSON 		données correspondant au portail à modifier
	 * @param refresh:Boolean 	indique si l'interface d'administration doit être raffraichie ou non
	 */
	Update: function(data, refreshAdmin){

		var ajaxOptions = {
			url: "phpforms/portail.update.php",
			type: "POST", 
			context: this,
			data: { id: data.id, portail: data.portail }
		};

		$.ajax(ajaxOptions).done(function(msg){

			if(!msg.length){
				ui.Notify(Lang[user.GetLangue()].msg.success_update_portail_title, Lang[user.GetLangue()].msg.success_update_portail_msg, "success");

			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_update_portail_title, Lang[user.GetLangue()].msg.error_update_portail_msg, "error");
			}

			if(refreshAdmin){
				this.Action.Administration(this);
			}

			this.GetAllPortail(true, $.noop());
		});
	},


	/**
	 * Méthode Delete
	 * Supprime un portail en db
	 * @param id:Int 			Identifiant du portail à supprimer
	 * @param refresh:Boolean 	indique si l'interface d'administration doit être raffraichie ou non
	 */
	Delete: function(id, refreshAdmin){
		var ajaxOptions = {
			url: "phpforms/portail.delete.php",
			type: "POST", 
			context: this,
			data: { id: id }
		};

		$.ajax(ajaxOptions).done(function(msg){

			if(!msg.length){
				ui.Notify(Lang[user.GetLangue()].msg.success_delete_portail_title, Lang[user.GetLangue()].msg.success_delete_portail_msg, "success");

			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_delete_portail_title, Lang[user.GetLangue()].msg.error_delete_portail_msg, "error");
			}

			if(refreshAdmin){
				this.Action.Administration(this);
			}

			this.GetAllPortail(true, $.noop());
		});
	},


	/**
	 * Méthode Create
	 * Enregistre une création de portail en db
	 * @param p:Int 			nom du portail à créer
	 * @param refresh:Boolean 	indique si l'interface d'administration doit être raffraichie ou non
	 */
	Create: function(data, refreshAdmin){
		var ajaxOptions = {
			url: "phpforms/portail.create.php",
			type: "POST", 
			context: this,
			data: { portail: data.portail }
		};

		$.ajax(ajaxOptions).done(function(msg){

			if(!msg.length){
				ui.Notify(Lang[user.GetLangue()].msg.success_create_portail_title, Lang[user.GetLangue()].msg.success_create_portail_msg, "success");

			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_create_portail_title, Lang[user.GetLangue()].msg.error_create_portail_msg, "error");
			}

			if(refreshAdmin){
				this.Action.Administration(this);
			}

			this.GetAllPortail(true, $.noop());
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
			ui.portail.Reset(ui);
			menu.UI.BuildEmpty(menu);
		},


		/** 
		 * Méthode Action.Open
		 * Ouverture d'un portail à partir de la liste des portails
		 * @param t:Contexte
		 * @param new_portail:JSON 			données JSON concernant le portail ouvert
		 * @param fnCallback:Function 		fonction de callback
		 */
		Open: function(t, new_portail, fnCallback){
			var isNewInterface = (Data.portail.data.idPortail == null) ? true : false;
			var accord = true;

			if(Data.portail.data.idPortail != null && new_portail.value != Data.portail.data.idPortail){
				accord = confirm(Lang[user.GetLangue()].msg.confirm_leave_portail1 + " " + Data.portail.data.portail + ", " + Lang[user.GetLangue()].msg.confirm_leave_portail2 + " " + new_portail.text + " ?");
			}

			if(accord && new_portail.value != 0){

				t.Data.SetJSON(t, { idPortail: new_portail.value, portail: new_portail.text });
				t.UI.PortailInfos(t);

				// A REVOIR
				// si on est en train de visionner un article, on ferme l'article et qu'il n'y a aucun portail de sélectionné
				if(articleContent && !isNewInterface && !$.isFunction(fnCallback)){

					ui.article.Close(ui, function(){
						articleContent.GetArticleByUser(Data.user.data.idUser, Data.portail.data.idPortail);
					});

				}

				if(!$.isFunction(fnCallback)){
					articleContent.GetArticleByUser(Data.user.data.idUser, new_portail.value);
				}else{
					fnCallback();
				}
			}

			menu.UI.BuildPortail(menu);
		},


		/**
		 * Méthode Action.Administration
		 * Génération de la page d'administration des portails
		 * @param t:Contexte
		 */
		Administration: function(t){
			ui.article.Clear(ui);
			
			t.GetAllPortail(false, function(json){
				admin.BuildAdmin(json, t.Data.GetDataStructurePortail(t, "admin"), Lang[user.GetLangue()].lbl.admin_portail, "portail");
				menu.UI.BuildAdminPortail(menu);
			});
		},


		/**
		 * Méthode Action.Create
		 * Appel à la popin de création de portail
		 * @param t:Contexte
		 * @param caller:jQueryObject		objet jquery à l'origine de l'appel à la méthode 
		 */
		Create: function(t, caller){
			var strTab = t.Data.GetDataStructurePortail(t, "create");
			popin = new Popin(t.Data.PopinDataPortailCreate(t, caller, strTab), strTab, null);
		},
	},



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


		/**
		 * Méthode Data.PopinDataPortailEdit
		 * Retourne les informations nécessaires à la création de la popin d'édition des portails
		 * @param t:Context
		 * @param json:JSON 	données du portail en édition
		 * @param str:Array 	structure des données
		 * @return JSON 		données de la popin
		 */
		PopinDataPortailEdit: function(t, json, str){
			return {
				title: Lang[user.GetLangue()].lbl.modif + " " + json.portail,
				content: "",
				cmd: ["valide", "cancel"],
				onValidate: function(){
					var p = $(".popin");
					var data = { id: p.find(".p_" + str[0].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(), portail: p.find(".p_" + str[1].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val() };
					if(data.id != "" && data.portail != ""){ portail.Update(data, ($(".admin_title").size()) ? true : false); popin.Action.Hide(popin); }
				},
				onCancel: null, lvlRequise: "admin", closeBtn: true, type: "portail"
			};
		},


		/**
		 * Méthode Data.PopinDataPortailDel
		 * Retourne les informations nécessaires à la création de la popin de suppression des portails
		 * @param t:Context
		 * @param json:JSON 	données du portail en édition
		 * @return JSON 		données de la popin
		 */
		PopinDataPortailDel: function(t, json){
			return {
				title: Lang[user.GetLangue()].msg.confirm_delete_object + "<input class='p_ID' type='hidden' value='" + json.id + "' />",
				content: "", cmd: ["valide", "cancel"],
				onValidate: function(){
					var id = $(".popin").find(".p_ID").val();
					if(id != ""){ portail.Delete(id, ($(".admin_title").size()) ? true : false); popin.Action.Hide(popin); }
				},
				onCancel: null, lvlRequise: "admin", closeBtn: false, type: "portail"
			};
		},


		/**
		 * Méthode Data.PopinDataPortailCreate
		 * Retourne les informations nécessaires à la création de la popin de création des portails
		 * @param t:Context
		 * @param caller:jQueryObject 	object jquery à l'origine de la demande de création
		 * @return JSON 				données de la popin
		 */
		PopinDataPortailCreate: function(t, caller, str){
			return {
				title: Lang[user.GetLangue()].lbl.object_create,
				content: "", cmd: ["valide", "cancel"],
				onValidate: function(){
					var data = { portail: $(".popin").find(".p_" + str[0].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val() };
					if(data.portail != ""){ 
						portail.Create(data, ($(".admin_title").size()) ? true : false);
						popin.Action.Hide(popin); 
					}
				},
				onCancel: null, lvlRequise: "admin", closeBtn: false, type: "portail", caller: caller
			};
		},

		
		/**
		 * Méthode Data.SetListPortail
		 * Renseigne la liste des portails
		 * @param t:Context
		 * @param json:JSON 	données contenant la liste des portails
		 */
		SetListPortail: function(t, json){
			Data.portail.list = json;
		},


		/**
		 * Méthode Data.GetListPortail
		 * Récupère la liste des portails
		 * @param t:Context
		 * @return json:JSON 	données contenant la liste des portails
		 */
		GetListPortail: function(t){
			return Data.portail.list;
		},


		/**
		 * Méthode Data.GetDataStructurePortail
		 * Retourne la structure des données associées au type d'action
		 * @param t:Context
		 * @return type:String 		type d'action permettant de récupérer la bonne structure de données
		 */
		GetDataStructurePortail: function(t, type){
			var str;
			switch(type){
				case "admin":
					str = [
					{ title: Lang[user.GetLangue()].lbl.form_id, key: "id", width: 10, lim: null, editable: false }, 
					{ title: Lang[user.GetLangue()].lbl.form_portail, key: "portail", width: null, lim: 25, editable: true },
					{ title: Lang[user.GetLangue()].lbl.form_action, key: null, width: null, lim: null, editable: false }];
					break;

				case "create": 
					str = [
					{ title: Lang[user.GetLangue()].lbl.form_portail, key: "portail", width: null, lim: 25, editable: true }];
					break;

				default: break;
			}

			return str;
		}
	},


	UI: {
		 /**
		 * Méthode UI.PortailList
		 * Affiche la liste des portails
		 * @param t:Context
		 */
		PortailList: function(t){
			var lvl = "list";
			var listPortail = t.Data.GetListPortail();
			var bloc_list = $("#portail .bloc_content .menu_portail");

			ui.portail.ClearList(ui);

			if(!$.isEmptyObject(listPortail) && CheckAccess(lvl)){

				bloc_list.append("<ul></ul>");

				for(var i = 0; i < listPortail.length; i++){
					var portail = listPortail[i];
					var insert = $("<li></li>").attr("value", portail.id).text(portail.portail);

					bloc_list.find("ul").append(insert);
				}

				bloc_list.find("ul").find("li").on("click", function(){
					t.Action.Open(t, { value: $(this).val(), text: $(this).text() });
				});

			}else if($.isEmptyObject(listPortail) && CheckAccess(lvl)){

				ui.Notify(Lang[user.GetLangue()].msg.error_no_portail_title, Lang[user.GetLangue()].msg.error_no_portail_msg, "error");
			}
		},


		/**
		 * Méthode UI.PortailInfos
		 * Gère les informations et le libellé du portail sélectionné
		 * @param t:Contexte
		 */
		PortailInfos: function(t){
			var lvl = "show";
			var bloc_info = $("#portail .bloc_content .portail_infos");

			if(CheckAccess(lvl)){

				if(Data.portail.data.portail != null && Data.portail.data.idPortail != null){

					bloc_info.text(Data.portail.data.portail).attr("value", Data.portail.data.idPortail).parent().addClass("portail_selected");
					t.Data.SetHTML(t);
					ui.ShowReferenceBloc();

				}else{ // aucun portail sélectionné
					bloc_info.text(Lang[user.GetLangue()].lbl.portail_select).removeAttr("value").parent().removeClass("portail_selected");
				}

			}else{
				bloc_info.text("").removeAttr("value").parent().removeClass("portail_selected");
			}
		}
	}
}

var portail;

/*$(document).ready(function(){
	portail = new Portail();
});*/