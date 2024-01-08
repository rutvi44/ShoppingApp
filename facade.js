// Function to handle the save operation for the "Add a Review" form
function FormAddSave() {
    // Validate the form using the defined validation rules
    if (isValid_FrmAdd_Vaidation()) {
        console.info("Add Form is valid");

        // Extract form data
        var customerName = $('#textCustName').val();
        var customerId = $('#textId').val();
        var stateId = $('#custState').val();
        var customerProduct = $('#customerProduct').val();
        var customerComments = $('#textComments').val();
        var hasRatings = $('#checkRatings').is(':checked');
        var rating1 = hasRatings ? parseInt($('#textQuality').val()) : 0;
        var rating2 = hasRatings ? parseInt($('#textComfort').val()) : 0;
        var rating3 = hasRatings ? parseInt($('#textPrice').val()) : 0;

        // Prepare data for insertion into 'review' table
        var objReview = new Customer(customerName, customerId, stateId, customerProduct, customerComments, hasRatings, rating1, rating2, rating3);

        // Insert data using DAL method
        Customers.reviewDAL.insert(objReview);

        document.getElementById("RegForm").reset();

    } else {
        console.info("Add Form is invalid");
    }
}

// Function to handle the update operation for the "Modify Review" form
function FormModifyUpdate() {
    // Validate the form using the defined validation rules
    if (isValid_FrmModify_validation()) {
        console.info("Modify Form is valid");
    } else {
        console.info("Modify Form is invalid");
    }
}

// Function to handle the validation and submission of the "Checkout" form
function FormCheckOut() {
    // Validate the form using the defined validation rules
    if (isValid_FrmCheckout_validation()) {
        console.info("Checkout Form is valid");
        alert("Your order has been placed successfully!!");

        // Extract form data
        var cardName = $('#cardHolderName').val();
        var cartEmail = $('#cartEmail').val();
        var cartPhone = $('#cartPhone').val();
        var cartAddress = $('#cartAddress').val();
        var state = $('#state').val();
        var postalCode = $('#postalCode').val();
        var country = $('#Country').val();
        var cardNumber = $('#creditCardNumber').val();
        var expiry = $('#cardExpiry').val();

        // Prepare data for insertion into 'checkout' table
        var objCheckout = new Checkout(cardName,cartEmail,cartPhone,cartAddress,state,postalCode,country, cardNumber, expiry);

        // Insert data using DAL method
        Customers.checkoutDAL.insert(objCheckout);
        document.getElementById("checkoutForm").reset();

    } else {
        console.info("Checkout Form is invalid");
    }
}

// Event handler to update overall rating when the range input changes for "Modify Review"
$("#ratings1").on('input', function () {
    // Update individual rating inputs and overall rating
    updateOverallRating1();
});

// Event handler to update overall rating when the range input changes for "Add Review"
$("#ratings").on('input', function () {
    // Update individual rating inputs and overall rating
    updateOverallRating();
});

// Function to update the overall rating for "Modify Review"
function updateOverallRating1() {
    // Calculate and update the overall rating and range input value
    var overallRating = calculateOverallRating($("#textQuality1").val(), $("#textComfort1").val(), $("#textPrice1").val());
    $("#ratings1").val(overallRating * 20);
}

// Function to update the overall rating for "Add Review"
function updateOverallRating() {
    // Calculate and update the overall rating and range input value
    var overallRating = calculateOverallRating($("#textQuality").val(), $("#textComfort").val(), $("#textPrice").val());
    $("#ratings").val(overallRating * 20);
}

