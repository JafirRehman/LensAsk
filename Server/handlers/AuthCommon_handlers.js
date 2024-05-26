const User = require('../models/User')
//get user details
exports.userDetails = async (req, res) => {
    const { id } = req.user;
    try {

        const finduser = await User.findById(id).populate('cart.product')
        if (!finduser) {
            return res.status(400).json({
                success: false,
                message: 'User does not exist',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'get the user successfully',
            existeduser: finduser

        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

