const sqlModule = require("./sqlModule");

const readAlumniColumns = [
    "alumni_id",
    "first_name",
    "last_name",
    "graduation_year",
    "email_address",
    "academy_id"
];
// When adding alumni, <alumni_id> is autoincremented
const writeAlumniColumns = readAlumniColumns.slice(1);

const readMessageColumns = [
    "id",
    "sender_id",
    "receiver_id",
    "body",
    "sent_datetime"
];
// When sending messages, <id> is autoincremented
const writeMessageColumns = readMessageColumns.slice(1);

const profileInfoColumns = [
    "company",
    "graduation_year",
    "pronouns",
    "academy_id"
]

const TABLE_ALUMNI = "Alumni";
const TABLE_MESSAGES = "Messages";

// Construct a query which writes <values> to <sqlColumns> in the same order
function constructSQLWriteQuery(sqlColumns, values, tableName=TABLE_ALUMNI) {
    let query = "INSERT INTO " + tableName + " (";
    let firstCol = true;
    for (let col of sqlColumns) {
        if (firstCol) {
            firstCol = false;
        } else {
            query += ", ";
        }
        query += col;
    }
    query += ") VALUES ";

    let firstRow = true;
    for (let row of values) {
        if (firstRow) {
            firstRow = false;
        } else {
            query += ", ";
        }
        query += "(";
        let firstVal = true;
        for (let val of row) {
            if (firstVal) {
                firstVal = false;
            } else {
                query += ", ";
            }
            query += '"' + val + '"';
        }
        query += ")";
    }

    return query;
}

// Construct a query which updates <values> to <sqlColumns> in the same order
function constructSQLUpdateQuery(pkName, pkVal, sqlColumns, values, tableName=TABLE_ALUMNI) {
    console.log(sqlColumns);
    console.log(values);

    let query = "UPDATE " + tableName + " SET ";
    let firstRow = true;
    for (let i = 0; i < sqlColumns.length; i++) {
        if (firstRow) {
            firstRow = false;
        } else {
            query += ", ";
        }
        query += sqlColumns[i] + " = \"" + values[i] + "\""
    }
    query += " WHERE " + pkName + " = \"" + pkVal + "\"";

    return query;
}

// Pull data from the SQL database and write to the Google Sheets
async function readAlumniDataFromSQL(startID=0, endID=readLastEffectiveSqlAlumniID(), columns=readAlumniColumns) {
    endID = await endID;
    // Sync things from SQL to Sheets
    // Query the rows that the Sheets doesn't have
    let query = "SELECT * FROM Alumni WHERE alumni_id >= " + startID + " AND alumni_id <= " + endID;

    let data = await sqlModule.makeQuery({ query: query });

    return data;
}

async function readMessageFromSQLByBothIDs(senderID, receiverID) {
    let query = "SELECT * FROM Messages WHERE " + 
        "(sender_id = " + senderID + " AND receiver_id = " + receiverID + ") OR " +
        "(sender_id = " + receiverID + " AND receiver_id = " + senderID + ")";
    // console.log(query);
    let data = await sqlModule.makeQuery({ query: query });
    return data;
}

async function writeMessageToSQL(senderID, receiverID, body) {
    // Check that the IDs are valid
    let lastID = readLastEffectiveSqlAlumniID();
    if ((senderID > lastID) || (receiverID > lastID)) {
        console.log("Invalid senderID or receiverID (sqlAccess:writeMessageToSQL");
        return -1;
    }

    // Check that the body exists
    if (body.length == 0) {
        console.log("Invalid body (sqlAccess:writeMessageToSQL)");
        return -1;
    }

    let values = [
        [
            senderID, 
            receiverID, 
            body, 
            new Date().toISOString().slice(0, 19).replace('T', ' ') // Have the database log the current date
        ]
    ]
    let result = writeDataToSQL(writeMessageColumns, values, TABLE_MESSAGES);
    return result;
}

async function readLastEffectiveSqlAlumniID() {
    let lastSqlID = await readLastSqlAlumniID();
    // We add 1 because it starts with 0, and max() returns the largest value
    return parseInt(lastSqlID[0]['max(alumni_id)'], 10) + 1;
}

// Get the last alumni_id from the SQL database
async function readLastSqlAlumniID() {
    let query = "SELECT max(alumni_id) FROM Alumni";
    return await sqlModule.makeQuery({ query: query });
}

async function readClientID(email) {
    let query = "SELECT alumni_id FROM Alumni WHERE " + 
        "(email_address = \"" + email + "\")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    return data[0].alumni_id;
}

async function writeProfilePictureToSQL(alumni_id, picture) {
    
}

async function readProfilePictureFromSQL(alumni_id) {
    
}

async function writeProfileInfoToSQL() {
    
}

async function readProfileInfoFromSQL() {

}

async function getAcademyIDFromString(academy_name) {
    let query = "SELECT academy_id FROM Academy WHERE " + 
        "(academy_name = \"" + academy_name + "\")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    return data[0].academy_id;
}

async function getAcademyStringFromID(academy_id) {
    let query = "SELECT academy_name FROM Academy WHERE " + 
        "(academy_id = \"" + academy_id + "\")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    return data[0].academy_name;
}

async function updateProfileInfoToSQL(alumniID, company="", graduationYear, pronouns="", academy) {
    let academyID = await getAcademyIDFromString(academy);

    let columns = profileInfoColumns
    let values = [
        company,
        graduationYear,
        pronouns,
        academyID
    ];
    let query = constructSQLUpdateQuery("alumni_id", alumniID, columns, values, TABLE_ALUMNI);
    console.log("query: \n" + query);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

async function readProfileInfoFromSQL(alumniID) {
    let query = "SELECT * FROM Alumni WHERE " + 
        "(alumni_id = \"" + alumniID + "\")"
    let data = await sqlModule.makeQuery({ query: query });
    // Only return the first result
    return data;
}

// Write <values> to SQL in the order of <columns>
async function writeDataToSQL(columns, values, tableName) {
    let query = constructSQLWriteQuery(columns, values, tableName);
    let queryResult = await sqlModule.makeQuery({ query: query });
    return queryResult;
}

module.exports = { 
    readAlumniDataFromSQL, 
    readMessageFromSQLByBothIDs,
    writeDataToSQL, 
    writeMessageToSQL,
    readLastEffectiveSqlAlumniID, 
    readLastSqlAlumniID, 
    writeAlumniColumns,
    readClientID,

    writeProfilePictureToSQL,
    readProfilePictureFromSQL,

    updateProfileInfoToSQL,
    readProfileInfoFromSQL,

    getAcademyIDFromString,
    getAcademyStringFromID
}