// Function to get reviews from the database and populate the listview
function getReviews() {
    // Perform a select operation using DAL method and handle the callback
    var options = [];
    Customers.reviewDAL.selectAll(options, callback);

    // Callback function to handle the results and update the listview
    function callback(tx, results) {
        var lv = $("#listview");

        if (results.rows.length > 0) {
            var htmlCode = "";

            for (var i = 0; i < results.rows.length; i++) {
                // Extract data for each review
                var row = results.rows.item(i);
                var id = row["id"];
                var customerName = row["customerName"];
                var customerProduct = row["customerProduct"];
                var customerComment = row["customerComments"];
                var overallRating = UpdateSlider();

                // Function to calculate overall rating based on individual ratings
                function UpdateSlider() {
                    var calculatedRating = ((row['rating1'] + row['rating2'] + row['rating3']) * 100) / 15;
                    return calculatedRating.toFixed(2);
                }

                // Build HTML code for each review
                htmlCode += `
                <li data-row-id="${id}">
                    <a href="#ModifyReviewPage" target="_self">
                        <h2>Customer Name: ${customerName}</h2>
                        <h3>Product To Review: ${customerProduct}</h3>
                        <h3>Comment: ${customerComment}</h3>
                        <h3>Overall Ratings: ${overallRating}</h3>
                    </a>
                </li>`;
            }

            // Attach click event to each list item for navigation to Modify Review page
            lv.on("click", "li", function () {
                var selectedRowId = $(this).attr("data-row-id");
                localStorage.setItem("id", selectedRowId);
                $(location).prop('href', '#ModifyReviewPage');
                $(location).prop('target', '_self');
            });
            lv.html(htmlCode).listview("refresh");
        } else {
            // Display a message if there are no reviews
            lv.html("<li>Please Add new records</li>").listview("refresh");
        }
    }
}

// Function to show review details on the Modify Review page
function showReviewDetails() {

    // Retrieve the selected review's ID from local storage
    var selectedRowId = localStorage.getItem("id");

    // Use the ID as a parameter for the select CRUD operation on the review table
    Customers.reviewDAL.select(selectedRowId, function (tx, result) {
        if (result.rows.length > 0) {
            // Extract data for the selected review
            var row = result.rows.item(0);

            // Display values in the respective input controls on the Modify Review page
            $("#txtCustomer").val(row['customerName']);
            $("#txtCId").val(row['customerId']);
            $("#state").val(row['stateId']).selectmenu("refresh");
            $("#customerProduct1").val(row['customerProduct']);
            $("#comment").val(row['customerComments']);

            // Show/hide ratings part based on hasRatings value
            if (row['hasRating'] === 'true') {
                $("#checkRatings1").prop('checked', true);
                $("#ratingFields1").show();

                // Populate individual rating inputs
                $("#textQuality1").val(row['rating1']);
                $("#textComfort1").val(row['rating2']);
                $("#textPrice1").val(row['rating3']);

                // Update the overall rating and range input value
                $("#ratings1").val(calculateOverallRating(row['rating1'], row['rating2'], row['rating3']));
            } else {
                $("#checkRatings1").prop('checked', false);
                $("#ratingFields1").hide();

                // Set each rating to 0 if the ratings checkbox is unchecked
                $("#textQuality1").val(0);
                $("#textComfort1").val(0);
                $("#textPrice1").val(0);
                $("#ratings1").val(0);
            }
        }
    });
}

// Function to calculate overall rating based on individual ratings
function calculateOverallRating(rating1, rating2, rating3) {
    var totalRatings = rating1 + rating2 + rating3;
    var overallRating = (totalRatings / 15) * 100;
    return overallRating.toFixed(2);
}

// Function to update a review in the database
function updateReview() {
    // Retrieve the ID of the review to be updated from local storage
    var id = localStorage.getItem("id");

    // Extract data from the Modify Review form
    var customerName = $('#txtCustomer').val();
    var customerId = $('#txtCId').val();
    var stateId = $('#state').val();
    var customerProduct = $('#customerProduct1').val();
    var customerComments = $('#comment').val();
    var hasRatings = $('#checkRatings1').is(':checked');
    var rating1 = hasRatings ? parseInt($('#textQuality1').val()) : 0;
    var rating2 = hasRatings ? parseInt($('#textComfort1').val()) : 0;
    var rating3 = hasRatings ? parseInt($('#textPrice1').val()) : 0;

    // Prepare data for the update operation
    var objReview = {
        customerName: customerName,
        customerId: customerId,
        stateId: stateId,
        customerProduct: customerProduct,
        customerComments: customerComments,
        hasRating: hasRatings ? 'true' : 'false',
        rating1: rating1,
        rating2: rating2,
        rating3: rating3
    };

    // Call the update method from DAL with the updated data and ID
    Customers.reviewDAL.update(id, objReview);

    // Show an alert after attempting the update
    alert('Review update attempted.');
}

