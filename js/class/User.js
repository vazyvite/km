function User(){
	this.s = {
		lang: "FR", // FR, EN
		cookie: { 
			duree: 10,					// Int - Durée de vie du cookie en jours
		},
		idRole: Array("00", "01", "10", "11")
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
		var user = this.Data.GetCookie(this);

		ui.DrawVersionInLogos(ui);

		this.SetLangue(user.lang);

		if(user.id != null && user.pass != null){
			this.ConnectById(user.id, user.pass);
		}else{
			this.UI.ConnectText(this, true);
		}
	},


	/** 
	 * Méthode SetLangue
	 * Associe la langue à l'utilisateur
	 * @param langue:String 	Code langue
	 */
	SetLangue: function(langue){
		this.s.lang = (langue != null) ? langue : "FR";
	},


	/**
	 * Méthode GetLangue
	 * Retourne la langue courante de l'utilisateur
	 * @return String		Le code de la langue de l'utilisateur
	 */
	GetLangue: function(){
		return this.s.lang;
	},


	/**
	 * Méthode Connect
	 * Méthode permettant de lancer une action de connexion
	 * @param login:String 		identifiant de l'utilisateur
	 * @param password:String 	mot de passe de l'utilisateur
	 */
	Connect: function(login, password){
		$.ajax({

			url: "./phpforms/user.connect.php",
			type: "POST",
			data: { login: login, pass: password },
			datatype: "json",
			context: this

		}).done(function(msg){

			if(msg != ""){
				var json = $.parseJSON(msg);

				if($.isPlainObject(json) && !$.isEmptyObject(json)){

					this.Action.Connect(this, json);
					$("#article .connectBloc").remove();

				}else{
					ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
				}

			}else{
				this.UI.DisplayError(Lang[this.GetLangue()].err.bad_id);
			}
		});
	},


	/**
	 * Méthode ConnectById
	 * Méthode permettant de se connecter à partir de l'id d'un utilisateur ayant une session ouverte
	 * @param id:Int 				correspond à l'identifiant de l'utilisateur à connecter
	 * @param password:String 		correspond au mot de passe de l'utilisateur à connecter
	 */
	ConnectById: function(id, password){
		$.ajax({

			url: "./phpforms/user.connect.php",
			type: "POST",
			data: {id: id, pass: password},
			datatype: "json",
			context: this

		}).done(function(msg){
			var error = false;

			if(msg != ""){
				var json = $.parseJSON(msg);

				if($.isPlainObject(json) && !$.isEmptyObject(json)){

					this.Action.Connect(this, json);
				}else{
					error = true;
					ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
				}

			}else{
				error = true;
				this.UI.DisplayError(Lang[this.GetLangue()].err.bad_id);
			}

			if(error){
				this.UI.ConnectText(this, true);
			}
		});
	},


	/** 
	 * Méthode Disconnect
	 * Méthode permettant de lancer une action de déconnexion
	 */
	Disconnect: function(){
		$.ajax({

			url: "phpforms/user.disconnect.php",
			type: "POST",
			context: this

		}).done(function(){

			this.Action.Disconnect(this);
			this.UI.ConnectText(this, false);

		});
	},


	/** 
	 * Méthode GetAllUsers
	 * Méthode permettant de récupérer tous les utilisateurs
	 * @param fnCallback:Function 		fonction de callback
	 */
	GetAllUsers: function(fnCallback){
		$.ajax({

			url: "phpforms/user.list.php",
			type: "POST",
			context: this

		}).done(function(msg){

			if(msg != ""){
				var json = $.parseJSON(msg);

				if($.isArray(json)){

					if($.isFunction(fnCallback)){
						fnCallback(json);
					}else{
						$.noop();
					}

				}else{
					ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
				}

			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_no_user_title, Lang[user.GetLangue()].msg.error_no_user_msg, "error");
			}
		});
	},


	/** 
	 * Méthode Update
	 * Méthode modifier en base un utilisateur
	 * @param data:JSON 		données concerntant l'utilisateur modifié
	 * @param reload:Boolean 	indique si on doit recharger l'écran d'administration après l'opération
	 */
	Update: function(data, isAdmin){
		$.ajax({

			url: "phpforms/user.update.php",
			type: "POST", 
			context: this,
			data: { idUser: data.idUser, fstName: data.fstName, lstName: data.lstName, email: data.email, role: data.role, login: data.login, pass: data.pass }

		}).done(function(msg){

			if(msg == ""){
				
				if(data.idUser == Data.user.data.idUser){
					Data.user.data = data;
					this.UI.UserInfos(this);
				}

				if(isAdmin){
					this.Action.Administration(this);
				}
				ui.Notify(Lang[user.GetLangue()].msg.success_update_user_title, Lang[user.GetLangue()].msg.success_update_user_msg, "success");
			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_update_user_title, Lang[user.GetLangue()].msg.error_update_user_msg, "error");
			}
		});
	},


	/** 
	 * Méthode Delete
	 * Méthode supprimer en base un utilisateur
	 * @param id:Int 			identifiant de l'utilisateur
	 * @param isAdmin:Boolean 	indique si la page d'administration doit être rechargée après le traitement
	 */
	Delete: function(id, isAdmin){

		if(id == Data.user.data.idUser){
			alert(Lang[user.GetLangue()].msg.err_delete_own_account);
			return false;
		}

		$.ajax({

			url: "phpforms/user.delete.php",
			type: "POST", 
			context: this,
			data: { idUser: id }

		}).done(function(msg){

			if(msg != ""){
				
				if(isAdmin){
					this.Action.Administration(this);
				}
				ui.Notify(Lang[user.GetLangue()].msg.success_delete_user_title, Lang[user.GetLangue()].msg.success_delete_user_msg, "success");
			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_delete_user_title, Lang[user.GetLangue()].msg.error_delete_user_msg, "error");
			}
		});
	},


	/** 
	 * Méthode Create
	 * Méthode créer en base un utilisateur
	 * @param data:JSON 			Données de l'utilisateur
	 * @param isAdmin:Boolean 		indique si la page d'administration doit être rechargée après le traitement
	 */
	Create: function(data, isAdmin){

		$.ajax({

			url: "phpforms/user.create.php",
			type: "POST", 
			context: this,
			data: { fstName: data.fstName, lstName: data.lstName, email: data.email, role: data.role, login: data.login, pass: data.pass }

		}).done(function(msg){

			if(msg == ""){
				
				if(isAdmin){
					this.Action.Administration(this);
				}
				ui.Notify(Lang[user.GetLangue()].msg.success_create_user_title, Lang[user.GetLangue()].msg.success_create_user_msg, "success");
			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_create_user_title, Lang[user.GetLangue()].msg.error_create_user_msg, "error");
			}
		});
	},


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

			portail = new Portail();
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
			ui.ClearInterface(ui, function(){
				t.UI.DialogConnexion(t);
			});
		},


		/**
		 * Méthdode Action.SwitchLanguage
		 * Changement de langage sur l'interface
		 * @param t:Contexte
		 */
		SwitchLanguage: function(t){

			switch(t.s.lang){
				case "EN":
					t.s.lang = "FR";
					break;

				case "FR":
				default: 
					t.s.lang = "EN";
					break;
			}

			t.Data.SetCookie(t);

			setTimeout(function(){ 
				window.location.reload(); 
			}, 500);
		},


		/**
		 * Méthode Action.AdministrationCategorie
		 * Gestion des Utilisateurs
		 * @param t:Contexte
		 */
		Administration: function(t){
			ui.article.Clear(ui);

			var users = user.GetAllUsers(function(json){
				admin.BuildAdmin(json, t.Data.GetDataStructureUser(t, "admin"), Lang[user.GetLangue()].lbl.admin_user, "user");
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
			var strTab = t.Data.GetDataStructureUser(t, "create");
			popin = new Popin(t.Data.PopinDataUserCreate(t, caller, strTab), strTab, null);
		},
	},


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
			Data.user.data = {
				idUser: json.idUser,
				lstName: json.lstName,
				fstName: json.fstName,
				email: json.email,
				role: json.role,
				login: json.login,
				pass: json.pass
			};
		},


		/**
		 * Méthdode Data.SetHtmlDatas
		 * Associe les userdatas aux éléments HTML de stockage
		 * @param t:Contexte
		 */
		SetHtml: function(t){
			$("#userdata_idUser").val(Data.user.data.idUser);
			$("#userdata_lstName").val(Data.user.data.lstName);
			$("#userdata_fstName").val(Data.user.data.fstName);
			$("#userdata_email").val(Data.user.data.email);
			$("#userdata_role").val(Data.user.data.role);
			$("#userdata_login").val(Data.user.data.login);
		},


		/**
		 * Méthode Data.SetCookie
		 * Sauvegarde des données utilisateur en cookie
		 * @param t:Contexte
		 */
		SetCookie: function(t){
			var data = Data.user.data;
			var cookie = t.s.cookie;
			var date = new Date();
				date.setTime(date.getTime() + (cookie.duree * 86400000));

			if(data.idUser != undefined && data.pass != undefined){
				$.cookie("idCurrentUser", data.idUser, { expires: cookie.duree, path: "/" });
				$.cookie("passUser", data.pass, { expires: cookie.duree, path: "/" });
				$.cookie("UserLang", t.s.lang, { expires: cookie.duree, path: "/" });

				ui.Notify(Lang[user.GetLangue()].msg.success_create_cookie_title, Lang[user.GetLangue()].msg.success_create_cookie_msg, "success");
			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_create_cookie_title, Lang[user.GetLangue()].msg.error_create_cookie_msg, "error");
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
			Data.user.data = { idUser: 0, lstName: "", fstName: "", email: "", role: "", login: "" };
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
			ui.Notify(Lang[user.GetLangue()].msg.success_remove_cookie_title, Lang[user.GetLangue()].msg.success_remove_cookie_msg, "success");
		},


		/** 
		 * Méthode Data.GetCookie
		 * Méthode permettant de récupérer l'utilisateur courant à partir d'un cookie pour reconnexion automatique
		 * @param t:Contexte
		 */
		GetCookie: function(t){
			var id, pass;
			var cookie = t.s.cookie;
			var nameID = cookie.key_id + "=";
			var namePASS = cookie.key_pass + "=";
			var ca = document.cookie.split(';');

			return { id: $.cookie("idCurrentUser"), pass: $.cookie("passUser"), lang: $.cookie("UserLang") };
		},


		/** 
		 * Méthode PopinDataUserEdit
		 * Retourne les données nécessaires à la création de la popin d'édition des utilisateurs
		 * @param t:Context
		 * @param json:JSON 		données de l'utilisateur
		 * @param str:Array 		structure des données
		 */
		PopinDataUserEdit: function(t, json, str){
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

					if(verifyData(data)){
					// if(data.idUser != "" && data.fstName != "" && data.lstName != "" && data.email != "" && data.role != "" && data.login != "" && data.pass != ""){ 
						user.Update(data, ($(".admin_title").size()) ? true : false);
						popin.Action.Hide(popin);
					}
				},
				onCancel: null, lvlRequise: "admin", closeBtn: true, type: "user"
			};
		},


		/** 
		 * Méthode PopinDataUserDel
		 * Retourne les données nécessaires à la création de la popin de suppression des utilisateurs
		 * @param t:Context
		 * @param json:JSON 		données de l'utilisateur
		 */
		PopinDataUserDel: function(t, json){
			return {
				title: Lang[user.GetLangue()].msg.confirm_delete_object + "<input class='p_ID' type='hidden' value='" + json.idUser + "' />",
				content: "", cmd: ["valide", "cancel"],
				onValidate: function(){
					var id = $(".popin").find(".p_ID").val();
					if(id != ""){ 
						user.Delete(id, ($(".admin_title").size()) ? true : false); 
						popin.Action.Hide(popin); 
					}
				},
				onCancel: null, lvlRequise: "admin", closeBtn: false, type: "user"
			};
		},


		/** 
		 * Méthode PopinDataUserCreate
		 * Retourne les données nécessaires à la création de la popin de création des utilisateurs
		 * @param t:Context
		 * @param caller:jQueryObject 	objet jquery à l'origine de l'appel de la méthode
		 * @param str:Array 			structure des données
		 */
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

					if(verifyData(data)){
					// if(data.fstName != "" && data.lstName != "" && data.email != "" && data.role != "" && data.login != "" && data.pass != ""){ 
						user.Create(data, ($(".admin_title").size()) ? true : false);
						popin.Action.Hide(popin);
					}
				},
				onCancel: null, lvlRequise: "admin", closeBtn: false, type: "user", caller: caller
			};
		},


		/**
		 * Méthode Data.GetDataStructureUser
		 * Gère les données nécessaires à la création de la popin de création des catégories
		 * @param t:Contexte
		 * @param type:String 		indique le contexte des données (admin | create)
		 */
		GetDataStructureUser: function(t, type){
			var str;

			switch(type){
				case "admin":
					str = [
					{ title: Lang[user.GetLangue()].lbl.form_id, key: "idUser", width: 5, lim: null, editable: false }, 
					{ title: Lang[user.GetLangue()].lbl.form_fstName, key: "fstName", width: 10, lim: 25, editable: true },
					{ title: Lang[user.GetLangue()].lbl.form_lstName, key: "lstName", width: 10, lim: 25, editable: true },
					{ title: Lang[user.GetLangue()].lbl.form_email, key: "email", width: null, lim: 100, editable: true }, 
					{ title: Lang[user.GetLangue()].lbl.form_role, key: "role", width: 5, lim: 3, editable: true, list: [ {id: "00", name: "Aucun"}, {id: "01", name: "Lecteur"}, {id: "10", name: "Contributeur"}, {id: "11", name: "Administrateur"}] }, 
					{ title: Lang[user.GetLangue()].lbl.form_login, key: "login", width: 10, lim: 25, editable: false }, 
					{ title: Lang[user.GetLangue()].lbl.form_pass, key: "pass", width: 10, lim: 150, editable: true }, 
					{ title: Lang[user.GetLangue()].lbl.form_action, key: null, width: null, lim: null, editable: false }];
					break;

				case "create":
					str = [
					{ title: Lang[user.GetLangue()].lbl.form_fstName, key: "fstName", width: 10, lim: 25, editable: true },
					{ title: Lang[user.GetLangue()].lbl.form_lstName, key: "lstName", width: 10, lim: 25, editable: true },
					{ title: Lang[user.GetLangue()].lbl.form_email, key: "email", width: null, lim: 100, editable: true }, 
					{ title: Lang[user.GetLangue()].lbl.form_role, key: "role", width: 5, lim: 3, editable: true, list: [ {id: "00", name: "Aucun"}, {id: "01", name: "Lecteur"}, {id: "10", name: "Contributeur"}, {id: "11", name: "Administrateur"}] }, 
					{ title: Lang[user.GetLangue()].lbl.form_login, key: "login", width: 10, lim: 25, editable: true }, 
					{ title: Lang[user.GetLangue()].lbl.form_pass, key: "pass", width: 10, lim: 150, editable: true }];
					break;

				case "account":
					str = [
					{ title: Lang[user.GetLangue()].lbl.form_id, key: "idUser", width: 5, lim: null, editable: false }, 
					{ title: Lang[user.GetLangue()].lbl.form_fstName, key: "fstName", width: 10, lim: 25, editable: true },
					{ title: Lang[user.GetLangue()].lbl.form_lstName, key: "lstName", width: 10, lim: 25, editable: true },
					{ title: Lang[user.GetLangue()].lbl.form_email, key: "email", width: null, lim: 100, editable: true }, 
					{ title: Lang[user.GetLangue()].lbl.form_role, key: "role", width: 5, lim: 3, editable: false, list: [ {id: "00", name: "Aucun"}, {id: "01", name: "Lecteur"}, {id: "10", name: "Contributeur"}, {id: "11", name: "Administrateur"}] }, 
					{ title: Lang[user.GetLangue()].lbl.form_login, key: "login", width: 10, lim: 25, editable: false }, 
					{ title: Lang[user.GetLangue()].lbl.form_pass, key: "pass", width: 10, lim: 150, editable: true }];
					break;

				default: break;
			}

			return str;
		}
	},


	UI: {
		/**
		 * Méthode UI.ConnectText
		 * Permet d'afficher les commandes de connexion dans le bloc de connexion
		 * @param t:Contexte
		 * @param showConnectForm:Boolean 	Indique s'il faut afficher la boite de dialogue de connexion
		 */
		ConnectText: function(t, showConnectForm){
			var html = "<div class='action_user_connexion'>" + Lang["app"].appName + " <sup>v" + Lang["app"].appVersion + "</sup></div>";
			$("#user .bloc_content").html(html);

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
			$(".connectBloc .dialog_error").html(error).show(300);
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


		/**
		 * Méthode UI.UserInfos
		 * Permet d'afficher les informations d'utilisateur connecté
		 * @param t:Contexte
		 */
		UserInfos: function(t){
			var data = Data.user.data;

			var html = "<div class='user_infos'>" + data.fstName + " " + data.lstName + "</div>";
				html += "<div class='user_role'>" + Lang[t.GetLangue()].lst.usr_role[t.s.idRole.indexOf(data.role)] + "</div>"
				html += "<div class='menu_user'><ul>"
					 + "<li><a class='action_user_compte'>" + Lang[t.GetLangue()].btn.account + "</a></li>"
					 + "<li><a class='action_user_lang'>" + Lang[t.GetLangue()].btn.switch_lang + "</a></li>"
					 + "<li><a class='action_user_deconnexion'>" + Lang[t.GetLangue()].btn.disconnect + "</a></li>"
					 + "</ul></div>";
			$("#user .bloc_content").html(html);
			
			$("#user .action_user_compte").on("click", function(){ 
				var strTab = t.Data.GetDataStructureUser(t, "account");
				popin = new Popin(t.Data.PopinDataUserEdit(t, Data.user.data, strTab), strTab, Data.user.data);
			});

			$("#user .action_user_deconnexion").on("click", function(){ 
				t.Disconnect(); 
			});

			$("#user .action_user_lang").on("click", function(){ 
				t.Action.SwitchLanguage(t);
			});
		}
	}
}


var user;

$(document).ready(function(){
	user = new User();
});