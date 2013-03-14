var Data = {
	portail: {
		data: {
			idPortail: null,
			portail: null
		},
		list: null
	},

	user: {
		data: {
			idUser: 0,
			lstName: "",
			fstName: "",
			email: "",
			role: "",
			login: ""
		}
	},

	article: {
		data: null
	},

	navigation: {
		data: null,
		list: null
	},

	recherche: {
		data: null
	}
};

/**
 * Function verifyData
 * Permet de vérifier que chaque valeur contenues dans le JSON sont différentes de NULL
 * @param json:JSON 		données à vérifier
 * @return error:Boolean	true: pas d'erreurs ; false: contient au moins une erreur
 */
function verifyData(json){
	var error = false;

	for(var key in json){  
		if(json[key] === null || json[key] === undefined || json[key] == ""){
			error = true;
			break;
		}
	}

	return !error;
}
