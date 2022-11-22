import React, {useEffect, useState} from "react";
import './CompaniesList.scss'
import Company from "../Company/Company";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchCompany, addCompany, deleteCompany} from "../../store/companies/actions";
import {sliceCompany} from "../../store/companies/slice";

export const CompaniesList = () => {
    const newCompanyEntity: {name: string, address: string} = {name: '', address: ''}
    const [showAddFields, setShowAddFields] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const {company, error, isLoading, selected} = useAppSelector(state => state.companyReducer)

    useEffect(() => {
        console.log('zhopa')
        dispatch(fetchCompany())
    }, [dispatch])

    const handlerAddCompany = () => {
        setShowAddFields(true)
    }
    const handlerAccept = () => {
        if (newCompanyEntity.name.length && newCompanyEntity.address.length) {
            dispatch(addCompany(newCompanyEntity))
            setShowAddFields(false)
            return
        }
        alert('Заполни поля')
    }
    const handlerSetText = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.name === 'companyName' ?
            newCompanyEntity['name'] = e.target.value : newCompanyEntity['address'] = e.target.value
    }
    const handleDeleteCompany = () => {
        dispatch(deleteCompany(selected))
    }
    const handlerSelectAll = () => {
        dispatch(sliceCompany.actions.selectAll())
    }
    if (isLoading) return <div>Загрузка</div>
    if (error) return <div>Ошибка</div>
    return (
        <>
            <>
                <input
                    className={'companyElem__input'}
                    type="checkbox"
                    defaultChecked={company.length === selected.length}
                    onChange={handlerSelectAll}/>
                Выбрать все
            </>
            <div className={'companyList'}>
                {company && company.map((item) =>
                    <Company
                        key={item.id}
                        company={item}
                        selected={!!selected.find(i => i === item.id)} /> // useMemO!!!!!!!!!!!
                )}
            </div>
            <div>
                <button onClick={handlerAddCompany}>add</button>
                <button onClick={handleDeleteCompany}>delete</button>
            </div>
            {
                showAddFields &&
                <div className={'addCompany'}>
                    <div className={'addCompany__column'}>
                        <span>Название</span>
                        <input name='companyName' type='text' onChange={handlerSetText}/>
                    </div>
                    <div className={'addCompany__column'}>
                        <span>Адрес</span>
                        <input name='companyAddress' type='text' onChange={handlerSetText}/>
                    </div>
                    <button onClick={handlerAccept}>accept</button>
                </div>
            }
        </>
    )
}