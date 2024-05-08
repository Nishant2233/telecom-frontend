import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Member = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://telcom-backend.onrender.com/get-all-member"
        );
        setMembers(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const clickButtonForNavigate = () => {
    navigate("add-member");
  };

  const clickEditButton = (memberId) => {
    const memberToEdit = members.find((member) => member._id === memberId);
    navigate("add-member", { state: { editData: memberToEdit } });
  };

  const clickViewButton = async (memberId) => {
    try {
      const response = await axios.get(
        `https://telcom-backend.onrender.com/get-member/${memberId}`
      );
      setSelectedMember(response.data.data);
    } catch (error) {
      console.error("Error fetching member details:", error);
      setSelectedMember(null);
    }
  };

  // Filter members based on search query
  const filteredMembers = members.filter((member) =>
    `${member.name.firstName} ${member.name.middleName} ${member.name.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Pagination
  const itemsPerPage = 6;
  const indexOfLastMember = currentPage * itemsPerPage;
  const indexOfFirstMember = indexOfLastMember - itemsPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-[#ECF5FF] w-full flex flex-col justify-center rounded items-center h-[70vh]">
      <div className="bg-white w-[85vw] border ">
        <div className="flex justify-between items-center mb-6 m-4 p-4 px-8">
          <button
            onClick={clickButtonForNavigate}
            className="bg-[#5932EA] hover:bg-blue-600 text-white font-bold  w-[155.37px] h-[34.71px]"
          >
            + Add new Member
          </button>
          <div>
            <input
              type="search"
              name=""
              id=""
              className="border border-gray-300 rounded px-4 py-2"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="bg-[#F9FBFF] p-2 rounded flex gap-2">
            <label htmlFor="">Short by :</label>
            <select name="" id="" className="bg-[#F9FBFF]">
              <option className="font-bold" value="">
                Month
              </option>
              <option className="font-bold" value="">
                year
              </option>
            </select>
          </div>
        </div>

        <div className="mt-8 w-full text-center flex flex-col justify-center items-center">
          <table className="w-full">
            <thead className="border-b p-0">
              <tr className="text-[#B5B7C0] text-sm">
                <th className="py-2">Team Member Name</th>
                <th className="py-2">Team Leader Name</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody
              className="text-[#292D32] text-[14px] leading-5	font-medium"
              style={{ fontFamily: "Poppins" }}
            >
              {currentMembers.map((member) => (
                <tr
                  key={member._id}
                  className="font-['Poppin] text-[14px] text-[#292D32]  px-4 border-b"
                >
                  <td>
                    {member.name.firstName} {member.name.middleName}{" "}
                    {member.name.lastName}
                  </td>
                  <td>{member.teamLeaderName}</td>
                  <td className="py-2 text-center">
                    <button
                      onClick={() => clickEditButton(member._id)}
                      className="hover:bg-blue-600 hover:text-white border-[1px] border-[#787486] text-[#787486] text-[16px] font-['Inter'] py-1 px-2 rounded w-28 h-11"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => clickViewButton(member._id)}
                      className="hover:bg-blue-600 hover:text-white border-[1px] border-[#787486] text-[#787486] text-[16px] font-['Inter'] py-1 px-2 rounded w-28 h-11 ml-2"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex px-4 w-full justify-between text-[#B5B7C0] mt-6 mb-4">
            <div>
              <p>
                Showing data {indexOfFirstMember + 1} to{" "}
                {Math.min(indexOfLastMember, filteredMembers.length)} of{" "}
                {filteredMembers.length} entries
              </p>
            </div>
            <div>
              {Array.from({
                length: Math.ceil(filteredMembers.length / itemsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mr-2 py-1 px-2  text-sm ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-[80vw] max-h-[80vh] overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Member Details</h2>
            <table className="w-full">
              <tbody>
                {Object.entries(selectedMember).map(([key, value]) => (
                  <tr key={key}>
                    <td className="py-2 pr-4">
                      <strong>{key}:</strong>
                    </td>
                    <td className="py-2">
                      {typeof value === "object" && value !== null
                        ? Object.values(value).join(" ")
                        : value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => setSelectedMember(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Member;
