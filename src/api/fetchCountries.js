export const fetchCountries = async () => {
    try {
      const response = await fetch("http://localhost:5165/api/countries");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; 
    }
  };