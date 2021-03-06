import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { Delete, Edit } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useCourse } from "../../../context/courseContext";
import axios from "axios";
import Swal from "sweetalert2";

const CourseListResult = ({ courses }) => {
  const router = useRouter();

  const { getCourseForUpdate } = useCourse();

  const deleteCourse = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will delete this course",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#003566",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(
            `https://qnnijeqn9g.execute-api.sa-east-1.amazonaws.com/api/course/${id}`
          )
          .then((res) => {
            if (res) {
              Swal.fire("Deleted!", "Course has been deleted.", "success");
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      }
    });
  };

  const columns = [
    { field: "cursoId", headerName: "ID", hide: true },
    {
      field: "nombre",
      headerName: "Course name",
      width: 300,
    },
    {
      field: "nombreLibro",
      headerName: "Book",
      width: 150,
    },
    {
      field: "nivel",
      headerName: "Level",
      width: 150,
    },
    {
      field: "fecha",
      headerName: "Creation date",
      width: 150,
    },
    {
      field: "options",
      headerName: "Actions",
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton
              aria-label="update"
              onClick={() => {
                getCourseForUpdate(row);
                router.push(`/admin/courses/edit/${row.cursoId}`);
              }}
            >
              <Edit color="primary" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => {
                deleteCourse(row.cursoId);
              }}
            >
              <Delete color="error" />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  const handleCellClick = (param, event) => {
    param.field === "options" && event.stopPropagation();
  };
  return (
    <DataGrid
      pageSize={10}
      columns={columns}
      rows={courses}
      getRowId={(rowData) => rowData.cursoId}
      sx={{ backgroundColor: "#FFFFFF" }}
      rowsPerPageOptions={[10]}
      disableSelectionOnClick
      onRowClick={({ row }) => {
        getCourseForUpdate(row);
        router.push(`/admin/courses/detail/${row.cursoId}`);
      }}
      onCellClick={handleCellClick}
      componentsProps={{
        row: {
          style: {
            cursor: "pointer",
            border: "1px solid #EEEEEE",
            height: "20px",
          },
        },
      }}
    />
  );
};

export default CourseListResult;
