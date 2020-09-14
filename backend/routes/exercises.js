const router = require('express').Router();
let exercise = require('../models/exercise.model');

//READ
router.route('/').get((req, res)=>{ //this path is '/exercises/'
    exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: '+ err));
});


//CREATE
router.route('/add').post((req, res)=>{ //this path is '/exercises/add'
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new exercise({
        username, //it is a short way for => username : username
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => res.json('Exercise Added'))
        .catch(err => res.status(400).json('Error: '+err));
});

//READ BY ID
router.route('/:id').get((req, res)=>{ //this path is '/exercises/(r24y7t46573724-someID)' GET
    exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: '+err));
});

//DELETE  
router.route('/:id').delete((req, res)=>{ //this path is '/exercises/(r24y7t46573724-someID)' DELETE
    exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("Exercise Deleted"))
        .catch(() => res.status(400).json('Error: '+err));
});

//UPDATE
router.route('/update/:id').post((req, res)=>{ //this path is '/exercises/update/(r24y7t46573724-someID)'
    exercise.findById(req.params.id)
        .then((exercise) => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise Updated.'))
                .catch((err) => res.status(400).json('Error: '+err));

        })
        .catch((err) => res.status(400).json('Error: '+err))
});

module.exports = router;