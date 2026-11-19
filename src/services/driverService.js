import apiClient from "./apiClient";

const driverService = {
    createDriver: (driverDto) =>
        apiClient.post("/drivers", driverDto),

    getDriverById: (id) =>
        apiClient.get(`/drivers/${id}`),

    getAllDrivers: () =>
        apiClient.get("/drivers"),

    updateDriver: (id, driverDto) =>
        apiClient.put(`/drivers/${id}`, driverDto),

    deleteDriver: (id) =>
        apiClient.delete(`/drivers/${id}`),

    createDriverWithBank: (driverBankDto) =>
        apiClient.post("/drivers/driver-with-bank", driverBankDto),
};

export default driverService;