var Lang = {
	app: {
		appName: "KM",
		appvName: {
			'1': "Globus",
			'1.1': "Dico",
			'1.2': "Creo",
			'1.3': "Anima"
		},
		appVersion: 1.3
	},
	FR: {
		lst: {
			usr_role: Array("Aucun", "Lecteur", "Constributeur", "Administrateur"),
			list_type_comment: Array("Commentaire", "Exemple", "Complément", "Point d&apos;attention", "Lien associé"),
		},
		lbl: {
			log: "Login",
			mdp: "Mot de passe",
			portail_select: "Sélectionner un portail",
			search: "Recherche",
			no_result: "aucun résultat",
			createdby: "créé par",
			date_intro: "le",
			title: "Titre",
			admin_portail: "Administration des Portails",
			admin_categorie: "Administration des Catégories",
			admin_article: "Administration des Articles",
			admin_user: "Administration des Utilisateurs",
			form_portail: "Portail",
			form_id: "ID",
			form_categorie: "Catégorie",
			form_portail: "Portail",
			form_action: "Actions",
			form_description: "Description",
			form_nb_article: "Nb Articles",
			form_fstName: "Prénom",
			form_lstName: "Nom",
			form_email: "Email",
			form_role: "Role",
			form_login: "Identifiant",
			form_pass: "Mot de passe",
			modif: "Modification de ",
			object_create: "Création",
			now: "aujourd\'hui",
			voir_article: "Voir l\'article",
			syntaxe_code: "Syntaxe de l&apos;article",
			desc_article: "Description de l&apos;article",
			corps_article: "Corps de l&apos;article",
			near_articles: "Articles proches",
			views: "vues",
			favoris: "favoris",
			user: "utilisateurs",
			commentaire: "Commentaires",
			le: "le",
			all: "tous",
			my_articles: "Mes Articles",
		},
		btn: {
			connect: "Connexion",
			account: "Mon Compte",
			disconnect: "Déconnexion",
			back: "Retour",
			out_portail: "Revenir à l&apos;accueil",
			modify: "Modifier",
			switch_lang: "Switch to English",
			save: "Sauver",
			cancel: "Annuler",
			valide: "Valider",
			delete: "Supprimer",
			create: "Créer",
			add_article: "Ajouter un nouvel article",
			admin_portail: "Gestion des portails",
			add_portail: "Ajouter un nouveau portail",
			del_portail: "Supprimer le portail",
			edit_portail: "Modifier le portail",
			admin_user: "Gestion des utilisateurs",
			add_user: "Ajouter un utilisateur",
			del_user: "Supprimer un utilisateur",
			edit_user: "Modifier un utilisateur",
			admin_categorie: "Gestion des catégories",
			add_categorie: "Ajouter une catégorie",
			del_categorie: "Supprimer une catégorie",
			edit_categorie: "Modifier une catégorie",
			gabarit: "Appliquer le gabarit standard",
			syntaxe: "Insérer un bloc de syntaxe",
			resume: "Insérer un bloc de résumé",
			article: "Insérer un bloc d&apos;article",
			nav: "Insérer un bloc d&apos;association",
			pdf: "Export PDF",
			commentaire: "Commentaires"
		},
		err: {
			bad_id: "identifiants incorrects",
		},
		msg: {
			confirm_leave_portail1: "Vous allez quitter le portail",
			confirm_leave_portail2: "souhaitez-vous continuer sur le portail",
			confirm_delete_object: "Voulez-vous supprimer cet élément ?",
			err_delete_own_account: "Vous ne pouvez pas supprimer votre propre compte !",
			no_right_title: "Accès refusé",
			no_right_msg: "Vous n'avez pas les droits pour effectuer cette action",
			error_loading_title: "Erreur lors du chargement", 
			error_loading_msg: "Une erreur est survenue lors de la récupération des données",
			success_update_portail_title: "Mise à jour réussie",
			success_update_portail_msg: "Mise à jour du portail effectuée avec succès",
			error_update_portail_title: "Mise à jour échouée",
			error_update_portail_msg: "La mise à jour du portail a échoué",
			success_delete_portail_title: "Suppression réussie",
			success_delete_portail_msg: "Suppression du portail effectuée avec succès",
			error_delete_portail_title: "Suppression échouée",
			error_delete_portail_msg: "La suppression du portail a échoué",
			success_create_portail_title: "Création réussie",
			success_create_portail_msg: "Création du portail effectuée avec succès",
			error_create_portail_title: "Création échouée",
			error_create_portail_msg: "La suppression du portail a échoué",
			error_no_portail_title: "Aucun portail",
			error_no_portail_msg: "Aucun portail n\'est présent",
			error_no_category_title: "Aucune catégorie",
			error_no_category_msg: "Aucune catégorie n\'est présente dans ce portail",
			success_update_category_title: "Mise à jour réussie",
			success_update_category_msg: "Mise à jour de la catégorie effectuée avec succès",
			success_delete_category_title: "Suppression réussie",
			success_delete_category_msg: "Suppression de la catégorie effecutée avec succès",
			success_create_category_title: "Création réussie",
			success_create_category_msg: "Création de la catégorie effecutée avec succès",
			error_no_result_title: "Aucun résultat",
			error_no_result_msg: "Aucun résultat ne correspond à cette recherche",
			success_create_user_title: "Création réussie",
			success_create_user_msg: "Création de l\'utilisateur effectuée avec succès",
			error_create_user_title: "Création échouée",
			error_create_user_msg: "La création de l\'utilisateur a échoué",
			success_update_user_title: "Mise à jour réussie",
			success_update_user_msg: "La mise à jour de l\'utilisateur effectuée avec succès",
			error_update_user_title: "Mise à jour échouée",
			error_update_user_msg: "La mise à jour de l\'utilisateur a échoué",
			success_delete_user_title: "Suppression réussie",
			success_delete_user_msg: "La suppression de l\'utilisateur effectuée avec succès",
			error_delete_user_title: "Suppression échouée",
			error_delete_user_msg: "La suppression de l\'utilisateur a échoué",
			error_no_user_title: "Aucun utilisateur",
			error_no_user_msg: "Il n\'y a aucun utilisateur répondant à votre recherche",
			success_create_cookie_title: "Données de session sauvegardées",
			success_create_cookie_msg: "Les données de session ont été sauvegardées",
			error_create_cookie_title: "Erreur de sauvegarde des données de session",
			error_create_cookie_msg: "Les données de session n'ont pas pu être sauvegardées sur votre navigateur",
			success_remove_cookie_title: "Données de session supprimées",
			success_remove_cookie_msg: "Les données de session ont été supprimées de votre navigateur",
			error_no_article_title: "Aucun article",
			error_no_article_msg: "Aucun article ne répond à votre recherche",
			success_update_article_title: "Mise à jour réussie",
			success_update_article_msg: "Mise à jour de l\'article effectuée avec succès",
			error_update_article_title: "Mise à jour échouée",
			error_update_article_msg: "La mise à jour de l\'article a échoué",
			success_delete_article_title: "Suppression réussie",
			success_delete_article_msg: "Suppression de l\'article effectuée avec succès",
			error_delete_article_title: "Suppression échouée",
			error_delete_article_msg: "La suppression de l\'article a échoué",
			success_create_article_title: "Création réussie",
			success_create_article_msg: "Création de l\'article effectuée avec succès",
			error_create_article_title: "Création échouée",
			error_create_article_msg: "La création de l\'article a échoué",
			confirm_perte_infos: "Vous allez perdre vos modifications, souhaitez-vous continuer ?",
			warning_add_bloc_syntax_title: "Ajout impossible",
			warning_add_bloc_syntax_msg: "Impossible d\'ajouter un deuxième bloc de syntaxe",
			warning_add_bloc_description_title: "Ajout impossible",
			warning_add_bloc_description_msg: "Impossible d\'ajouter un deuxième bloc de description",
			warning_add_bloc_article_title: "Ajout impossible",
			warning_add_bloc_article_msg: "Impossible d\'ajouter un deuxième bloc d\'article",
			error_no_favoris_title: "Aucun favoris",
			error_no_favoris_msg: "Vous n\'avez aucun favoris",
			error_no_comment_title: "Aucun Commentaire",
			error_no_comment_msg: "Aucun commentaire pour cet article",
			no_connexion: "Pas d\'accès au réseau, vérifiez votre connexion",
			db_tst_connect: "Test de connexion à la base de données",
			db_connect_ok: "Connexion à la base de données établie",
			db_connect_no: "Base de données inexistante",
			db_tst_tables: "Test de l'intégrité des tables",
			db_tables_ok: "Intégrité des tables respectée",
			db_tables_no: "Tables éronnées",
			db_install_db: "Installation de la base de données",
			db_install_ok: "Base de données installée",
			app_launch: "Lancement de l'application",
			db_create_defaultuser: "Création de l'utilisateur par défaut",
			db_createDefUser_ok: "Utilisateur par défaut créé avec succès",
			db_createDefUser_no: "L'utilisateur par défaut n'a pas pu être créé",
			instr_fst_connexion: "Merci d'avoir installé cette application.\n\nPour votre première connexion, votre identifiant sera 'admin'\nainsi que votre mot de passe.\n\nEnjoy your knowledge !",
		}
	},
	EN: {
		lst: {
			usr_role: Array("None", "Reader", "Constributor", "Administrator"),
			list_type_comment: Array("Comment", "Exemple", "Supplement", "Focus point", "Related link"),
		},
		lbl: {
			log: "Login",
			mdp: "Password",
			portail_select: "Select a portal",
			search: "Search",
			no_result: "no result",
			createdby: "created by",
			date_intro: "the",
			title: "Title",
			admin_portail: "Portals Administration",
			admin_categorie: "Categories Administration",
			admin_article: "Articles Administration",
			admin_user: "Users Administration",
			form_portail: "Portal",
			form_id: "ID",
			form_categorie: "Category",
			form_portail: "Portal",
			form_action: "Actions",
			form_description: "Description",
			form_nb_article: "Nb of articles",
			form_fstName: "Firstname",
			form_lstName: "Lastname",
			form_email: "Email",
			form_role: "Role",
			form_login: "Login",
			form_pass: "Password",
			modif: "Edit ",
			object_create: "Creation",
			now: "today",
			voir_article: "See the article",
			syntaxe_code: "Article&apos; syntaxe code",
			desc_article: "Article&apos;s description",
			corps_article: "Article&apos;s body",
			near_articles: "Atricle&apos;s relatives",
			views: "views",
			favoris: "starred",
			user: "users",
			commentaire: "Comments",
			le: "the",
			all: "all",
			my_articles: "My Articles",
		},
		btn: {
			connect: "Connection",
			account: "My Account",
			disconnect: "Disconnection",
			back: "Back",
			out_portail: "Back to Home",
			modify: "Edit",
			switch_lang: "Passer en Français",
			save: "Save",
			cancel: "Cancel",
			valide: "Ok",
			delete: "Delete",
			create: "Create",
			add_article: "Add a new article",
			admin_portail: "Portail administration",
			add_portail: "Add a new portal",
			del_portail: "Delete the portal",
			edit_portail: "Edit the portal",
			admin_user: "User administration",
			add_user: "Add a new user",
			del_user: "Delete the user",
			edit_user: "Edit the user",
			admin_categorie: "Category administration",
			add_categorie: "Add a new category",
			del_categorie: "Delete the category",
			edit_categorie: "Edit the category",
			gabarit: "Apply the standart template",
			syntaxe: "Insert a syntax bloc",
			resume: "Insert a description bloc",
			article: "Insert an article bloc",
			nav: "Insert an association bloc",
			pdf: "Export PDF",
			commentaire: "Comments"
		},
		err: {
			bad_id: "incorrect identifiers",
		},
		msg: {
			confirm_leave_portail1: "You will leave the portal",
			confirm_leave_portail2: "do you wish to continue in the portal",
			confirm_delete_object: "Do you want to delete this element ?",
			err_delete_own_account: "You can\'t delete your own account !",
			no_right_title: "Access denied",
			no_right_msg: "You don\'t have permission to perform this action",
			error_loading_title: "Error loading", 
			error_loading_msg: "An error occured during data retrieval",
			success_update_portail_title: "Update succeed",
			success_update_portail_msg: "Portal updated successfully",
			error_update_portail_title: "Update failed",
			error_update_portail_msg: "Portal update failed",
			success_delete_portail_title: "Deletion succeed",
			success_delete_portail_msg: "Portail deleted successfully",
			error_delete_portail_title: "Deletion failed",
			error_delete_portail_msg: "Portal deletion failed",
			success_create_portail_title: "Creation succeed",
			success_create_portail_msg: "Portal created successfully",
			error_create_portail_title: "Creation failed",
			error_create_portail_msg: "Portail creation failed",
			error_no_portail_title: "No portal",
			error_no_portail_msg: "There is no portal",
			error_no_category_title: "No category",
			error_no_category_msg: "There is no category in the current portal",
			success_update_category_title: "Update succeed",
			success_update_category_msg: "Category updated successfully",
			success_delete_category_title: "Deletion succeed",
			success_delete_category_msg: "Category deleted successfully",
			success_create_category_title: "Creation succeed",
			success_create_category_msg: "Category created successfully",
			error_no_result_title: "No result",
			error_no_result_msg: "There is no result for this search",
			success_create_user_title: "Creation succeed",
			success_create_user_msg: "User created successfully",
			error_create_user_title: "Creation failed",
			error_create_user_msg: "User creation failed",
			success_update_user_title: "Update succeed",
			success_update_user_msg: "User updated successfully",
			error_update_user_title: "Update failed",
			error_update_user_msg: "User updated successfully",
			success_delete_user_title: "Deletion succeed",
			success_delete_user_msg: "User deleted successfully",
			error_delete_user_title: "Deletion failed",
			error_delete_user_msg: "User deletion failed",
			error_no_user_title: "No user",
			error_no_user_msg: "There is no user responding to your request",
			success_create_cookie_title: "Session data saved",
			success_create_cookie_msg: "The session datas has been saved",
			error_create_cookie_title: "Saving error",
			error_create_cookie_msg: "The session datas could not be saved in your browser",
			success_remove_cookie_title: "Session datas removed",
			success_remove_cookie_msg: "The session datas has been removed from your browser",
			error_no_article_title: "No article",
			error_no_article_msg: "There is no article responding to your request",
			success_update_article_title: "Update succeed",
			success_update_article_msg: "Article update succeed",
			error_update_article_title: "Update failed",
			error_update_article_msg: "Article update failed",
			success_delete_article_title: "Delete succeed",
			success_delete_article_msg: "Article deletion succeed",
			error_delete_article_title: "Delete failed",
			error_delete_article_msg: "Article deletion failed",
			success_create_article_title: "Creation succeed",
			success_create_article_msg: "Article creation succeed",
			error_create_article_title: "Creation failed",
			error_create_article_msg: "Article creation failed",
			confirm_perte_infos: "You'll lose your changes, do you want to continue ?",
			warning_add_bloc_syntax_title: "Can not add",
			warning_add_bloc_syntax_msg: "Can not add a second syntax bloc",
			warning_add_bloc_description_title: "Can not add",
			warning_add_bloc_description_msg: "Can not add a second description bloc",
			warning_add_bloc_article_title: "Can not add",
			warning_add_bloc_article_msg: "Can not add a second article bloc",
			error_no_favoris_title: "No favoris",
			error_no_favoris_msg: "You don\'t have any bookmark",
			error_no_comment_title: "No Comment",
			error_no_comment_msg: "There is no comment for this article",
			no_connexion: "No network access, please check your connection",
			db_tst_connect: "Database connection test",
			db_connect_ok: "Connection to the database established",
			db_connect_no: "Connexion to the database impossible",
			db_tst_tables: "Database tables integrity test",
			db_tables_ok: "Integrity of the database tables OK",
			db_tables_no: "Database tables error",
			db_install_db: "Database installation",
			db_install_ok: "Database installed",
			app_launch: "Application launching",
			db_create_defaultuser: "Create the default user",
			db_createDefUser_ok: "Default user created",
			db_createDefUser_no: "Default user creation failed",
			instr_fst_connexion: "Thank you to install this application.\n\nFor your first connection, your login will be 'admin'\nas well as your password.\n\nEnjoy your knowledge !",
		}
	}
}