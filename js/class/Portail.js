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
		$(this.settings.bloc).find(".portail_action_select select").on("blur", function(){
			if(t.settings.data.idPortail != null){
				$(t.settings.bloc).find(".portail_action_select").hide();
				$(t.settings.bloc).find(".portail_action_change").show();
				$(this).val(0);
			}
		});
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
			var insert = "<option value='0'></option>";
			$(this.settings.content).find(".portail_action_select select").append(insert);

			for(var i = 0; i < this.settings.listPortail.length; i++){
				var portail = this.settings.listPortail[i];
				insert = "<option value='" + portail.id + "'>" + portail.portail + "</option>";
				$(this.settings.content).find(".portail_action_select select").append(insert);
			}

			$(this.settings.content).find(".portail_action_select").show();
			$(this.settings.content).find(".portail_action_change").hide();

			$(".portail_action_select select").on("change", function(){
				var accord = (t.settings.data.idPortail != null && $(this).val() != t.settings.data.idPortail) ? confirm("Vous allez quitter le portail " + t.settings.data.portail + ", souhaitez-vous continuer sur le portail " + $(this).find("option[value='" + $(this).val() + "']").text() + " ?") : true;
				if(accord && $(this).val() != 0){
					t.settings.data = { idPortail: $(this).val(), portail: $(this).find("option[value='" + $(this).val() + "']").text() };
					$(this).val(0);
					t.BuildInfosPortail();
				}else{
					$(this).blur();
				}
			}).val(0);

			navigation = new Navigation();
		}
	},

	/**
	 * Méthode BuildInfosPortail
	 * Affiche les informations concernant le portail sélectionné
	 */
	BuildInfosPortail: function(){
		var t = this;
		if(this.settings.data.portail != null){
			$(this.settings.content).find(".portail_action_change").text("Portail : " + this.settings.data.portail).show();
			$(this.settings.content).find(".portail_action_select").hide();

			$("#portaildata_idPortail").val(this.settings.data.idPortail);
			$("#portaildata_portail").val(this.settings.data.portail);

			navigation = new Navigation();

			$(".portail_action_change").on("click", function(){
				$(t.settings.content).find(".portail_action_select").show().find("select").focus();
				$(t.settings.content).find(".portail_action_change").hide();
			});
		}else{

		}
	}
}

var portail;

$(document).ready(function(){
	portail = new Portail();
});