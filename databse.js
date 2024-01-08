// Variable to store the open database connection
var dbOpen;

// Function to handle SQL errors
function errorHandler(error) {
    console.error("SQL error: " + error.message);
}


// Database-related operations encapsulated in the DB object
var DB = {
    // Function to create the database
    createDatabase: function () {
        var dbname = "Group11DB";
        var version = "1.0";
        var displayName = "DB for Finals";
        var dbsize = 2 * 1024 * 1024;

        // Callback function for successful database creation
        function dbSuccessCallBack() {
            console.info("Success: Database Created Successfully!!");
            // After successful creation, proceed to create tables
            DB.createTables();
        }

        // Open the database connection
        dbOpen = openDatabase(dbname, version, displayName, dbsize, dbSuccessCallBack);
    },

    // Function to create necessary tables in the database
    createTables: function () {
        dbOpen.transaction(function (tx) {
            // SQL query to create the 'review' table
            var createReviewTable = "CREATE TABLE IF NOT EXISTS review(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "customerName VARCHAR(30) NOT NULL," +
                "customerId VARCHAR(20) NOT NULL," +
                "stateId INTEGER NOT NULL," +
                "customerProduct VARCHAR(30)," +
                "customerComments TEXT," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(stateId) REFERENCES state(id));";

            var options = [];

            // SQL query to create the 'state' table
            var createStateTable = "CREATE TABLE IF NOT EXISTS state(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL);";

            // SQL query to create the 'checkout' table
            var createCheckoutTable = "CREATE TABLE IF NOT EXISTS checkout(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "cardName VARCHAR(50) NOT NULL," +
                "cartEmail VARCHAR(30),"+
                "cartPhone VARCHAR(11) NOT NULL,"+
                "cartAddress VARCHAR NOT NULL,"+
                "state INTEGER NOT NULL," +
                "postalCode TEXT,"+
                "country NOT NULL,"+
                "cardNumber VARCHAR(16) NOT NULL," +
                "expiry VARCHAR(5) NOT NULL);";

            // Function to handle a successful transaction
            function successCallback() {
                console.info("Success: Create tables 'state', 'review', and 'checkout' successful.");
                // Initialize the 'state' table with predefined records
                DB.initializeStateTable();
            }

            // Execute SQL queries to create tables
            tx.executeSql(createStateTable, options, function () {
                tx.executeSql(createReviewTable, options, function(){
                    tx.executeSql(createCheckoutTable, options, successCallback, errorHandler)
                }, errorHandler);
            }, errorHandler);
        });
    },

    // Function to initialize the 'state' table with predefined records
    initializeStateTable: function () {
        dbOpen.transaction(function (tx) {
            // SQL query to drop and recreate the 'state' table
            var dropTableSQL = "DROP TABLE IF EXISTS state;";
            tx.executeSql(dropTableSQL, [], function () {
                console.info("Success: Dropped 'state' table");

                // SQL query to recreate the 'state' table
                var createTableSQL = "CREATE TABLE IF NOT EXISTS state(" +
                    "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                    "name VARCHAR(20) NOT NULL);";

                // SQL query to insert predefined records into the 'state' table
                var insertRecordsSQL = "INSERT INTO state (name) VALUES (?), (?), (?), (?), (?);";

                // Function to handle a successful transaction
                function successCallback() {
                    console.info("Success: Recreated 'state' table and initialized with 5 records");
                }

                // Execute SQL queries to recreate and initialize the 'state' table
                tx.executeSql(createTableSQL, [], function () {
                    tx.executeSql(insertRecordsSQL, ['Ontario', 'British Columbia', 'Alberta', 'Nova Scotia', 'Manitoba'], successCallback, errorHandler);
                }, errorHandler);
            }, errorHandler);
        });
    },

    // Function to drop tables in the database
    dropTables: function () {
        dbOpen.transaction(function (tx) {
            // SQL queries to drop 'state', 'review', and 'checkout' tables
            var dropStateSql = "DROP TABLE IF EXISTS state;";
            var options = [];
            var dropReviewSQL = "DROP TABLE IF EXISTS review;";
            var dropCheckout = "DROP TABLE IF EXISTS checkout;";

            // Function to handle a successful transaction
            function successCallback() {
                console.info("Success: Dropped tables 'state', 'review', and 'checkout'");
            }

            // Execute SQL queries to drop tables
            tx.executeSql(dropStateSql, options, function () {
                tx.executeSql(dropReviewSQL, options, function () {
                    tx.executeSql(dropCheckout, options, successCallback, errorHandler);
                }, errorHandler);
            }, errorHandler);
        });
    }
};
