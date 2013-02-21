function Bloc(element){
	this._id = element.id;
	this.element = $("#" + this._id);
	this._name = element.name;
	this._description = element.description;
	this._type = element.type;

	this.Init();
}
Bloc.prototype = {

	// Setters
	setId: function(id){ this._id = id; },
	setName: function(name){ this._name = name; },
	setDescription: function(description){ this._description = description; },
	setType: function(type){ this._type = type; },

	// Getters
	getId: function(){ return this._id; },
	getName: function(){ return this._name; },
	getDescription: function(){ return this._description; },
	getType: function(){ return this._type; },

	Init: function(){
		this.AttachEvents();
		this.MiseEnForme();
		this.MiseEnStyle();
	},
	
	Draw: function(){
		//this.
	},

	AttachEvents: function(){
		this.element.on("click", function(){
			alert("ok");
		});
	},

	MiseEnForme: function(){
		this.element.removeAttribute("description");
		this.element.removeAttribute("type");
	},

	MiseEnStyle: function(){
		this.element.addClass("bloc");
	}
}