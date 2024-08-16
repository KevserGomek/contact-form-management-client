export const fetchMessages = async () => {
    const token = localStorage.getItem('token');
    console.log(token)
    try{
        const response = await fetch('http://localhost:5165/api/messages', {
            headers: { 'Authorization': `Bearer ${token}` },
    });
    
    // if (!response.ok){
    //     const errorMessage = await response.text();
    //     throw new Error(`Failed to fetch users: ${response.statusText}. ${errorMessage}`);
    // } 
    const result = await response.json();
    console.log(result)
    return result;
    }catch (error){
        console.error('There was a problem with the fetch operation:', error);
        throw error; 
  }
};

export const getMessageById = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5165/api/message/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('error');
    return response.json();
  };
  
  export const deleteMessage = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5165/api/message/delete/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`  },
      body: JSON.stringify({id})

    
    });
    const result = await response.json();
    return result;
  };
  
  export const addMessage = async (data) => {
    const token = localStorage.getItem('token');

    await fetch('http://localhost:5165/api/message/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`},
      body: JSON.stringify(data),
    });
  };

  export const markAsRead = async (id) => {
    const token = localStorage.getItem('token');

    await fetch(`http://localhost:5165/api/message/read/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`},
     
    });
  };





 