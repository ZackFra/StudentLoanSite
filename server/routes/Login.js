const router = require('express').Router();

// @route   POST login request
// @desc    always fails
// @access  public
router.post('/', (req, res) => {
    return res.status(500).json(false);
})

module.exports = router;