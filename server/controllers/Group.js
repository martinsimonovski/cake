import Group from '../models/Group';

export function create(req, res, next) {
    const startDate = req.startDate;
    const endDate = req.endDate;

    console.log(createAutoGroup());
    if (!startDate || !endDate) {
        res.json(createAutoGroup());
    }
}

function createAutoGroup() {
    let today = new Date();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    if (today.getDate() >= 15) {
        month++;

        if (month === 13) {
            month = 1;
            year++;
        }
    }

    let startDate = new Date(`${year}-${month}-15`);

    month++;
    if (month === 13) {
        month = 1;
        year++;
    }

    let endDate = new Date(`${year}-${month}-15`);

    return {
        startDate,
        endDate
    };
}