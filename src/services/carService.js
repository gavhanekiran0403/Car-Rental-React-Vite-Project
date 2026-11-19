import apiClient from "./apiClient";

const toResponseData = (response) => response.data;

const createImageFormData = (imageFiles) => {
  const formData = new FormData();

  Array.from(imageFiles || []).forEach((imageFile) => {
    formData.append("imageFiles", imageFile);
  });

  return formData;
};

const carService = {

  createCar: (carDto) =>
    apiClient
      .post("/cars", carDto)
      .then(toResponseData),

  updateCar: (carId, carDto) =>
    apiClient
      .put(`/cars/${carId}`, carDto)
      .then(toResponseData),

  deleteCar: (carId) =>
    apiClient
      .delete(`/cars/${carId}`)
      .then(toResponseData),

  getCarById: (carId) =>
    apiClient
      .get(`/cars/${carId}`)
      .then(toResponseData),

  getAllCars: (page = 0, size = 8) =>
  apiClient
    .get("/cars", {
      params: {
        page,
        size,
      },
    })
    .then(toResponseData),

  searchByFuel: (fuelType) =>
    apiClient
      .get(`/cars/fuel/${fuelType}`)
      .then(toResponseData),

  searchBySeats: (seats) =>
    apiClient
      .get(`/cars/seats/${seats}`)
      .then(toResponseData),

  searchByStatus: (status) =>
    apiClient
      .get(`/cars/status/${status}`)
      .then(toResponseData),

  uploadCarImages: (carId, imageFiles) =>
    apiClient.post(
      `/cars/upload/${carId}`,
      createImageFormData(imageFiles),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then(toResponseData),

  updateCarImages: (carId, imageFiles) =>
    apiClient.put(
      `/cars/update-images/${carId}`,
      createImageFormData(imageFiles),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then(toResponseData),
};

export default carService;