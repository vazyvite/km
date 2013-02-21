function Resize(){
	this.settings = {
		window : {
			width: $(window).width(),
			height: $(window).height()
		},
		jqSelectors: {
			main: "#main",
			header: "#header",
			portail: "#portail",
			menu: "#menu",
			user: "#user",
			body: "#body",
			reference: "#reference",
			recherche: "#recherche",
			navigation: "#navigation",
			content: "#content",
			informations: "#informations",
			article: "#article"
		}
	}

	this.init();
}

Resize.prototype = {
	init: function(){
		this.attachEvents();
		this.all();
	},
	attachEvents: function(){
		var t = this;
		$(window).resize(function(){
			t.all();
		});
	},
	recalculWindowDims: function(){
		this.settings.window = {
			width: $(window).width(),
			height: $(window).height()
		};
	},
	all: function(){
		this.recalculWindowDims();
		this.menu();
		this.body();
		this.reference();
		this.content();
		this.recherche();
		this.navigation();
		this.informations();
		this.article();
	},
	menu: function(){
		var array_width = Array();
		var total_width_fixed = 0;

		$(this.settings.jqSelectors.header).children().each(function(){
			array_width.push($(this).outerWidth(true));
		});

		total_width_fixed = array_width[0] + array_width[2];
		$(this.settings.jqSelectors.menu).width(this.settings.window.width - total_width_fixed);
	},
	body: function(){
		var totalHeight = $(this.settings.jqSelectors.main).height();
		$(this.settings.jqSelectors.body).height(totalHeight - $(this.settings.jqSelectors.header).outerHeight());
	},
	reference: function(){
		var totalWidth = $(this.settings.jqSelectors.main).outerWidth();
		$(this.settings.jqSelectors.reference).width(Math.round(totalWidth * .20));
	},
	content: function(){
		var totalWidth = $(this.settings.jqSelectors.main).outerWidth();
		$(this.settings.jqSelectors.content).width(totalWidth - $(this.settings.jqSelectors.reference).outerWidth());
	},
	recherche: function(){
		var dim = {
			height: $(this.settings.jqSelectors.reference).height(),
			width: $(this.settings.jqSelectors.reference).width()
		};
		$(this.settings.jqSelectors.recherche).width(dim.width - 10).height((dim.height / 2) - 7);
	},
	navigation: function(){
		var dim = {
			height: $(this.settings.jqSelectors.reference).height(),
			width: $(this.settings.jqSelectors.reference).width()
		};
		$(this.settings.jqSelectors.navigation).width(dim.width - 10).height((dim.height / 2) - 7);
	},
	informations: function(){
		var contentWidth = $(this.settings.jqSelectors.content).outerWidth();
		$(this.settings.jqSelectors.informations).width(contentWidth - 10);
	},
	article: function(){
		var dim = {
			height: $(this.settings.jqSelectors.content).height(),
			width: $(this.settings.jqSelectors.content).width()
		};
		$(this.settings.jqSelectors.article).width(dim.width - 10).height(dim.height - $(this.settings.jqSelectors.informations).outerHeight(true) - 15);
	}
}

var resize;
$(document).ready(function(){ 
	resize = new Resize();
	
});