// Function to delete a review from the database
function deleteReview() {
    // Retrieve the ID of the review to be deleted from local storage
    var id = localStorage.getItem("id");

    // Prepare options for the delete operation
    var options = [id];

    // Call the delete method from DAL with the specified options
    Customers.reviewDAL.delete(options);

    // Redirect to the ReviewPage after deletion
    window.location.href = '#ReviewPage';
}

// Function to cancel modification and navigate to the 'Home' page
function cancelModification() {
     $.mobile.changePage('#HomePage', { transition: 'slide' });
}

// Function to clear the entire database
function clearDatabase() {
    // Confirm the user's intention to clear the database
    var result = confirm("Really want to clear database?");

    // If confirmed, attempt to drop all tables
    if (result) {
        try {
            DB.dropTables();
            alert("Database cleared");
        } catch (e) {
            alert(e);
        }
    }
}

// Function to get the current geolocation coordinates and display them
function getLocation() {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
        // Attempt to get the current position
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        // Display an error message if geolocation is not supported
        displayError("Geolocation is not supported by this browser.");
    }
}

// Function to display the retrieved geolocation coordinates
function showPosition(position) {
    // Extract latitude and longitude from the position object
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Display the coordinates in the designated HTML element
    const locationText = document.getElementById("locationText");
    locationText.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;

    // Show the geolocation popup
    $("#geoPopup").popup("open");
}

// Function to handle errors encountered during geolocation retrieval
function showError(error) {
    let errorMessage = "";

    // Determine the type of error and set an appropriate error message
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred.";
            break;
    }

    // Display the error message
    displayError(errorMessage);
}

// Function to display an error message in the designated HTML element
function displayError(message) {
    const errorText = document.getElementById("errorText");
    errorText.textContent = message;
}

// Object to store product quantities
let cart = {};

// Function to add item to cart
function addToCart(itemId, itemName, itemPrice, category) {
    if (cart[itemId]) {
        cart[itemId].quantity++;
    } else {
        cart[itemId] = {
            name: itemName,
            price: itemPrice,
            quantity: 1,
            category: category
        };
    }
    // Update the cart quantities displayed
    updateCartQuantities();
    // Update the cart table
    updateCart();
    // Update checkout information
    updateCheckoutInfo();
}

// Function to update cart quantities displayed in the header
function updateCartQuantities() {
    updateWomenCartQuantities();
    updateMenCartQuantities();
    updateKidsCartQuantities();
}

// Function to update quantity for women's products in the header
function updateWomenCartQuantities() {
    const womenAddedProductCount = document.getElementById('womenAddedProductQuantity');
    let totalQuantity = 0;

    Object.values(cart).forEach(item => {
        totalQuantity += item.quantity || 0;
    });

    womenAddedProductCount.textContent = `Cart Quantity: ${totalQuantity}`;
}

// Function to update quantity for men's products in the header
function updateMenCartQuantities() {
    const menAddedProductCount = document.getElementById('menAddedProductQuantity');
    let totalQuantity = 0;

    Object.values(cart).forEach(item => {
        totalQuantity += item.quantity || 0;
    });

    menAddedProductCount.textContent = `Cart Quantity: ${totalQuantity}`;
}

// Function to update quantity for kids' products in the header
function updateKidsCartQuantities() {
    const kidsAddedProductQuantity = document.getElementById('kidsAddedProductQuantity');
    let totalQuantity = 0;

    Object.values(cart).forEach(item => {
        totalQuantity += item.quantity || 0;
    });

    kidsAddedProductQuantity.textContent = `Cart Quantity: ${totalQuantity}`;
}

