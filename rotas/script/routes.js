Routes = function(){
			
			function Routes(){
					this.type,
					this.state,
					this.url,
					this.template,
					this.isModal,
					this.routeIds = []; 				
			}	

			// Routes.prototype.setAttr = function(element, attributes){
			// 	  for(var key in attributes) {
			// 	    element.setAttribute(key, attributes[key]);
			// 	  }
			// }

			Routes.prototype.AppendEl = function (parent, elements){
				var labelNames = ['State', 'Url', 'Template'];
				for (var i = 0; i < elements.length; i++) {
					var el = document.createElement(elements[i]);
					el.setAttribute('id', i+"-input");
					el.setAttribute('class', "iText");
					el.setAttribute('type', "text");
					el.setAttribute('placeholder', labelNames[i]);
					parent.appendChild(el);
				}				
			}

			Routes.prototype.ValidateForm = function (){
				var inputs 	= document.getElementsByClassName('iText');					
				for (var i = 0; i < inputs.length; i++) {
					if(inputs[i].value != ""){
						this.routeIds.push(inputs[i].value);
					}else{
						console.log('preenche sapoha');
						return;
					}
				}
				return this.routeIds;
			}
			
			Routes.prototype.BuildRoute = function(sType, sState, sUrl, sTemplate, bModal){				
				var newRoute;
				this.type = sType;
				this.state = sState;
				this.url = sUrl;
				this.template = sTemplate;
				this.isModal = bModal;

				if (bModal === undefined) {
					newRoute = ".state('"+this.type+"."+this.state+"', {<br> &nbsp &nbsp url: '"+this.url+"',<br> &nbsp &nbsp templateUrl: '"+this.template+"' <br>})";
				}else{
					newRoute = ".state('"+this.type+"."+this.state+"', {<br> &nbsp &nbsp url: '"+this.url+"',<br> &nbsp &nbsp templateUrl: '"+this.template+"', <br> &nbsp &nbsp modalView : {icon : '', size : 'md'}<br>})";
				}
				return newRoute;
			}
			return Routes;
		}();
			


		window.onload = function(){
			var newRoute = new Routes();
			var state,
				url,
				template,
				radios 		= document.forms["formRoute"].elements["type"],
				finishRoute = document.getElementById('generateRoute'), 
				radioValue,
				radioButton    = document.getElementsByClassName('typeSegment');

			for(radio in radios) {
			    radios[radio].onclick = function(e) {
					var	formRoute 	   = document.getElementById("formulario"),
						buttonGenerate = document.getElementById('generateRoute');

					for (var i = 0; i < radioButton.length; i++) {
						if(radioButton[i].checked){
							newRoute.AppendEl(formRoute, ['input','input','input']);
							buttonGenerate.removeAttribute("disabled");							
						}
					}					
			    }
			}

			finishRoute.onclick = function(e){
				e.preventDefault();
					var routeStep   = newRoute.ValidateForm(),
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
						script = newRoute.BuildRoute(radioValue, state, url, template, true);
					}else{
						script = newRoute.BuildRoute(radioValue, state, url, template);						
					}
					routeDiv.innerHTML = script;
			}
		}