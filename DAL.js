
var Customers = {
    // Data Access Layer (DAL) for handling reviews
    reviewDAL: {
        // Function to insert a new review into the database
        insert: function (objReview) {
            dbOpen.transaction(function (tx) {
                // SQL query for inserting a new review
                var sql = "INSERT INTO review(customerName, customerId, stateId, customerProduct, customerComments, hasRating, rating1, rating2, rating3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
                // Array of parameters for the SQL query
                var options = [objReview.customerName, objReview.customerId, objReview.stateId, objReview.customerProduct, objReview.customerComments, objReview.hasRating, objReview.rating1, objReview.rating2, objReview.rating3];

                // Function to handle a successful transaction
                function successTransaction() {
                    console.info("Success: Insert transaction successful");
                }

                // Execute the SQL query with the specified options
                tx.executeSql(sql, options, successTransaction, errorHandler);
            });
        },

        // Function to select a review by its ID and invoke a callback function
        select: function (id, callback) {
            dbOpen.transaction(function (tx) {
                // SQL query for selecting a review by ID
                var sql = "SELECT * FROM review WHERE id = ?;";
                // Execute the SQL query with the specified ID parameter
                tx.executeSql(sql, [id], function (tx, result) {
                    // Invoke the provided callback function with the transaction and result
                    callback(tx, result);
                }, errorHandler);
            });
        },

        // Function to select all reviews and invoke a callback function
        selectAll: function (params, callback) {
            dbOpen.transaction(function (tx) {
                // SQL query for selecting all reviews
                var sql = "SELECT * FROM review;";
                // Execute the SQL query with the specified parameters
                tx.executeSql(sql, params, function (tx, result) {
                    // Invoke the provided callback function with the transaction and result
                    callback(tx, result);
                }, errorHandler);
            });
        },

        // Function to update a review by its ID with new information
        update: function (reviewId, objReview) {
            dbOpen.transaction(function (tx) {
                // SQL query for updating a review by ID
                var sql = "UPDATE review SET customerName = ?, customerId = ?, stateId = ?, customerProduct = ?, customerComments = ?, hasRating = ?, rating1 = ?, rating2 = ?, rating3 = ? WHERE id = ?;";
                // Array of parameters for the SQL query
                var options = [objReview.customerName, objReview.customerId, objReview.stateId, objReview.customerProduct, objReview.customerComments, objReview.hasRating, objReview.rating1, objReview.rating2, objReview.rating3, reviewId];

                // Function to handle a successful transaction
                function successTransaction() {
                    alert('Review updated successfully');
                }

                // Execute the SQL query with the specified options
                tx.executeSql(sql, options, successTransaction, errorHandler);
            });
        },

        // Function to delete a review by its ID
        delete: function (options) {
            var options = options;
            dbOpen.transaction(function (tx) {
                // SQL query for deleting a review by ID
                var sql = "DELETE FROM review WHERE id = ?;";
                // Function to handle a successful transaction
                function successTransaction() {
                    alert('Review deleted successfully');
                }
                // Execute the SQL query with the specified options
                tx.executeSql(sql, options, successTransaction, errorHandler);
            });
        },

        // Data Access Layer (DAL) for handling states
        stateDAL: {
            // Function to insert a new state into the database
            insert: function (objState) {
                dbOpen.transaction(function (tx) {
                    // SQL query for inserting a new state
                    var query = "INSERT INTO state(name) VALUES (?);";
                    // Array of parameters for the SQL query
                    var options = [objState];

                    // Function to handle a successful transaction
                    function successTransaction() {
                        console.info("Data inserted into 'state' table successfully");
                    }

                    // Execute the SQL query with the specified options
                    tx.executeSql(query, options, successTransaction, errorHandler);
                });
            },

        }
    },

    // handling checkout information
    checkoutDAL: {
        // Function to insert a new checkout record into the database
        insert: function (objCheckout) {
            dbOpen.transaction(function (tx) {
                // Masking the cardNumber as xxxx-xxxx-xxxx-1234 (last four digits)
                var maskedCardNumber = maskCardNumber(objCheckout.cardNumber);

                // SQL query for inserting a new checkout record;
                var sql = "INSERT INTO checkout(cardName, cartEmail, cartPhone, cartAddress, state, postalCode, country, cardNumber, expiry) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";

                // Array of parameters for the SQL query
                var options = [objCheckout.cardName, objCheckout.cartEmail, objCheckout.cartPhone, objCheckout.cartAddress, objCheckout.state,objCheckout.postalCode, objCheckout.country, maskedCardNumber, objCheckout.expiry];


                // Function to handle a successful transaction
                function successTransaction() {
                    console.info("Success: Insert transaction successful");
                }

                // Execute the SQL query with the specified options
                tx.executeSql(sql, options, successTransaction, errorHandler);
            });
        },
    }

};
// Function to retrieve and display orders
function getPreviousCheckouts(callback) {
    dbOpen.transaction(function (tx) {
        var query = "SELECT * FROM checkout;";
        tx.executeSql(query, [], function (tx, result) {
            callback(result.rows);
        }, errorHandler);
    });
}