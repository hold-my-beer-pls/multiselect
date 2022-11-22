import React, {useEffect, useState} from 'react';
import './Company.scss'
import {ICompany} from "../../models/IModel";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {sliceCompany} from "../../store/companies/slice";
import {editCompany} from "../../store/companies/actions";

export default React.memo<{company: ICompany, selected: boolean}>(function Company({company,selected}) {
    const dispatch = useAppDispatch()
    const [companyName, setCompanyName] = useState<string>('')
    const [companyAddress, setCompanyAddress] = useState<string>('')
    const [editMode, setEditMode] = useState<boolean>(false)
    console.log('render company')

    const handlerChangeState = () => {
        dispatch(sliceCompany.actions.select(company.id))
        if (selected) {
            setEditMode(false)
        }
    }
    const handlerChangeDescription = (e: React.ChangeEvent<HTMLInputElement>)=> {
        e.target.name === 'companyName' ?
            setCompanyName(e.target.value) : setCompanyAddress(e.target.value)
    }
    const handleSetEditMode = () => {
        setEditMode(e => !e)
        if (editMode) {
            if (companyName !== company.name || companyAddress !== company.address) {
                dispatch(editCompany({...company, name: companyName, address: companyAddress}))
            }
        } else {
            setCompanyName(company.name)
            setCompanyAddress(company.address)
        }
    }

    return (
        <div className={'companyElem'}>
            <input
                className={'companyElem__checkbox'}
                type="checkbox"
                checked={selected}
                onChange={handlerChangeState}/>
            <div className={'companyElem__description'}>
                {
                    editMode ?
                    <>
                        <input
                            name='companyName'
                            className={'companyElem__description_name'}
                            defaultValue={companyName}
                            onChange={handlerChangeDescription}/>
                        <input
                            name='companyAddress'
                            className={'companyElem__description_address'}
                            defaultValue={companyAddress}
                            onChange={handlerChangeDescription}/>
                    </>
                   :
                    <>
                        <div className={'companyElem__description_name'}>{company.name}</div>
                        <div className={'companyElem__description_address'}>{company.address}</div>
                    </>
                }
            </div>
            <div className={'companyElem__count'}>{company.employeesNumber}</div>
            {
                selected && <button onClick={handleSetEditMode}>{editMode ? 'save' : 'edit'}</button>
            }
        </div>
    );
})