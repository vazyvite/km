var lstRights = ["list", "show", "edit", "delete", "create", "admin", "default"];
var codRights =	["01", "01", "10", "10", "10", "11", "11"];


/**
 * Fonction CheckAccess
 * Vérifie si l'utilisateur courant a accès à un élément
 * @param right:String		le droit requis pour accéder à l'élément
 * @param event:Event 		Evènement, Affiche une notification lorsque event est défini
 * @return Boolean 			true: l'utilisateur à les droits, false: l'utilisateur n'a pas les droits
 */
function CheckAccess(right, event){
	var indexRight 	= $.inArray(right, lstRights);
	var levelNeeded = (indexRight != -1) ? $.inArray(indexRight, codRights) : $.inArray(lstRights.indexOf("default"), codRights);
	var userData 	= Data.user.data;
	var access;

	if(!userData.role || userData.role == ""){
		
		access = false;
	}else{
		access = (parseInt(userData.role) >= parseInt(codRights)) ? true : false;
	}

	if(access){
		return true;
		
	}else{
		if(event && (event.type == "click" || event.type == "mouseover" || event.type == "mouseout" || event.type == "keyup" || event.type == "keydown" || event.type == "dblclick")){
			$.pnotify({
				title: Lang[user.GetLangue()].msg.no_right_title,
				text: Lang[user.GetLangue()].msg.no_right_msg,
				type: 'error'
			});
		}
		return false;
	}
}