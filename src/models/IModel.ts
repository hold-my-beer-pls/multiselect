export interface ICompany {
    name: string
    id: string
    address: string
    employeesNumber: number
}

export interface IEmployee {
    name: string
    id: string
    surname: string
    post: string
    idCompany: string
}