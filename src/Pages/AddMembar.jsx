import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const AddMember = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [formData, setFormData] = useState({
    personTitle: "",
    firstName: "",
    middleName: "",
    lastName: "",
    mobile: "",
    personalEmail: "",
    teamLeaderName: "",
  });

  useEffect(() => {
    if (location.state && location.state.editData) {
      const { name, mobile, personalEmail, teamLeaderName } =
        location.state.editData;
      setFormData({
        ...formData,
        firstName: name.firstName || "",
        middleName: name.middleName || "",
        lastName: name.lastName || "",
        mobile: mobile || "",
        personalEmail: personalEmail || "",
        teamLeaderName: teamLeaderName || "",
      });
      setIsEditing(true);
    }
    fetchTeamLeaders(); // Fetch team leaders when component mounts
  }, [location.state, setIsEditing]);

  const fetchTeamLeaders = async () => {
    try {
      const response = await axios.get("https://telcom-backend.onrender.com/get-all-leader");
      setTeamLeaders(response.data.data);
    } catch (error) {
      console.error("Error fetching team leaders:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const editedData = { ...formData, _id: location.state.editData._id };
        await axios.put(
          `https://telcom-backend.onrender.com/edit-member/${location.state.editData._id}`,
          editedData
        );
        console.log("Data successfully updated!");
      } else {
        await axios.post("https://telcom-backend.onrender.com/add-member", formData);
      }
      navigate("/member");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#F6F8FA] h-full flex flex-col justify-center items-center">
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <p className="py-2 mb-12 text-[30px]">Add Member</p>
            <div className="flex gap-4">
              <FormControl>
                <Select
                  value={formData.personTitle}
                  onChange={handleChange}
                  className="w-[80px] bg-white"
                  name="personTitle"
                  required
                >
                  <MenuItem value="mr">Mr</MenuItem>
                  <MenuItem value="ms">Ms</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <TextField
                  required
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  variant="outlined"
                />
                <label htmlFor="">First Name</label>
              </FormControl>
              <FormControl>
                <TextField
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  variant="outlined"
                />
                <label htmlFor="">Middle Name</label>
              </FormControl>
              <FormControl>
                <TextField
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  variant="outlined"
                />
                <label htmlFor="">Last Name</label>
              </FormControl>
            </div>
          </div>

          <div className="mb-4 flex justify-between">
            <FormControl>
              <label className="py-2" htmlFor="">
                Mobile
              </label>
              <TextField
                required
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                InputProps={{
                  style: { color: "#666666" },
                }}
                className="w-[322px] bg-white"
                type="number"
                placeholder="91 0000000000"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
            <FormControl>
              <label className="py-2" htmlFor="">
                Personal E-mail
              </label>
              <TextField
                required
                name="personalEmail"
                value={formData.personalEmail}
                onChange={handleChange}
                InputProps={{
                  style: { color: "#666666" },
                }}
                className="w-[322px] bg-white"
                placeholder="ex.xyz@gmail.com"
                type="email"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </div>

          <div className="">
            <FormControl>
              <label className="py-2" htmlFor="">
                Team Leader Name
              </label>
              <Select
                name="teamLeaderName"
                value={formData.teamLeaderName}
                onChange={handleChange}
                className="w-[322px] bg-white"
                placeholder="Select Team Leader"
              >
                {teamLeaders.map((leader) => (
                  <MenuItem
                    key={leader._id}
                    value={`${leader.name.firstName} ${leader.name.lastName}`}
                  >
                    {`${leader.name.firstName} ${leader.name.lastName}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="text-center flex items-center mt-12 justify-center">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
