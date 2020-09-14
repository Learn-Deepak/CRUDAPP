const router = require('express').Router();
let user = require('../models/user.model');

router.route('/').get((req, res)=>{ //this path is '/users/' means from main page when we will navigate to users page
                                    //we will see all users listed.
                                    // select * from user; find returns a promise
    user.find() 
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: '+err));
});


router.route('/add').post((req, res)=>{ //this path is '/users/add'
    const username = req.body.username;
    const newuser = new user({username});
// insert into user values(username)
    newuser.save() 
        .then(()=> res.json('User Added!'))
        .catch(err => res.status(404).json('Error: '+err));
});

//READ BY ID
router.route('/:id').get((req, res) => {
    user.findById(req.params.id)
        .then(usr => res.json(usr))
        .catch(err => res.json(400).json('Error: '+err));
});

//DELETE
router.route('/:id').delete((req, res) => {
    user.findByIdAndDelete(req.params.id)
        .then(() => res.json("User Deleted!"))
        .catch(err => res.json(400).json('Error: '+err));
});

//UPDATE
router.route('/update/:id').post((req, res)=> {
    let username = req.body.username;
    user.findByIdAndUpdate(req.params.id, {username}, (err, docs)=>{
        if(err){
            res.status(400).json('Error: '+err);
        }
        else{
            res.json("User Updated!")
        }
    });
});







module.exports = router;