import companies from './companies.json'
import employees from './employees.json'

export interface IEmployee {
    name: string
    id: string
    surname: string
    post: string
    idCompany: string
}

export interface ICompany {
    name: string
    id: string
    address: string
    employeesNumber: number
}

export function getCompanies(): Promise<ICompany[]> {
    return new Promise((resolve) => {
        setTimeout(resolve, getRandom(100, 800))
    }).then(() => {
        return [...companies]
    });
}

export function getEmployees(idCompany: string): Promise<IEmployee[]> {
    return new Promise((resolve) => {
        setTimeout(resolve, getRandom(100, 800))
    }).then(() => {
        return employees.filter((item) => item.idCompany === idCompany)
    });
}

function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}