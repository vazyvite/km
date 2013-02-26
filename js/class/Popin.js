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
		type: options.type
	};

	this.Init();
}

Popin.prototype = {
	Init: function(){
		this.Action.Show(this);
	},

	AttachEvents: function(){

	},

	Action: {
		Show: function(t){
			var lvl = t.s.lvl;

			if(user.CheckUserAccess(lvl)){
				t.UI.Build(t);
				$("#dialogCache").css("opacity", 0).show().animate({"opacity": .7}, 500);
			}
		},

		Hide: function(t){
			$(".popin").animate({opacity: 0}, 500, function(){ $(".popin").remove(); })
			$("#dialogCache").css("opacity", .7).show().animate({"opacity": 0}, 500, function(){ $("#dialogCache").hide(); });
		}
	},

	Data: {},

	UI: {
		Build: function(t){
			var lvl = t.s.lvl;

			if(user.CheckUserAccess(lvl)){
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

				t.UI.PopinPosition(t);
			}
		},

		BuildTitle: function(t){
			var lvl = t.s.lvl;
			var insert = null;

			if(user.CheckUserAccess(lvl) && t.s.title != ""){
				insert = $("<div></div>").addClass("popin_header " + t.s.type).html(t.s.title);
			}

			return insert;
		},

		BuildCloseBtn: function(t){
			var lvl = t.s.lvl;
			var insert = null;

			if(user.CheckUserAccess(lvl) && t.s.addCloseBtn){
				insert = $("<div></div>").addClass("popin_closebtn");
				insert.on("click", (typeof t.s.onClose === "function") ? t.s.onClose : function(){ t.Action.Hide(t) });
			}

			return insert;
		},

		BuildContent: function(t){
			var lvl = t.s.lvl;
			var insert = null;

			if(user.CheckUserAccess(lvl) && t.s.content != "" || t.s.structure){

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

		BuildLineForm: function(t, str){
			var lvl = t.s.lvl;
			var insert = null;

			if(user.CheckUserAccess(lvl) && str && str.key != null){
				insert = $("<div></div>").addClass("form_line p_" + str.key.toUpperCase().replace(/\s+/g, ' '));
				var lbl = $("<div></div>").addClass("form_label").text(str.title);
				var inp = $("<div></div>").addClass("form_input");
				
				var disabled = (str.editable) ? "" : " disabled='disabled' ";
				var maxlength = (str.lim != null) ? " maxlength='" + str.lim + "' size='" + str.lim + "'" : "";
				var value = (typeof(t.s.values[str.key]) == 'object' && (t.s.values[str.key] instanceof Array)) ? t.s.values[str.key].length : t.s.values[str.key];

				if(str.lim < 50 && (!str.list || str.list == null)) { 
					var input = $("<input type='text' " + disabled + " " + maxlength + "value='" + value + "' />");
				}else if(str.lim >= 50 && (!str.list || str.list == null)){
					var input = $("<textarea" + disabled + " " + maxlength + ">" + value + "</textarea>");
				}else{
					var input = $("<select" + disabled + "></select>");

					for(var o=0; o < str.list.length; o++){
						var s = (str.list[o].id == parseInt(t.s.values[str.key])) ? " selected='selected' " : "";
						input.append($("<option " + s + " value='" + str.list[o].id + "'>" + str.list[o].name + "</option>"));
					}
				}

				inp.append(input);
				insert.append(lbl).append(inp);
			}

			return insert;
		},

		BuildCommand: function(t){
			var lvl = t.s.lvl;
			var insert = null;

			if(user.CheckUserAccess(lvl) && t.s.cmd.length){
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

		Btn_Valid: function(t){
			var lvl = t.s.lvl;
			var insert = null;

			if(user.CheckUserAccess(lvl)){
				insert = $("<button></button>").addClass("btn_valide").text(Lang[user.GetLangue()].btn.valide);
				insert.on("click", (typeof t.s.onValidate === "function") ? t.s.onValidate : function(){ t.Action.Hide(t) });
			}

			return insert;
		},

		Btn_Cancel: function(t){
			var lvl = t.s.lvl;
			var insert = null;

			if(user.CheckUserAccess(lvl)){
				insert = $("<button></button>").addClass("btn_valide").text(Lang[user.GetLangue()].btn.cancel);
				insert.on("click", (typeof t.s.onClose === "function") ? t.s.onClose : function(){ t.Action.Hide(t) });
			}

			return insert;
		},

		PopinPosition: function(t){
			var popin = $(".popin");
			popin.css("left", ($(window).width() - popin.outerWidth(true)) / 2);
		}
	}
}

var popin;