export async function getRecallsByVehicle(modelYear, make, model) {
    try {
      const url = `https://api.nhtsa.gov/recalls/recallsByVehicle?make=${make}&model=${model}&modelYear=${modelYear}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error fetching recalls: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Recalls:', data);
      return data;
    } catch (error) {
      console.error('Error fetching recalls:', error.message);
      return null;
    }
  }
  