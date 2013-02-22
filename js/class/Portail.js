function Portail(options){
	this.settings = {
		bloc: "#portail",
		content: "#portail .bloc_content",
		cache: "#portail .cache",
		listPortail: null,
		jqs: {
			idPortail: "#portaildata_idPortail",
			portail: "#portaildata_portail"
		},
		data: {
			idPortail: null,
			portail: null
		}
	}

	this.Init();
}

Portail.prototype = {

	/** 
	 * Méthode Init
	 * Méthode d'initialisation de la class User
	 */
	Init: function(){
		this.AttachEvents();
		this.GetAllPortail();
	},

	/** 
	 * Méthode AttachEvents
	 * Méthode d'attachement des évènements associé aux éléments de la class User
	 */
	AttachEvents: function(){
		var t = this;

	},

	/** 
	 * Méthode GetAllPortail
	 * Affiche la liste des portails disponibles
	 */
	GetAllPortail: function(){
		$.ajax({
			url: "phpforms/portail.list.php",
			type: "POST",
			context: this
		}).done(function(msg){
			if(msg != ""){
				var json = $.parseJSON(msg);
				this.settings.listPortail = json;
				this.BuildPortailSelectList();
			}
		});
	},

	/**
	 * Méthode BuildPortailSelectList
	 * Affiche la liste des portails sous forme de selectbox
	 */
	BuildPortailSelectList: function(){
		if(this.settings.listPortail != null){
			var t = this;
			var bloc_info = $(this.settings.content).find(".portail_infos");
			var bloc_list = $(this.settings.content).find(".menu_portail");
			var insert;

			bloc_list.append("<ul></ul>");

			for(var i = 0; i < this.settings.listPortail.length; i++){
				var portail = this.settings.listPortail[i];
				insert = "<li value='" + portail.id + "'>" + portail.portail + "</li>";
				bloc_list.find("ul").append(insert);
			}

			t.BuildInfosPortail();
		}
		navigation = new Navigation();

		$(".portail_action_select li").on("click", function(){
			var accord = (t.settings.data.idPortail != null && $(this).attr("value") != t.settings.data.idPortail) ? confirm("Vous allez quitter le portail " + t.settings.data.portail + ", souhaitez-vous continuer sur le portail " + $(this).text() + " ?") : true;
			t.settings.data = { idPortail: $(this).attr("value"), portail: $(this).text() };
			if(accord && $(this).attr("value") != 0){
				t.BuildInfosPortail();
			}
		});
	},

	/**
	 * Méthode BuildInfosPortail
	 * Affiche les informations concernant le portail sélectionné
	 */
	BuildInfosPortail: function(){
		var t = this;
		var bloc_info = $(this.settings.content).find(".portail_infos");

		if(this.settings.data.portail != null){
			bloc_info.text(this.settings.data.portail).attr("value", this.settings.data.idPortail).parent().addClass("portail_selected");
			$("#portaildata_idPortail").val(this.settings.data.idPortail);
			$("#portaildata_portail").val(this.settings.data.portail);
			this.BuildInterface();
			//navigation = new Navigation();
		}else{
			bloc_info.text("Sélectionner un portail").removeAttr("value").parent().removeClass("portail_selected");
		}
	},

	BuildInterface: function(){
		navigation = new Navigation();
		var ref = $("#reference");
		var content = $("#content");

		if(!ref.is(":visible")){
			ref.show().css({ "left": -ref.outerWidth(true) }).animate({ "left": 0 }, 300, "swing");
			content.animate({ "width": $(window).width() - ref.outerWidth(true) }, 300, "swing");
		}
	}
}

var portail;

$(document).ready(function(){
	portail = new Portail();
});