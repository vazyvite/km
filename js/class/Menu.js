function Menu(options){
	this.s = {
		bloc: "#menu"
	}

	this.Init();
}

Menu.prototype = {
	/**
	 * Méthode Init
	 * Initialisation class Menu
	 */
	Init: function(){
		this.UI.BuildEmpty(this);
		// this.AttachEvents();
	},

	/**
	 * Méthode AttachEvents
	 * Attache des évènements class Menu
	 */
	// AttachEvents: function(){ },

	Action: {},
	Data: {},




	/**
	 * Bloc UI
	 * Gestion de l'interface
	 */
	UI: {

		/** obsolète
		 * Méthode UI.Build
		 * Constuction du menu
		 * @param t:Context
		 */
		Build: function(t){
			t.UI.Clear(t);
			if(Data.user.data.role != null){
				var retour = t.UI.Btn_Home(t);

				var adminPortail = t.UI.Btn_AdminPortail(t);
				var delPortail = t.UI.Btn_DelPortail(t);
				var editPortail = t.UI.Btn_EditPortail(t);
				var addPortail = t.UI.Btn_AddPortail(t);

				var adminCategorie = t.UI.Btn_AdminCategorie(t);
				var delCategorie = t.UI.Btn_DelCategorie(t);
				var editCategorie = t.UI.Btn_EditCategorie(t);
				var addCategorie = t.UI.Btn_AddCategorie(t);

				var addArticle = t.UI.Btn_AddArticle(t);

				var adminUser = t.UI.Btn_AdminUser(t);
				var addUser = t.UI.Btn_AddUser(t);
				var delUser = t.UI.Btn_DelUser(t);
				var editUser = t.UI.Btn_EditUser(t);

				var m = $(t.s.bloc).find("ul");

				if(retour != null) { m.append(retour); }
				if(adminPortail != null) { m.append(adminPortail); }
				if(addPortail != null) { m.append(addPortail); }
				if(delPortail != null) { m.append(delPortail); }
				if(editPortail != null) { m.append(editPortail); }
				if(adminCategorie != null) { m.append(adminCategorie); }
				if(addCategorie != null) { m.append(addCategorie); }
				if(delCategorie != null) { m.append(delCategorie); }
				if(editCategorie != null) { m.append(editCategorie); }
				if(addArticle != null) { m.append(addArticle); }
				if(adminUser != null) { m.append(adminUser); }
				if(addUser != null) { m.append(addUser); }
				if(delUser != null) { m.append(delUser); }
				if(editUser != null) { m.append(editUser); }
			}
		},

		/**
		 * Méthode UI.BuildEmpty
		 * Constuction du menu lorsque l'écran est vide
		 * @param t:Context
		 */
		BuildEmpty: function(t){
			t.UI.Clear(t);
			if(Data.user.data.role != null){
				var adminPortail = t.UI.Btn_AdminPortail(t);
				var addPortail = t.UI.Btn_AddPortail(t);
				var adminUser = t.UI.Btn_AdminUser(t);

				var m = $(t.s.bloc).find("ul");

				if(adminPortail != null) { m.append(adminPortail); }
				if(addPortail != null) { m.append(addPortail); }
				if(adminUser != null) { m.append(adminUser); }
			}
		},

		/**
		 * Méthode UI.BuildCategorie
		 * Constuction du menu lorsque l'on est en visionnage d'article
		 * @param t:Context
		 */
		BuildCategorie: function(t){
			t.UI.Clear(t);
			if(Data.user.data.role != null){
				var retour = t.UI.Btn_Home(t);
				// var addArticle = t.UI.Btn_AddArticle(t);
				var adminUser = t.UI.Btn_AdminUser(t);
				// var editCategorie = t.UI.Btn_EditCategorie(t);

				var m = $(t.s.bloc).find("ul");

				if(retour != null) { m.append(retour); }
				// if(editCategorie != null) { m.append(editCategorie); }
				// if(addArticle != null) { m.append(addArticle); }
				if(adminUser != null) { m.append(adminUser); }
			}
		},

		/**
		 * Méthode UI.BuildPortail
		 * Constuction du menu lorsque l'on est en écran de portail (sans article)
		 * @param t:Context
		 */
		BuildPortail: function(t){
			t.UI.Clear(t);
			if(Data.user.data.role != null){
				var retour = t.UI.Btn_Home(t);
				var adminCategorie = t.UI.Btn_AdminCategorie(t);
				var addCategorie = t.UI.Btn_AddCategorie(t);
				var addArticle = t.UI.Btn_AddArticle(t);
				var adminUser = t.UI.Btn_AdminUser(t);
				// var editPortail = t.UI.Btn_EditPortail(t);

				var m = $(t.s.bloc).find("ul");

				if(retour != null) { m.append(retour); }
				// if(editPortail != null) { m.append(editPortail); }
				if(adminCategorie != null) { m.append(adminCategorie); }
				if(addCategorie != null) { m.append(addCategorie); }
				if(addArticle != null) { m.append(addArticle); }
				if(adminUser != null) { m.append(adminUser); }
			}
		},

		/**
		 * Méthode UI.BuildAdminPortail
		 * Constuction du menu lorsque l'on est en écran d'administration des portails
		 * @param t:Context
		 */
		BuildAdminPortail: function(t){
			t.UI.Clear(t);
			if(Data.user.data.role != null){
				var retour = t.UI.Btn_Home(t);
				var addPortail = t.UI.Btn_AddPortail(t);
				var adminUser = t.UI.Btn_AdminUser(t);

				var m = $(t.s.bloc).find("ul");

				if(retour != null) { m.append(retour); }
				if(addPortail != null) { m.append(addPortail); }
				if(adminUser != null) { m.append(adminUser); }
			}
		},

		/**
		 * Méthode UI.BuildAdminCategorie
		 * Constuction du menu lorsque l'on est en écran d'administration des catégories
		 * @param t:Context
		 */
		BuildAdminCategorie: function(t){
			t.UI.Clear(t);
			if(Data.user.data.role != null){
				var retour = t.UI.Btn_Home(t);
				var addCategorie = t.UI.Btn_AddCategorie(t);
				var adminUser = t.UI.Btn_AdminUser(t);

				var m = $(t.s.bloc).find("ul");

				if(retour != null) { m.append(retour); }
				if(addCategorie != null) { m.append(addCategorie); }
				if(adminUser != null) { m.append(adminUser); }
			}
		},

		/**
		 * Méthode BuildAdminUser
		 * Construction du menu lorsque l'on est en écran d'administration des utilisateurs
		 * @param t:Contexte
		 */
		BuildAdminUser: function(t){
			t.UI.Clear(t);
			if(Data.user.data.role != null){
				var retour = t.UI.Btn_Home(t);
				var addUser = t.UI.Btn_AddUser(t);
				// var adminUser = t.UI.Btn_AdminUser(t);

				var m = $(t.s.bloc).find("ul");

				if(retour != null) { m.append(retour); }
				// if(adminUser != null) { m.append(adminUser); }
				if(addUser != null) { m.append(addUser); }
			}
		},

		/**
		 * Méthode UI.Btn_Home
		 * Création du bouton de retour à la page d'accueil
		 * @param t:Contexte
		 */
		Btn_Home: function(t){
			var lvl = "show";
			var btn = null;
			var idPortail = null;

			if(CheckAccess(lvl)){
				btn = $("<li class='bouton retour' title='" + Lang[user.GetLangue()].btn.out_portail + "'></li>").on("click", function(){
					portail.Action.Reset(portail);

					if(articleContent){
						articleContent.UI.Close(articleContent, function(){
							if(Data.portail && Data.portail.data && Data.portail.data.idPortail != null){
								idPortail = portail.s.data.idPortail;
							}else{
								idPortail = null;
							}

							articleContent.GetArticleByUser(Data.user.data.idUser, idPortail);
						});
					}

					t.UI.BuildEmpty(t);
				});
			}
			return btn;
		},

		/**
		 * Méthode UI.Btn_AdminCategorie
		 * Création du bouton d'administation de Catégorie
		 * @param t:Contexte
		 */
		Btn_AdminCategorie: function(t){
			var lvl = "admin";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<li class='bouton admin_categorie' title='" + Lang[user.GetLangue()].btn.admin_categorie + "'></li>").on("click", function(){
					navigation.Action.Administration(navigation);
				});
			}
			return btn;
		},

		/**
		 * Méthode UI.Btn_AddCategorie
		 * Création du bouton d'ajout de Catégorie
		 * @param t:Contexte
		 */
		Btn_AddCategorie: function(t){
			var lvl = "create";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<li class='bouton add_categorie' title='" + Lang[user.GetLangue()].btn.add_categorie + "'></li>").on("click", function(){
					navigation.Action.Create(navigation, $(this));
				});
			}
			return btn;
		},

		/**
		 * Méthode UI.Btn_DelCategorie
		 * Création du bouton de suppression de Catégorie
		 * @param t:Contexte
		 */
		Btn_DelCategorie: function(t){
			var lvl = "admin";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<li class='bouton del_categorie' title='" + Lang[user.GetLangue()].btn.del_categorie + "'></li>").on("click", function(){
					// Action
				});
			}
			return btn;
		},

		/**
		 * Méthode UI.Btn_EditCategorie
		 * Création du bouton de modification de Catégorie
		 * @param t:Contexte
		 */
		Btn_EditCategorie: function(t){
			var lvl = "admin";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<li class='bouton edit_categorie' title='" + Lang[user.GetLangue()].btn.edit_categorie + "'></li>").on("click", function(){
					// Action
				});
			}
			return btn;
		},

		/**
		 * Méthode UI.Btn_AjoutArticle
		 * Constuction du bouton d'ajout d'Article
		 * @param t:Context
		 */
		Btn_AddArticle: function(t){
			var lvl = "edit";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<li class='bouton add_article' title='" + Lang[user.GetLangue()].btn.add_article + "'></li>").on("click", function(){ 
					articleContent.Action.BuildCreate(articleContent);
				});
			}
			return btn;
		},

		/**
		 * Méthode UI.Btn_GestionPortail
		 * Constuction du bouton de gestion de Portail
		 * @param t:Context
		 */
		Btn_AdminPortail: function(t){
			var lvl = "admin";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<li class='bouton admin_portail' title='" + Lang[user.GetLangue()].btn.admin_portail + "'></li>").on("click", function(){ 
					portail.Action.Administration(portail);
				});
			}
			return btn;
		},

		/**
		 * Méthode UI.Btn_AjoutArticle
		 * Constuction du bouton d'ajout de Portail
		 * @param t:Context
		 */
		Btn_AddPortail: function(t){
			var lvl = "create";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<li class='bouton add_portail' title='" + Lang[user.GetLangue()].btn.add_portail + "'></li>").on("click", function(){ 
					portail.Action.Create(portail, $(this));
				});
			}
			return btn;
		},

		/**
		 * Méthode UI.Btn_AjoutArticle
		 * Constuction du bouton d'ajout de Portail
		 * @param t:Context
		 */
		Btn_DelPortail: function(t){
			var lvl = "admin";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<li class='bouton del_portail' title='" + Lang[user.GetLangue()].btn.del_portail + "'></li>").on("click", function(){ 
					// t.Action.Save(t, false);
				});
			}
			return btn;
		},

		/**
		 * Méthode UI.Btn_AjoutArticle
		 * Constuction du bouton d'ajout de Portail
		 * @param t:Context
		 */
		Btn_EditPortail: function(t){
			var lvl = "admin";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<li class='bouton edit_portail' title='" + Lang[user.GetLangue()].btn.edit_portail + "'></li>").on("click", function(){ 
					// t.Action.Save(t, false);
				});
			}
			return btn;
		},

		/**
		 * Méthode UI.Btn_GestionUser
		 * Constuction du bouton de gestion des Utilisateurs
		 * @param t:Context
		 */
		Btn_AdminUser: function(t){
			var lvl = "admin";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<li class='bouton admin_user' title='" + Lang[user.GetLangue()].btn.admin_user + "'></li>").on("click", function(){ 
					user.Action.Administration(user);
				});
			}
			return btn;
		},

		/**
		 * Méthode UI.Btn_GestionUser
		 * Constuction du bouton de gestion des Utilisateurs
		 * @param t:Context
		 */
		Btn_AddUser: function(t){
			var lvl = "admin";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<li class='bouton add_user' title='" + Lang[user.GetLangue()].btn.add_user + "'></li>").on("click", function(){ 
					user.Action.Create(user, $(this));
				});
			}
			return btn;
		},

		/**
		 * Méthode UI.Btn_GestionUser
		 * Constuction du bouton de gestion des Utilisateurs
		 * @param t:Context
		 */
		Btn_DelUser: function(t){
			var lvl = "admin";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<li class='bouton del_user' title='" + Lang[user.GetLangue()].btn.del_user + "'></li>").on("click", function(){ 
					// Action
				});
			}
			return btn;
		},

		/**
		 * Méthode UI.Btn_GestionUser
		 * Constuction du bouton de gestion des Utilisateurs
		 * @param t:Context
		 */
		Btn_EditUser: function(t){
			var lvl = "admin";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<li class='bouton edit_user' title='" + Lang[user.GetLangue()].btn.edit_user + "'></li>").on("click", function(){ 
					// t.Action.Save(t, false);
				});
			}
			return btn;
		},

		/**
		 * Méthode UI.Clear
		 * Nettoyage du menu
		 * @param t:Context
		 */
		Clear: function(t){
			$(t.s.bloc).find("ul").children().remove();
		}
	}
}

var menu;