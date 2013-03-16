function Favoris(){

	this.Init();
}

Favoris.prototype = {
	Init: function(){

	},

	/**
	 * Méthode GetFavorisForUser
	 * Récupère les favoris pour un utilisateur
	 * @param id_user:Int 				identifiant de l'utilisateur
	 * @param fnCallback:Function 		Fonction de callback
	 */
	GetFavorisForUser: function(id_user, fnCallback){
		$.ajax({
			url: "phpforms/favoris.for_user.php",
			type: "POST",
			context: this,
			data: { idUser: id_user}
		}).done(function(msg){
			
			if(msg != ""){

				var json = $.parseJSON(msg);

				if($.isArray(json)){

					Data.favoris.data = json;

					if($.isFunction(fnCallback)){
						fnCallback();
					}

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
	 * @param id_article:Int		identifiant de l'article
	 * @param fnCallback:Function 	fonction de callback
	 */
	GetFavorisForArticle: function(id_article, fnCallback){
		$.ajax({

			url: "phpforms/favoris.for_article.php",
			type: "POST",
			context: this,
			data: { idArticle: id_article }

		}).done(function(msg){
			
			if(msg != "" || isNaN(parseInt(msg))){

				Data.favoris.article = msg;

				if($.isFunction(fnCallback)){
					fnCallback(Data.favoris.article);
				}

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
			var t = this;
			
			if(msg != ""){
				ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
			}else{
				this.GetFavorisForUser(Data.user.data.idUser, function(){ 
					t.BuildFavorisList($(".list_favoris"));
				});
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
			var t = this;

			if(msg != ""){
				ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
			}else{
				this.GetFavorisForUser(Data.user.data.idUser, function(){ 
					t.BuildFavorisList($(".list_favoris"));
				});
			}
		});
	},


	BuildFavorisList: function(btn){
		btn.find("ul").children().remove();

		for(var i = 0; i < Data.favoris.data.length; i++){
			var favoris = Data.favoris.data[i];

			var li = $("<li></li>").attr({
				"forarticle": favoris.idArticle,
				"forcategorie": favoris.idCategorie
			}).text(favoris.titre);
			btn.find("ul").append(li);
		}

		btn.find("li").bind("click", function(){
			event.stopPropagation();

			var notInTheSamePortail = false;
			var idArticle = $(this).attr("forarticle");
			
			articleContent.GetPortailForArticle(idArticle, null);
		});
	}
}

var favoris;

$(document).ready(function(){
	favoris = new Favoris();
});