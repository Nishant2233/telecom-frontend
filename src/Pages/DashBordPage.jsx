import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { MenuItem, Select } from "@mui/material";

const DashBordPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const chartRef = useRef(null); // Ref for the chart instance
  const [chartInterval, setChartInterval] = useState("weekly");
  const [chartType, setChartType] = useState("bar");
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [numRecentCustomers, setNumRecentCustomers] = useState(5);

  const navigate = useNavigate();

  // Fetch all customers
  useEffect(() => {
    fetch("https://telcom-backend.onrender.com/get-all-customers")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setCustomers(data.data);
          setRecentCustomers(data.data.slice(0, 10));
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, [numRecentCustomers]);

  const calculateSalesData = (interval) => {
    switch (interval) {
      case "weekly":
        // Calculate weekly sales data
        return customers.reduce((acc, customer) => {
          const dayOfWeek = new Date(customer.createAt).getDay();
          const sales = acc[dayOfWeek] || 0;
          acc[dayOfWeek] = sales + 1; // Assuming each customer counts as one sale
          return acc;
        }, Array(7).fill(0));
      case "monthly":
        // Calculate monthly sales data
        return customers.reduce((acc, customer) => {
          const month = new Date(customer.createAt).getMonth();
          const sales = acc[month] || 0;
          acc[month] = sales + 1; // Assuming each customer counts as one sale
          return acc;
        }, Array(12).fill(0));
      case "quarterly":
        // Calculate quarterly sales data
        return customers.reduce((acc, customer) => {
          const quarter = Math.floor(
            new Date(customer.createAt).getMonth() / 3
          );
          const sales = acc[quarter] || 0;
          acc[quarter] = sales + 1; // Assuming each customer counts as one sale
          return acc;
        }, Array(4).fill(0));
      case "yearly":
        // Calculate yearly sales data
        return customers.reduce((acc, customer) => {
          const month = new Date(customer.createAt).getMonth();
          acc[month] = (acc[month] || 0) + 1; // Assuming each customer counts as one sale
          return acc;
        }, Array(12).fill(0));
      default:
        return [];
    }
  };
  const handleChangeNumRecentCustomers = (event) => {
    setNumRecentCustomers(event.target.value);
  };

  const getLabels = (interval) => {
    switch (interval) {
      case "weekly":
        return [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
      case "monthly":
        return [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
      case "quarterly":
        return ["Q1", "Q2", "Q3", "Q4"];
      case "yearly":
        return [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
      default:
        return [];
    }
  };

  // Create or update the chart
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy existing chart if it exists
    }

    const ctx = document.getElementById("myChart");
    if (ctx) {
      const chartData = {
        labels: getLabels(chartInterval),
        datasets: [
          {
            label: "# of Customers",
            data: calculateSalesData(chartInterval),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };

      chartRef.current = new Chart(ctx, {
        type: chartType,
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [customers, chartInterval, chartType]);

  const handleChangeInterval = (event) => {
    setChartInterval(event.target.value);
  };

  const handleChangeChartType = (event) => {
    setChartType(event.target.value);
  };
  function handleClick() {
    navigate("/customer/add-customer");
  }

  return (
    <div className="bg-[#ECF5FF] border ">
      <div>
        <div className="flex justify-between items-center mb-6 m-4 p-4 px-8">
          <div className="flex">
            <h1 className="text-xl font-semibold">Hello Tanmay 👋🏼,</h1>
          </div>
          {/* Show short list */}
        </div>
        <div className="mb-8 mx-8">
          <div className=" flex justify-between items-center">
            <h2 className="text-lg font-semibold mb-2">Sales Chart</h2>
            <div className="flex gap-4">
              <Select
                value={chartInterval}
                onChange={handleChangeInterval}
                className=""
                name="chartType"
              >
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>

              <Select
                value={chartType}
                onChange={handleChangeChartType}
                className=""
                name="chartType"
              >
                <MenuItem value="bar">Bar</MenuItem>
                <MenuItem value="line">Line</MenuItem>
                <MenuItem value="polarArea">Polar Area</MenuItem>
              </Select>
            </div>
          </div>
          <canvas id="myChart"></canvas>
        </div>
        <div className="mb-8 mx-8">
          <div className=" flex justify-between items-center"></div>
          <div className="flex justify-between">
            {" "}
            <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
            <Select
              value={numRecentCustomers}
              onChange={handleChangeNumRecentCustomers}
              className=""
              name="chartType"
            >
              <MenuItem value="5">show 5</MenuItem>
              <MenuItem value="10">show 10</MenuItem>
              <MenuItem value="20">show 20</MenuItem>
              <MenuItem value="50">show 50</MenuItem>
            </Select>
          </div>
          <table className="w-full">
            <thead className="border-b p-0">
              <tr className="text-[#B5B7C0] text-sm">
                <th className="py-2">Customer Name</th>
                <th className="py-2">Company</th>
                <th className="py-2">Phone Number</th>
                <th className="py-2">Email</th>
                <th className="py-2">Login Date</th>
              </tr>
            </thead>
            <tbody
              className="text-[#292D32] text-[14px] leading-5	font-medium"
              style={{ fontFamily: "Poppins" }}
            >
              {recentCustomers.map((customer) => (
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
                  <td className="py-2 text-center">{customer.personalEmail}</td>
                  <td className="py-2 text-center">{customer.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBordPage;
