const data = [
	{id: 0, type: "quote", message: "A vaincre sans péril, on triomphe sans gloire"}, 
	{id: 1, type: "quote", message: "Tout est au mieux dans le meilleur des mondes"}, 
	{id: 2, type: "quote", message: "L'imagination est plus importante que le savoir"}, 
	{id: 3, type: "quote", message: "Un problème sans solution est un problème mal posé"},
	{id: 4, type: "proverb", message: "Paix et tranquillité, voilà le bonheur."}, 
	{id: 5, type: "proverb", message: "La patience est un arbre dont la racine est amère, et dont les fruits sont très doux."}, 
	{id: 6, type: "proverb", message: "On apprend peu par la victoire, mais beaucoup par la défaite."},
	{id: 7, type: "proverb", message: "Avec du temps et de la patience, on vient à bout de tout."}
];

// variables names are well chosen but I assure you camel case is usually used in js / ts
const btn_fav = document.getElementById("btn-fav");
const btn_fav_del = document.getElementById("btn-fav-del");
const btn_fav_add = document.getElementById("btn-fav-add");
const btn_return = document.getElementById("btn-return");
const btn_listen = document.getElementById("btn-listen");
const btn_reset = document.getElementById("btn-reset");
const btn_speak = document.getElementById("btn-speak");
const btn_add = document.getElementById("btn-add");

const fav_box = document.getElementById("fav-box");
const ask_box = document.getElementById("ask-box");
const message_box = document.getElementById("message-box");
const add_box = document.getElementById("add-box");
// yoda_message does not give any information about the technical use
const yoda_message = document.getElementById("message");

const form_ask = document.getElementById("form-ask-message");
const form_add = document.getElementById("form-add-message");
const check_quote_add = document.getElementById("check-quote-add");
const check_quote = document.getElementById("check-quote");
const check_proverb_add = document.getElementById("check-proverb-add");
const check_proverb = document.getElementById("check-proverb");

const fav_quote_list = document.getElementById("fav-quote-list");
const fav_proverb_list = document.getElementById("fav-proverb-list");

// You won't reassign those variables so use const
let current_message =  {type: "Sentence", message : "Hm." };
let fav_tab = [];


//---------------Utils function-------------
const get_random_message = (type) => {
	const filtered = data.filter(elem => is_ok(elem.type, type));
	// remove console.log before delivering the code
	console.log(filtered.length);
	return (filtered[Math.floor(Math.random() * filtered.length)].message);
}

const push_new_message = (message, type) => {
	if (type === "quote" || type === "proverb") {
		data.push({id: data.length+1, type: type, message: message});
	} else {
		console.log("Incorrect type.");
	}
}

const is_ok = (elem, message) => {
	return elem === message;
}

const set_fav = () => {
	const quote_list = fav_tab.filter(elem => is_ok(elem.type, "quote"));
	const proverb_list = fav_tab.filter(elem => is_ok(elem.type, "proverb"));

	quote_list.forEach(elem => {
		let node = document.createElement("li");
		node.textContent = elem.message;
		fav_quote_list.appendChild(node);
	});
	proverb_list.forEach(elem => {
		let node = document.createElement("li");
		node.textContent = elem.message;
		fav_proverb_list.appendChild(node);
	});
}


const find_node = (list, message) => {
	const item_list = list.getElementsByTagName('li');
	console.log(item_list);

	for (let i = 0; i <= item_list.length - 1; i++) {
				if (item_list[i].textContent === message)
			return item_list[i];
	}
}

//----------------Main--------------
//initialisation
if (localStorage.length) {
	fav_tab = JSON.parse(localStorage.getItem("favorite"));
	set_fav();
}

//Yoda speak
btn_speak.addEventListener("click", (e) => {
	e.preventDefault();

	if (check_proverb.checked || check_quote.checked) {
		ask_box.style.display = "none";
		message_box.style.display = "flex";
		if (check_proverb.checked) {
			current_message.type = "proverb";
			current_message.message = get_random_message("proverb");
			yoda_message.textContent = current_message.message;
		}
		else if (check_quote.checked) {
			current_message.type = "quote";
			current_message.message = get_random_message("quote");
			yoda_message.textContent = current_message.message;
		}
		else
			console.log("Error btn_speak");
	} else {
		alert("Un choix au moins, tu doit realiser.");
	}
	if (fav_tab.find(elem => is_ok(elem.message, current_message.message))) {
		btn_fav_add.style.display = "none";
		btn_fav_del.style.display = "inline";	
	} else {
		btn_fav_add.style.display = "inline";
		btn_fav_del.style.display = "none";	
	}
});

//Reset speak box
btn_reset.addEventListener("click", () => {
	ask_box.style.display = "flex";
	message_box.style.display = "none";
	yoda_message.textContent = "";
});

//Learn yoda something
btn_listen.addEventListener("click", (e) => {
	e.preventDefault();

	ask_box.style.display = "none";
	message_box.style.display = "none";
	message_box.style.display = "none";
	add_box.style.display = "flex";
});

//Add new message
btn_add.addEventListener("click", (e) => {
	e.preventDefault();
	const new_message = document.getElementById("message-add").value;

	if (new_message) {
		if (check_proverb_add.checked || check_quote_add.checked) {
			if (check_proverb_add.checked) {
				push_new_message(new_message, "proverb");
				yoda_message.textContent = new_message;
				add_box.style.display = "none";
				message_box.style.display = "flex";
			}
			else if (check_quote_add.checked) {
				push_new_message(new_message, "quote");
				yoda_message.textContent = new_message;
				add_box.style.display = "none";
				message_box.style.display = "flex";
			}
			else
				console.log("Error btn_add");
		} else {
			alert("Un choix au moins, tu doit realiser.");
		}

	} else {
		alert("Un message a me transmettre dans le champ, tu doit remplir.");
	}
});


// -----------Favoris-----------
//Fav box
btn_fav.addEventListener("click", e => {
	add_box.style.display = "none";
	message_box.style.display = "none";
	ask_box.style.display = "none";
	fav_box.style.display = "flex";
});

//Add to fav
btn_fav_add.addEventListener("click", e => {
	fav_tab.push({"type": current_message.type, "message": current_message.message});
	localStorage.setItem("favorite", JSON.stringify(fav_tab));

	if (current_message.type === "proverb") {
		let node = document.createElement("li");
		node.textContent = current_message.message;
		fav_proverb_list.appendChild(node);
	} else {
		let node = document.createElement("li");
		node.textContent = current_message.message;
		fav_quote_list.appendChild(node);
	}

	btn_fav_add.style.display = "none";
	btn_fav_del.style.display = "inline";
	
});

//del from fav
btn_fav_del.addEventListener("click", e => {
	fav_tab = fav_tab.filter(elem => !is_ok(elem.message, current_message.message));
	localStorage.setItem("favorite", JSON.stringify(fav_tab));

	if (current_message.type === "proverb") {
		let node = find_node(fav_proverb_list, current_message.message);
		fav_proverb_list.removeChild(node);
	} else {
		let node = find_node(fav_quote_list, current_message.message);
		fav_quote_list.removeChild(node);
	}
	btn_fav_add.style.display = "inline";
	btn_fav_del.style.display = "none";
});

//return to home from fav box
btn_return.addEventListener("click", e => {
	fav_box.style.display = "none";
	add_box.style.display = "none";
	message_box.style.display = "none";
	ask_box.style.display = "flex";
});
