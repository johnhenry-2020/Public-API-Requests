// ==========================================================
// Project: Public API Request
// File: scripts.js (Main JavaScript Logic)
// Author: Jonathan J.Jolivette
// Created: 8.14.19
// THANK YOU FOR YOUR SUPPORT
// ==========================================================

/* DOMContentLoaded...*/ window.addEventListener('DOMContentLoaded', (event) => {
	// ========================================
	// FETCH FUNCTIONS - using HTML5 fetch API
	// ========================================
	function fetchData(url) {
		// No 'Access-Control-Allow-Origin' addresed by setting the mode of fetch to CORS
		// REFERENCE: https://stackoverflow.com/questions/36878255/allow-access-control-allow-origin-header-using-html5-fetch-api
		return fetch(url, { mode: 'cors' })
			.then(checkstatus)
			.then((res) => res.json())
			.catch((error) => console.log(`Looks like the problem involves... ${error}`));
	}

	fetchData('https://randomuser.me/api/?results=12').then((data) => {
		// =====  PROMISE ITERATES THROUGH THE JSON DATA RETURNED & CREATES THE EMPLOYEE'S PROFILE CARDS DYNAMICALLY =====
		const employee = data.results.map((data, name) => {
			// ==== CARD DIV ====
			var cardDiv = document.createElement('div'); // Create a <div> element for card div
			cardDiv.setAttribute('class', 'card zoom'); // Add class(es) to card <div> element

			// ==== CARD IMAGE CONTAINER DIV ====
			var cardImgContainer = document.createElement('div'); // Create a <div> element for card image container
			cardImgContainer.setAttribute('class', 'card-img-container'); //Add class(es) to card image container <div>

			// ==== AVATAR PLACEHOLDER ====
			var cardImg = new Image(); // Create an image element for profile pictures
			cardImg.setAttribute('class', 'card-img avatar'); //Add class(es) to card <div> element
			cardImg.src = data.picture.thumbnail; // populates the API's JSON employee picture/thumbnail property value to the DOM
			cardImg.alt = 'profile picture'; //set the alt attribute

			// ==== CARD INFO CONTAINER DIV ====
			var cardInfoContainer = document.createElement('div'); // Create a card info container <div> element for profile's text elements
			cardInfoContainer.setAttribute('class', 'card-info-container'); // Add class(es) to card info container <div> element

			// ==== H3 TEXT ELEMENT FOR NAME ====
			var cardProfileName = document.createElement('h3'); // Create a <h3> element for profile card name
			cardProfileName.setAttribute('id', 'name'); // Add id attribute to header element
			cardProfileName.setAttribute('class', 'card-name cap'); // Add class(es) to card header h3 text element
			cardProfileName.innerText = data.name.first + ' ' + data.name.last; // populates the API's JSON first and last name property values to the DOM

			// ==== PARAGRAPH TEXT ELEMENT FOR EMAIL ====
			var cardProfileEmail = document.createElement('P'); // Create a <p> element for profile card's email info
			cardProfileEmail.setAttribute('class', 'card-text email'); // Add class(es) to card's paragraph text element for emails
			cardProfileEmail.innerText = data.email; // populates the API's JSON email property value to the DOM

			// ==== PARAGRAPH TEXT ELEMENT FOR LOCATION (CITY, STATE) ====
			var cardProfileLocation = document.createElement('P'); // Create a <p> element for profile card location/address
			cardProfileLocation.setAttribute('class', 'card-text cap location'); // Add class(es) to card's paragraph text element for locations
			cardProfileLocation.innerText = data.location.city + '' + data.location.state; // populates the API's JSON location (city/state) property value to the DOM

			// ======  the block is responsible for the flow/structure of all dynamically created card elements...  ======
			document.body.appendChild(cardDiv);
			cardDiv.appendChild(cardImgContainer);
			cardImgContainer.appendChild(cardImg);
			cardImgContainer.appendChild(cardInfoContainer);
			cardDiv.appendChild(cardProfileName);
			cardProfileName.appendChild(cardProfileEmail);
			cardProfileEmail.appendChild(cardProfileLocation);
			const galleryDiv = document.getElementById('gallery');
			galleryDiv.appendChild(cardDiv);
			// ============================================================================================================
		}); //conclusion of employee map method
	}); //conclusion of fetchData method

	// =================
	// HELPER FUNCTIONS
	// =================
	function generateName(data) {
		let name = document.getElementById('name');
		const firstName = data.name.first;
		const lastName = data.name.last;
		const fullName = `${firstName} ${lastName}`;
		name.innerText = fullName;
		// console.log(fullName);
	}

	function generateEmail(data) {
		let email = document.querySelector('.email');
		const emailAddress = data.email;
		const userEmail = `${emailAddress}`;
		email.innerText = userEmail;
	}

	function generateLocation(data) {
		let address = document.querySelector('.location');
		const cityAddress = data.location.city;
		const stateAddress = data.location.state;
		const location = `${cityAddress} ${stateAddress}`;
		// console.log((address.innerText = location));
		address.innerText = location;
	}

	function generateImage(data) {
		let imgFrame = document.querySelector('.avatar');
		const avatar = data.picture.thumbnail;
		imgFrame.src = avatar;
	}

	// =========================
	// ERROR HANDLING FUNCTIONS
	// =========================
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
	// employeeCard = document.querySelector('.card');
	modalCloseBtn = document.querySelector('.modal-close-btn');

	//The following toggles visibility of modal. When close button selected/clicked modal is removed revealing card(s)
	//When card is selected/clicked modal will reappear
	modalCloseBtn.addEventListener('click', () => (entireModal.style.display = 'none'));
	// employeeCard.addEventListener('click', () => (entireModal.style.display = 'block'));
	//On page load hide the modal from view...
}); // <---- conclusion of DOMContentLoaded function
