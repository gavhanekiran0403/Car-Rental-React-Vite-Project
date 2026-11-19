import apiClient from "./apiClient";

const bookingService = {

    createBooking: (
        bookingDto,
        imageFile
    ) => {

        const formData =
            new FormData();

        formData.append(
            "booking",
            new Blob(
                [
                    JSON.stringify(
                        bookingDto
                    ),
                ],
                {
                    type:
                        "application/json",
                }
            )
        );

        if (imageFile) {
            formData.append(
                "image",
                imageFile
            );
        }

        return apiClient.post(
            "/bookings",
            formData
        );
    },

    getBookingById: (id) =>
        apiClient.get(
            `/bookings/${id}`
        ),

    getAllBookings: () =>
        apiClient.get("/bookings"),

    updateBooking: (
        id,
        bookingDto,
        imageFile
    ) => {

        const formData =
            new FormData();

        formData.append(
            "booking",
            new Blob(
                [
                    JSON.stringify(
                        bookingDto
                    ),
                ],
                {
                    type:
                        "application/json",
                }
            )
        );

        if (imageFile) {
            formData.append(
                "image",
                imageFile
            );
        }

        return apiClient.put(
            `/bookings/${id}`,
            formData
        );
    },

    deleteBooking: (id) =>
        apiClient.delete(
            `/bookings/${id}`
        ),

    approveBooking: (
        bookingId
    ) =>
        apiClient.put(
            `/bookings/approve/${bookingId}`
        ),

    cancelBooking: (
        bookingId
    ) =>
        apiClient.put(
            `/bookings/cancel/${bookingId}`
        ),

    getBookingsByUserId: (
        userId
    ) =>
        apiClient.get(
            `/bookings/user/${userId}`
        ),
};

export default bookingService;