import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { IAnnouncement } from "../../AdminAnnouncement";
import { useNavigate } from "react-router-dom";
import AnnouncementCard from "../../components/AnnouncementCard";
import {
  deleteAnnouncementsById,
  getAnnouncements,
} from "../../../../api/apiAdminDashboard";
import { userInfo } from "../../../../utils/auth";
import { CircularProgress } from "@mui/material";

const AllAnncouncements = () => {
  const navigation = useNavigate();
  const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [reload, setReload] = useState({});
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handeleDeleteAnnouncement = (id: number) => {
    const token: string = userInfo().token;
    deleteAnnouncementsById(id, token)
      .then((res) => res.data)
      .then((data) => {
        setSuccess("Announcement deleted successfully");
        setReload({});
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      })
      .catch((err) => {
        console.log("handledelete", err); // genarate error to see what happens
        setError("failed to delete");
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  useEffect(() => {
    getAnnouncements()
      .then((res) => res.data)
      .then((data) => {
        setAnnouncements(data.announcements);
        setLoadingData(false);
      })
      .catch((err) => {
        setLoadingData(false);
        console.log(err);
      });
    return () => {
      setLoadingData(false);
      setAnnouncements([]);
    };
  }, [reload]);

  return (
    <Container>
      <div className="bg-slate-50">
        <Snackbar open={!!success} autoHideDuration={6000}>
          <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
            {success}
          </Alert>
        </Snackbar>
        <Snackbar open={!!error} autoHideDuration={6000}>
          <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
        <div className="flex flex-col items-start justify-between w-full p-4 my-4 h-36 ">
          <Typography variant="h5">Create a new announcement Card </Typography>
          <button
            className="w-48 btn btn-outline-primary ring-transparent"
            onClick={() => navigation("/admin/announcement/add-announcement")}
          >
            Create
          </button>
        </div>
      </div>
      <Divider />
      <div className="w-full mt-4">
        {announcements.length === 0 && <div>No announcements</div>}
        {!loadingData ? (
          <Grid container spacing={2}>
            {announcements.map((item) => (
              <AnnouncementCard
                key={item.id}
                item={item}
                deleteAnnouncement={(id: number) =>
                  handeleDeleteAnnouncement(id)
                }
              />
            ))}
          </Grid>
        ) : (
          <div className="flex flex-col items-center justify-center w-full py-8">
            <CircularProgress />
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllAnncouncements;
