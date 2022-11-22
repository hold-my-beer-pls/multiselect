import React from 'react';

export const AddEntry = ({fields}: any) => {
    // const
    const handlerSetText = (e: React.ChangeEvent<HTMLInputElement>) => {
        // e.target.name === 'companyName' ?
        //     newCompanyText['name'] = e.target.value : newCompanyText['address'] = e.target.value
    }
    const handlerAccept = () => {

    }
    return (
        <div className={'addEntry'}>
            {
                fields.map((item: any) =>
                <div className={'addEntry__column'}>
                    <span>{item.description}</span>
                    <input name={item.name} type='text' onChange={handlerSetText}/>
                </div>)
            }
            <div className={'addEntry__column'}>
                <span>Название</span>
                <input name='companyName' type='text' onChange={handlerSetText}/>
            </div>
            <div className={'addEntry__column'}>
                <span>Адрес</span>
                <input name='companyAddress' type='text' onChange={handlerSetText}/>
            </div>
            <button onClick={handlerAccept}>accept</button>
        </div>
    );
};
