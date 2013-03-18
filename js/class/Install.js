function Install(){
	this.Init();
}

Install.prototype = {
	Init: function(){
		this.TestDBConnexion();
	},

	TestDBConnexion: function(){

		$.ajax({
			url: "phpforms/installController.php",
			data: {action: "testDBConnexion"},
			type: "POST",
			context: this,
			timeout: 15000
		}).done(function(msg){
			
			if(msg == ""){
				// connexion correcte à la db
				this.TestTables();
			}else{
				// la db n'existe pas
				this.InstallDB();
			}

		}).error(function(XMLHttpRequest, textStatus, errorThrown){
			alert(Lang["FR"].msg.no_connexion + "\n" + Lang["EN"].msg.no_connexion);
		});
	},

	TestTables: function(){

		$.ajax({
			url: "phpforms/installController.php",
			data: { action: "testDBTables" },
			type: "POST",
			context: this
		}).done(function(msg){
			
			if(msg == ""){
				this.InstallationFinished()
			}else{
				// la db n'existe pas
				// this.InstallDB();
			}

		});
	},

	InstallDB: function(){

		$.ajax({
			url: "phpforms/installController.php",
			data: { action: "installDB" },
			type: "POST",
			context: this
		}).done(function(msg){
			
			if(msg == ""){
				this.InstallationFinished()
			}else{
				// la db n'existe pas
				// this.InstallDB();
			}

		});
	},

	InstallationFinished: function(){
		user = new User();
		comments = new Commentaire();
	}
}

var install;
$(document).ready(function(){
	install = new Install();
});