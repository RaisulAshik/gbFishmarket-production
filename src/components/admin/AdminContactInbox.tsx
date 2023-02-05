import { useState, useEffect } from "react";
import { allContactData } from "../../api/apiContactUs";
import { userInfo } from "../../utils/auth";
import { Container, Box, Typography, Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

type IContactData = {
  id: number;
  name: string;
  email: string;
  message: string;
  phone: string;
  created_at: string;
  updated_at: string;
};

interface Cloumn {
  id: "name" | "email" | "message" | "phone" | "time";
  label: string;
  minWidth?: number | string;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Cloumn[] = [
  { id: "name", label: "Name", minWidth: "15%" },
  { id: "email", label: "Email", minWidth: "15%" },
  { id: "message", label: "Message", minWidth: "40%" },
  { id: "phone", label: "Phone", minWidth: "15%" },
  { id: "time", label: "Time", minWidth: "15%" },
];
const AdminContactInbox = () => {
  const [contactData, setContactData] = useState<IContactData[]>([]);
  const token: string = userInfo().token;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // const createData =(name: string, email: string, phone:string, created_at: string )=>{

  // }
  useEffect(() => {
    allContactData(token)
      .then((res) => {
        console.log(res.data);
        setContactData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setContactData([]);
    };
  }, []);

  // TODO Implement MUI Table.
  return (
    <Container maxWidth="lg">
      <Box my={4} className="p-4 ">
        <Typography variant="h4" component="h1" gutterBottom>
          Contacts
        </Typography>
        <Divider />
        {contactData.length > 0 ? (
          <Box className="p-4">
            <TableContainer
              sx={{
                maxHeight: 600,
                width: "100%",
                // height: 600,
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contactData.map((item) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={item.id}
                        onClick={() => console.log("clicked")}
                      >
                        <TableCell
                          component="th"
                          align="left"
                          scope="row"
                          sx={{ width: "15%" }}
                        >
                          {item.name}
                        </TableCell>
                        <TableCell align="left" sx={{ width: "15%" }}>
                          {item.email}
                        </TableCell>
                        <TableCell align="left" sx={{ width: "40%" }}>
                          {item.message}
                        </TableCell>
                        <TableCell align="left" sx={{ width: "15%" }}>
                          {item.phone}
                        </TableCell>
                        <TableCell align="left" sx={{ width: "15%" }}>
                          {item.created_at}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={contactData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>

            {/* ) : 
          )} */}
          </Box>
        ) : (
          <Paper>
            <Typography
              variant="body1"
              component="p"
              className="flex flex-row items-center justify-center"
            >
              No messages yet.
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default AdminContactInbox;
