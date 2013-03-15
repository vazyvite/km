function Commentaire(){

	this.lblType = Lang[user.GetLangue()].lst.list_type_comment;
	this.classNameType = Array("commentaire", "exemple", "complement", "attention_point", "lien_associe"),

	this.Init();
}

Commentaire.prototype = {
	Init: function(){

	},

	GetCommentForArticle: function(id_article, fnCallback){

		$.ajax({
			url: "phpforms/commentaire.list.php",
			type: "POST",
			data: { idArticle: id_article },
			context: this
		}).done(function(msg){

			json = Array();

			if(msg != ""){

				json = $.parseJSON(msg);

				if($.isArray(json) && json.length){

					this.Data.AddData(this, json);

					if($.isFunction(fnCallback)){ fnCallback(); }

				}else{
					ui.Notify(Lang[user.GetLangue()].msg.error_loading_title, Lang[user.GetLangue()].msg.error_loading_msg, "error");
				}

			}else{
				ui.Notify(Lang[user.GetLangue()].msg.error_no_comment_title, Lang[user.GetLangue()].msg.error_no_comment_msg, "error");
			}

			this.Action.Create(this, json);
		});
	},

	CreateComment: function(){

	},

	UpdateComment: function(){

	},

	DeleteComment: function(){

	},

	Action: {
		Create: function(t, json){
			t.UI.BuildPopup(t, json);
			t.UI.PopinResize(t);
		},

		Show: function(t){

		},

		Hide: function(t){

		},

		Destroy: function(t){

		},

		FocusComment: function(t){

		}
	},

	Data: {
		AddData: function(t, json){
			Data.commentaire.data = json;
		},

		DeleteData: function(t){
			Data.commentaire.data = null;
		}
	},

	UI: {
		BuildPopup: function(t, json){
			var lvl = "show";
			
			if(CheckAccess(lvl)){
				var popin = $("<div></div>").addClass("popin_comments");

				var header = t.UI.BuildHeader(t, json);
				var list = t.UI.BuildList(t, json);
				var form = t.UI.BuildForm(t);

				if(header != null){ popin.append(header); }
				if(list != null){ popin.append(list); }
				if(form != null){ popin.append(form); }

				$("#body").append(popin);
			}
		},

		BuildHeader: function(t, json){
			var lvl = "show";
			var header = null;

			if(CheckAccess(lvl)){
				header = $("<div></div>").addClass("popin_comments_header");

				var title = t.UI.BuildTitle(t, json);
				var filtre = t.UI.BuildFiltre(t, json);

				if(title != null){ header.append(title); }
				if(filtre != null){ header.append(filtre); }
			}

			return header;
		},

		BuildTitle: function(t, json){
			var lvl = "show";
			var title = null;

			if(CheckAccess(lvl)){
				title = $("<div></div>").addClass("popin_comments_title").text(Lang[user.GetLangue()].lbl.commentaire);
			}

			return title;
		},

		BuildFiltre: function(t, json){
			var lvl = "show";
			var filtre = null;

			if(CheckAccess(lvl)){
				filtre = $("<select></select>").addClass("popin_comments_filtres");

				var option = $("<option selected='selected'></option>").attr("value", '-1').text(Lang[user.GetLangue()].lbl.all);
				filtre.append(option);

				for(var i = 0; i < t.lblType.length; i++){
					option = $("<option></option>").attr("value", t.classNameType[i]).text(t.lblType[i]);
					filtre.append(option);
				}
			}

			filtre.bind("change", function(){
				var cible = $(".popin_comment_list .popin_comment_line");
				if($(this).val() != -1){
					cible.hide();
					$(".popin_comment_list .popin_comment_line." + $(this).val()).show();
				}else{
					cible.show();
				}
			});

			return filtre;
		},

		BuildList: function(t, json){
			var lvl = "show";
			var list = null; 

			if(CheckAccess(lvl)){

				list = $("<div></div>").addClass("popin_comment_list");

				if(json.length){
					for(var i = 0; i < json.length; i++){
						var comment = json[i];
						var line_comment = t.UI.BuildComment(t, comment);

						if(line_comment != null){ list.append(line_comment); }

					/* bouchon */
						var line_comment1 = t.UI.BuildComment(t, comment);
						var line_comment2 = t.UI.BuildComment(t, comment);
						var line_comment3 = t.UI.BuildComment(t, comment);
						var line_comment4 = t.UI.BuildComment(t, comment);
						var line_comment5 = t.UI.BuildComment(t, comment);
						var line_comment6 = t.UI.BuildComment(t, comment);
						var line_comment7 = t.UI.BuildComment(t, comment);
						var line_comment8 = t.UI.BuildComment(t, comment);
						var line_comment9 = t.UI.BuildComment(t, comment);
						var line_comment0 = t.UI.BuildComment(t, comment);
						if(line_comment1 != null){ list.append(line_comment1); }
						if(line_comment2 != null){ list.append(line_comment2); }
						if(line_comment3 != null){ list.append(line_comment3); }
						if(line_comment4 != null){ list.append(line_comment4); }
						if(line_comment5 != null){ list.append(line_comment5); }
						if(line_comment6 != null){ list.append(line_comment6); }
						if(line_comment7 != null){ list.append(line_comment7); }
						if(line_comment8 != null){ list.append(line_comment8); }
						if(line_comment9 != null){ list.append(line_comment9); }
						if(line_comment0 != null){ list.append(line_comment0); }
					/* bouchon */

					}
				}
			}

			return list;
		},

		BuildComment: function(t, json){
			var lvl = "show";
			var comment = null;

			if(CheckAccess(lvl)){
				commentLine = $("<div></div>").addClass("popin_comment_line " + t.classNameType[json.idType]);
				commentSup = $("<div></div>").addClass("popin_comment_line_sup");
				commentInf = $("<div></div>").addClass("popin_comment_line_inf");

				var user = t.UI.BuildUserComment(t, json);
				var date = t.UI.BuildDateComment(t, json);
				var type = t.UI.BuildTypeComment(t, json);
				var titre = t.UI.BuildTitreComment(t, json);
				var com = t.UI.BuildCommentaireComment(t, json);

				if(type != null){ commentLine.append(type); }

				if(user != null){ commentSup.append(user); }
				if(date != null){ commentSup.append(date); }
				if(titre != null){ commentSup.append(titre); }

				if(com != null){ commentInf.append(com); }

				commentLine.append(commentSup).append(commentInf);

				commentSup.bind("click", function(){
					var cible = $(this).siblings(".popin_comment_line_inf");
					(cible.is(":visible")) ? cible.slideUp(200) : cible.slideDown(200);
				});
			}

			return commentLine;
		},

		BuildUserComment: function(t, json){
			var lvl = "show";
			var userComment = null;

			if(CheckAccess(lvl)){
				userComment = $("<span></span>").addClass("popin_comment_line_user").text(json.UserFstName + " " + json.UserLstName);
			}

			return userComment;
		},

		BuildDateComment: function(t, json){
			var lvl = "show";
			var date = null;

			if(CheckAccess(lvl)){
				date = $("<span></span>").addClass("popin_comment_line_date").text(", " + Lang[user.GetLangue()].lbl.le + " " + json.dateCreation + " : ");
			}

			return date;
		},

		BuildTypeComment: function(t, json){
			var lvl = "show";
			var type = null;

			if(CheckAccess(lvl)){
				type = $("<div></div>").addClass("popin_comment_line_type " + t.classNameType[json.idType]).attr("title", t.lblType[json.idType]);
			}

			return type;
		},

		BuildTitreComment: function(t, json){
			var lvl = "show";
			var titre = null;

			if(CheckAccess(lvl)){
				titre = $("<span></span>").addClass("popin_comment_line_titre").text(json.titre);
			}

			return titre;
		},

		BuildCommentaireComment: function(t, json){
			var lvl = "show";
			var comment = null;

			if(CheckAccess(lvl)){
				comment = $("<div></div>").addClass("popin_comment_line_commentaire").text(json.commentaire);
			}

			return comment;
		},

		BuildForm: function(t){
			var lvl = "show";
			var form = null;

			if(CheckAccess(lvl)){
				form = $("<div></div>").addClass("popin_form");
				formcache = $("<div></div>").addClass("popin_form_cache");

				var type = t.UI.BuildFormType(t);

				var titre = t.UI.BuildFormTitre(t);
				var contenu = t.UI.BuildFormCommentaire(t);
				var commands = t.UI.BuildFormCommand(t);

				if(type != null){ form.append(type); }
				if(titre != null){ formcache.append(titre); }
				if(contenu != null){ formcache.append(contenu); }
				if(commands != null){ formcache.append(commands); }

				form.append(formcache);
			}

			return form;
		},

		BuildFormType: function(t){
			var lvl = "show";
			var form = null;

			if(CheckAccess(lvl)){
				var html = 	"<ul class='popin_form_type'>" +
							"<li><input type='radio' name='type_commentaire' id='type_commentaire_commentaire'><label class='type_commentaire_commentaire' for='type_commentaire_commentaire' title='" + t.lblType[0] + "'></label></li>" +
							"<li><input type='radio' name='type_commentaire' id='type_commentaire_exemple'><label class='type_commentaire_exemple' for='type_commentaire_exemple' title='" + t.lblType[1] + "'></label></li>" +
							"<li><input type='radio' name='type_commentaire' id='type_commentaire_complement'><label class='type_commentaire_complement' for='type_commentaire_complement' title='" + t.lblType[2] + "'></label></li>" +
							"<li><input type='radio' name='type_commentaire' id='type_commentaire_attention'><label class='type_commentaire_attention' for='type_commentaire_attention' title='" + t.lblType[3] + "'></label></li>" +
							"<li><input type='radio' name='type_commentaire' id='type_commentaire_lien'><label class='type_commentaire_lien' for='type_commentaire_lien' title='" + t.lblType[4] + "'></label></li>" +
							"</ul>";
				form = $(html);
			}

			$(form).find("input[type=radio]").bind("change", function(){
				var cache = $(".popin_form_cache")
				var limite = ($(".popin_comments").height() + cache.outerHeight(true)) + "px";

				if(!cache.is(":visible")){
					cache.slideDown(200);
					$(".popin_comments").animate({ "height": limite }, 200).css("max-height", limite);
				}
			});


			return form;
		},

		BuildFormTitre: function(t){
			var lvl = "show";
			var form = null;

			if(CheckAccess(lvl)){
				form = $("<input />").addClass("popin_form_titre").attr("type", "text").watermark(Lang[user.GetLangue()].lbl.title);
			}

			return form;
		},

		BuildFormCommentaire: function(t){
			var lvl = "show";
			var form = null;

			if(CheckAccess(lvl)){
				form = $("<textarea></textarea>").addClass("popin_form_commentaire").watermark(Lang[user.GetLangue()].lbl.commentaire);
			}

			return form;
		},

		BuildFormCommand: function(t){
			var lvl = "show";
			var commands = null;

			if(CheckAccess(lvl)){
				commands = $("<div></div>").addClass("popin_form_command");

				var valide = t.UI.BtnEnvoyer(t);
				var cancel = t.UI.BtnCancel(t);

				if(cancel != null){ commands.append(cancel); }
				if(valide != null){ commands.append(valide); } 
			}

			return commands;
		},

		BtnCancel: function(t){
			var lvl = "show";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<button></button>").text(Lang[user.GetLangue()].btn.cancel).bind("click", function(){

					var cache = $(".popin_form_cache");
					var limite = ($(".popin_comments").height() - cache.outerHeight(true) - 5) + "px";
					
					$(".popin_form_commentaire").val(null);
					$(".popin_form_titre").val(null);

					$(".popin_form_type input[type=radio]").attr("checked", false);

					if(cache.is(":visible")){
						cache.slideUp(200);
						$(".popin_comments").animate({ "height": limite }, 200, function(){
							$(this).css("max-height", "80%");
						});
					}
				});
			}

			return btn;
		},

		BtnEnvoyer: function(t){
			var lvl = "show";
			var btn = null;

			if(CheckAccess(lvl)){
				btn = $("<button></button>").text(Lang[user.GetLangue()].btn.valide)
			}

			return btn;
		},

		PopinResize: function(){
			var popin = $(".popin_comments");
			$(".popin_comment_list").height(popin.innerHeight() - ($(".popin_comments_header").outerHeight(true) + $(".popin_form").outerHeight(true) + 30));
		},

		PopinPosition: function(){

		}
	}
}


var comments;
$(document).ready(function(){
	comments = new Commentaire();
})