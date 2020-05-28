const router = require('express').Router();
const LoanData = require('./models/LoanData.model');

// @route   POST login request
// @desc    always fails
// @access  public
router.post('/', (req, res) => {
    return res.status(500).json(false);
})

// @route   POST login request
// @desc    returns user data
// @access  public
router.post('/ClientLogin', (req, res) => {
    const {user, pass} = req.body;
    LoanData.findOne({user, pass})
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( err => {
        return res.status(500).json(false);
    })
})

module.exports = router;