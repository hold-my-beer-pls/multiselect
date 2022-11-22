import React, {useEffect, useState} from 'react';
import './Employee.scss'
import {IEmployee} from "../../models/IModel";
import {useAppDispatch} from "../../hooks/redux";
import {sliceEmployee} from "../../store/employees";

export const Employee: React.FC<{employee: IEmployee }> = ({employee}) => {
    console.log('render employee')
    const [checkboxState, setCheckboxState] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const handlerChange = () => {
        setCheckboxState(!checkboxState)
        dispatch(sliceEmployee.actions.select(employee.id))
    }

    return (
        <div className={'employee'}>
            <input
                className={'employee__input'}
                type="checkbox"
                defaultChecked={checkboxState}
                onChange={handlerChange}/>
            <div className={'employeeText'}>{employee.surname} {employee.name}</div>
            <div className={'employeeText'}>{employee.post}</div>
        </div>
    );
};