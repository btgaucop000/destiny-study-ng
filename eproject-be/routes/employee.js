const router = require('express').Router();
const Employee = require('../models/employee');
const bcrypt = require('bcryptjs');
const config = require('../config')

router.post('/', async (req, res, next) => {
    const param = req.body;
    let employee = new Employee();

    employee.name = param.name,
    employee.email = param.email,
    employee.password = bcrypt.hashSync(param.password),
    employee.zone = param.zone,
    employee.phone = param.phone,
    employee.image = employee.gravatar();
    employee.status = param.status

    try {
        employee = await employee.save();
        if(!employee) {
            return res.status(500).json({
                success: false,
                message: 'Failed to create employee!',
            })
        }
        res.json({
            success: true,
            employee: employee
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create employee!',
            error: error
        })
    }
})

module.exports = router;