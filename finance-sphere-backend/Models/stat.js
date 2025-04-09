
const { MongoClient } = require('mongodb');


const uri = "mongodb://localhost:27017/"; 
const dbName = "test"; 
const collectionName = "user_stats"; 

async function retrieveDocument(query) {
    const client = new MongoClient(uri);

    try {
        
        await client.connect();
        console.log("Connected to MongoDB!");

       
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        
        const document = await collection.findOne(query); 

        
        console.log("Retrieved Document:", document);
        return document;

    } catch (error) {
        console.error("Error retrieving document:", error);
    } finally {
       
        await client.close();
    }
}


const query = { "email": "d.pragyan07@gmail.com" }; 
retrieveDocument(query).then(doc => {
    if (doc) {
        console.log("Document Object:", doc);
    } else {
        console.log("No document found.");
    }
});

module.exports=retrieveDocument;


