export const fetchUser = async () => {
    const token = localStorage.getItem('token');
    console.log(token)
    try{
        const response = await fetch('http://localhost:5165/api/users', {
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

export const getUserById = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5165/api/user/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('error');
    return response.json();
  };
  
  export const updateUser = async (id, data) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5165/api/user/update/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(data),

    
    });
    const result = await response.json();
    return result;
  };
  
  export const addUser = async (data) => {
    const token = localStorage.getItem('token');

    await fetch('http://localhost:5165/api/user/add-reader', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  };

 