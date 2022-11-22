import React from "react";
import './CompaniesPage.scss'
import {CompaniesList} from "../components/CompaniesList";
import {EmployeesList} from "../components/EmployeesList";

const CompaniesPage = () => {
    return (
        <div className={'companyPage'}>
            <div className={'companyPage__list'}>
                <h2>Список компаний</h2>
                <CompaniesList />
            </div>
            <div className={'companyPage__employees'}>
                <h2>Список сотрудников</h2>
                <EmployeesList />
            </div>
        </div>
)
}

export default CompaniesPage;
