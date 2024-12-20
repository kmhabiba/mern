import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    try {
      const response = await axios.post("http://localhost:5001/api/auth/signup", formData);
      console.log(response.data);
      setMessage("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.error || "Error occurred");
      setMessage(error.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Card sx={{ maxWidth: 400, width: "100%", padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2, padding: 1 }}
            >
              Sign Up
            </Button>
          </form>
          {message && (
            <Typography
              variant="body2"
              sx={{ color: message.includes("successful") ? "green" : "red", marginTop: 2, textAlign: "center" }}
            >
              {message}
            </Typography>
          )}
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none", color: "#3f51b5" }}>
                Login
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Registration;


// //Registration.js with MUI
// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Box, Card, CardContent, TextField, Button, Typography } from "@mui/material";

// const Registration = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted");

//     try {
//       const response = await axios.post("http://localhost:5001/api/auth/signup", {
//         username,
//         email,
//         password,
//         role: 'user', //default role is user
//       });
//       console.log(response.data);
//       setMessage("Registration successful!");
//     } catch (error) {
//       console.error("Registration failed:", error.response?.data?.error || "Error occurred");
//       setMessage(error.response?.data?.error || "Registration failed.");
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
//       <Card sx={{ maxWidth: 400, width: "100%", padding: 3, boxShadow: 3 }}>
//         <CardContent>
//           <Typography variant="h4" component="h2" gutterBottom textAlign="center">
//             Sign Up
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               label="Username"
//               variant="outlined"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               margin="normal"
//               required
//             />
//             <TextField
//               fullWidth
//               label="Email"
//               type="email"
//               variant="outlined"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               margin="normal"
//               required
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               type="password"
//               variant="outlined"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               margin="normal"
//               required
//             />

//             <select name="role" value={formData.role} onChange={handleChange}>
//               <option value="user"> User </option>
//               <option value="admin">  Admin </option>
//             </select>

//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{ marginTop: 2, padding: 1 }}
//             >
//               Sign Up
//             </Button>
//           </form>
//           {message && (
//             <Typography
//               variant="body2"
//               sx={{ color: message.includes("successful") ? "green" : "red", marginTop: 2, textAlign: "center" }}
//             >
//               {message}
//             </Typography>
//           )}
//           <Box sx={{ textAlign: "center", marginTop: 2 }}>
//             <Typography variant="body2">
//               Already have an account?{" "}
//               <Link to="/login" style={{ textDecoration: "none", color: "#3f51b5" }}>
//                 Login
//               </Link>
//             </Typography>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default Registration;
