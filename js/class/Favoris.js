function Favoris(){

	this.Init();
}

Favoris.prototype = {
	Init: function(){

	},

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

	/*CreateFavoris: function(){

	},*/

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

	ForceFavoris: function(id_user, id_article){
		$.ajax({
			url: "phpforms/favoris.add.php",
			type: "POST",
			context: this,
			data: { idUser: id_user, idArticle: id_article }
		}).done(function(msg){
			
			if(msg != ""){

			}else{
				
				ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
			}
		});
	},

	DeForceFavoris: function(id_user, id_article){
		$.ajax({
			url: "phpforms/favoris.delete.php",
			type: "POST",
			context: this,
			data: { idUser: id_user, idArticle: id_article }
		}).done(function(msg){
			
			if(msg != ""){

			}else{
				
				ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
			}
		});
	}
}

var favoris;

$(document).ready(function(){
	favoris = new Favoris();
});