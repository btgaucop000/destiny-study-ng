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
    employee.role = param.role

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
        console.log('error >>>', error)
        return res.status(500).json({
            success: false,
            message: 'Failed to create employee!',
            error: error
        })
    }
})

router.get('/', async (req, res, next) => {
    const employees = await Employee.find().select('-password');

    if(!employees) {
        return res.status(404).json({
            success: false,
            message: 'No employee found!',
        })
    }

    res.json({
        success: true,
        employees: employees
    })
})

router.get('/:id', async (req, res, next) => {
    const employee = await Employee.findById(req.params.id).select('-password');

    if(!employee) {
        return res.status(404).json({
            success: false,
            message: 'No employee found!',
        })
    }

    res.json({
        success: true,
        employee: employee
    })
})

router.put('/:id', async (req, res, next) => {
    const param = req.body;
    let employee = await Employee.findById(req.params.id);

    if(!employee) {
        return res.status(404).json({
            success: false,
            message: 'No employee found!',
        })
    }

    employee.name = param.name,
    employee.email = param.email,
    employee.password = param.password ? bcrypt.hashSync(param.password) : employee.password,
    employee.zone = param.zone,
    employee.phone = param.phone,
    employee.status = param.status
    employee.role = param.role

    try {
        employee = await employee.save();
        if(!employee) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update employee!',
            })
        }
        res.json({
            success: true,
            employee: employee
        })
    } catch (error) {
        console.log('error >>>', error)
        return res.status(500).json({
            success: false,
            message: 'Failed to update employee!',
            error: error
        })
    }
})

module.exports = router;