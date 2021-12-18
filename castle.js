const readline = require('readline')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let current;
let previous;
let exits;
let points = 0;
let ifGun = false;
let ifGunExist = true;
let win = false;

let commands = {
	go: (subject) => {
		start[subject]();
	},

	nothing: (lastPlace) => {
		console.log("You went nowhere, try again.");
		start[lastPlace]();
	},

	turn: (subject) => {
		start[subject]();
	},

}

let start = {
	home: () => {
		exits = ["forest", "mountain"];
		console.log("\n" + "You are at home. There is a forest on your left, and a mountain on your right.");
			rl.question("Where do you wanna go? ('go' + place) >>", (command) => {

				let verb = command.split(" ")[0];
				let subject = command.split(" ")[1];

				// if(!exits.includes(subject)) {
				// start[home];
				// }

				previous = "home";
				current = subject;

				if(!exits.includes(subject)){
					commands[verb](previous);
				} else {
					commands[verb](subject);
				}
			});
	},

	// locations start
	forest: () => {
		exits = ["straight", "school"];
		console.log("\n" + "You are in the forest. there is a school on your right, or you can go straight.");
		rl.question("Where do you wanna go? ('go' + place) >>", (command) => {

			let verb = command.split(" ")[0];
			let subject = command.split(" ")[1];

			previous = "home"
			if (subject == "back"){
				commands[verb](previous);
			} else if (subject == "straight") {
				current = "witch";
				commands[verb]("witch");
			} else if (exits.includes(subject)){
				current = subject;
				commands[verb](subject);
			} else {
				commands[verb]("forest");
			}
		});
	},

	mountain: () => {
		exits = ["village", "cave"];
		console.log("\n" + "You are in the moutain. There is a village on your left and a secret cave on your right.");
		rl.question("Where do you wanna go? ('go' + place) >>", (command) => {

			let verb = command.split(" ")[0];
			let subject = command.split(" ")[1];

			previous = "home"
			if (subject == "back"){
				commands[verb](previous);
			} else if (exits.includes(subject)){
				current = subject;
				commands[verb](subject);
			} else {
				commands[verb]("mountain");
			}
		});
	},

	cave: () => {
		exits = ["spider"]
		console.log("\n" + "You're in the cave, go straight or go back to the moutain.");
		rl.question("Where do you wanna go? ('go' + place) >>", (command) => {

			let verb = command.split(" ")[0];
			let subject = command.split(" ")[1];

			if (subject == "back"){
				commands[verb](previous);
			} else if (subject == "straight" && ifGunExist == true){
				previous = "mountain";
				current = subject;
				commands[verb]("gun");
			} else {
				commands[verb]("cave");
			}
		});
	},

	// locations end

	gun: () => {
		rl.question("You found a gun on the floor, pick it up? (yes/no) >>", (command) => {
			if (command == "yes") {
				getPoints();
				ifGun = true;
				ifGunExist = false;
			}
			if (win == true) {
				console.log("You won!")
			} else {
				previous = "mountain";
				current = "cave";
				commands["go"](current);
			}
		})
	},


	// npc
	witch: () => {
		rl.question("\n" + "you meet a witch. you wanna fight? (yes/no) >>", (command) => {
			if (command == "yes") {
				if (ifGun == false){
					console.log("You died!");
				} else {
					console.log("You killed the witch!");
					getPoints();
				}
			}

			if (win == true) {
				console.log("You won!")
			} else {
				previous = "home";
				current = "forest"
				commands["go"](previous);
			}
		})
	},


	school: () => {
		exits = ["classroom", "gym"]
		console.log("\n" + "You entered a school. You can go to the classroom or the gym");
		rl.question("Where do you wanna go? ('go' + place) >>", (command) => {

			let verb = command.split(" ")[0];
			let subject = command.split(" ")[1];

			previous = "forest";
			current = subject;

			if (subject == "back"){
				commands[verb](previous);
			} else if (exits.includes(subject)){
				commands[verb](subject);
			}
		});
	},

	village: () => {
		exits =["restaurant", "tower", "gravelRoad"];
		console.log("\n" + "Welcome to the village of devil. Go restaurant or tower?");
		rl.question("Where do you wanna go? ('go' + place) >>", (command) => {

			let verb = command.split(" ")[0];
			let subject = command.split(" ")[1];

			previous = "mountain";
			current = subject;
			if (subject == "back"){
				commands[verb](previous);
			} else if (exits.includes(subject)){
				commands[verb](subject);
			}
		});
	},

	classroom: () => {
		exits = ["gym"];
		console.log("\n" + "You are in the classroom.");
		getPoints();
		if (win == true) {
				console.log("You won!")
		} else{
			rl.question("Where do you wanna go? ('go' + place) >>", (command) => {

				let verb = command.split(" ")[0];
				let subject = command.split(" ")[1];

				if (subject == "back"){
					commands[verb](previous);
				} else if (exits.includes(subject)){
					previous = "school";
					current = subject;
					commands[verb](subject);
				} else {
					commands[verb]("school");
				}
			});
		}
	},

	gym: () => {
		exits = ["classroom"];
		console.log("\n" + "You are in the gym.");
		getPoints();
		if (win == true) {
				console.log("You won!")
		} else{
			rl.question("Where do you wanna go? ('go' + place) >>", (command) => {

				let verb = command.split(" ")[0];
				let subject = command.split(" ")[1];

				if (subject == "back"){
					commands[verb](previous);
				} else if (exits.includes(subject)){
					previous = "school";
					current = subject;
					commands[verb](subject);
				} else {
					commands[verb]("school");
				}
			});
		}
	},

	restaurant: () => {
		exits = ["tower"];
		console.log("\n" + "Welcome to the restaurant!");
		getPoints();
		if (win == true) {
				console.log("You won!")
		} else{
			rl.question("Where do you wanna go? ('go' + place) >>", (command) => {

				let verb = command.split(" ")[0];
				let subject = command.split(" ")[1];

				if (subject == "back"){
					commands[verb](previous);
				} else if (exits.includes(subject)){
					previous = "village";
					current = subject;
					commands[verb](subject);
				} else {
					commands[verb]("village");
				}
			});
		}
	},

	tower: () => {
		exits = ["restaurant"];
		console.log("\n" + "Welcome to the highest place on the planet: the TOWER!");
		getPoints();
		if (win == true) {
				console.log("You won!")
		} else{
			rl.question("Where do you wanna go? ('go' + place) >>", (command) => {

				let verb = command.split(" ")[0];
				let subject = command.split(" ")[1];

				if (subject == "back"){
					commands[verb](previous);
				} else if (exits.includes(subject)){
					previous = "village";
					current = subject;
					commands[verb](subject);
				} else {
					commands[verb]("village");
				}
			});
		}
	}
}


start.home();

function getPoints () {
	points += 2;
	console.log("You get 2 points!");
	console.log("You have points:" + points);
	if (points >= 12) {
		win = true;
	}
}

