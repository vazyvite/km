Array.prototype = {

	/**
	 * Array.concat
	 * Concatène les valeurs d'un array en les séparant par le delimiter
	 * @alias Array.join()
	 * @param array:Array 		Tableau à concaténer
	 * @param delimiter:String 	chaine de caractère utilisée pour délimiter les différentes valeurs du tableau
	 * @return String 			concaténation des différentes valeurs tableau
	 */
	concat: function(array, delimiter){
		return array.join(delimiter);
	},


	/**
	 * Array.jsonKeyConcat
	 * Concaténation de certains éléments d'un JSON
	 * @param array:JSON 		Tableau d'éléments
	 * @param delimiter:String 	Délimiter permettant de concaténer les éléments du tableau
	 * @param key:String 		clé du tableau permettant de concaténer seulement certains éléments du JSON
	 * @return :String			Chaine de caractère concaténée
	 */
	jsonKeyConcat: function(array, delimiter, key){
		var array = Array();

		for(var i = 0; i < data.motcles.length; i++){
			array.push(data.motcles[i].motcle);
		}

		return array.join(delimiter);
	}
}