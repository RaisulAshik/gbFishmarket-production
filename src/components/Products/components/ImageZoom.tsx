import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
} from "@mui/material";
import React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  // p: 4,
};

interface ModalProps {
  record: string | null | undefined;
  imageShow: boolean;
  imageClose: any;
}

const ImageZoom: React.FC<ModalProps> = (props) => {
  const { imageShow, imageClose, record } = props;
  return (
    <>
      <Modal
        open={imageShow}
        onClose={imageClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card>
            <CardActions style={{ justifyContent: "end" }}>
              <Button onClick={imageClose}>X</Button>
            </CardActions>
            <CardContent>
              <Card>
                <CardMedia
                  component="img"
                  image={`${record}`}
                  alt="green iguana"
                  sx={{
                    width: "100%",
                    height: "50vh",
                  }}
                />
              </Card>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  );
};
export default ImageZoom;
