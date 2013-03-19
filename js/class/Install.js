function Install(){
	this.Init();
	this.pbar;
	this.ptext;
	this.timeout = 500;
}

Install.prototype = {
	Init: function(){
		this.BuildProgressBar();
	},

	BuildProgressBar: function(){
		var cont = $("<div></div>").attr("id", "progress");
		var text = $("<div></div>").attr("id", "progress_legend");
		var bar = $("<progress></progress>").attr({
			"id": "progress_install",
			"value": 0,
			"min": 0,
			"max": 100
		});

		cont.append(bar).append(text);
		$("#content").append(cont);

		this.ptext = $("#progress_legend");
		this.pbar = $("#progress_install");
		this.TestDBConnexion();
	},

	ClearProgressBar: function(){
		$("#progress").animate({ "opacity": 0 }, 1000, function(){ $(this).remove(); });
	},

	TestDBConnexion: function(){
		this.pbar.val(10);
		this.ptext.html(Lang["FR"].msg.db_tst_connect);

		var t = this;
		$.ajax({
			url: "phpforms/installController.php",
			data: {action: "testDBConnexion"},
			type: "POST",
			context: this,
			timeout: 15000
		}).done(function(msg){
			this.pbar.val(15);

			if(msg == ""){
				this.ptext.html(Lang["FR"].msg.db_connect_ok);
				setTimeout(function(){
					t.TestTables();
				}, this.timeout);
				
			}else{
				// la db n'existe pas
				this.ptext.html(Lang["FR"].msg.db_connect_no);
				setTimeout(function(){
					t.InstallDB();
				}, this.timeout);
				
			}

		}).error(function(XMLHttpRequest, textStatus, errorThrown){
			alert(Lang["FR"].msg.no_connexion + "\n" + Lang["EN"].msg.no_connexion);
		});
	},

	CreateDefaultUser: function(){
		var t = this;
		this.ptext.html(Lang["FR"].msg.db_create_defaultuser);
		this.pbar.val(85);

		$.ajax({
			url: "phpforms/installController.php",
			data: { action: "createDefaultUser" },
			type: "POST",
			context: this
		}).done(function(msg){
			this.pbar.val(90);
			if(msg == ""){
				this.ptext.html(Lang["FR"].msg.db_createDefUser_ok);
				alert(Lang["FR"].msg.instr_fst_connexion);
				
				setTimeout(function(){
					t.InstallationFinished()
				}, this.timeout);
				
			}else{
				this.ptext.html(Lang["FR"].msg.db_createDefUser_no);
				// la db n'existe pas
				// this.InstallDB();
			}
		});
	},

	TestTables: function(fnCallback){
		var t = this;
		this.ptext.html(Lang["FR"].msg.db_tst_tables);
		this.pbar.val(30);

		$.ajax({
			url: "phpforms/installController.php",
			data: { action: "testDBTables" },
			type: "POST",
			context: this
		}).done(function(msg){
			this.pbar.val(80);
			if(msg == ""){
				this.ptext.html(Lang["FR"].msg.db_tables_ok);

				if(fnCallback && $.isFunction(fnCallback)){
					fnCallback();
				}else{
					setTimeout(function(){
						t.InstallationFinished()
					}, this.timeout);
				}
				
			}else{
				this.ptext.html(Lang["FR"].msg.db_tables_no);
				// la db n'existe pas
				// this.InstallDB();
			}

		});
	},

	InstallDB: function(){
		var t = this;
		this.ptext.html(Lang["FR"].msg.db_install_db);

		this.pbar.val(20);
		$.ajax({
			url: "phpforms/installController.php",
			data: { action: "installDB" },
			type: "POST",
			context: this
		}).done(function(msg){
			this.pbar.val(25);
			this.ptext.html(Lang["FR"].msg.db_install_ok);

			if(msg == ""){
				this.TestTables(function(){
					t.CreateDefaultUser();
				});
			}else{
				// la db n'existe pas

			}

		});
	},

	InstallationFinished: function(){
		this.pbar.val(100);
		this.ptext.html(Lang["FR"].msg.app_launch);

		user = new User();
		comments = new Commentaire();

		this.ClearProgressBar();
	}
}

var install;
$(document).ready(function(){
	install = new Install();
});