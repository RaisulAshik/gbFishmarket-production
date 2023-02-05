import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";
import { IBanner } from "./data";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  // p: 4,
};

interface ModalProps {
  record: IBanner | null | undefined;
  bannerShow: boolean;
  bannerClose: any;
}

const BannerDetailsModal: React.FC<ModalProps> = (props) => {
  const { bannerShow, bannerClose, record } = props;
  const [bannerDetails, setBannerDetails] = React.useState<IBanner>();

  React.useEffect(() => {
    if (record) {
      setBannerDetails(record);
    }
  }, [record]);

  return (
    <Modal
      open={bannerShow}
      onClose={bannerClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Card>
          <CardActions style={{ justifyContent: "end" }}>
            <Button onClick={bannerClose}>X</Button>
          </CardActions>
          <CardContent>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ pl: 2 }}
            >
              Banner Details
            </Typography>
            <Card>
              <CardMedia
                component="img"
                image={`${bannerDetails?.file_link}`}
                alt="green iguana"
                sx={{
                  width: "100%",
                  height: "50vh",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {bannerDetails?.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {bannerDetails?.description}
                </Typography>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default BannerDetailsModal;
