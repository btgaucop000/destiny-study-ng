const router = require('express').Router();
const config = require('../config');
const Project = require('../models/project');

router.post('/', async (req, res) => {
    const param = req.body;
    let project = new Project();

    project.name = param.name,
    project.startDate = param.startDate,
    project.endDate = param.endDate,
    project.teamSize = param.teamSize,
    project.budget = param.budget,
    project.expense = param.expense,
    project.status = param.status

    try {
        project = await project.save();
        res.json({
            success: true,
            data: project
        })
    } catch (error) {
        console.log('error >>>', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong in server!'
        })
    }
})

router.get('/', async (req, res) => {
    const projects = await Project.find();
    if(!projects) {
        return res.status(404).json({
            success: false,
            message: 'No project exist!'
        })
    }

    res.json({
        success: true,
        data: projects
    })
})

router.get('/:id', async (req, res) => {
    const project = await Project.findById(req.params.id);
    if(!project) {
        return res.status(404).json({
            success: false,
            message: 'Project not found!'
        })
    }

    res.json({
        success: true,
        data: project
    })
})

router.put('/:id', async (req, res) => {
    const param = req.body;
    
    let project = await Project.findById(req.params.id)
    if(!project) {
        return res.status(404).json({
            success: false,
            message: 'Project not found!'
        })
    }

    project.name = param.name,
    project.startDate = param.startDate,
    project.endDate = param.endDate,
    project.teamSize = param.teamSize,
    project.budget = param.budget,
    project.expense = param.expense,
    project.status = param.status

    try {
        project = await project.save();
        res.json({
            success: true,
            data: project
        })
    } catch (error) {
        console.log('error >>>', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong in server!'
        })
    }
})

module.exports = router;