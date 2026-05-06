import type { Customer, Training } from "./types";

const API_URL = import.meta.env.VITE_API_URL;


//  CUSTOMERS

export const getCustomers = () => {
  return fetch(`${API_URL}/customers`)
    .then(res => {
      if (!res.ok) throw new Error("Error fetching customers");
      return res.json();
    });
};

export const saveCustomer = (customer: Customer) => {
  return fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  }).then(res => {
    if (!res.ok) throw new Error("Error saving customer");
    return res.json();
  });
};

export const updateCustomer = (url: string, customer: Customer) => {
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  }).then(res => {
    if (!res.ok) throw new Error("Error updating customer");
    return res.json();
  });
};

export const deleteCustomer = (url: string) => {
  return fetch(url, {
    method: "DELETE",
  }).then(res => {
    if (!res.ok) throw new Error("Error deleting customer");
  });
};


//  TRAININGS

export const getTrainings = () => {
  return fetch(`${API_URL}/gettrainings`)
    .then(res => {
      if (!res.ok) throw new Error("Error fetching trainings");
      return res.json();
    });
};

export const saveTraining = (training: Training & { customer: string }) => {
  return fetch(`${API_URL}/trainings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(training),
  }).then(res => {
    if (!res.ok) throw new Error("Error saving training");
    return res.json();
  });
};

export const deleteTraining = (id: number) => {
  return fetch(`${API_URL}/trainings/${id}`, {
    method: "DELETE",
  }).then(res => {
    if (!res.ok) throw new Error("Error deleting training");
  });
};