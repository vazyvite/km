function Resize(){
	this.s = {
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
		this.s.window = {
			width: $(window).width(),
			height: $(window).height()
		};
	},
	all: function(){
		this.recalculWindowDims();
		this.main();
		this.menu();
		this.body();
		this.reference();
		//this.content();
		this.recherche();
		this.navigation();
		//this.informations();
		this.article();
	},
	main: function(){
		$(this.s.jqSelectors.main).width(this.s.window.width)
	},
	menu: function(){
		var array_width = Array();
		var total_width_fixed = 0;

		$(this.s.jqSelectors.header).children().each(function(){
			array_width.push($(this).outerWidth(true));
		});

		total_width_fixed = array_width[0] + array_width[2];
		$(this.s.jqSelectors.menu).width(this.s.window.width - total_width_fixed);
	},
	body: function(){
		var totalHeight = $(this.s.jqSelectors.main).height();
		$(this.s.jqSelectors.body).height(totalHeight - $(this.s.jqSelectors.header).outerHeight());
	},
	reference: function(){
		var totalWidth = $(this.s.jqSelectors.main).outerWidth();
		$(this.s.jqSelectors.reference).width(Math.round(totalWidth * .20));
	},
	content: function(){
		var totalWidth = $(this.s.jqSelectors.main).outerWidth();
		$(this.s.jqSelectors.content).width(totalWidth - $(this.s.jqSelectors.reference).outerWidth());
	},
	recherche: function(){
		var dim = {
			height: $(this.s.jqSelectors.reference).height(),
			width: $(this.s.jqSelectors.reference).width()
		};
		$(this.s.jqSelectors.recherche).width(dim.width - 10).height((dim.height / 2) - 7);
	},
	navigation: function(){
		var dim = {
			height: $(this.s.jqSelectors.reference).height(),
			width: $(this.s.jqSelectors.reference).width()
		};
		$(this.s.jqSelectors.navigation).width(dim.width - 10).height((dim.height / 2) - 7);
	},
	informations: function(){
		/*var contentWidth = $(this.s.jqSelectors.content).outerWidth();
		$(this.s.jqSelectors.informations).width(contentWidth - 10);*/
	},
	article: function(){
		var dim = {
			height: $(this.s.jqSelectors.content).height(),
			width: $(this.s.jqSelectors.content).width()
		};
		$(this.s.jqSelectors.article)/*.width(dim.width - 10)*/.height(dim.height - $(this.s.jqSelectors.informations).outerHeight(true) - 15);
	}
}

var resize;
$(document).ready(function(){ 
	resize = new Resize();
	
});