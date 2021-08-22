## hrnet-table

### hrnet-table is an open-source react plug-in for boosting an HTML table

### Install

Install using `npm install hrnet-table`

### Usage 

```javascript
// Example one
import Table from 'hrnet-table';

state = {
    employee = [
        {
            FirstName: 'Xavier',
            LastName: 'Canel',
            StartDate: '09/10/2021',
            Department: 'Human Resources',
            DateBirth: '01/23/1990',
            Street: '30 rue de la Presse',
            City: 'Citron-Normal',
            State: 'CT',
            ZipCode: '13994',
        },
        {
            FirstName: 'Rachid',
            LastName: 'Boubekeur',
            StartDate: '01/03/2021',
            Department: 'Human Resources',
            DateBirth: '03/22/2000',
            Street: '10 rue de Charcot',
            City: 'Citron-Normal',
            State: 'CT',
            ZipCode: '13994',
        }
    ]
}

<Table state={state}>`
```

```javascript
// Example two
import { useSelector } from 'react-redux';
import { employeeSelector } from '../../slice/Employee';
import Table from 'hrnet-table';

const state = useSelector(employeeSelector);

<Table state={state}>`
```