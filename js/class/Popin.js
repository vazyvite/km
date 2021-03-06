function Popin (options, structure, values){
	this.s = {
		title: options.title,
		content: options.content,
		cmd: options.cmd,
		onValidate: options.onValidate,
		onClose: options.onCancel,
		lvl: options.lvlRequise,
		addCloseBtn: options.closeBtn,
		structure: structure,
		values: values,
		type: options.type,
		caller: options.caller
	};

	this.Init();
}

Popin.prototype = {
	Init: function(){
		this.Action.Show(this);
	},


	Action: {
		/**
		 * Méthode Action.Show
		 * Affiche la popin
		 * @param t:Context
		 */
		Show: function(t){
			var lvl = t.s.lvl;

			if(CheckAccess(lvl) || (t.s.type == "user" && Data.user.data.idUser == t.s.values.idUser)){
				$(".popin").remove();

				t.UI.Build(t);
				
				if(!t.s.caller || typeof t.s.caller != "object"){
					$("#dialogCache").css("opacity", 0).show().animate({"opacity": .7}, 500);
				}else{

				}
			}
		},


		/**
		 * Méthode Action.Hide
		 * Détruit la popin
		 * @param t:Context
		 */
		Hide: function(t){

			if(!t.s.caller || typeof t.s.caller != "object"){
				$(".popin").animate({opacity: 0}, 500, function(){ $(".popin").remove(); })
				$("#dialogCache").css("opacity", .7).show().animate({"opacity": 0}, 500, function(){ $("#dialogCache").hide(); });
			}else{
				$(".popin").animate({top: -1000}, 500, function(){ $(".popin").remove(); })
			}
		}
	},

	Data: {},

	UI: {
		/**
		 * Méthode UI.Build
		 * Construit la popin
		 * @param t:Context
		 */
		Build: function(t){
			var lvl = t.s.lvl;

			if(CheckAccess(lvl) || (t.s.type == "user" && Data.user.data.idUser == t.s.values.idUser)){
				var title = t.UI.BuildTitle(t);
				var close = (t.s.addCloseBtn) ? t.UI.BuildCloseBtn(t) : null;
				var content = t.UI.BuildContent(t);
				var command = t.UI.BuildCommand(t);

				var popin = $("<div></div>").addClass("popin");

				if(title != null){ popin.append(title); }
				if(close != null){ popin.append(close); }
				if(content != null){ popin.append(content); }
				if(command != null){ popin.append(command); }

				$("body").append(popin);

				if(!t.s.caller || typeof t.s.caller != "object" ){
					t.UI.PopinPosition(t);
				}else{
					t.UI.PopinPositionNearCaller(t);
				}
			}
		},

		/**
		 * Méthode UI.BuildTitle
		 * Construit le titre de la popin
		 * @param t:Context
		 */
		BuildTitle: function(t){
			var lvl = t.s.lvl;
			var insert = null;

			if((CheckAccess(lvl) || (t.s.type == "user" && Data.user.data.idUser == t.s.values.idUser)) && t.s.title != ""){
				insert = $("<div></div>").addClass("popin_header " + t.s.type).html(t.s.title);
			}

			return insert;
		},


		/**
		 * Méthode UI.BuildCloseBtn
		 * Construit le bouton de fermeture de la popin
		 * @param t:Context
		 */
		BuildCloseBtn: function(t){
			var lvl = t.s.lvl;
			var insert = null;

			if((CheckAccess(lvl) || (t.s.type == "user" && Data.user.data.idUser == t.s.values.idUser)) && t.s.addCloseBtn){
				insert = $("<div></div>").addClass("popin_closebtn");
				insert.on("click", (typeof t.s.onClose === "function") ? t.s.onClose : function(){ t.Action.Hide(t) });
			}

			return insert;
		},


		/**
		 * Méthode UI.BuildContent
		 * Construit le contenu de la popin
		 * @param t:Context
		 */
		BuildContent: function(t){
			var lvl = t.s.lvl;
			var insert = null;

			if((CheckAccess(lvl) || (t.s.type == "user" && Data.user.data.idUser == t.s.values.idUser)) && t.s.content != "" || t.s.structure){

				insert = $("<div></div>").addClass("popin_body");
				(t.s.content) ? insert.html(t.s.content) : insert.html(null);

				if(t.s.structure){
					for(var i = 0; i < t.s.structure.length; i++){
						var line = t.UI.BuildLineForm(t, t.s.structure[i]);
						if(line != null){ insert.append(line); }
					}
				}
			}

			return insert;
		},


		/**
		 * Méthode UI.BuildLineForm
		 * Construit une ligne de formulaire dans la popin
		 * @param t:Context
		 * @param str:JSON 		structure de la ligne de formulaire
		 */
		BuildLineForm: function(t, str){
			var lvl = t.s.lvl;
			var insert = null;
			var value, input;

			if((CheckAccess(lvl) || (t.s.type == "user" && Data.user.data.idUser == t.s.values.idUser)) && str && str.key != null){

				insert = $("<div></div>").addClass("form_line p_" + str.key.toUpperCase().replace(/\s+/g, ' '));
				var lbl = $("<div></div>").addClass("form_label").text(str.title);
				var inp = $("<div></div>").addClass("form_input");

				var disabled = (str.editable) ? "" : " disabled='disabled' ";
				var maxlength = (str.lim != null) ? " maxlength='" + str.lim + "' size='" + str.lim + "'" : "";

					
				if(t.s.values && t.s.values != null){
					value = (typeof(t.s.values[str.key]) == 'object' && (t.s.values[str.key] instanceof Array)) ? t.s.values[str.key].length : t.s.values[str.key];
				}else{
					value = "";
				}

				if(str.lim <= 100 && (!str.list || str.list == null)) { 
					input = $("<input type='text' " + disabled + " " + maxlength + "value='" + value + "' />");

				}else if(str.lim > 100 && (!str.list || str.list == null)){
					input = $("<textarea" + disabled + " " + maxlength + ">" + value + "</textarea>");

				}else{
					input = $("<select" + disabled + "></select>");

					for(var o=0; o < str.list.length; o++){
						var s = (t.s.values && t.s.values != null && str.list[o].id == parseInt(t.s.values[str.key])) ? " selected='selected' " : "";
						input.append($("<option " + s + " value='" + str.list[o].id + "'>" + str.list[o].name + "</option>"));
					}
				}

				inp.append(input);
				insert.append(lbl).append(inp);
			}

			return insert;
		},


		/**
		 * Méthode UI.BuildCommand
		 * Construit les boutons de commande de la popin
		 * @param t:Context
		 */
		BuildCommand: function(t){
			var lvl = t.s.lvl;
			var insert = null;

			if((CheckAccess(lvl) || (t.s.type == "user" && Data.user.data.idUser == t.s.values.idUser)) && t.s.cmd.length){
				var btn = null;

				insert = $("<div></div>").addClass("popin_footer");

				for(var i = 0; i < t.s.cmd.length; i++){
					switch(t.s.cmd[i]){
						case "valide":
							btn = t.UI.Btn_Valid(t); break;
						case "cancel":
							btn = t.UI.Btn_Cancel(t); break;
						default:
					}

					if(btn != null){ insert.append(btn); }
				}
			}

			return insert;
		},


		/**
		 * Méthode UI.Btn_Valid
		 * Construit le bouton de validation de la popin
		 * @param t:Context
		 */
		Btn_Valid: function(t){
			var lvl = t.s.lvl;
			var insert = null;

			if(CheckAccess(lvl) || (t.s.type == "user" && Data.user.data.idUser == t.s.values.idUser)){
				insert = $("<button></button>").addClass("btn_valide").text(Lang[user.GetLangue()].btn.valide);
				insert.on("click", (typeof t.s.onValidate === "function") ? t.s.onValidate : function(){ t.Action.Hide(t) });
			}

			return insert;
		},


		/**
		 * Méthode UI.Btn_Cancel
		 * Construit le bouton d'annulation de la popin
		 * @param t:Context
		 */
		Btn_Cancel: function(t){
			var lvl = t.s.lvl;
			var insert = null;

			if(CheckAccess(lvl) || (t.s.type == "user" && Data.user.data.idUser == t.s.values.idUser)){
				insert = $("<button></button>").addClass("btn_valide").text(Lang[user.GetLangue()].btn.cancel);
				insert.on("click", (typeof t.s.onClose === "function") ? t.s.onClose : function(){ 
					t.Action.Hide(t) 
				});
			}

			return insert;
		},


		/**
		 * Méthode UI.PopinPosition
		 * Positionne la popin dans l'écran (uniquement pour les popins modales)
		 * @param t:Context
		 */
		PopinPosition: function(t){
			var popin = $(".popin");
			popin.css("left", ($(window).width() - popin.outerWidth(true)) / 2);
		},


		/**
		 * Méthode UI.PopinPositionNearCaller
		 * Positionne la popin près de son caller (uniquement pour les popins contextuelles (non modales))
		 * @param t:Context
		 */
		PopinPositionNearCaller: function(t){
			var popin = $(".popin").addClass("fixed");
			if(t.s.caller && typeof t.s.caller == "object"){

				popin.css(
				{ 	"left": t.s.caller.offset().left - 18,
					"top": -1000,
					"z-index": 9
				}).animate({"top": t.s.caller.position().top + t.s.caller.outerHeight(true) + 5}, 300)
			}else{
				t.UI.PopinPosition(t);
			}
		}
	}
}

var popin;