import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import GroupsIcon from "@mui/icons-material/Groups";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "../../utils/auth";
const DrawerLists = () => {
  const navigate = useNavigate();
  return (
    <List>
      <ListItemButton
        onClick={() => {
          navigate("/admin");
        }}
      >
        <ListItemIcon>
          <DashboardCustomizeIcon
            sx={{
              color: "blue",
            }}
          />
        </ListItemIcon>
        <ListItemText primary={"Generals"} />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/admin/inbox");
        }}
      >
        <ListItemIcon>
          <InboxIcon
            sx={{
              color: "blue",
            }}
          />
        </ListItemIcon>
        <ListItemText primary={"Inbox"} />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/admin/products");
        }}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary={"Products"} />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/admin/announcement");
        }}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary={"Announcements"} />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/admin/company");
        }}
      >
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary={"Company"} />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/admin/clients");
        }}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={"Clients"} />
      </ListItemButton>
      <Divider />
      <ListItemButton
        onClick={() => {
          signOut(() => {
            navigate("/");
          });
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={"Logout"} />
      </ListItemButton>
    </List>
  );
};

export default DrawerLists;
