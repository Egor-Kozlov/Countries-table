import { useState, useEffect } from "react";
import { Table } from 'antd' //<-Prepared components
import 'antd/dist/antd.css'; //<-Prepared components' styles

const TableContainer = () => {
  const [counriesList, setCounriesList] = useState([])
  const [filterNamesList, setFilterNamelsList] = useState([])
  const [filterIsoCodeList, setFilterIsoCodeList] = useState([])
  const [filterCapitalsList, setFilterCapitalsList] = useState([])

  useEffect(() => {
    request()
  }, [])

  const createCountryList = (countryList) => {
    const filterNames = []
    const filterIsoCode = []
    const filterCapitals = []

    for (const key in countryList) {
      if (Object.hasOwnProperty.call(countryList, key)) {
        const element = countryList[key];
        element.continent = element.continent.name

        if (!element.capital) {
          element.capital = 'Has no capital'
        }
        if (!filterCapitals.find(
          capital =>
          capital.text === element.capital)
        ) {
          filterCapitals.push({
            text: element.capital,
            value: element.capital
          })
        }
        
        filterNames.push({
          text: element.name,
          value: element.name
        })  
        filterIsoCode.push({
          text: element.code,
          value: element.code
        })
      }
    }
 
    setFilterNamelsList(filterNames);
    setFilterIsoCodeList(filterIsoCode);
    setFilterCapitalsList(filterCapitals.sort((a, b) => {
        if (a.text > b.text) {
          return 1;
        }
        if (a.text < b.text) {
          return -1;
        }
        return 0;
      }))

    return countryList
  }

  const request = () => {
    fetch("https://countries.trevorblades.com/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
            query {
                countries {
                    name
                    code
                    capital
                    emoji
                    continent {name}
                  }
            }
            `,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setCounriesList (createCountryList(data.data.countries))
    });
  }

  const columns = [
    {
      title: 'ISO Code',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.localeCompare(b.code),
      filters: filterIsoCodeList,
      onFilter: (value, record) => record.code.indexOf(value) === 0,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: filterNamesList,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: 'Capital',
      dataIndex: 'capital',
      key: 'capital',
      sorter: (a, b) => a.capital.localeCompare(b.capital),
      filters: filterCapitalsList,
      onFilter: (value, record) => record.capital.indexOf(value) === 0,
    },
    {
      title: 'Continent',
      dataIndex: 'continent',
      key: 'continent',
      filters: [
        {text: 'Africa',
        value: 'Africa'},
        {text: 'Antarctica',
        value: 'Antarctica'},
        {text: 'Asia',
        value: 'Asia'},
        {text: 'Europe',
        value: 'Europe'},
        {text: 'Oceania',
        value: 'Oceania'},
        {text: 'North America',
        value: 'North America'},
        {text: 'South America',
        value: 'South America'}
      ],
      sorter: (a, b) => a.continent.localeCompare(b.continent),
      onFilter: (value, record) => record.continent.indexOf(value) === 0,
    },
    {
      title: 'Flag',
      dataIndex: 'emoji',
      key: 'flag',
    }
  ];

    return (
        <div className = 'table-container'>
            <div className="wrap">
              <h1 className = 'table-title'>Countries table</h1>
              <Table
                dataSource={counriesList} 
                columns={columns} 
                bordered={true}
                size={'middle'}
                tableLayout={'fixed'}
                rowKey={"name"}
                loading={counriesList.length ? false : true}
              />
            </div>
        </div>
    )
}

export default TableContainer