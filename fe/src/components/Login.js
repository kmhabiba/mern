//login with MUL layou
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login({ setToken, setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
            const { token, username } = response.data;

            localStorage.setItem('token', token);

            setToken(token);
            setUser(username);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Card sx={{ maxWidth: 400, width: '100%', padding: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" component="h2" gutterBottom textAlign="center">
                        Login
                    </Typography>
                    {error && (
                        <Typography color="error" variant="body2" textAlign="center" sx={{ marginBottom: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2, padding: 1 }}>
                            Login
                        </Button>
                    </form>
                    <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                        <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#3f51b5' }}>
                            Forgot Password?
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Login;


// //working login without MUL
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import './Dashboard';

// function Login({ setToken, setUser }) {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
//             const { token, username } = response.data;

//             localStorage.setItem('token', token);

//             setToken(token);
//             setUser(username);
//             navigate('/dashboard');
//         } catch (err) {
//             setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
//         }
//     };

//     return (
//         <div className="auth-container">
//             <h2>Login</h2>
//             {error && <p className="auth-error">{error}</p>}
//             <form onSubmit={handleSubmit} className="auth-form">
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="auth-input"
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="auth-input"
//                     required
//                 />
//                 <button type="submit" className="auth-button">Login</button>
//             </form>
//             <div className="auth-links">
//                 <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
//             </div>
//         </div>
//     );
// }

// export default Login;