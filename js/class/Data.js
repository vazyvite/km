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
