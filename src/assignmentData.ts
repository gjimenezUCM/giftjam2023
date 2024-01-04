import { AssignmentConfig } from "./configTypes";
let theAssignments: Array<AssignmentConfig>;
theAssignments = [
    {
        assignmentId: "Práctica 0",
        numIteractions: 2,
        numDays: 7,
        timePerDayMs: 2000,
        maxActiveComputers: 4
    },
    {
        assignmentId: "Práctica 1",
        numIteractions: 3,
        numDays: 14,
        timePerDayMs: 2000,
        maxActiveComputers: 4
    },   
    {
        assignmentId: "Práctica 2",
        numIteractions: 5,
        numDays: 14,
        timePerDayMs: 2000,
        maxActiveComputers: 3
    },
    {
        assignmentId: "Práctica 3",
        numIteractions: 7,
        numDays: 21,
        timePerDayMs: 2000,
        maxActiveComputers: 2
    }
]

export {theAssignments};