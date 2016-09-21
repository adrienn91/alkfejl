"use strict"

const fs = require('fs');
const jimp = require('jimp');
const DataStore = require('nedb');

const db = new DataStore({
    filename: 'image.jpg',
    autoload: true,
});

    db.remove({}, {multi: true}, function(err, numRemoved) {
        if (err) throw err
        fs.readdir('gyak02/images/', function(err, files) {
        if(err) throw err;
        let count = files.length;

        files.forEach(function (fileName) {
            jimp.read(`gyak02/images/${fileName}`, function(err, image){
                console.log(image);
                const{width, height} = image.bitmap;
                db.insert({fileName, width, height}, function(err, insertedImage){
                    image.resize(100, jimp.AUTO);
                    image.write(`gyak02/converted/${insertedImage._id}.png`, function(err){
                        if(err) throw err;
                        console.log(fileName, 'feldolgozva')
                        count--;
                        if(count == 0) {
                            console.log('VEGE');
                        }
                    })
                })
            })
        })
    });
})

