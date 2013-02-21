function Dialog(options){

	options = {
		title: (options.title == undefined) ? "titre" : options.title,
		content: (options.content == undefined) ? "<div class='form_line'>aucun contenu défini</div>" : options.content,
		class: (options.class == undefined) ? "dialog_undefined" : options.class,
		type: (options.type == undefined) ? 0 : options.type,
		modal: (options.modal == undefined) ? false : options.modal,
		autoShow: (options.autoShow == undefined) ? true : options.autoShow
	};

	this.settings = {
		jqSelector: {
			close: ".dialog_closebtn",
			cache: "#dialogCache",
			valide: ".dialogValidationConnexion"
		},
		objets: {
			dialog: "dialog",
			title: "dialog_title",
			content: "dialog_content",
			close: "dialog_closebtn"
		},
		data: {
			title: options.title,
			content: options.content,
			class: options.class,
			type: options.type
		},
		pos: null,
		isModal: options.modal
	};

	this.Init();

	if(options.autoShow){
		this.Build();
	}
}

Dialog.prototype = {

	/**
	 * Méthode Init
	 * Méthode d'initialisation de la classe Dialog
	 **/
	Init: function(){
		this.AttachEvents();
	},

	/** 
	 * Méthode AttachEvents
	 * Attache les évènements liés à la classe Dialog
	 **/
	AttachEvents: function(){
		var t = this;
		if(!this.settings.isModal){
			$(this.settings.jqSelector.cache).on("click", function(){ t.HideAll(); });
		}
	},

	/** TODO
	 * Méthode AttachEventsOnShow
	 * Attache les évènements liés à la classe Dialog après la création de la boite de dialogue
	 * @param obj:jQueryObject				objet jquery correspondant à l'élément activé
	 * @TODO	Gérer les évènements liés à la validation du formulaire de connexion d'utilisateur
	 */
	AttachEventsOnShow: function(obj){
		var t = this;
		obj.find(this.settings.jqSelector.close).on("click", function(){ t.Hide(obj); });

		if(this.settings.data.type == 1){ // UserConnect
			$(this.settings.jqSelector.valide).on("click", function(){
				var login = $("#user_dialog_login").val();
				var mdp = $("#user_dialog_password").val();
				user.Connect(login, mdp);
			});
		}
	},

	/**
	 * Méthode DetachEventsOnShow
	 * Détache les évènements liés à la classe Dialog après la destruction de la boite de dialogue
	 * @param obj:jQueryObject				objet jquery correspondant à l'élément activé
	 */
	DetachEventsOnShow: function(){
		obj.find(this.settings.jqSelector.close).off("click");
	},

	/**
	 * Méthode Build
	 * Lance la construction de la boite de dialogue
	 */
	Build: function(){
		var html = "<div class='" + this.settings.objets.dialog + " " + this.settings.data.class + "'></div>";
		var win = $(window);

		$("body").append(html);

		html = $("." + this.settings.data.class);

		html.append("<div class='" + this.settings.objets.title + "'>" + this.settings.data.title + "<a class='" + this.settings.objets.close + "'></a></div>");
		html.append("<div class='dialog_error'></div>");
		html.append("<div class='" + this.settings.objets.content + "'>" + this.settings.data.content + "</div>");
		
		this.settings.pos = {
			top: (win.height() - html.outerHeight(true)) / 2,
			left: (win.width() - html.outerWidth(true)) / 2};

		html.css({
			"top" : -html.outerHeight(true) + "px",
			"left": this.settings.pos.left + "px"
		});
		
		this.Show(html);
		html.find("input[type='text']:first").select();
	},

	/**
	 * Méthode DisplayError
	 * Affiche une erreur dans la boite de dialogue
	 * @param error:String		Contenu de l'erreur à afficher
	 */
	DisplayError: function(error){
		$("." + this.settings.data.class).find(".dialog_error").html(error).show(1000);
	},

	/**
	 * Méthode Show
	 * Lance le scénario d'apparition de la boite de dialogue
	 * @param obj:jQueryObject				objet jquery correspondant à l'élément activé
	 */
	Show: function(obj){
		this.ShowCache();
		this.ShowDialog(obj);
	},

	/**
	 * Méthode Hide
	 * Lance le scénario de disparition de la boite de dialogue
	 * @param obj:jQueryObject				objet jquery correspondant à l'élément activé
	 */
	Hide: function(obj){
		this.HideDialog(obj);
		this.HideCache();
	},

	/**
	 * Méthode HideAll
	 * Lance le scénario de disparition de toutes les boites de dialogue
	 */
	 HideAll: function(){
	 	var t = this;
	 	$("." + this.settings.objets.dialog).each(function(){
	 		t.Hide($(this));
	 	});
	 },

	/**
	 * Méthode ShowDialog
	 * Affiche la boite de dialogue
	 * @param obj:jQueryObject				objet jquery correspondant à l'élément activé
	 */
	ShowDialog: function(obj){
		var t = this;
		obj.show().animate({top: this.settings.pos.top}, 500);
		this.AttachEventsOnShow(obj);
	},

	/**
	 * Méthode HideDialog
	 * Cache la boite de dialogue
	 * @param obj:jQueryObject				objet jquery correspondant à l'élément activé
	 */
	HideDialog: function(obj){
		var t = this;
		obj.animate({top: -obj.outerHeight(true)}, 150, function(){ t.Destroy(obj); });
	},

	/**
	 * Méthode Destroy
	 * Détruit la boite de dialogue
	 * @param obj:jQueryObject				objet jquery correspondant à l'élément activé
	 */
	Destroy: function(obj){
		obj.hide().remove();
	},

	/**
	 * Méthode ShowCache
	 * Affiche le cache de la boite de dialogue
	 */
	ShowCache: function(){
		if($(this.settings.jqSelector.cache).is(":hidden")){
			$(this.settings.jqSelector.cache).show().animate({"opacity" : 0.9}, 300);
		}
	},

	/**
	 * Méthode HideCache
	 * Cache le cache de la boite de dialogue
	 */
	HideCache: function(){
		if(this.NbActivesDialogs() <= 1){
			var cache = $(this.settings.jqSelector.cache);
			cache.animate({"opacity" : 0}, 200, function(){ cache.hide(); });
		}
	},

	/**
	 * Méthode NbActivesDialogs
	 * Retourne le nombre de boites de dialogue actives
	 * @return Int 				Correspond au nombre de boites de dialogues actives dans la page
	 */
	 NbActivesDialogs: function(){
	 	return $("." + this.settings.objets.dialog).size();
	 }
}