// Function to update the cart table
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
    `;
    let subtotal = 0;

    for (const itemId in cart) {
        if (cart.hasOwnProperty(itemId)) {
            const { name, price, quantity } = cart[itemId];
            const itemTotal = price * quantity;
            subtotal += itemTotal;

            tableHTML += `
                <tr>
                    <td>${name}</td>
                    <td>    
                     <button class="quantity-btn" onclick="adjustQuantity('${itemId}', 'decrement')">-</button>
    ${quantity}
    <button class="quantity-btn" onclick="adjustQuantity('${itemId}', 'increment')">+</button>
                    </td>
                    <td>$${price.toFixed(2)}</td>
                    <td>$${itemTotal.toFixed(2)}</td>
                </tr>
            `;
        }
    }

    const tax = 0.13 * subtotal;
    const total = subtotal + tax;

    tableHTML += `
            </tbody>
        </table>
        <p>Tax (13%): $${tax.toFixed(2)}</p>
        <p>Total Price (including tax): $${total.toFixed(2)}</p>
    `;

    cartItems.innerHTML = tableHTML;

    // Check if totalPrice element exists before setting its textContent
    if (totalPrice) {
        totalPrice.textContent = `Total Price (excluding tax): $${subtotal.toFixed(2)}`;
    }
    else {
        console.error("Element with ID 'totalPrice' not found.");
    }
}

// Function to adjust quantity in the cart
function adjustQuantity(itemId, action) {
    if (cart[itemId]) {
        if (action === 'increment') {
            cart[itemId].quantity++;
        }  else if (action === 'decrement') {
            // If quantity is greater than 1, decrement; otherwise, remove the item
            if (cart[itemId].quantity > 1) {
                cart[itemId].quantity--;
            } else {
                delete cart[itemId];
            }
        }
        updateCartQuantities(); // Update the cart quantities displayed
        updateCart(); // Update the cart table
        updateCheckoutInfo(); // Update checkout information
    }
}

// Function to update checkout information
function updateCheckoutInfo() {
    const checkoutInfoElement = document.getElementById('checkoutInfo');

    if (checkoutInfoElement) {
        // Calculate total price including tax
        const subtotal = calculateSubtotal();
        const taxRate = 0.1; // Example tax rate (10%)
        const tax = subtotal * taxRate;
        const totalPrice = subtotal + tax;

        // Display item name, quantity, and total price in the checkoutInfoElement
        let checkoutInfoHTML = '<h3>Order Summary</h3>';
        Object.values(cart).forEach(item => {
            checkoutInfoHTML += `<h4>Category: ${item.category} - Item Name: ${item.name} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity).toFixed(2)}</h4>`;
        });

        checkoutInfoHTML += `<p>Subtotal: $${subtotal.toFixed(2)}</p>`;
        checkoutInfoHTML += `<p>Tax: $${tax.toFixed(2)}</p>`;
        checkoutInfoHTML += `<p>Total Price (including tax): $${totalPrice.toFixed(2)}</p>`;

        // Update the checkoutInfoElement with the generated HTML
        checkoutInfoElement.innerHTML = checkoutInfoHTML;
    } else {
        console.error("The 'checkoutInfo' element was not found.");
    }
}

// Function to calculate subtotal
function calculateSubtotal() {
    let subtotal = 0;
    Object.values(cart).forEach(item => {
        subtotal += (item.price * item.quantity) || 0;
    });
    return subtotal;
}

// Function to remove item from cart
function removeFromCart(itemId) {
    if (cart[itemId] && cart[itemId].quantity > 0) {
        cart[itemId].quantity--;

        // If the quantity becomes zero, remove the item from the cart
        if (cart[itemId].quantity === 0) {
            delete cart[itemId];
        }

        // Update the cart quantities displayed
        updateCartQuantities();
        // Update the cart table
        updateCart();
        // Update checkout information
        updateCheckoutInfo();
    }
}

function viewOrders() {
    getPreviousCheckouts(function (checkouts) {
        let popupContent = `<div data-role="popup" id="previousOrdersPopup" data-theme="a" data-overlay-theme="a" class="ui-content" style="max-width: 600px; padding-bottom: 2em">
                                <a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
                                <h2>Previous Orders</h2>
                                <ul data-role="listview" data-inset="true">`;

        if (checkouts && checkouts.length > 0) {
            for (let i = 0; i < checkouts.length; i++) {
                let checkout = checkouts[i];
                let cardName = checkout.cardName;
                let cartEmail = checkout.cartEmail;
                let address = checkout.cartAddress;
                let postalCode = checkout.postalCode;

                popupContent += `<li>Card Name: ${cardName}</li>`;
                popupContent += `<li>Email: ${cartEmail}</li>`;
                popupContent += `<li>Address: ${address}</li>`;
                popupContent += `<li>Postal Code: ${postalCode}</li>`;
                popupContent += `<hr>`;
            }
        } else {
            popupContent += "<li>No previous checkouts found.</li>";
        }

        popupContent += `</ul></div>`;

        // Append the popup content to the body and enhance the popup
        $("body").append(popupContent).enhanceWithin();

        // Initialize and open the popup
        $("#previousOrdersPopup").popup().popup("open");
    });
}