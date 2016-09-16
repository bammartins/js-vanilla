// $(document).ready(function(){

	// var qts_comp = prompt("Quantos componetes?"),
	// a = 0,
	// final = '';
	// while(a<qts_comp) {
	// 	var vlComp = prompt("Qual componente "+a+":");
	// 	var vlKey = prompt("Qual chave "+a+" (minusculo e sem camelcase):");
	// 	var arrayComp = [vlComp];
	// 	var arrayKey = [vlKey];
		
	// 	final += '<div mk-comp="'+arrayComp+'" chave="'+arrayKey+'"></div>';
	// 	// $("body").text('<div mk-comp="'+arrayComp+'" chave="'+arrayKey+'"></div>');
		
	// 	a++;
	// }
	
	// $("#resultado").text(final);




// $("body").prepend(output);


	// $("#showComps").on('click',function(e){
	// 	e.preventDefault();
	// 	var qtdComp = $("#qtd-comp").val();
	// 	var a=0;
		
	// 	while(a < qtdComp){
	// 		$(".insertInfo").append('<div class="componente"><label for="">Qual o componente? <input type="text" class="valComp" /></label><label for="">Qual a chave? (sem camelcase ou caracter especial) <input type="text" class="valChave" /></label></div>');	

	// 		a++;
	// 	}

	// });

	// $(".buildTemplate").on('click',function(e){
	// 	e.preventDefault();
		
	// 	var rola = '';
	// 	$(".componente").each(function(){
	// 		var inputComp = $(this).find('input').eq(0).val();
	// 		var inputChave = $(this).find('input').eq(1).val();
	// 		console.log(inputComp);
	// 		console.log(inputChave);
	// 		rola += '<div mk-comp="'+inputComp+'" chave="'+inputChave+'"></div>';
	// 	})
		
	// 	$(".resultado").text(rola);
		
	// })



// })


document.addEventListener("DOMContentLoaded", function(event) { 
	var btn1 = document.getElementById("showComps");

	btn1.onclick = function(e) {
		e.preventDefault();
		document.getElementById("geraComponentes").innerHTML = "";

		var qtdComp = document.getElementById("qtd-comp").value;
		var a = 0;

		while(a < qtdComp) {
			var div = document.createElement("div");
			div.setAttribute("class","componente");

			var labelComp = document.createElement("label");
			var textLabel = document.createTextNode("Insira o componente: ");
			var inputComp = document.createElement("input");
			inputComp.setAttribute("type","text");

			labelComp.appendChild(textLabel);
			labelComp.appendChild(inputComp);
			div.appendChild(labelComp);
			
			document.getElementById("geraComponentes").appendChild(div);
			
			a++;
		}
		// console.log("o valor é: "+qtdComp);
	}
});
