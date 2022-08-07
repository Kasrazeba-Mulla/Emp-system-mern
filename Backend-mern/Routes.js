const express = require('express');

const employeeController = require('./contollers/employee-controller');

const router = express.Router();


router.get("/get",employeeController.getEmployees);

router.post("/create",employeeController.newEmployee);

router.patch("/update/:eid",employeeController.updateEmployee);

module.exports = router;





