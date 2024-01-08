// Function to perform validation for the "Add a Review" form
function isValid_FrmAdd_Vaidation() {
    // Define validation rules and messages for both forms
    $("#RegForm").validate({
        // Validation rules and messages for Add form fields
        rules: {
            textCustName: {
                required: true,
                minlength: 2,
                maxlength: 20,
            },
            textId: {
                required: true,
                minlength: 2,
                maxlength: 5,
            },
            customerProduct: {
                required: true,
            },

            textQuality: {
                number: true,
                range: [0, 5],
            },
            textComfort: {
                number: true,
                range: [0, 5],
            },
            textPrice: {
                number: true,
                range: [0, 5],
            },
        },
        messages: {
            textCustName: {
                required: "Restaurant Name is required.",
                minlength: "Restaurant Name must be at least 2 characters.",
                maxlength: "Restaurant Name can't exceed 20 characters.",
            },
            textId: {
                required: "Business ID is required.",
                minlength: "Business ID must be at least 2 characters.",
                maxlength: "Business ID can't exceed 5 characters.",
            },
            customerProduct: {
                required: "Please describe product to add review.",
            },
            textQuality: {
                number: "Please enter a valid number.",
                range: "Food Quality must be between 0 and 5.",
            },
            textComfort: {
                number: "Please enter a valid number.",
                range: "comfort must be between 0 and 5.",
            },
            textPrice: {
                number: "Please enter a valid number.",
                range: "price must be between 0 and 5.",
            },
        },
        // Define error handling and placement
        errorElement: "label",
        errorClass: "error",
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
    });
    // Return the validation result
    return $("#RegForm").valid();
}

// Function to perform validation for the "Modify Review" form
function isValid_FrmModify_validation() {
    // Define validation rules and messages for the "modifyReview" form
    $("#modifyReview").validate({
        rules: {
            textRestaurant: {
                required: true,
                minlength: 2,
                maxlength: 20,
            },
            textBId: {
                required: true,
                minlength: 2,
                maxlength: 5,
            },
            customerProduct1: {
                required: true,
            },
            textQuality1: {
                number: true,
                range: [0, 5],
            },
            textComfort1: {
                number: true,
                range: [0, 5],
            },
            textPrice1: {
                number: true,
                range: [0, 5],
            },
        },
        messages: {
            textRestaurant: {
                required: "Restaurant Name is required.",
                minlength: "Restaurant Name must be at least 2 characters.",
                maxlength: "Restaurant Name can't exceed 20 characters.",
            },
            textBId: {
                required: "Business ID is required.",
                minlength: "Business ID must be at least 2 characters.",
                maxlength: "Business ID can't exceed 5 characters.",
            },
            customerProduct1: {
                required: "Please describe product to modify review."
            },
            textQuality1: {
                number: "Please enter a valid number.",
                range: "Food Quality must be between 0 and 5.",
            },
            textComfort1: {
                number: "Please enter a valid number.",
                range: "comfort must be between 0 and 5.",
            },
            textPrice1: {
                number: "Please enter a valid number.",
                range: "price must be between 0 and 5.",
            },
        },
        // Define error handling and placement
        errorElement: "label",
        errorClass: "error",
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
    });
    // Return the validation result
    return $("#modifyReview").valid();

}

// Event handler for "Cancel" button in the "Modify Review" form
$("#btnCancel").click(function () {
    // Clear form fields
    $("#modifyReview")[0].reset();

    // Redirect to another page if needed
    $.mobile.changePage("#JJViewReviewPage",{
        transition: "slide"
    });

});

