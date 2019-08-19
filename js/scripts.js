// ==========================================================
// Project: Public API Request
// File: scripts.js (Main JavaScript Logic)
// Author: Jonathan J.Jolivette
// Created: 8.14.19
// THANK YOU FOR YOUR SUPPORT
// ==========================================================

/* DOMContentLoaded...*/ window.addEventListener('DOMContentLoaded', (event) => {
	/* ========================================
	 GLOBAL VARIABLES
	 ======================================== */
	let cardDiv;

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
		const employeeData = data.results;
		// Addition of an id property to the JSON object via map method
		data.results.map((x, i) => {
			let id = x.id;
			id = i + 1;
			return id;
		});
		// =====  PROMISE ITERATES THROUGH THE JSON DATA RETURNED & CREATES THE EMPLOYEE'S PROFILE CARDS DYNAMICALLY =====
		data.results.map((data, id) => {
			// galleryDiv = document.createElement('div'); // Create a <div> element for card div
			// galleryDiv.setAttribute('class', 'gallery'); // Add class(es) to card <div> element
			// galleryDiv.setAttribute('id', 'gallery'); // Add class(es) to card <div> element

			// ==== CARD DIV ====
			cardDiv = document.createElement('div'); // Create a <div> element for card div
			cardDiv.setAttribute('class', 'card zoom'); // Add class(es) to card <div> element
			cardDiv.setAttribute('id', id + 1);
			// ====0e9 CARD IMAGE CONTAINER DIV ====
			const cardImgContainer = document.createElement('div'); // Create a <div> element for card image container
			cardImgContainer.setAttribute('class', 'card-img-container'); //Add class(es) to card image container <div>
			cardImgContainer.setAttribute('id', id + 1);

			// ==== AVATAR/IMAGE PLACEHOLDER ====
			const cardImg = new Image(); // Create an image element for profile pictures
			cardImg.setAttribute('class', 'card-img avatar'); //Add class(es) to card <div> element
			cardImg.src = data.picture.thumbnail; // populates the API's JSON employee picture/thumbnail property value to the DOM
			cardImg.alt = 'profile picture'; //set the alt attribute
			cardImg.setAttribute('id', id + 1);

			// ==== CARD INFO CONTAINER DIV ====
			const cardInfoContainer = document.createElement('div'); // Create a card info container <div> element for profile's text elements
			cardInfoContainer.setAttribute('class', 'card-info-container'); // Add class(es) to card info container <div> element
			cardInfoContainer.setAttribute('id', id + 1);

			// ==== H3 TEXT ELEMENT FOR NAME ====
			const cardProfileName = document.createElement('h3'); // Create a <h3> element for profile card name
			cardProfileName.setAttribute('id', 'name'); // Add id attribute to header element
			cardProfileName.setAttribute('class', 'card-name cap'); // Add class(es) to card header h3 text element
			cardProfileName.innerText = data.name.first + ' ' + data.name.last; // populates the API's JSON first and last name property values to the DOM
			cardProfileName.setAttribute('id', id + 1);

			// ==== PARAGRAPH TEXT ELEMENT FOR EMAIL ====
			const cardProfileEmail = document.createElement('P'); // Create a <p> element for profile card's email info
			cardProfileEmail.setAttribute('class', 'card-text email'); // Add class(es) to card's paragraph text element for emails
			cardProfileEmail.innerText = data.email; // populates the API's JSON email property value to the DOM
			cardProfileEmail.setAttribute('id', id + 1);

			// ==== PARAGRAPH TEXT ELEMENT FOR LOCATION (CITY, STATE) ====
			const cardProfileLocation = document.createElement('P'); // Create a <p> element for profile card location/address
			cardProfileLocation.setAttribute('class', 'card-text cap location'); // Add class(es) to card's paragraph text element for locations
			cardProfileLocation.innerText = data.location.city + '' + data.location.state; // populates the API's JSON location (city/state) property value to the DOM
			cardProfileLocation.setAttribute('id', id + 1);

			// ======  the block is responsible for the flow/structure of all dynamically created card elements...  ======
			const galleryDiv = document.getElementById('gallery');
			galleryDiv.appendChild(cardDiv);
			cardDiv.appendChild(cardImgContainer);
			cardImgContainer.appendChild(cardImg);
			cardImgContainer.appendChild(cardInfoContainer);
			cardDiv.appendChild(cardProfileName);
			cardProfileName.appendChild(cardProfileEmail);
			cardProfileEmail.appendChild(cardProfileLocation);

			// ================
			// MODAL FUNCTIONS
			// ================

			/*================================
			THE MODAL DATA TEMPLATE
			================================*/
			// ==== MODAL CONTAINER ====

			modalContainer = document.createElement('div'); // Create a <div> element for modal div
			modalContainer.setAttribute('class', 'modal-container'); // Add class(es) to modal <div> element
			// modalContainer.setAttribute('class', 'removeVisibility'); //Add class(es) to modal image container where visibility of modal image is hidden by default<div>
			modalContainer.setAttribute('id', id + 1);
			// modalContainer.style.display = 'none';
			// ==== MODAL DIV ====
			const modalDiv = document.createElement('div'); // Create a <div> element for card image container
			modalDiv.setAttribute('class', 'modal'); //Add class(es) to modal image container <div>
			modalDiv.setAttribute('id', id + 1);

			// ==== MODAL CLOSE BUTTON  ====
			const modalX = document.createElement('BUTTON'); // Create a <div> element for modal image container
			modalX.setAttribute('class', 'modal-close-btn'); //Add class(es) to modal image container <div>
			modalX.setAttribute('id', 'modal-close-btn');
			modalX.innerHTML = `<span onclick="this.parentNode.parentNode.parentNode.style.display = 'none';" class="closebtn">&times;</span>`; /*FUNCTIONALITY FOR THE CLOSING OF MODAL WINDOW*/
			modalX.setAttribute('id', id + 1);

			// ==== MODAL CARD INFO CONTAINER DIV ====
			const modalInfoContainer = document.createElement('div'); // Create a modal info container <div> element for profile's text elements
			modalInfoContainer.setAttribute('class', 'modal-info-container'); // Add class(es) to modal info container <div> element
			modalInfoContainer.setAttribute('id', id + 1);
			// modalInfoContainer.style.display = 'none';

			// // ==== MODAL AVATAR/IMAGE PLACEHOLDER ====
			const modalImg = new Image(); // Create an image element for profile pictures
			modalImg.setAttribute('class', 'card-img avatar'); //Add class(es) to modal <div> element
			modalImg.src = data.picture.thumbnail; // populates the API's JSON employee picture/thumbnail property value to the DOM
			modalImg.alt = 'profile picture'; //set the alt attribute
			modalImg.setAttribute('id', id + 1);

			// // ==== MODAL H3 TEXT ELEMENT FOR NAME ====
			const modalProfileName = document.createElement('h3'); // Create a <h3> element for profile card name
			modalProfileName.setAttribute('id', 'name'); // Add id attribute to header element
			modalProfileName.setAttribute('class', 'card-name cap'); // Add class(es) to modal header h3 text element
			modalProfileName.innerText = data.name.first + ' ' + data.name.last; // populates the API's JSON first and last name property values to the DOM
			modalProfileName.setAttribute('id', id + 1);

			// // ==== MODAL PARAGRAPH TEXT ELEMENT FOR EMAIL ====
			const modalProfileEmail = document.createElement('P'); // Create a <p> element for profile modal's email info
			modalProfileEmail.setAttribute('class', 'card-text email'); // Add class(es) to modal's paragraph text element for emails
			modalProfileEmail.innerText = data.email; // populates the API's JSON email property value to the DOM
			modalProfileEmail.setAttribute('id', id + 1);

			// // ==== PARAGRAPH TEXT ELEMENT FOR LOCATION (CITY) ====
			const modalProfileCity = document.createElement('P'); // Create a <p> element for profile modal location/address
			modalProfileCity.setAttribute('class', 'card-text cap location'); // Add class(es) to modal's paragraph text element for locations
			modalProfileCity.innerText = data.location.city; // populates the API's JSON location (city/state) property value to the DOM
			modalProfileCity.setAttribute('id', id + 1);

			const modalLineBreak = document.createElement('hr');

			// // ==== PARAGRAPH TEXT ELEMENT FOR PHONE # (CELL) ====
			const modalProfileCell = document.createElement('P'); // Create a <p> element for profile modal location/address
			modalProfileCell.setAttribute('class', 'card-text cap location'); // Add class(es) to modal's paragraph text element for locations
			modalProfileCell.innerText = data.cell; // populates the API's JSON location (city/state) property value to the DOM
			modalProfileCell.setAttribute('id', id + 1);

			// // ==== PARAGRAPH TEXT ELEMENT FOR LOCATION (Full Address) ====
			const modalProfileAddress = document.createElement('P'); // Create a <p> element for profile modal location/address
			modalProfileAddress.setAttribute('class', 'card-text cap location'); // Add class(es) to modal's paragraph text element for locations
			modalProfileAddress.innerText =
				data.location.street +
				' ' +
				data.location.city +
				' ' +
				data.location.state +
				' ' +
				data.location.postcode; // populates the API's JSON location (city/state) property value to the DOM
			modalProfileAddress.setAttribute('id', id + 1);

			// // ==== PARAGRAPH TEXT ELEMENT FOR BIRTHDAY  ====
			const modalProfileDOB = document.createElement('P'); // Create a <p> element for profile card location/address
			modalProfileDOB.setAttribute('class', 'card-text cap location'); // Add class(es) to modal's paragraph text element for locations
			modalProfileDOB.innerText = data.dob.date; // populates the API's JSON location (city/state) property value to the DOM
			modalProfileDOB.setAttribute('id', id + 1);

			// ======  the block is responsible for the flow/structure of all dynamically generated modal elements...  ======
			document.body.appendChild(modalContainer);
			modalContainer.appendChild(modalDiv);
			modalDiv.appendChild(modalX);
			modalDiv.appendChild(modalInfoContainer);
			modalDiv.appendChild(modalImg);
			modalDiv.appendChild(modalProfileName);
			modalDiv.appendChild(modalProfileEmail);
			modalDiv.appendChild(modalProfileCity);
			modalDiv.appendChild(modalLineBreak);
			modalDiv.appendChild(modalProfileCell);
			modalDiv.appendChild(modalProfileAddress);
			modalDiv.appendChild(modalProfileDOB);

			/*==============================================================================
				FUNCTIONALITY FOR OPENING & CLOSING OF SPECIFIC MODAL WINDOW FOR EACH EMPLOYEE
			================================================================================*/
			// 	CLICK A CARD, IF THAT CARD DIV'S ID = A MODAL CONTAINER'S DIV ID THEN SET THE STYLE DISPLAY PROPERTY OF THE MODAL CONTAINER WITH THE MATCHING ID TO BLOCK
		}); //conclusion of employee map method
		// THIS GETS YOU ACCESS TO THE MODAL'S ID....
		const cardInfo = document.querySelector('.gallery');
		cardInfo.addEventListener('click', (data) => {
			let cardId = data.target.id;
			const modals = document.querySelectorAll('.modal-container');

			modals.forEach((el) => {
				console.log(el.id);
				if (cardId == el.id) {
					el.style.display = 'block';
				}
			});
		});
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
}); // <---- conclusion of DOMContentLoaded function
