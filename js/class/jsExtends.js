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

	jsonKeyConcat: function(array, delimiter, key){
		var array = Array();

		for(var i = 0; i < data.motcles.length; i++){
			array.push(data.motcles[i].motcle);
		}

		return array.join(delimiter);
	}
}