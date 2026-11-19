export const rows = {
  users: [
    { name: "Olivia Brown", email: "olivia.brown@mail.com", detail: "12 bookings", status: "Active" },
    { name: "Daniel Carter", email: "daniel.carter@mail.com", detail: "8 bookings", status: "Active" },
    { name: "Sophia Miller", email: "sophia.miller@mail.com", detail: "3 bookings", status: "Pending" },
    { name: "Ethan Wilson", email: "ethan.wilson@mail.com", detail: "0 bookings", status: "Inactive" },
  ],
  owners: [
    { name: "Maya Singh", email: "maya@drivefleet.com", detail: "14 listed cars", status: "Verified" },
    { name: "Arjun Mehta", email: "arjun@motors.co", detail: "8 listed cars", status: "Verified" },
    { name: "Priya Shah", email: "priya@cityrides.com", detail: "4 listed cars", status: "Pending" },
    { name: "Rahul Nair", email: "rahul@premiumwheels.com", detail: "2 listed cars", status: "Review" },
  ],
  cars: [
    { name: "BMW X5", email: "Maya Singh", detail: "SUV · 7 seats · ₹4,500/day", status: "Available" },
    { name: "Mercedes C-Class", email: "Arjun Mehta", detail: "Sedan · 5 seats · ₹5,200/day", status: "Booked" },
    { name: "Toyota Fortuner", email: "Maya Singh", detail: "SUV · 7 seats · ₹3,800/day", status: "Available" },
    { name: "Audi A6", email: "Rahul Nair", detail: "Sedan · 5 seats · ₹6,100/day", status: "Maintenance" },
  ],
  banks: [
    { name: "HDFC Bank", email: "Maya Singh", detail: "•••• 2984 · Primary", status: "Verified" },
    { name: "ICICI Bank", email: "Arjun Mehta", detail: "•••• 7419 · Primary", status: "Verified" },
    { name: "Axis Bank", email: "Priya Shah", detail: "•••• 1132 · Payout", status: "Pending" },
  ],
};

export const bookings = [
  { id: "RBK-1042", car: "Toyota RAV4", customer: "Daniel Carter", date: "12–16 Apr 2026", amount: "₹8,400", status: "Confirmed" },
  { id: "RBK-1041", car: "Honda Civic", customer: "Sophia Miller", date: "10–14 Apr 2026", amount: "₹6,200", status: "Completed" },
  { id: "RBK-1040", car: "Ford Explorer", customer: "Ethan Wilson", date: "08–12 Apr 2026", amount: "₹10,800", status: "Pending" },
  { id: "RBK-1039", car: "BMW 3 Series", customer: "Olivia Brown", date: "05–09 Apr 2026", amount: "₹9,100", status: "Cancelled" },
];
