# dataTable_library

> Library of a React Data table Component for Wealth Health (OpenClassrooms project 14)

This component displays a Data table.

[![npm version](https://img.shields.io/badge/npm-10.2.3-blue.svg)](https://www.npmjs.com/package/data-table-projet-14)

https://www.npmjs.com/package/data-table-projet-14

https://github.com/RenDupont/DataTable_library.git

This library was developed on VS Code.

## Install

To install this package, use the following command :

```bash
npm i data-table-projet-14
```

## Usage

The DataTable component needs 2 props :

- {data} : the data to display
- {colunms} : the type of each colunms

Example :

```tsx
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import DataTable from 'data-table-projet-14/dist/DataTable';


function EmployeeList(): JSX.Element {

    const dataTest = [
        {
            firstName: "John",
            lastName: "Doe",
            startDate: "2022-01-15",
            department: "Sales",
            dateOfBirth: "1985-03-10",
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            zipCode: 12345
        },
        {
            firstName: "Jane",
            lastName: "Smith",
            startDate: "2022-02-20",
            department: "Marketing",
            dateOfBirth: "1990-07-25",
            street: "456 Oak St",
            city: "Another City",
            state: "NY",
            zipCode: 67890
        },
        {
            firstName: "Bob",
            lastName: "Johnson",
            startDate: "2022-03-05",
            department: "Engineering",
            dateOfBirth: "1982-11-15",
            street: "789 Pine St",
            city: "Yet Another City",
            state: "TX",
            zipCode: 54321
        },
    ];
    
    const columns = [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'startDate', label: 'Start date' },
        { key: 'department', label: 'Department' },
        { key: 'dateOfBirth', label: 'Date of birth' },
        { key: 'street', label: 'Street' },
        { key: 'city', label: 'City' },
        { key: 'state', label: 'State' },
        { key: 'zipCode', label: 'ZipCode' },
    ];

    return (
        <div>
            <h1>Current Employees</h1>
            <DataTable
                columns={columns}
                data={dataTest}
            />
            <Link to={'/'}>Home</Link>
        </div>
    );
}

export default EmployeeList;
```