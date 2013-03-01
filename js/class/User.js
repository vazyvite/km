function User(){
	this.s = {
		bloc: "#user",
		content: "#user .bloc_content",
		cache: "#user .cache",
		btn_connexion: ".action_user_connexion",
		data: {
			idUser: 0,
			lstName: "",
			fstName: "",
			email: "",
			role: "",
			login: ""
		},
		lang: "FR", // FR, EN
		jqs: {
			idUser: "#userdata_idUser",
			lstName: "#userdata_lstName",
			fstName: "#userdata_fstName",
			email: "#userdata_email",
			role: "#userdata_role",
			login: "#userdata_login"
		},
		cookie: {
			duree: 10,					// Int - Durée de vie du cookie en jours
		},
		dialogue: {
			connexion: null,
			connexionClass: "dialogUserConnexion"
		},
		idRole: Array("00", "01", "10", "11"),
		titleRole: null //Array("Aucun", "Lecteur", "Constributeur", "Administrateur"),
	}

	this.s.titleRole = Lang[this.s.lang].lst.usr_role;

	this.Init();
}

User.prototype = {

	/** 
	 * Méthode Init
	 * Méthode d'initialisation de la class User
	 */
	Init: function(){
		//this.AttachEvents();

		var user = this.Data.GetCookie(this);

		$("#logos").html(Lang["app"].appName + "<span>v" + Lang["app"].appVersion + "</span>");

		if(user.lang != null){
			this.s.lang = user.lang;
		}

		if(user.id != null && user.pass != null){
			this.ConnectById(user.id, user.pass);
		}else{
			this.UI.ConnectText(this, true);
		}
	},

	/** 
	 * Méthode AttachEvents
	 * Méthode d'attachement des évènements associé aux éléments de la class User
	 */
	/*AttachEvents: function(){	var t = this; },*/

	/**
	 * Méthode Connect
	 * Méthode permettant de lancer une action de connexion
	 */
	Connect: function(login, password){
		$.ajax({

			url: "./phpforms/user.connect.php",
			type: "POST",
			data: {login: login, pass: password},
			datatype: "json",
			context: this

		}).done(function(msg){

			if(msg != ""){
				var json = $.parseJSON(msg);
				this.Action.Connect(this, json);
				$("#article .connectBloc").remove();
			}else{		// erreur de connexion
				this.UI.DisplayError(Lang[this.GetLangue()].err.bad_id);
			}
		});
	},

	/**
	 * Méthode ConnectById
	 * Méthode permettant de se connecter à partir de l'id d'un utilisateur ayant une session ouverte
	 * @param id:Int 			correspond à l'identifiant de l'utilisateur à connecter
	 * @param pass:String 		correspond au mot de passe de l'utilisateur à connecter
	 */
	ConnectById: function(id, password){
		$.ajax({

			url: "./phpforms/user.connect.php",
			type: "POST",
			data: {id: id, pass: password},
			datatype: "json",
			context: this

		}).done(function(msg){

			if(msg != ""){
				var json = $.parseJSON(msg);
				this.Action.Connect(this, json);
			}else{		// erreur de connexion
				this.UI.ConnectText(this, true);
			}

		});
	},

	/** 
	 * Méthode Disconnect
	 * Méthode permettant de lancer une action de déconnexion
	 */
	Disconnect: function(){
		this.Action.Disconnect(this);

		$.ajax({
			url: "phpforms/user.disconnect.php",
			type: "POST",
			context: this
		}).done(function(){
			this.UI.ConnectText(this, false);
		});
	},

	/**
	 * Méthode CheckUserAccess
	 * Construction du bloc d'accessibilité
	 * @param lvl:String		Indique le niveau requis pour accéder à la fonctionnalité (00, 01, 10, 11)
	 * @return Boolean 		Retourne true si l'utilisateur à les droits suffisants pour accéder à la fonction, false dans le cas contraire
	 */
	CheckUserAccess: function(lvl){
		var usr = this.s.data;
		var role = parseInt(usr.role);

		if(usr.role == ""){ 
			return false;
		}

		return (role >= parseInt(lvl)) ? true : false;
	},

	/**
	 * Méthode GetLangue
	 * Retourne la langue de l'utilisateur
	 * @return String		Le code de la langue de l'utilisateur
	 */
	GetLangue: function(){
		return this.s.lang;
	},

	GetAllUsers: function(fnCallBack){
		$.ajax({

			url: "phpforms/user.list.php",
			type: "POST",
			context: this

		}).done(function(msg){

			var json = $.parseJSON(msg);
			fnCallBack(json);

		});
	},

	Update: function(data, reload){
		$.ajax({

			url: "phpforms/user.update.php",
			type: "POST", 
			context: this,
			data: { idUser: data.idUser, fstName: data.fstName, lstName: data.lstName, email: data.email, role: data.role, login: data.login, pass: data.pass }

		}).done(function(msg){
			if(data.idUser == this.s.data.idUser){
				this.s.data = data;
				this.UI.UserInfos(this);
			}
			if(reload){
				this.Action.Administration(this);
			}

		});
	},

	Delete: function(id){
		if(id == user.s.data.idUser){
			alert(Lang[user.GetLangue()].msg.err_delete_own_account);
			return false;
		}

		$.ajax({

			url: "phpforms/user.delete.php",
			type: "POST", 
			context: this,
			data: { idUser: id }

		}).done(function(msg){
			this.Action.Administration(this);
		});
	},

	Create: function(data){

		$.ajax({

			url: "phpforms/user.create.php",
			type: "POST", 
			context: this,
			data: { fstName: data.fstName, lstName: data.lstName, email: data.email, role: data.role, login: data.login, pass: data.pass }

		}).done(function(msg){
			this.Action.Administration(this);
		});
	},




	/**
	 * Bloc d'Actions Action
	 * Bloc d'actions liées aux évènements
	 */
	Action: {
		/**
		 * Méthdode Action.Connect
		 * Workflow d'actions de connexion
		 * @param t:Contexte
		 * @param json:JSON 		données de connexion
		 */
		Connect: function(t, json){
			t.Data.Connect(t, json);
			t.UI.UserInfos(t);
			portail.Init();

			menu = new Menu();
			menu.Init();
		},

		/**
		 * Méthdode Action.Disconnect
		 * Workflow d'actions de déconnexion
		 * @param t:Contexte
		 */
		Disconnect: function(t){
			t.Data.Disconnect(t);
			t.UI.UserInfos(t);
			t.UI.ClearInterface(t);

			setTimeout(function(){
				t.UI.DialogConnexion(t);
			}, 1000);

			menu.UI.Clear(menu);
		},

		/**
		 * Méthdode Action.SwitchLanguage
		 * Changement de langage sur l'interface
		 * @param t:Contexte
		 */
		SwitchLanguage: function(t){
			switch(t.s.lang){
				case "EN":
					t.s.lang = "FR"; break;
				case "FR":
				default: 
					t.s.lang = "EN"; break;
			}

			t.Data.SetCookie(t);
			setTimeout(function(){ window.location.reload(); }, 500);
		},

		/**
		 * Méthode Action.AdministrationCategorie
		 * Gestion des Utilisateurs
		 * @param t:Contexte
		 */
		Administration: function(t){
			articleContent.UI.Clear(articleContent);
			var list = Array();

			var users = user.GetAllUsers(function(json){
				var strTabUser = [
				{ title: Lang[user.GetLangue()].lbl.form_id, key: "idUser", width: 5, lim: null, editable: false }, 
				{ title: Lang[user.GetLangue()].lbl.form_fstName, key: "fstName", width: 10, lim: 25, editable: true },
				{ title: Lang[user.GetLangue()].lbl.form_lstName, key: "lstName", width: 10, lim: 25, editable: true },
				{ title: Lang[user.GetLangue()].lbl.form_email, key: "email", width: null, lim: 100, editable: true }, 
				{ title: Lang[user.GetLangue()].lbl.form_role, key: "role", width: 5, lim: 3, editable: true, list: [ {id: "00", name: "Aucun"}, {id: "01", name: "Lecteur"}, {id: "10", name: "Contributeur"}, {id: "11", name: "Administrateur"}] }, 
				{ title: Lang[user.GetLangue()].lbl.form_login, key: "login", width: 10, lim: 25, editable: false }, 
				{ title: Lang[user.GetLangue()].lbl.form_pass, key: "pass", width: 10, lim: 150, editable: true }, 
				{ title: Lang[user.GetLangue()].lbl.form_action, key: null, width: null, lim: null, editable: false }];
			
				articleContent.Action.BuildAdmin(articleContent, json, strTabUser, Lang[user.GetLangue()].lbl.admin_user, "user");
				menu.UI.BuildAdminUser(menu);
			});
		},

		/**
		 * Méthode Action.Create
		 * Création d'Utilisateur
		 * @param t:Contexte
		 * @param caller:jQueryObject 		objet jquery appelant
		 */
		Create: function(t, caller){
			var strTab = [
			{ title: Lang[user.GetLangue()].lbl.form_fstName, key: "fstName", width: 10, lim: 25, editable: true },
			{ title: Lang[user.GetLangue()].lbl.form_lstName, key: "lstName", width: 10, lim: 25, editable: true },
			{ title: Lang[user.GetLangue()].lbl.form_email, key: "email", width: null, lim: 100, editable: true }, 
			{ title: Lang[user.GetLangue()].lbl.form_role, key: "role", width: 5, lim: 3, editable: true, list: [ {id: "00", name: "Aucun"}, {id: "01", name: "Lecteur"}, {id: "10", name: "Contributeur"}, {id: "11", name: "Administrateur"}] }, 
			{ title: Lang[user.GetLangue()].lbl.form_login, key: "login", width: 10, lim: 25, editable: true }, 
			{ title: Lang[user.GetLangue()].lbl.form_pass, key: "pass", width: 10, lim: 150, editable: true }];
			
			popin = new Popin(t.Data.PopinDataUserCreate(t, caller, strTab), strTab, null);
		},
	},




	/**
	 * Bloc d'Actions Data
	 * Bloc d'actions liées à la manipulation des données
	 */
	Data: {
		/**
		 * Méthdode Data.Connect
		 * Workflow de connexion au niveau Data
		 * @param t:Contexte
		 * @param json:JSON 		données de connexion
		 */
		Connect: function(t, json){
			t.Data.SetJSON(t, json);
			t.Data.SetHtml(t);
			t.Data.SetCookie(t);
		},

		/**
		 * Méthdode Data.SetJSONDatas
		 * Associe les userdatas aux éléments JSON de stockage
		 * @param t:Contexte
		 * @param json:JSON 			ensemble des données utilisateur à stocker
		 */
		SetJSON: function(t, json){
			t.s.data = { idUser: json.idUser, lstName: json.lstName, fstName: json.fstName, email: json.email, role: json.role, login: json.login, pass: json.pass };
		},

		/**
		 * Méthdode Data.SetHtmlDatas
		 * Associe les userdatas aux éléments HTML de stockage
		 * @param t:Contexte
		 */
		SetHtml: function(t){
			$(t.s.jqs.idUser).val(t.s.data.idUser);
			$(t.s.jqs.lstName).val(t.s.data.lstName);
			$(t.s.jqs.fstName).val(t.s.data.fstName);
			$(t.s.jqs.email).val(t.s.data.email);
			$(t.s.jqs.role).val(t.s.data.role);
			$(t.s.jqs.login).val(t.s.data.login);
		},

		/** TODO
		 * Méthode Data.SetCookie
		 * Sauvegarde des données utilisateur en cookie
		 * @param t:Contexte
		 */
		SetCookie: function(t){
			var data = t.s.data;
			var cookie = t.s.cookie;
			var date = new Date();
				date.setTime(date.getTime() + (cookie.duree * 86400000));

			if(data.idUser != undefined && data.pass != undefined){
				$.cookie("idCurrentUser", data.idUser, { expires: cookie.duree, path: "/" });
				$.cookie("passUser", data.pass, { expires: cookie.duree, path: "/" });
				$.cookie("UserLang", t.s.lang, { expires: cookie.duree, path: "/" });

				// TODO : Afficher une notification lorsque le cookie a été créé
			}else{
				// TODO : Afficher une notification d'erreur lorsque le cookie n'a pas été créé
			}
		},

		/**
		 * Méthode Data.Disconnect
		 * Workflow de déconnexion au niveau Data
		 * @param t:Contexte
		 */
		Disconnect: function(t){
			t.Data.RemoveData(t);
			t.Data.RemoveCookie(t);
		},

		/**
		 * Méthode Data.RemoveData
		 * Sauvegarde des données utilisateur HTML
		 * @param t:Contexte
		 */
		RemoveData: function(t){
			t.s.data = { idUser: 0, lstName: "", fstName: "", email: "", role: "", login: "" };
			t.Data.SetHtml(t);
		},

		/**
		 * Méthode Data.RemoveCookie
		 * Méthode permettant de supprimer les informations de l'utilisateur dans le cookie
		 * @param t:Contexte
		 */
		RemoveCookie: function(t){
			var cookie = t.s.cookie;
			$.removeCookie("idCurrentUser", { path: '/' });
			$.removeCookie("passUser", { path: '/' });
			$.removeCookie("UserLang", { path: '/' });
		},

		/** 
		 * Méthode Data.GetCookie
		 * Méthode permettant de récupérer l'utilisateur courant à partir d'un cookie pour reconnexion automatique
		 * @param t:Contexte
		 * @return id:Int 				Correspond à l'identifiant de l'utilisateur courant
		 */
		GetCookie: function(t){
			var id, pass;
			var cookie = t.s.cookie;
			var nameID = cookie.key_id + "=";
			var namePASS = cookie.key_pass + "=";
			var ca = document.cookie.split(';');

			return {id: $.cookie("idCurrentUser"), pass: $.cookie("passUser"), lang: $.cookie("UserLang") };
		},

		PopinDataUserEdit: function(t, json, str, reload){
			return {
				title: Lang[user.GetLangue()].lbl.modif + " " + json.fstName + " " + json.lstName,
				content: "",
				cmd: ["valide", "cancel"],
				onValidate: function(){
					var p = $(".popin");
					var data = {
					 	idUser: p.find(".p_" + str[0].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),
					 	fstName: p.find(".p_" + str[1].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),
					 	lstName: p.find(".p_" + str[2].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),
					 	email: p.find(".p_" + str[3].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),
					 	role: p.find(".p_" + str[4].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),
					 	login: p.find(".p_" + str[5].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),
					 	pass: p.find(".p_" + str[6].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val()
					}
					if(data.idUser != "" && data.fstName != "" && data.lstName != "" && data.email != "" && data.role != "" && data.login != "" && data.pass != ""){ 
						user.Update(data, reload);
						popin.Action.Hide(popin);
					}
				},
				onCancel: null, lvlRequise: "11", closeBtn: true, type: "user"
			};
		},

		PopinDataUserDel: function(t, json){
			return {
				title: Lang[user.GetLangue()].msg.confirm_delete_object + "<input class='p_ID' type='hidden' value='" + json.idUser + "' />",
				content: "", cmd: ["valide", "cancel"],
				onValidate: function(){
					var p = $(".popin");
					var id = p.find(".p_ID").val();
					if(id != ""){ user.Delete(id); popin.Action.Hide(popin); }
				},
				onCancel: null, lvlRequise: "11", closeBtn: false, type: "user"
			};
		},

		PopinDataUserCreate: function(t, caller, str){
			return {
				title: Lang[user.GetLangue()].lbl.object_create,
				content: "", cmd: ["valide", "cancel"],
				onValidate: function(){
					var p = $(".popin");

					var data = {
						fstName: p.find(".p_" + str[0].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(), 
						lstName: p.find(".p_" + str[1].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(), 
						email: p.find(".p_" + str[2].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),  
						role: p.find(".p_" + str[3].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),  
						login: p.find(".p_" + str[4].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val(),  
						pass: p.find(".p_" + str[5].key.toUpperCase().replace(/\s+/g, ' ') + " .form_input :input").val() }

					if(data.fstName != "" && data.lstName != "" && data.email != "" && data.role != "" && data.login != "" && data.pass != ""){ 
						user.Create(data);
						popin.Action.Hide(popin);
					}
				},
				onCancel: null, lvlRequise: "11", closeBtn: false, type: "user", caller: caller
			};
		}
	},


				
	/**
	 * Bloc d'Actions UI
	 * Bloc d'actions liées à la construction d'interfaces
	 */
	UI: {
		/**
		 * Méthode UI.ConnectText
		 * Permet d'afficher les commandes de connexion dans le bloc de connexion
		 * @param t:Contexte
		 */
		ConnectText: function(t, showConnectForm){
			var html = "<div class='action_user_connexion'>" + Lang["app"].appName + " <sup>v" + Lang["app"].appVersion + "</sup></div>";
			$(t.s.content).html(html);

			if(showConnectForm){
				t.UI.DialogConnexion(t);
			}
		},

		/**
		 * Méthode DisplayError
		 * Affiche une erreur dans la boite de dialogue
		 * @param error:String		Contenu de l'erreur à afficher
		 */
		DisplayError: function(error){
			$(".connectBloc").find(".dialog_error").html(error).show(300);
		},

		/**
		 * Méthode UI.DialogConnexion
		 * Permet d'afficher la boite de dialogue de connexion
		 * @param t:Contexte
		 */
		DialogConnexion: function(t){
			var parent = $("#article");

			h = $("body").innerHeight() - $("#informations").outerHeight(true) - $("#header").outerHeight(true) - 15;

			var bloc_left = $("<div></div>").addClass('connectBloc left').height(h);
			var bloc_right = $("<div></div>").addClass('connectBloc right').height(h);
			var content = $("<div class='form_connect'><div class='form_line'><div class='form_label'>" + Lang[t.GetLangue()].lbl.log + "</div><div class='form_input'><input type='text' id='user_dialog_login' value='' /></div></div><div class='form_line last'><div class='form_label'>" + Lang[t.GetLangue()].lbl.mdp + "</div><div class='form_input'><input type='password' id='user_dialog_password' value='' /></div></div><div class='dialog_error'></div><div class='form_valid_single'><button class='dialogValidationConnexion'>" + Lang[t.GetLangue()].btn.connect + "</button></div></div>");
			
			content.find("button").on("click", function(){
				var login = $("#user_dialog_login").val();
				var mdp = $("#user_dialog_password").val();
				t.Connect(login, mdp);
			});

			bloc_right.append(content);
			parent.append(bloc_left).append(bloc_right);

			parent.css("opacity", 0).animate({"opacity": 1}, 300);
		},

		HideDialogConnexion: function(t){
			// t.s.dialogue.connexion.Hide($("." + t.s.dialogue.connexionClass));
		},

		/**
		 * Méthode UI.DialogConnexion
		 * Permet d'afficher les informations d'utilisateur connecté
		 * @param t:Contexte
		 */
		UserInfos: function(t){
			var data = t.s.data;
			if(t.s.dialogue.connexion != null){
				t.UI.HideDialogConnexion(t);
			}

			var html = "<div class='user_infos'>" + data.fstName + " " + data.lstName + "</div>";
				html += "<div class='user_role'>" + Lang[t.GetLangue()].lst.usr_role[t.s.idRole.indexOf(data.role)] + "</div>"
				html += "<div class='menu_user'><ul>"
					 + "<li><a class='action_user_compte'>" + Lang[t.GetLangue()].btn.account + "</a></li>"
					 + "<li><a class='action_user_lang'>" + Lang[t.GetLangue()].btn.switch_lang + "</a></li>"
					 + "<li><a class='action_user_deconnexion'>" + Lang[t.GetLangue()].btn.disconnect + "</a></li>"
					 + "</ul></div>";
			$(t.s.content).html(html);
			
			$(t.s.bloc + " .action_user_compte").on("click", function(){ 
				var strTabUser = [
				{ title: Lang[user.GetLangue()].lbl.form_id, key: "idUser", width: 5, lim: null, editable: false }, 
				{ title: Lang[user.GetLangue()].lbl.form_fstName, key: "fstName", width: 10, lim: 25, editable: true },
				{ title: Lang[user.GetLangue()].lbl.form_lstName, key: "lstName", width: 10, lim: 25, editable: true },
				{ title: Lang[user.GetLangue()].lbl.form_email, key: "email", width: null, lim: 100, editable: true }, 
				{ title: Lang[user.GetLangue()].lbl.form_role, key: "role", width: 5, lim: 3, editable: false, list: [ {id: "00", name: "Aucun"}, {id: "01", name: "Lecteur"}, {id: "10", name: "Contributeur"}, {id: "11", name: "Administrateur"}] }, 
				{ title: Lang[user.GetLangue()].lbl.form_login, key: "login", width: 10, lim: 25, editable: false }, 
				{ title: Lang[user.GetLangue()].lbl.form_pass, key: "pass", width: 10, lim: 150, editable: true }];

				popin = new Popin(t.Data.PopinDataUserEdit(t, user.s.data, strTabUser, false), strTabUser, user.s.data);
			});

			$(t.s.bloc + " .action_user_deconnexion").on("click", function(){ 
				t.Disconnect(); 
			});

			$(t.s.bloc + " .action_user_lang").on("click", function(){ 
				t.Action.SwitchLanguage(t);
			});
		},

		/**
		 * Méthode UI.ClearInterface
		 * Nettoyage de l'ensemble de l'interface
		 * @param t:Contexte
		 */
		ClearInterface: function(t){

			if(portail){
				portail.Action.Reset(portail);
			}
			
			if(articleContent){
				articleContent.UI.Close(articleContent);
			}
		}
	}
}


var user;

$(document).ready(function(){
	user = new User();
});