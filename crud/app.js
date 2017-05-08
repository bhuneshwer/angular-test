var express = require('express');
var app = express();
var path = require('path');

//.............................
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/details';
var BodyParser = require('body-parser')

app.use('/static', express.static('JSfile'));
app.use('/angular', express.static('angular'));
app.use('/partial', express.static('partial'));
app.use(BodyParser())
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/main.html'));
});
//------------------------------------------------------






app.post('/insertUser', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        insertDocument(db, function(newUser) {
            res.send(newUser)
            db.close();
        });
    });

    //-------------------------------------------------
    var insertDocument = function(db, callback) {
        db.collection('employee').insertOne({
            "fname": req.body.fname,
            "lname": req.body.lname,
            "email": req.body.email,
            "phone": req.body.phone,
            "city": req.body.city
        }, function(err, result) {
            console.log("Inserted a document into the employee collection.");
            console.log(result);
            callback(result);
        });
        //--------------------------------------------------
    };

});
//--------------------------------------------------------
app.get('/userList', function(req, res) {
        MongoClient.connect(url, function(err, db) {
            db.collection('employee').find({}).toArray(function(err, employee) {
                if (err) {
                    console.log('could not retrived data');
                    res.send(err);
                } else {
                    res.send(employee);
                }
            });
        });


    })
    //--------------------------------------------------------

app.put('/update', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        updateDocument	(db, function(newUser) {
            res.send(newUser)
            db.close();
        });
    });

    var updateDocument	 = function(db, callback) {
        db.collection('employee').update({ "email": req.body.email }, { $set: req.body }, function(err, success) {
            if (!err) {
                callback(success);
            }
        });
        //--------------------------------------------------
    };
});
//------------------------------------------------------------
/*var query={
		"firstname": req.body.fname,
            "lastname": req.body.lname,
            "email": req.body.email,
            "phone-no": req.body.phone,
            "city": req.body.city

	};
	employee.findOneAndUpdate({_id:req.params},query,function(err,employee){
		if(err)
			res.sen(err);
		res.json(employee);
	});*/



app.listen(2000, function() {
    console.log('http://127.0.0.1:2000');
});
