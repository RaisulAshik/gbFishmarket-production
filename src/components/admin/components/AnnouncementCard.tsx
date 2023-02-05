import  { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { IAnnouncement } from "../AdminAnnouncement";
import { useNavigate } from "react-router-dom";
interface IAnnCardProp {
  item: IAnnouncement;
  deleteAnnouncement(id: number): void;
}

const AnnouncementCard = ({ item, deleteAnnouncement }: IAnnCardProp) => {
  const navigation = useNavigate();
  const [announcements] = useState<IAnnouncement>(item);

  // const handleFeatured = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   console.log("from announcement Card");
  //   setLoading(true);
  //   const token: string = userInfo().token;
  //   const getFormData = (object: IAnnouncement): FormData =>
  //     Object.keys(object).reduce((formData, key) => {
  //       formData.append(key, object[key as keyof object]);
  //       return formData;
  //     }, new FormData());
  //   updateAnnouncementsById(
  //     announcements.id,
  //     getFormData({ ...announcements, show_on_home: e.target.checked }),
  //     token
  //   )
  //     .then((res) => res.data)
  //     .then((data) => {
  //       setAnnouncements(data.result);
  //       setLoading(false);
  //       setSuccess(
  //         `${announcements.title} is ${
  //           !announcements.show_on_home ? "now featured" : "no longer featured"
  //         }`
  //       );
  //       setTimeout(() => {
  //         setSuccess("");
  //       }, 2500);
  //     })
  //     .catch((err) => {
  //       setError("failed to update");
  //       setTimeout(() => {
  //         setError("");
  //       }, 2500);
  //     });
  // };
  return (
    <>
      {/* <Snackbar open={!!success} autoHideDuration={6000}>
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000}>
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar> */}
      <Grid key={announcements.id} item xs={12} md={6} lg={4}>
        <Paper>
          <div className="card">
            <div className="card-header">{announcements.title}</div>
            <div className="card-body">
              <img
                src={`${announcements.image_link}`}
                alt=""
                className="w-full h-48"
              />
              {announcements.short_description}
            </div>
            <div className="items-center justify-around card-footer">
              <button
                className="btn btn-link btn-sm"
                onClick={() => {
                  navigation(`details/${announcements.id}`, {
                    state: announcements,
                  });
                }}
              >
                View details
              </button>
              <button
                className="btn btn-light-primary btn-sm"
                onClick={() => {
                  navigation(`edit/${announcements.id}`);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-link btn-outline-danger btn-sm"
                onClick={() => {
                  deleteAnnouncement(announcements.id);
                }}
              >
                Delete
              </button>
              {/* <label className="flex flex-row items-center justify-between">
                <span className="ml-2 mr-2">Featured</span>
                {loading ? (
                  <div className="space-x-1">
                    <div className="spinner text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <input
                    type="checkbox"
                    checked={announcements.show_on_home}
                    className="border-indigo-500 form-checkbox "
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleFeatured(e);
                    }}
                  />
                )}
              </label> */}
            </div>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default AnnouncementCard;
