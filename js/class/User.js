function User(){
	this.settings = {
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
			key_id: "idCurrentUser",	// String - Nom de la clé utilisée dans le cookie pour identifier l'utilisateur
			key_pass: "passUser"		// String - Nom de la clé utilisée dans le cookie pour le mot de passe de l'utilisateur
		},
		dialogue: {
			connexion: null,
			connexionClass: "dialogUserConnexion"
		},
		idRole: Array("00", "01", "10", "11"),
		titleRole: Array("Aucun", "Lecteur", "Constributeur", "Administrateur"),
	}

	this.Init();
}

User.prototype = {

	/** 
	 * Méthode Init
	 * Méthode d'initialisation de la class User
	 */
	Init: function(){
		this.AttachEvents();

		var user = this.GetCurrentIdUserInfos();
		if(user.id != null && user.pass != null){
			this.ConnectById(user.id, user.pass);
		}else{
			this.UI.Connect(this);
		}
	},

	/** 
	 * Méthode AttachEvents
	 * Méthode d'attachement des évènements associé aux éléments de la class User
	 */
	AttachEvents: function(){
		var t = this;
		$(this.settings.btn_connexion).live("click", function(){
			t.UI.DialogConnexion(t);
		});
	},

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
				this.settings.data = {
					idUser: json.idUser,
					lstName: json.lstName,
					fstName: json.fstName,
					email: json.email,
					role: json.role,
					login: json.login,
					pass: json.pass
				};

				this.SetHtmlDatas(json);
				this.SaveCurrentIdUserInfos();
				this.settings.dialogue.connexion.Hide($("." + this.settings.dialogue.connexionClass));
				this.UI.UserInfos(this);
			}else{		// erreur de connexion
				this.settings.dialogue.connexion.DisplayError("identifiants incorrects");
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
				this.settings.data = {
					idUser: json.idUser,
					lstName: json.lstName,
					fstName: json.fstName,
					email: json.email,
					role: json.role,
					login: json.login,
					pass: json.pass
				};

				this.SetHtmlDatas();
				this.SaveCurrentIdUserInfos();
				this.UI.UserInfos(this);
			}else{		// erreur de connexion
				this.UI.Connect(this);
			}
		});
	},

	/**
	 * Méthdode SetHtmlDatas
	 * Associe les userdatas aux éléments HTML de stockage
	 * @param data:JSON 			ensemble des données utilisateur à stocker
	 **/
	SetHtmlDatas: function(){
		$(this.settings.jqs.idUser).val(this.settings.data.idUser);
		$(this.settings.jqs.lstName).val(this.settings.data.lstName);
		$(this.settings.jqs.fstName).val(this.settings.data.fstName);
		$(this.settings.jqs.email).val(this.settings.data.email);
		$(this.settings.jqs.role).val(this.settings.data.role);
		$(this.settings.jqs.login).val(this.settings.data.login);
	},

	/** 
	 * Méthode Disconnect
	 * Méthode permettant de lancer une action de déconnexion
	 */
	Disconnect: function(){
		this.settings.data = { idUser: 0, lstName: "", fstName: "", email: "", role: "", login: "" };
		this.SetHtmlDatas();
		this.DeleteCurrentUserInfos();

		$.ajax({
			url: "phpforms/user.disconnect.php",
			type: "POST",
			context: this
		}).done(function(){
			this.UI.Connect(this);
		});
	},

	/** TODO
	 * Méthode SaveCurrentUser
	 * Méthode permettant de sauvegarder l'utilisateur courant dans un cookie pour reconnexion automatique ultérieure
	 * @param id:Int 			correspond à l'id de l'utilisateur à sauvegarder
	 */
	SaveCurrentIdUserInfos: function(){
		if(this.settings.data.idUser != undefined && this.settings.data.pass != undefined){

			var date = new Date();
				date.setTime(date.getTime() + (this.settings.cookie.duree * 24 * 60 * 60 * 1000));

			$.cookie(this.settings.cookie.key_id, this.settings.data.idUser, { expires: this.settings.cookie.duree, path: "/" });
			$.cookie(this.settings.cookie.key_pass, this.settings.data.pass, { expires: this.settings.cookie.duree, path: "/" });

			// TODO : Afficher une notification lorsque le cookie a été créé
		}else{
			// TODO : Afficher une notification d'erreur lorsque le cookie n'a pas été créé
		}
	},

	/** 
	 * Méthode GetCurrentUser
	 * Méthode permettant de récupérer l'utilisateur courant à partir d'un cookie pour reconnexion automatique
	 * @return id:Int 				Correspond à l'identifiant de l'utilisateur courant
	 */
	GetCurrentIdUserInfos: function(){
		var nameID = this.settings.cookie.key_id + "=";
		var namePASS = this.settings.cookie.key_pass + "=";
		var ca = document.cookie.split(';');
		var id, pass;

		id = $.cookie(this.settings.cookie.key_id);
		pass = $.cookie(this.settings.cookie.key_pass);

		return {id: id, pass: pass};
	},

	/**
	 * Méthode DeleteCurrentUserInfos
	 * Méthode permettant de supprimer les informations de l'utilisateur dans le cookie
	 */
	DeleteCurrentUserInfos: function(){
		$.removeCookie(this.settings.cookie.key_id, { path: '/' });
		$.removeCookie(this.settings.cookie.key_pass, { path: '/' });
	},


	/**
	 * Bloc d'Actions UI
	 * Bloc d'actions liées à la construction d'interfaces
	 */
	UI: {
		/**
		 * Méthode UI.Connect
		 * Permet d'afficher les commandes de connexion dans le bloc de connexion
		 * @param t:Context 		Correspond au context this de la class
		 */
		Connect: function(t){
			var html = "<div class='action_user_connexion'>Connexion</div>";
			$(t.settings.content).html(html);
		},

		/**
		 * Méthode UI.DialogConnexion
		 * Permet d'afficher la boite de dialogue de connexion
		 * @param t:Context 		Correspond au context this de la class
		 */
		DialogConnexion: function(t){
			t.settings.dialogue.connexion = new Dialog({
				title: "Connexion", 
				content:"<div class='form_line'><div class='form_label'>Login :</div><div class='form_input'><input type='text' id='user_dialog_login' value='' /></div></div><div class='form_line last'><div class='form_label'>Mot de passe : </div><div class='form_input'><input type='password' id='user_dialog_password' value='' /></div></div><div class='form_valid_single'><button class='dialogValidationConnexion'>Connexion</button></div>",
				class: t.settings.dialogue.connexionClass,
				modal: true,
				type: 1 // UserConnexion
			});
		},

		/**
		 * Méthode UI.DialogConnexion
		 * Permet d'afficher les informations d'utilisateur connecté
		 * @param t:Context 		Correspond au context this de la class
		 */
		UserInfos: function(t){
			var html = "<div class='user_infos'>" + t.settings.data.fstName + " " + t.settings.data.lstName + "</div>";
				html += "<div class='user_role'>" + t.settings.titleRole[t.settings.idRole.indexOf(t.settings.data.role)] + "</div>"
				html += "<div class='menu_user'><ul><li><a class='action_user_compte'>Compte</a></li><li><a class='action_user_deconnexion'>Déconnexion</a></li></ul></div>";
			$(t.settings.content).html(html);
			$(t.settings.bloc + " .action_user_deconnexion").on("click", function(){ t.Disconnect(); });
		}
	}
}


var user;

$(document).ready(function(){
	user = new User();
});