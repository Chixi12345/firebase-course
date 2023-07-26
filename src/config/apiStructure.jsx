[
    
    
    {

    id:'',
    template_name:'',
    company_info:{



        company_email:[],
        phone:[],
        address:[],
        locked:false}
customize:{


    theme_color:{
        theme_color_primary:''
        locked:false
    }

    profile_logo:{

        profile_logo_url:null,
        profile_logo_image:'',
        locked:false,
    }
},

social_template:{
social:[],
locked:false
},
video_template:{
video:[],
locked:false
},
link_template:{
link:[],
locked:false
},
        
connections:[

    {

        added_dt:'',
        email:'',
        first_name:'',
        middle_name:'',
        surname:'',
        job_title:''
    }
]
    },
          


]



import React, { useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Function to handle adding new data with an id
  const handleAddData = () => {
    const id = Date.now(); // You can use any unique identifier like a UUID generator as well
    const newData = {
      id: id,
      value: inputValue,
    };
    setData((prevData) => [...prevData, newData]);

    // Save to localStorage
    localStorage.setItem(`data-${id}`, JSON.stringify(newData));
  };

  // Function to retrieve data from localStorage
  const handleRetrieveData = () => {
    const savedData = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('data-')) {
        const dataItem = JSON.parse(localStorage.getItem(key));
        savedData.push(dataItem);
      }
    }
    setData(savedData);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddData}>Add Data</button>
      <button onClick={handleRetrieveData}>Retrieve Data</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;


// Update each Template 

import React, { useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Item 1', quantity: 10 },
    { id: 2, name: 'Item 2', quantity: 15 },
    { id: 3, name: 'Item 3', quantity: 5 },
    // ...other data items
  ]);

  // Function to handle the update request for a particular data item
  const handleUpdateData = (id, updatedQuantity) => {
    const itemToUpdate = data.find((item) => item.id === id);

    // Update the quantity property of the data item
    itemToUpdate.quantity = updatedQuantity;

    // Make the PUT or PATCH request using Axios
    axios.put(`https://example-api.com/updateData/${id}`, itemToUpdate)
      .then((response) => {
        console.log('Update request successful:', response.data);
        // Update the data state with the updated data item
        setData([...data]);
      })
      .catch((error) => {
        console.error('Error making update request:', error);
      });
  };

  return (
    <div>
      <h2>Data List</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleUpdateData(item.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;