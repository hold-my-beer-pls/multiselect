import React, {useEffect, useState} from 'react';
import {fetchEmployee, addEmployee} from "../../store/employees/actions";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Employee} from "../Employee";
import {IEmployee} from "../../models/IModel";
import {sliceEmployee} from "../../store/employees";

export const EmployeesList = () => {
    const [employeeEntity, setEmployeeEntity] = useState<IEmployee>({
        name: '',
        post: '',
        surname: '',
        idCompany: '',
        id: ''
    })
    const [showAddFields, setShowAddFields] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const {employee} = useAppSelector(state => state.employeeReducer)
    const {selected: companySelected} = useAppSelector(state => state.companyReducer)

    console.log('render emplList')

    useEffect(() => {
        console.log('render emplList UE')
        dispatch(fetchEmployee({companyIds: companySelected}))
    }, [dispatch, companySelected])

    const handlerAccept = () => {
        if (companySelected.length !== 1) {
            alert('Выбери одну компанию для добавления')
            return;
        }
        if (employeeEntity.name.length && employeeEntity.surname.length && employeeEntity.post.length) {
            dispatch(addEmployee({...employeeEntity, idCompany: companySelected[0]}))
            setShowAddFields(false)
            return
        }
        alert('Заполни поля')
    }
    const handlerAddEmployee = () => {
        dispatch(sliceEmployee.actions.addEmployee(employeeEntity))
        setShowAddFields(true)
    }
    const handleDeleteEmployee = () => {
        // dispatch(deleteCompany(selected))
    }
    const handlerSetText = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'employeeSurname':
                setEmployeeEntity({...employeeEntity, surname: e.target.value})
                break
            case 'employeeName':
                setEmployeeEntity({...employeeEntity, name: e.target.value})
                break
            case 'employeePost':
                setEmployeeEntity({...employeeEntity, post: e.target.value})
                break
        }
    }

    return (
        <div>
            {
                employee?.length ?
                    employee.map((item) => <Employee key={item.id} employee={item}/>) :
                    <div>Пусто</div>
            }
            <div>
                <button onClick={handlerAddEmployee}>add</button>
                <button onClick={handleDeleteEmployee}>delete</button>
            </div>
            {
                showAddFields &&
                <div className={'addEmployee'}>
                    <div className={'addEmployee__column'}>
                        <span>Фамилия</span>
                        <input name='employeeSurname' type='text' onChange={handlerSetText}/>
                    </div>
                    <div className={'addEmployee__column'}>
                        <span>Имя</span>
                        <input name='employeeName' type='text' onChange={handlerSetText}/>
                    </div>
                    <div className={'addEmployee__column'}>
                        <span>Должность</span>
                        <input name='employeePost' type='text' onChange={handlerSetText}/>
                    </div>
                    <button onClick={handlerAccept}>accept</button>
                </div>
            }
        </div>
    );
};
