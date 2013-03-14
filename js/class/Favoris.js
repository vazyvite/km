function Favoris(){

	this.Init();
}

Favoris.prototype = {
	Init: function(){

	},

	/**
	 * Méthode GetFavorisForUser
	 * Récupère les favoris pour un utilisateur
	 * @param id_user:Int 		identifiant de l'utilisateur
	 */
	GetFavorisForUser: function(id_user){
		$.ajax({
			url: "phpforms/favoris.for_user.php",
			type: "POST",
			context: this,
			data: { idUser: id_user}
		}).done(function(msg){
			
			if(msg != ""){

				var json = $.parseJSON(msg);

				if($.isArray(json)){

					//this.Data.SetJSON(this, json);
					//this.UI.Build(this, json);

				}else{
					ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
				}

			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_no_favoris_title, Lang[user.GetLangue()].msg.error_no_favoris_msg, "error");
			}
		});
	},


	/**
	 * Méthode GetFavorisForArticle
	 * Récupère le nombre de favoris pour un article
	 * @param id_article:Int	identifiant de l'article
	 */
	GetFavorisForArticle: function(id_article){
		$.ajax({
			url: "phpforms/favoris.for_article.php",
			type: "POST",
			context: this,
			data: { idArticle: id_article}
		}).done(function(msg){
			
			if(msg != "" || isNaN(parseInt(msg))){


				//this.Data.SetJSON(this, json);
				//this.UI.Build(this, json);

			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
			}
		});
	},

	
	/**
	 * Méthode AddViewForArticle
	 * Ajoute une vue sur un article pour un utilisateur
	 * @param id_user:Int 		identifiant de l'utilisateur
	 * @param id_article:Int 	identifiant de l'article
	 */
	AddViewForArticle: function(id_user, id_article){
		$.ajax({
			url: "phpforms/favoris.addview.php",
			type: "POST",
			context: this,
			data: { idUser: id_user, idArticle: id_article }
		}).done(function(msg){
			
			if(msg != ""){
				ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
			}
		});
	},


	/**
	 * Méthode ForceFavoris
	 * Créé un FAVORIS (et non uniquement un compteur de vues) sur un article pour un utilisateur
	 * @param id_user:Int 		identifiant de l'utilisateur
	 * @param id_article:Int 	identifiant de l'article
	 */
	ForceFavoris: function(id_user, id_article){
		$.ajax({
			url: "phpforms/favoris.add.php",
			type: "POST",
			context: this,
			data: { idUser: id_user, idArticle: id_article }
		}).done(function(msg){
			
			if(msg != ""){
				ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
			}
		});
	},


	/**
	 * Méthode DeForceFavoris
	 * Supprime un FAVORIS (et non uniquement un compteur de vues) sur un article pour un utilisateur
	 * @param id_user:Int 		identifiant de l'utilisateur
	 * @param id_article:Int 	identifiant de l'article
	 */
	DeForceFavoris: function(id_user, id_article){
		$.ajax({
			url: "phpforms/favoris.delete.php",
			type: "POST",
			context: this,
			data: { idUser: id_user, idArticle: id_article }
		}).done(function(msg){
			
			if(msg != ""){
				ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
			}
		});
	}
}

var favoris;

$(document).ready(function(){
	favoris = new Favoris();
});