// Function to perform validation for the "Checkout" form
function isValid_FrmCheckout_validation() {
// Define validation rules and messages for the "Checkout" form
    $("#checkoutForm").validate({
        rules: {
            cardHolderName: {
                required: true,
                minlength: 2,
                maxlength: 50
            },
            cartEmail: {
                required: true,
                email: true,
                email_check: true
            },
            cartPhone: {
                required: true,
                phone_check: true
            },
            cartAddress: {
                required: true
            },
            postalCode: {
                required: true,
                postalCodeCA: true
            },
            Country: {
                required: true,
            },
            creditCardNumber: {
                required: true,
                creditCardFormat: true
            },
            cardExpiry: {
                required: true,
                expiryFormat: true
            },
            cvv: {
                required: true,
                digits: true,
                minlength: 3,
                maxlength: 4
            },
        },
        messages: {
            cardHolderName: {
                required: "Card Holder Name is required.",
                minlength: "Card Holder Name must be at least 2 characters.",
                maxlength: "Card Holder Name can't exceed 50 characters.",
            },
            cartEmail: {
                required: "Customer Email is required.",
                email: "Please enter a conestoga college email Id in format(abc@conestogac.on.ca).",
                email_check: "Please enter a conestoga college email Id in format(abc@conestogac.on.ca)."
            },
            cartPhone: {
                required: "Customer Phone Number is required.",
                phone_check: "Please enter valid phone number in format 1234567890"
            },
            cartAddress: {
                required: "Customer Address is required"
            },
            postalCode: {
                required: "Province is required",
                postalCodeCA: "Please enter Valid Province in format A1B 2C3"
            },
            Country: {
                required: "Country is required",
            },
            creditCardNumber: {
                required: "Credit Card Number is required.",
                creditCardFormat: "Please enter a valid credit card number in the format 1234-1234-1234-1234.",
            },
            cardExpiry: {
                required: "Card Expiry is required.",
                expiryFormat: "Please enter a valid expiry date in MM/YYYY format.",
            },
            cvv: {
                required: "CVV is required.",
                digits: "Please enter only digits.",
                minlength: "CVV must be at least 3 digits.",
                maxlength: "CVV can't exceed 4 digits.",
            },
        },
        // Define error handling and placement
        errorElement: "label",
        errorClass: "error",
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
    });    // Return the validation result
    return $("#checkoutForm").valid();

}// Add a custom method for email validation
jQuery.validator.addMethod("email_check", function(value, element) {
    var regexp = /^[^\s@]+@conestogac\.on\.ca$/i;
    return this.optional(element) || regexp.test(value);
}, "Please enter a valid Conestoga College email address.");

// Add a custom method for phone number validation
jQuery.validator.addMethod("phone_check", function(value, element) {
    var regexp = /^[0-9]{10}$/;
    return this.optional(element) || regexp.test(value);
}, "Please enter a valid 10-digit phone number.");

// Add a custom method for postal code validation (Canadian format)
jQuery.validator.addMethod("postalCodeCA", function(value, element) {
    var regexp = /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ][ -]?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i;
    return this.optional(element) || regexp.test(value);
}, "Please enter a valid Canadian postal code.");

// Custom validation method for checking the expiration date format
jQuery.validator.addMethod("expiryFormat", function (value, element) {
    return /^(0[1-9]|1[0-2])\/\d{4}$/.test(value);
}, "Please enter a valid expiry date in MM/YYYY format.");

// Custom validation method for checking the credit card number format
jQuery.validator.addMethod("creditCardFormat", function (value, element) {
    return /^(\d{4}-){3}\d{4}$/.test(value);
}, "Please enter a valid credit card number in the format 1234-1234-1234-1234.");
// Function to mask all but the last four digits of a credit card number
function maskCardNumber(cardNumber) {
    var visibleDigits = 4;
    var sanitizedNumber = cardNumber.replace(/[^\d]/g, ''); // Remove non-digit characters
    var masked = sanitizedNumber.slice(0, -visibleDigits).replace(/\d/g, "x") + sanitizedNumber.slice(-visibleDigits); // Masking all digits except the last four
    var formatted = masked.replace(/(.{4})/g, "$1-"); // Adding dash separators every four characters
    return formatted.slice(0, -1); // Remove the last dash separator
}


