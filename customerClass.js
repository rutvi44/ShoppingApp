// Constructor function for creating a Customer object
var Customer = function(customerName, customerId, stateId, customerProduct, customerComments, hasRating, rating1, rating2, rating3) {
    // Properties to store customer information
    this.customerName = customerName; // Customer's name
    this.customerId = customerId; // Unique identifier for the customer
    this.stateId = stateId; // Identifier for the state associated with the customer
    this.customerProduct = customerProduct; //Customer's Product
    this.customerComments = customerComments; // Additional comments provided by the customer
    this.hasRating = hasRating; // Flag indicating whether the customer has provided ratings
    this.rating1 = rating1; // First rating provided by the customer
    this.rating2 = rating2; // Second rating provided by the customer
    this.rating3 = rating3; // Third rating provided by the customer
};

var Checkout = function(cardName,cartEmail, cartPhone, cartAddress, state, postalCode, country, cardNumber, expiry) {
    // Properties to store checkout information
    this.cardName = cardName; // Name on the credit card
    this.cartEmail=cartEmail;
    this.cartPhone=cartPhone;
    this.cartAddress=cartAddress;
    this.state=state;
    this.postalCode=postalCode;
    this.country=country;
    this.cardNumber = cardNumber; // Credit card number
    this.expiry = expiry; // Expiry date of the credit card
};
