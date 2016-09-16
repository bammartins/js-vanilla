Routes = function(){
			
			function Routes(sType, sState, sUrl, sTemplate, bModal, sIcon, sSize){
					this.type = sType;
					this.state = sState;
					this.url = sUrl;
					this.template = sTemplate;
					this.isModal = bModal;
					this.icon = sIcon;
					this.sizeModal = sSize;
					this.routeIds = []; 				
			}	

			// //Recebe o elemento pai e um array com o tipo do elemento que deseja se criar 
			// Routes.prototype.AppendEl = function (parent, elements){
			// 	// Array com os placeholders dos inputs criados dinamicamente
			// 	var labelNames = ['State', 'Url', 'Template'];
			// 	// Percorre o array, cria o elemento e faz o append dele no parent
			// 	for (var i = 0; i < elements.length; i++) {
			// 		var el = document.createElement(elements[i]);
			// 		el.setAttribute('class', "iText");
			// 		el.setAttribute('type', "text");
			// 		el.setAttribute('placeholder', labelNames[i]);
			// 		parent.appendChild(el);
			// 	}				
			// }

			// // Valida o valor do formulario
			// Routes.prototype.ValidateForm = function (){
			// 	var inputs 	= document.getElementsByClassName('iText');					
			// 	for (var i = 0; i < inputs.length; i++) {
			// 		if(inputs[i].value != ""){
			// 			this.routeIds.push(inputs[i].value);
			// 		}else{
			// 			console.log('preenche sapoha');
			// 			return;
			// 		}
			// 	}
			// 	return this.routeIds;
			// }
			
			// Constroi e retorna a rota
			Routes.prototype.BuildRoute = function(){				
				var newRoute;

				if (this.isModal === undefined) {
					newRoute = ".state('"+this.type+"."+this.state+"', {<br> &nbsp &nbsp url: '"+this.url+"',<br> &nbsp &nbsp templateUrl: '"+this.template+"' <br>})";
				}else{
					newRoute = ".state('"+this.type+"."+this.state+"', {<br> &nbsp &nbsp url: '"+this.url+"',<br> &nbsp &nbsp templateUrl: '"+this.template+"', <br> &nbsp &nbsp modalView : {icon : '"+this.icon+"', size : '"+this.sizeModal+"'}<br>})";
				}
				return newRoute;
			}
			return Routes;
		}();
function AppendEl(parent, elements){
	// Array com os placeholders dos inputs criados dinamicamente
	var labelNames = ['State', 'Url', 'Template'];
	// Percorre o array, cria o elemento e faz o append dele no parent
	for (var i = 0; i < elements.length; i++) {
		var el = document.createElement(elements[i]);
		el.setAttribute('class', "iText");
		el.setAttribute('type', "text");
		el.setAttribute('placeholder', labelNames[i]);
		parent.appendChild(el);
	}				
}	

function ValidateForm(){
	var inputs 	= document.getElementsByClassName('iText'),
		arrayValues = [];					
	for (var i = 0; i < inputs.length; i++) {
		if(inputs[i].value != ""){
			arrayValues.push(inputs[i].value);
		}else{
			console.log('preenche sapoha');
			return;
		}
	}
	return arrayValues;
}	

function triggerEvent(){
	var newRoute,
		state,
		url,
		template,
		radios 		= document.forms["formRoute"].elements["type"],
		finishRoute = document.getElementById('generateRoute'), 
		radioValue,
		radioButton    = document.getElementsByClassName('typeSegment');

	for(radio in radios) {
	    radios[radio].onclick = function(e) {
			var	formRoute 	   = document.getElementById("formulario");

			for (var i = 0; i < radioButton.length; i++) {
				if(radioButton[i].checked){
					AppendEl(formRoute, ['input','input','input']);
					finishRoute.removeAttribute("disabled");							
				}
			}					
	    }
	}

	finishRoute.onclick = function(e){
		e.preventDefault();
			var routeStep   = ValidateForm(),
				routeDiv    = document.getElementById('routeScript'),
				checkedBox  = document.getElementById('checkbox'),
				script;

			state    = routeStep[0];
			url      = routeStep[1];
			template = routeStep[2];	


			for (var j = 0; j < radioButton.length; j++) {					
				if(radioButton[j].checked){
					radioValue = radioButton[j].value;
				}
			}

			if (checkedBox.checked) {
				newRoute = new Routes(radioValue, state, url, template, true);
				script = newRoute.BuildRoute();
			}else{
				newRoute = new Routes(radioValue, state, url, template);
				script = newRoute.BuildRoute(radioValue, state, url, template);						
			}
			routeDiv.innerHTML = script;
	}
}

window.onload = function(){
	triggerEvent();
}