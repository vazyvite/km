(function($){
	$.fn.Bones = function(options){
		var defaut, settings;

		defaut = {
			dynClassNames: {

			},
			blocs: [{
					id: "header",
					parent: null,
					name: "En-tête",
					description: "Container structurel d'en-tête",
					type: "header",
					children: [{
							id: "espace",
							parent: "header",
							name: "Portail",
							description: "Bloc de choix du portail",
							type: "portail",
							children: []},
						{	id: "menu",
							parent: "header",
							name: "Menu",
							description: "Menu",
							type: "menu",
							children: []}]},
				{	id: "body",
					parent: null,
					name: "Corps",
					description: "Container structurel du corps d'application",
					type: "body",
					children: [{
							id: "reference",
							parent: "body",
							name: "Références",
							description: "Container structurel des références de navigation",
							type: "portail",
							children: [{
									id: "recherche",
									parent: "reference",
									name: "Recherche",
									description: "Bloc de recherche",
									type: "recherche",
									children: []},
								{	id: "navigation",
									parent: "reference",
									name: "Navigation",
									description: "Bloc de navigation arborescente",
									type: "navigation",
									children: []}]},
						{	id: "content",
							parent: "body",
							name: "Contenu",
							description: "Bloc structurel de contenu",
							type: "content",
							children: [{
									id: "actions",
									parent: "content",
									name: "Action",
									description: "Bloc d'action contextuel",
									type: "action",
									children: []},
								{	id: "informations",
									parent: "content",
									name: "Infos",
									description: "Bloc d'informations contextuelles",
									type: "infos",
									children: []}]}]}],
		};
		settings = $.extend(defaut, options);

		methodes = {
			Init: function(){
				this.AttachEvents();
				this.InitEv();
			},

			InitEv: function(){
				var header = new Bloc($(settings.blocs.header))
			},

			AttachEvents: function(){

			}
		}

		methodes.Init($(this)); 
	}
})(jQuery)