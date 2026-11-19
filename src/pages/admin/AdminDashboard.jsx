import { FaArrowUp, FaCarSide, FaClock, FaCreditCard, FaUsers, FaUserTie } from "react-icons/fa";
import { bookings } from "./adminData";
import "./AdminPages.css";

const stats = [["Total users", "1,248", "+12%", FaUsers, "blue"], ["Owners", "86", "+8%", FaUserTie, "green"], ["Cars", "342", "+5%", FaCarSide, "violet"], ["Banks", "12", "+2%", FaCreditCard, "orange"]];
export default function AdminDashboard() {
  return <div className="admin-page">
    <section className="dashboard-heading"><div><h2>Welcome back, Alex</h2><p>Here’s what’s happening with DriveHub today.</p></div><button className="primary-button"><FaClock /> Last 30 days</button></section>
    <section className="stat-grid">{stats.map(([label, value, growth, Icon, color]) => <article className="stat-card" key={label}><span className={'stat-icon ' + color}><Icon /></span><div><p>{label}</p><strong>{value}</strong><small><FaArrowUp /> {growth} from last month</small></div></article>)}</section>
    <section className="analytics-grid"><article className="panel trend-panel"><header><div><h3>Booking trend</h3><p>Monthly reservation volume</p></div><select aria-label="Trend range"><option>This year</option></select></header><div className="chart" aria-label="Booking trend chart"><div className="chart-line" /><div className="chart-labels">{["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(x => <span key={x}>{x}</span>)}</div></div></article><article className="panel status-panel"><header><div><h3>Booking status</h3><p>Current booking distribution</p></div></header><div className="donut" /><div className="legend"><span><i className="confirmed" />Confirmed <b>62%</b></span><span><i className="completed" />Completed <b>22%</b></span><span><i className="pending" />Pending <b>10%</b></span><span><i className="cancelled" />Cancelled <b>6%</b></span></div></article></section>
    <section className="panel table-panel"><header><div><h3>Recent bookings</h3><p>Latest bookings placed on the platform</p></div><button className="text-button">View all</button></header><div className="table-scroll"><table><thead><tr><th>Booking</th><th>Vehicle</th><th>Customer</th><th>Dates</th><th>Status</th><th>Amount</th></tr></thead><tbody>{bookings.map(b => <tr key={b.id}><td><b>{b.id}</b></td><td>{b.car}</td><td>{b.customer}</td><td>{b.date}</td><td><span className={'status ' + b.status.toLowerCase()}>{b.status}</span></td><td><b>{b.amount}</b></td></tr>)}</tbody></table></div></section>
  </div>;
}
