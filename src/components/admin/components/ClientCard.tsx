import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { IClient } from "../nestedComponents/Clients/AllClients";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../../../api/apiAdminProducts";

interface IProps {
  item: IClient;
  deleteClient(id: number): void;
}

const ClientCard = ({ item, deleteClient }: IProps) => {
  const navigation = useNavigate();
  const [client, setClient] = useState<IClient>(item);
  // const [loading, setLoading] = useState<boolean>(false);
  return (
    <Grid key={client.id} item xs={12} md={6} lg={4}>
      <Paper>
        <div className="card">
          <div className="card-header">{client.name}</div>
          <div className="card-body">
            <img
              src={`${client.logo_image_link}`}
              alt=""
              className="w-full h-48"
            />
            {client.company_name}
          </div>
          <div className="items-center justify-around card-footer">
            <button
              className="btn btn-link btn-sm"
              onClick={() => {
                navigation(`details/${client.id}`);
              }}
            >
              View details
            </button>
            <button
              className="btn btn-light-primary btn-sm"
              onClick={() => {
                navigation(`edit/${client.id}`);
              }}
            >
              Edit
            </button>
            {/* <button
              className="btn btn-link btn-outline-danger btn-sm"
              onClick={() => {
                deleteClient(client.id);
              }}
            >
              Delete
            </button> */}
            {/* <label className="flex flex-row items-center justify-between">
                  <span className="ml-2 mr-2">Featured</span>
                  <input
                    type="checkbox"
                    checked={product.show_on_home}
                    className="border-indigo-500 form-checkbox "
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      console.log(item.id, e.target.checked);
                    //   setProduct({ ...product, show_on_home: e.target.checked });
                    //   // console.log(product);
                    //   handleFeatured(e);
                    }}
                  />
                </label> */}
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default ClientCard;
