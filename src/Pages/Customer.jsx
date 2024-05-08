// Customer.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Customer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Pagination
  const itemsPerPage = 6;
  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://telcom-backend.onrender.com/get-all-customers"
        );
        const formattedCustomers = response.data.data.map((customer) => ({
          ...customer,
          date: new Date(customer?.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          dateOfBirth: new Date(customer?.dateOfBirth).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }
          ),
          anniversaryDate: new Date(
            customer?.anniversaryDate
          ).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
        }));
        setCustomers(formattedCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  function handleClick() {
    navigate("/customer/add-customer");
  }

  const clickEditButton = (customerId) => {
    const customerToEdit = customers.find(
      (customer) => customer._id === customerId
    );
    console.log(customerToEdit);
    navigate("/customer/add-customer", { state: { editData: customerToEdit } });
  };

  const clickViewButton = async (customerId) => {
    try {
      const response = await axios.get(
        `https://telcom-backend.onrender.com/get-customer/${customerId}`
      );
      setSelectedCustomer(response.data.data);
    } catch (error) {
      console.error("Error fetching customer details:", error);
      // Reset selectedCustomer state to null if error occurs
      setSelectedCustomer(null);
    }
  };

  // Function to format customer data for display
  const formatCustomerData = (data) => {
    return Object.entries(data).map(([key, value]) => {
      // Check if the value is an object
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        // Convert object values to a concatenated string
        value = Object.values(value).join(" ");
      }
      // Check if the value is a date
      if (
        typeof value === "string" &&
        new Date(value) instanceof Date &&
        !isNaN(new Date(value))
      ) {
        // Format date as "day/month/year"
        value = new Date(value).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      }
      return (
        <tr key={key}>
          <td className="py-2 pr-4">
            <strong>{key}:</strong>
          </td>
          <td className="py-2">{value}</td>
        </tr>
      );
    });
  };

  // Pagination handlers
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  return (
    <div className="bg-[#ECF5FF] w-full flex flex-col justify-center rounded items-center h-[90vh]">
      <div className="bg-white w-[85vw] border ">
        <div className="w-full">
          <div className="flex justify-between items-center mb-6 m-4 p-4 px-8">
            <h1 className="text-2xl font-bold">All Customers</h1>
            <button
              onClick={handleClick}
              className="bg-[#5932EA] hover:bg-blue-600 text-white font-bold  w-[125.37px] h-[34.71px]"
            >
              + Add new
            </button>
          </div>

          <div className="mt-8 w-full text-center flex flex-col justify-center items-center">
            <table className="w-full">
              <thead className="border-b p-0">
                <tr className="text-[#B5B7C0] text-sm">
                  <th className="py-2">Customer Name</th>
                  <th className="py-2">Company</th>
                  <th className="py-2">Phone Number</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Login Date</th>
                  <th className="py-2"></th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody
                className="text-[#292D32] text-[14px] leading-5	font-medium"
                style={{ fontFamily: "Poppins" }}
              >
                {currentCustomers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="font-['Poppin] text-[14px] text-[#292D32] px-4 border-b"
                  >
                    <td className="py-2 text-center">
                      {customer.name?.firstName} {customer.name?.middleName}{" "}
                      {customer.name?.lastName}
                    </td>
                    <td className="py-2 text-center">
                      {customer.currentEmployer}
                    </td>
                    <td className="py-2 text-center">{customer.mobile}</td>
                    <td className="py-2 text-center">
                      {customer.personalEmail}
                    </td>
                    <td className="py-2 text-center">{customer.date}</td>
                    <td className="py-2 text-center">
                      <button
                        onClick={() => clickEditButton(customer._id)}
                        className="hover:bg-blue-600 hover:text-white border-[1px] border-[#787486] text-[#787486] text-[16px] font-['Inter'] py-1 px-2 rounded w-28 h-11"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="py-2 text-center">
                      <button
                        onClick={() => clickViewButton(customer._id)}
                        className="hover:bg-blue-600 hover:text-white border-[1px] border-[#787486] text-[#787486] text-[16px] font-['Inter'] py-1 px-2 rounded w-28 h-11"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClick(index + 1)}
                  className={`mx-2 px-4 py-2 bg-gray-200 text-gray-700 rounded ${
                    currentPage === index + 1 ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentCustomers.length < itemsPerPage}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-[80vw] max-h-[80vh] overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
            <table className="w-full">
              <tbody>{formatCustomerData(selectedCustomer)}</tbody>
            </table>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 self-end"
              onClick={() => setSelectedCustomer(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
