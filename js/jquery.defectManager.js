(function($){
	$.fn.defectManager = function(options){
		var methods, storage, error, debug, defaut, settings;
		
		defaut = {
			debug: true,								// Boolean - Active le mode débug (console)	(personnalisable)
			alert: false,								// Boolean - Active le mode début (alert)	(personnalisable)
			defect: {
				header: "DefectItem",					// String - chaine de caractère permettant d'identifier un header de defect dans le localStorage
				delimiter: ";"							// Char - caractère permettant de séparer les différents éléments les uns des autres au sein d'un defect
			},
			tableTarget: "table"						// String - jQuerySelector permettant d'identifier le tableau où intégrer les lignes de defects 	(dynamique)
		};
		settings = $.extend(defaut, options);

		methods = {
			Init: function($this){
				storage._SetItem("DefectItem;1984;Defect de test;Description du Defect;10;4;4;3");
				this.TraceDefects(storage.GetAllDefects($this));
			},

			TraceDefects: function(defects){

				for(var i = 0; i < defects.length; i++){
					var trace = "<tr>";
						trace += "<td class='idDefect'>" + defects[i][1] + "</td>";
						trace += "<td class='titleDefect'>" + defects[i][2] + "</td>";
						trace += "<td class='descDefect'>" + defects[i][3] + "</td>";
						trace += "<td class='avanceDefect'>" + defects[i][4] + "</td>";
						trace += "<td class='prioriteDefect'>" + defects[i][5] + "</td>";
						trace += "<td class='severiteDefect'>" + defects[i][6] + "</td>";
						trace += "<td class='etatDefect'>" + defects[i][7] + "</td>";
						trace += "</tr>";
					$(settings.tableTarget).append(trace);
				}
			}
		},

		storage = {
			GetAllDefects: function(){
				var defect_list, allDefect, item;
				return this._startWith(settings.defect.header);
			},

			_GetItem: function(key){ 		return (localStorage) ? localStorage.getItem(key) : error("101"); },
			_SetItem: function(key, value){ (localStorage) ? localStorage.setItem(key, value) : error("101"); },
			_Clear: function(){ 			(localStorage) ? localStorage.clear() : error("101"); },
			_RemoveItem: function(key){		(localStorage) ? localStorage.removeItem(key) : error("101"); },
			_GetNbItem: function(){			return (localStorage) ? localStorage.length : error("101"); },
			_startWith: function(pattern){
				var result = [];
				if(localStorage){
	      			Object.keys(localStorage).forEach(function(key){
	            		if(key.substring(0, pattern.length) == pattern) { result.push(key.split(settings.defect.delimiter)); }
	        		});
	      		}else{ error("101"); }
	      		return result;
			}
		},

		error = {
			set: function(code){
				var texte = "";

				switch(code){
					case "101": texte = "Erreur " + code + " : javascript Object localStorage not supported"; break;
					default: texte = "Erreur inconnue"; break;
				}

				debug.show(texte);
			}
		},

		debug = {
			show: function(){
				if(settings.debug){ 		console.log(texte); }
				else if(settings.alert){	alert(texte); }
			}
		}

		//return this.each(methods.Init());
		methods.Init($(this));
	} // close $.fn.defectManager
})(jQuery)