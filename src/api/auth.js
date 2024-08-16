export const login = async (username, password) => {
  try {
    const response = await fetch("http://localhost:5165/api/user/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const result = await response.json();
    localStorage.setItem('token', result.data.token);
    return result;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:5165/api/user/logout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    //   if (!response.ok) {

    //     const errorData = await response.json();
    //     console.error('Logout error:', errorData.error);
    //     throw new Error(`Logout failed: ${errorData.message || 'Unknown error'}`);
    // }

    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const checkLogin = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log(token)
    const response = await fetch("http://localhost:5165/api/user/check-login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Token validation failed');
    }

    const result = await response.json();
    console.log(result.data.user)
    return result.data.user;
  } catch (error) {
    console.error('Check login error:', error);
    throw error;
  }
};