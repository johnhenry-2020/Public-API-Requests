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
	// FETCH FUNCTIONS - using HTML5 fetch API
	// ================
	function fetchData(url) {
		// return fetch(url)
		// https://stackoverflow.com/questions/36878255/allow-access-control-allow-origin-header-using-html5-fetch-api
		return fetch(url, { mode: 'cors' })
			.then(checkstatus)
			.then((res) => res.json())
			.catch((error) => console.log(`Looks like the problem involves... ${error}`));
	}

	fetchData('https://randomuser.me/api/?results=12').then((data) => generateName(data));

	fetchData('https://randomuser.me/api/?results=12').then((data) => generateEmail(data));

	fetchData('https://randomuser.me/api/?results=12').then((data) => generateLocation(data));

	fetchData('https://randomuser.me/api/?results=12').then((data) => generateImage(data));

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

	function checkstatus(response) {
		if (response.ok === true) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(new Error(response.statusText));
		}
	}

	// ================
	// MODAL FUNCTIONS
	// ================
	entireModal = document.querySelector('.modal-container');
	employeeCard = document.querySelector('.card');
	modalCloseBtn = document.querySelector('.modal-close-btn');

	//The following toggles visibility of modal. When close button selected/clicked modal is removed revealing card(s)
	//When card is selected/clicked modal will reappear
	modalCloseBtn.addEventListener('click', () => (entireModal.style.display = 'none'));
	employeeCard.addEventListener('click', () => (entireModal.style.display = 'block'));
}); // <---- conclusion of DOMContentLoaded function
