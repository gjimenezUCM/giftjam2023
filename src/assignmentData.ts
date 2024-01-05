import { AssignmentConfig } from "./configTypes";
let theAssignments: Array<AssignmentConfig>;
theAssignments = [
    {
        assignmentId: "Práctica 0",
        numIteractions: 3,
        numDays: 10,
        timePerDayMs: 2000,
        maxActiveComputers: 7
    },
    {
        assignmentId: "Práctica 1",
        numIteractions: 4,
        numDays: 14,
        timePerDayMs: 2000,
        maxActiveComputers: 5
    },   
    {
        assignmentId: "Práctica 2",
        numIteractions: 5,
        numDays: 21,
        timePerDayMs: 2000,
        maxActiveComputers: 5
    },
    {
        assignmentId: "Práctica 3",
        numIteractions: 7,
        numDays: 21,
        timePerDayMs: 2500,
        maxActiveComputers: 4
    }
]

export {theAssignments};