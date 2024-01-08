// Document ready function to initialize the application
$(document).ready(function(){
    init(); // Call the init function to set up event handlers and initial state
    initDB(); // Call the initDB function to initialize the database
});

// Function to initialize the database
function initDB() {
    try {
        // Create the database and tables
        DB.createDatabase();
        if (dbOpen) {
            console.info("Creating table...");
            DB.createTables();
        } else {
            console.error("Some issue with the database");
        }
    } catch (error) {
        console.error("Some error occurred while creating or opening the database");
    }
}

// Function to initialize the application
function init() {
    // Initial state: ratings fields are hidden for both sections
    $("#ratingFields1, #ratingFields").hide();

    // Event handler for the checkbox "Modify Review" to toggle visibility of ratings fields
    $("#checkRatings1").click(function() {
        if ($(this).is(":checked")) {
            $("#ratingFields1").show();
        } else {
            $("#ratingFields1").hide();
        }
    });

    // Event handler for the checkbox "Add Review" to toggle visibility of ratings fields
    $("#checkRatings").click(function() {
        if ($(this).is(":checked")) {
            $("#ratingFields").show();
        } else {
            $("#ratingFields").hide();
        }
    });

    // Event handler to update overall rating when any rating textbox changes for Modify Review
    $("input[name^='text']").on('input', updateOverallRating1);

    // Event handler to update overall rating when any rating textbox changes for Add Review
    $("input[name^='text']").on('input', updateOverallRating);

    // Event handlers for various buttons
    $("#btnSave").on('click', btn_Save_Click);
    $("#btnUpdate").on('click', btn_Update_Click_);
    $("#btnDelete").on('click', btn_Delete_Click_);
    $("#btnCancel").on('click', btn_Cancel_Click);
    $("#btnPlaceOrder").on('click', btnPlaceOrder_click);
    $("#btnClear").on('click', btn_Clear_CLick);
    // Event handler for page show event of ReviewPage
    $( "#ReviewPage" ).on( "pageshow", ReviewPage_show);
    // Event handler for page show event of ModifyReviewPage
    $("#ModifyReviewPage").on("pageshow", ModifyReviewPage_show);
    $("#viewOrdersBtn").on('click',viewOrdersBtn_Click);
}

// Button click handler functions
function btn_Save_Click(){
    FormAddSave(); // Call the function to handle saving in Add Review mode
}

function btn_Update_Click_(){
    FormModifyUpdate(); // Call the function to handle updating in Modify Review mode
    updateReview(); // Call the function to update the review
}

function btnPlaceOrder_click(){
    FormCheckOut(); // Call the function to handle placing an order
}

// Page show event handler functions
function ReviewPage_show(){
    getReviews(); // Call the function to fetch and display reviews on ReviewPage
}

function ModifyReviewPage_show() {
    showReviewDetails(); // Call the function to show details when on ModifyReviewPage
}

// Button click handler for deleting a review
function btn_Delete_Click_(){
    deleteReview();
}

// Button click handler for canceling modifications
function btn_Cancel_Click(){
    cancelModification();
}

// Button click handler for clearing the entire database
function btn_Clear_CLick(){
    clearDatabase();
}
function viewOrdersBtn_Click(){
    viewOrders();
}
