import React, { useState , useContext, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Dashboard as DashboardIcon,
  ExpandLess,
  ExpandMore,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { CategoryContext } from "./context/CategoryContext";
const Sidebar = () => {
  const navigate = useNavigate();
  const { categories } = useContext(CategoryContext);
 
  const[user,setUser] = useState({username:"User",role:"user"});
 
 
 
  const [openProducts, setOpenProducts] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
 
  const toggleProducts = () => setOpenProducts(!openProducts);
  // const toggleSidebar = () => setOpenSidebar(!openSidebar);
  const toggleOrders = () => setOpenOrders(!openOrders);
 
  const handleDashboardClick = () => {
    navigate("/dashboard");
  };
 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
 
    if(storedUser) {
      try{
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error){
        console.error("Error parsing user data:",error);
      }
    }
  },[])
 
  // const role = localStorage.getItem("role"); // 'admin' or 'user'
  // const username = localStorage.getItem("username");
 
  return (
    <>
    <Drawer
      variant="permanent"
      anchor="left"
      open={true}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          transition: "width 0.3s ease-in-out",
          boxSizing: "border-box",
          backgroundColor: "white",
          marginTop: "64px",
          color: "black",
         
        },
      }}
    >
      <div style={{ display: "flex", alignItems: "center", padding: "16px" }}>
        <Avatar sx={{ bgcolor: "#4A90E2", marginRight: "10px" }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography variant="h6">Hello, {user.username}</Typography>
      </div>
 
      <List>
        {user.role === "admin" && (
          <ListItem button onClick={handleDashboardClick}>
            <ListItemIcon>
              <DashboardIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        )}
 
        {user.role === "admin" && (
          <>
            <ListItem button onClick={toggleProducts}>
              <ListItemIcon>
                <CategoryIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="Products" />
              {openProducts ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openProducts} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  sx={{ pl: 4 }}
                  component={Link}
                  to="/products/add"
                >
                  <ListItemText primary="Search Products" />
                </ListItem>
                <ListItem
                  button
                  sx={{ pl: 4 }}
                  component={Link}
                  to="/categories"
                >
                  <ListItemText primary="Product Categories" />
                </ListItem>
                {/* <ListItem button sx={{ pl: 4 }}>
                                    <ListItemText primary="Search Products" />
                                </ListItem> */}
              </List>
            </Collapse>
          </>
        )}
 
        {user.role === "user" && (
          <ListItem button onClick={() => navigate("/user-home")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="User Dashboard" />
          </ListItem>
        )}
 
        {/* {role === "user" && (
          <>
            <ListItem button onClick={toggleProducts}>
              <ListItemIcon>
                <CategoryIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="Products" />
              {openProducts ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openProducts} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  sx={{ pl: 4 }}
                  component={Link}
                  to="/products/add"
                >
                  <ListItemText primary="Dairy Items" />
                </ListItem>
                <ListItem
                  button
                  sx={{ pl: 4 }}
                  component={Link}
                  to="/categories"
                >
                  <ListItemText primary="Veggies" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary="Chocolates" />
                </ListItem>
              </List>
            </Collapse>
          </>
        )} */}
 
        {user.role === "user" && (
          // Products Section
          <>
            <ListItem button onClick={toggleProducts}>
              <ListItemIcon>
                <CategoryIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="Categories" />
              {openProducts ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
 
            <Collapse in={openProducts} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <ListItem
                      button
                      key={category._id}
                      sx={{ pl: 4 }}
                      component={Link}
                      to={`/categories/${category._id}`}
                    >
                      <ListItemText primary={category.name} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemText primary="No Categories Available" />
                  </ListItem>
                )}
              </List>
            </Collapse>
          </>
        )}
 
        {user.role === "admin" || user.role === "user" ? (
          <ListItem button onClick={() => navigate("/orders")}>
            <ListItemIcon>
              <ShoppingCartIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Orders" />
           
          </ListItem>
        ) : null}
 
        {user.role === "admin" && (
          <>
            <ListItem button>
              <ListItemIcon>
                <InventoryIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="Supplier" />
            </ListItem>
 
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="User Activity Logs" />
            </ListItem>
          </>
        )}
 
        <ListItem button onClick={() => navigate("/myaccount")}>
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="My Account" />
        </ListItem>
 
        <ListItem button>
          <ListItemIcon>
            <LogoutIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
    </>
  );
};
 
export default Sidebar;