function Popin (options){
	this.s = {
		title: options.title,
		content: options.content,
		cmd: options.cmd,
		onValidate: options.onValidate,
		onClose: options.onCancel,
		lvl: options.lvlRequise,
		addCloseBtn: options.closeBtn
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
				insert = $("<div></div>").addClass("popin_header").html(t.s.title);
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

			if(user.CheckUserAccess(lvl) && t.s.content != ""){
				insert = $("<div></div>").addClass("popin_body").html(t.s.content);
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