import React, { useState, useRef } from 'react';
import './table.css';

/**
 * Table component smart
 */
const Table = (props) => {
    const { state } = props;
    const [show, setShow] = useState(10);
    const refShow = useRef();
    const [start, setStart] = useState(0);
    const [sortActive, setSortActive] = useState(false);
    const [arrayEmployee, setArrayEmployee] = useState(state.employee.slice(start, show));

    /**
     * Search filters employee data based on the user's search
     * @param {String} search user search
     */
    const Search = (search) => {
        setArrayEmployee(state.employee.filter(employee => {
            if (
                employee.FirstName.toLowerCase().includes(search.toLowerCase()) ||
                employee.LastName.toLowerCase().includes(search.toLowerCase()) ||
                employee.StartDate.toLowerCase().includes(search.toLowerCase()) ||
                employee.Department.toLowerCase().includes(search.toLowerCase()) ||
                employee.DateBirth.toLowerCase().includes(search.toLowerCase()) ||
                employee.Street.toLowerCase().includes(search.toLowerCase()) ||
                employee.City.toLowerCase().includes(search.toLowerCase()) ||
                employee.State.toLowerCase().includes(search.toLowerCase()) ||
                employee.ZipCode.toLowerCase().includes(search.toLowerCase())
            ) {
                return true;
            }
            return false;
        }).slice(0, parseInt(refShow.current.value)));
    };

    /**
     * InitShow limit of items
     * @param {Number} value
     */
    const InitShow = (value) => {
        setStart(0);
        setShow(value);
        setArrayEmployee(state.employee.slice(0, value));
    };

    /**
     * Sort sort employee data
     * @param {String} type Text or Date or Number
     * @param {String} action item to sort
     */
    const Sort = (type, action) => {
        switch (type) {
            case 'Text':
                setArrayEmployee(arrayEmployee.sort((a, b) => {
                    let valueA;
                    let valueB;
                    switch (action) {
                        case 'FirstName':
                            valueA = a.FirstName.toLowerCase();
                            valueB = b.FirstName.toLowerCase();
                            break;

                        case 'LastName':
                            valueA = a.LastName.toLowerCase();
                            valueB = b.LastName.toLowerCase();
                            break;

                        case 'Department':
                            valueA = a.Department.toLowerCase();
                            valueB = b.Department.toLowerCase();
                            break;

                        case 'Street':
                            valueA = a.Street.toLowerCase();
                            valueB = b.Street.toLowerCase();
                            break;

                        case 'City':
                            valueA = a.City.toLowerCase();
                            valueB = b.City.toLowerCase();
                            break;

                        case 'State':
                            valueA = a.State.toLowerCase();
                            valueB = b.State.toLowerCase();
                            break;

                        default:
                            valueA = a.FirstName.toLowerCase();
                            valueB = b.FirstName.toLowerCase();
                            break;
                    }
                    if (!sortActive) {
                        setSortActive(true);
                        if (valueA < valueB) return -1;
                        else return 1;
                    } else {
                        setSortActive(false);
                        if (valueA < valueB) return 1;
                        else return -1;
                    }
                }));
                break;

            case 'Date':
                setArrayEmployee(arrayEmployee.sort((a, b) => {
                    let valueA;
                    let valueB;
                    switch (action) {
                        case 'StartDate':
                            valueA = parseInt(a.StartDate.split('/').join(''));
                            valueB = parseInt(b.StartDate.split('/').join(''));
                            break;

                        case 'DateBirth':
                            valueA = parseInt(a.DateBirth.split('/').join(''));
                            valueB = parseInt(b.DateBirth.split('/').join(''));
                            break;

                        default:
                            valueA = parseInt(a.StartDate.split('/').join(''));
                            valueB = parseInt(b.StartDate.split('/').join(''));
                            break;
                    }
                    if (!sortActive) {
                        setSortActive(true);
                        if (valueA < valueB) return 1;
                        else return -1;
                    } else {
                        setSortActive(false);
                        if (valueA < valueB) return -1;
                        else return 1;
                    }
                }));
                setSortActive(!sortActive);
                break;

            case 'Number':
                setArrayEmployee(arrayEmployee.sort((a, b) => {
                    const valueA = parseInt(a.StartDate);
                    const valueB = parseInt(b.StartDate);
                    if (!sortActive) {
                        setSortActive(true);
                        if (valueA < valueB) return -1;
                        else return 1;
                    } else {
                        setSortActive(false);
                        if (valueA < valueB) return 1;
                        else return -1;
                    }
                }));
                setSortActive(!sortActive);
                break;
            default:
                break;
        }
    };

    /**
     * NextTable display the following data
     */
    const NextTable = () => {
        if (state.employee.length > show) {
            const newStart = start + parseInt(refShow.current.value);
            const newShow = show + parseInt(refShow.current.value);
            setStart(newStart);
            setShow(newShow);
            setArrayEmployee(state.employee.slice(newStart, newShow));
        }
    };

    /**
     * PreviousTable display previous data
     */
    const PreviousTable = () => {
        if (start !== 0) {
            const newStart = start - parseInt(refShow.current.value);
            const newShow = show - parseInt(refShow.current.value);
            setStart(newStart);
            setShow(newShow);
            setArrayEmployee(state.employee.slice(newStart, newShow));
        }
    };
    return (
        <div className="listEmployee">
            <div className="showSearch">
                <div>
                    <label htmlFor="show">
                        Show
                        <select id="show" ref={refShow} onChange={(e) => InitShow(parseInt(e.target.value))}>
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                        entries
                    </label>
                </div>
                <div>
                    <label htmlFor="search">Search: </label>
                    <input type="search" id="search" onChange={(e) => Search(e.target.value)} />
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr role="row">
                        <th onClick={() => Sort('Text', 'FirstName')}>First Name</th>
                        <th onClick={() => Sort('Text', 'LastName')}>Last Name</th>
                        <th onClick={() => Sort('Date', 'StartDate')}>Start Date</th>
                        <th onClick={() => Sort('Text', 'Department')}>Department</th>
                        <th onClick={() => Sort('Date', 'DateBirth')}>Date of Birth</th>
                        <th onClick={() => Sort('Text', 'Street')}>Street</th>
                        <th onClick={() => Sort('Text', 'City')}>City</th>
                        <th onClick={() => Sort('Text', 'State')}>State</th>
                        <th onClick={() => Sort('Number', 'ZipCode')}>Zip Code</th>
                    </tr>
                </thead>
                <tbody>
                    {state.employee.length > 0 ? (
                        arrayEmployee.length > 0 ? (
                            arrayEmployee.map((employee, index) => (
                                <tr role="row" key={index}>
                                    <td>{employee.FirstName}</td>
                                    <td>{employee.LastName}</td>
                                    <td>{employee.StartDate}</td>
                                    <td>{employee.Department}</td>
                                    <td>{employee.DateBirth}</td>
                                    <td>{employee.Street}</td>
                                    <td>{employee.City}</td>
                                    <td>{employee.State}</td>
                                    <td>{employee.ZipCode}</td>
                                </tr>
                            ))
                        ) : (
                            <tr role="row">
                                <td colSpan="9">No matching records found</td>
                            </tr>
                        )
                    ) : (
                        <tr role="row">
                            <td colSpan="9">No data available in table</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="showingPreviousOrNext">
                <div>
                    {state.employee.length > 0 ? (
                        <p>Showing {start + 1} to {show > state.employee.length ? state.employee.length : show} of {state.employee.length} entries</p>
                    ) : (
                        <p>Showing 0 to 0 of 0 entries</p>
                    )}
                </div>
                <div>
                    <p><span onClick={PreviousTable}>Previous</span><span onClick={NextTable}>Next</span></p>
                </div>
            </div>
        </div>
    );
};

export default Table;