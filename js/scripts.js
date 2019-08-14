// ==========================================================
// Project: Public API Request
// File: scripts.js (Main JavaScript Logic)
// Author: Jonathan J.Jolivette
// Created: 8.14.19
// THANK YOU FOR YOUR SUPPORT
// ==========================================================

/* DOMContentLoaded...*/ window.addEventListener('DOMContentLoaded', (event) => {
	// ================
	// GLOBAL VARIABLES
	// ================
	// let name = document.getElementById('name');

	// ================
	// FETCH FUNCTIONS
	// ================
	fetch('https://randomuser.me/api/?results=12').then((res) => res.json()).then((data) => generateName(data));

	fetch('https://randomuser.me/api/?results=12').then((res) => res.json()).then((data) => generateEmail(data));

	fetch('https://randomuser.me/api/?results=12').then((res) => res.json()).then((data) => generateLocation(data));

	fetch('https://randomuser.me/api/?results=12').then((res) => res.json()).then((data) => generateImage(data));

	// ================
	// HELPER FUNCTIONS
	// ================
	function generateName(data) {
		let name = document.getElementById('name');
		const firstName = data.results[0].name.first;
		const lastName = data.results[0].name.last;
		const fullName = `${firstName} ${lastName}`;
		name.innerText = fullName;
	}

	function generateEmail(data) {
		let email = document.querySelector('p.card-text');
		const emailAddress = data.results[0].email;
		const userEmail = `${emailAddress}`;
		email.innerText = userEmail;
	}

	function generateLocation(data) {
		let address = document.querySelector('p.card-text.cap');
		const cityAddress = data.results[0].location.city;
		const stateAddress = data.results[0].location.state;
		const location = `${cityAddress} ${stateAddress}`;
		console.log((address.innerText = location));
		address.innerText = location;
	}

	function generateImage(data) {
		let imgFrame = document.querySelector('#gallery img');
		const avatar = data.results[0].picture.thumbnail;
		imgFrame.src = avatar;
	}
}); // <---- conclusion of DOMContentLoaded function
