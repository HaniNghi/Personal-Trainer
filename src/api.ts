import type { Customer, TrainingSimple } from "./types";

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
  return fetch(import.meta.env.VITE_API_URL + "/gettrainings").then((response) => {
    if (!response.ok) 
        throw new Error("Error when fetching trainings.");

    return response.json();
  });
};

// FETCH ADD CUSTOMER
export const fetchAddCustomer = (customer: Customer) => {
  return fetch(import.meta.env.VITE_API_URL + "/customers", {
    method: "POST",
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(customer)
  })
  .then(response => {
    if(!response.ok)
      throw new Error("Error when adding a customer")
    return response.json()
  }) 
}

// FETCH ADD TRAINING
export const fetchAddTraining = (training: TrainingSimple) => {
  return fetch(import.meta.env.VITE_API_URL + "/trainings", {
    method: "POST",
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(training)
  })
  .then(response => {
    if(!response.ok)
      throw new Error("Error when adding a training")
    return response.json()
  }) 
}

export const deleteCustomer = (url: string) => {
    return fetch(url, {
            method: "DELETE"
          })
          .then(response => {
            if (!response.ok)
              throw new Error("Error when deleting a customer");
    
            return response.json();
          })
}

export const deleteTraining = (url: string) => {
    return fetch(url, {
            method: "DELETE"
          })
          .then(response => {
            if (!response.ok)
              throw new Error("Error when deleting a training");
    
            return response.json();
          })
}

export const updateCustomer = (url: string, updatedCustomer: Customer) => {
  return fetch (url, {
    method: "PUT",
    headers:{
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(updatedCustomer)
  })
  .then(response => {
    if(!response.ok) {
      throw new Error("Error in updating customer")
  }
    return response.json()
  })
}

