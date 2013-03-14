function Admin(){}

Admin.prototype = {
	/**
	 * Méthode UI.BuildAdmin
	 * Workflow de construction de la page d'administration
	 * @param t:Contexte
	 * @param json:JSON 			données concernant les portails
	 * @param strTab:Array[JSON] 	données concernant la structure du tableau
	 * @param titre:String 			titre de la popin
	 * @param type:String 			type de popin : domaine auquel elle s'applique (user | portail | categorie)
	 */
	BuildAdmin: function(json, strTab, titre, type){
		var lvl = "admin";
		var table = this.UI.TableAdmin(this, strTab);

		if(table != null && CheckAccess(lvl)){
			for(var i = 0; i < json.length; i++){
				var line = this.UI.LineTableAdmin(this, strTab, json[i], type);
				if(line != null){ table.find("tbody").append(line); }
			}

			this.UI.AdminTitle(this, titre);
			this.UI.AdminContent(this, table);
		}
	},

	Data: {
		/**
		 * Méthode Data.ReturnDataFormTypeOfAdmin
		 * Retourne les données nécessaires à la construction d'une ligne d'administration en fonction du type d'administration
		 * @param t:Contexte
		 * @param json:JSON 	Données d'administration
		 * @param type:String 	Type d'administration
		 * @param str:Array 	Structure des données
		 * @return :JSON 		Données pour les popins d'administration
		 */
		ReturnDataFormTypeOfAdmin: function(t, json, type, str){
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
		}
	},

	UI: {
		/**
		 * Méthode UI.TableAdmin
		 * Constuction de la table d'administration des portails
		 * @param t:Contexte
		 * @param str:Array[String] 	Structure de la table d'administration des portails
		 * @return table:jQueryObject 	objet jquery contenant le tableau d'administration
		 */
		TableAdmin: function(t, str){
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
		},


		/**
		 * Méthode UI.LineTableAdmin
		 * Constuction d'une ligne du tableau d'administration des portails
		 * @param t:Contexte
		 * @param str:Array[String] 	Structure de la table d'administration des portails
		 * @param json:JSON 	 		Données du portail à afficher
		 * @param type:String 			Type d'administration (user | portail | categorie)
		 * @param line:jQueryObject 	objet jquery contenant la ligne du tableau d'administration
		 */
		LineTableAdmin: function(t, str, json, type){
			var line = null;
			var lvl = "admin";
			var page = "portail"
			var popin_data_edit, popin_data_del;

			if(str.length && CheckAccess(lvl)){

				line = ($("<tr value='" + json.id + "'></tr>"));

				for(var i = 0; i < str.length; i++){

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
			var lvl = "admin";
			
			if(CheckAccess(lvl) && title != ""){
				var insert = $("<div></div>").addClass("admin_title").html(title);
				$("#article").append(insert);
			}
		},


		/**
		 * Méthode AdminContent
		 * Construction du contenu des pages d'administration
		 * @param t:Contexte
		 * @parma section:jQueryObject 	Contenu de la page
		 */
		AdminContent: function(t, section){
			var lvl = "admin";

			if(CheckAccess(lvl) && title != ""){
				var insert = $("<div></div>").addClass("admin_content").html(section);
				$("#article").append(insert);
			}
		},


		/**
		 * Méthode AdminBtnEdit
		 * Construction des boutons de modification des pages d'administration
		 * @param t:Contexte
		 * @param page:String 			type de page (categorie | user | portail)
		 * @param popin_data:JSON 		données de la popin
		 * @param str:String 			structures de données
		 * @param json:JSON 			données d'administration
		 * @return insert:jQueryObject 	object jquery contenant le bouton d'édition du tableau d'administration
		 */
		AdminBtnEdit: function(t, page, popin_data, str, json){
			var lvl = "admin";
			var insert = null;

			if(CheckAccess(lvl)){
				insert = $("<a></a>").addClass(page + " btn_edit");
				insert.on("click", function(){
					popin = new Popin(popin_data, str, json);
				});
				$("#article").append(insert);
			}

			return insert;
		},


		/**
		 * Méthode AdminBtnDel
		 * Construction des boutons de suppression des pages d'administration
		 * @param t:Contexte
		 * @param page:String 		type de page (categorie | user | portail)
		 * @param popin_data:JSON 	données de la popin
		 * @return insert:jQueryObject 	object jquery contenant le bouton de suppression du tableau d'administration
		 */
		AdminBtnDel: function(t, page, popin_data){
			var lvl = "admin";
			var insert = null;

			if(CheckAccess(lvl)){
				insert = $("<a></a>").addClass(page + " btn_del");
				insert.on("click", function(){
					popin = new Popin(popin_data, null, null);
				});
				$("#article").append(insert);
			}

			return insert;
		},
	}
}

var admin;

$(document).ready(function(){
	admin = new Admin();
});