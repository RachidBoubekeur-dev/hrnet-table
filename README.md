## datatablereactoc


### Install

Install using `npm install datatablereactoc`

### Usage 

In a React app, use the Table components:  
`import { Table } de 'datatablereactoc'`

`state = {
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
}`

`<Table state={state}>`