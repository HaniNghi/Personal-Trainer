
// FETCH CUSTOMER
export const fetchCustomer = () => {
  //fetch call & response handling
  return fetch(import.meta.env.VITE_API_URL + "/customers").then((response) => {
    if (!response.ok) 
        throw new Error("Error when fetching customers.");

    return response.json();
  });
};

// FETCH TRAINING
export const fetchTraining = () => {
  //fetch call & response handling
  return fetch(import.meta.env.VITE_API_URL + "/trainings").then((response) => {
    if (!response.ok) 
        throw new Error("Error when fetching trainings.");

    return response.json();
  });
};