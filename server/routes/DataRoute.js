const LoanData = require('./models/LoanData.model');
const router = require('express').Router();


// @route   POST loan data
// @desc    get loan datas
// @access  public
router.post('/GetInfo', (req, res) => {
    const { user, pass } = req.body;

    if(typeof user !== 'string' || typeof pass !== 'string') {
        return res.status(500).json('Bad Request');
    }

    LoanData.findOne({user, pass})
    .then( res => {
        return res.status(200).json(res);
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json(false);
    });
});

// @route   POST Acc
// @desc    create new acc
// @access  private
router.post('/CreateAcc', (req, res) => {
    LoanData.create(req.body, (err, res) => {
        if(err) {
            return res.status(500).json('bad request');
        }

        return res.status(200).json(true);
    })
});

module.exports = router;