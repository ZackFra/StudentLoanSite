const LoanData = require('./models/LoanData.model');
const router = require('express').Router();


// @route   GET loan data
// @desc    get loan datas
// @access  public
router.get('/GetInfo', (req, res) => {
    LoanData.find()
    .then( data => {
        return res.status(200).json(data);
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
    LoanData.create(req.body, (err) => {
        if(err) {
            return res.status(500).json('bad request');
        }

        return res.status(200).json(true);
    })
});

module.exports = router;