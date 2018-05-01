let router = require('express').Router();
let Artist = require('../models/artist');
let Album = require('../models/album');
let Track = require('../models/track');


router.get('/show', (req, res) => {

    Artist.find({}, (err, artists) => {
        if (err) return console.log('error occured');

        res.render('./artist/artist', { artists });
    })


});

router.get('/show/:id', (req, res) => {
    console.log(req.params.id);
    Album.find({ artist: req.params.id }, (err, albums) => {
        if (err) return console.log('error occured');

        Track.find({}, (err, tracks) => {
            if (err) return console.log('error occured');

            console.log(tracks);
            res.render('./artist/artist', { albums, tracks })
        });
    });
});

router.get('/addNew', (req, res) => {

    Artist.find({}, (err, artists) => {
        if (err) return console.log('Error occured');

        Album.find({}, (err, albums) => {
            if (err) return console.log('Error occured');

            res.render('./artist/form', { artists, albums });
        });
    });
})

router.post('/addArtist', (req, res) => {
    let artist = new Artist();

    artist.name = req.body.name;
    artist.description = req.body.description;
    artist.years_active = req.body.years;

    artist.save((err) => {
        if (err) return console.log('Error');

        console.log('Artist Added');
        res.redirect('/show');
    });
});

router.post('/addAlbum', (req, res) => {

    let album = new Album();

    Artist.find({ name: req.body.artist }, (err, artists) => {
        if (err) return console.log('Error occured');
        console.log(artists);

        album.artist = artists[0]._id;
        album.name = req.body.name;
        album.release_date = req.body.date;

        album.save((err) => {
            if (err) return console.log('Error');

            console.log('Album added');
            res.redirect('/show');
        });
    });
});

router.post('/addTrack', (req, res) => {
    let track = new Track();

    console.log(req.body.name);
    Album.find({ name: req.body.album }, (err, albums) => {
        if (err) return console.log('Error occured');

        console.log(albums);
        track.album = albums[0]._id;
        track.name = req.body.name;
        track.play_time = req.body.time;
        track.save((err) => {
            if (err) return console.log('Error');

            console.log('Track Added');
            res.redirect('/show');
        });
    });
});

router.get('/songs/:id',(req,res)=>{
    
    Track.find({ album : req.params.id},(err,songs)=>{
        if(err) return console.log(err);

        res.render('./artist/songs',{songs});
    })
});

router.get('/edit',(req,res)=>{

    Artist.find({}, (err, artists) => {
        if (err) return console.log('error occured');

        res.render('./artist/editartist', { artists });
    });
});

router.patch('/edit',(req,res)=>{

    let artist = new Artist();

    Artist.find({name: req.body.artist }, (err, artists) => {
        if (err) return console.log('Error occured');
        console.log(artists);
        console.log(artists[0]._id)
        Artist.findOneAndUpdate( {_id :artists[0]._id},{description: req.body.description, years_active: req.body.years},{ new: true } ,(err,success)=>{
            if(err) return console.log(err);

            console.log(success);
            res.redirect('/show');
        });
    });
});


module.exports = router;