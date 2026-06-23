"use client";
import React, { useState, useEffect, useContext } from "react";
import { Button, MenuItem, Select, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Checkbox } from "@mui/material";
import Search from "../Search";
import { RiEdit2Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineDateRange, MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { fetchDatafromApi, deleteData } from "../../utils/api";
import { MyContext } from "../context/ThemeProvider";

const columns = [
  { id: "USER", label: "USER", minWidth: 250 },
  { id: "EMAIL", label: "EMAIL", minWidth: 200 },
  { id: "PHONE NUMBER", label: "PHONE NUMBER", minWidth: 150 },
  { id: "ROLE", label: "ROLE", minWidth: 100 },
  { id: "CREATED AT", label: "CREATED AT", minWidth: 120 },
  { id: "ACTIONS", label: "ACTIONS", minWidth: 150 },
];

const UsersComponent = () => {
  const context = useContext(MyContext);
  const [usersList, setUsersList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [page, rowsPerPage, searchQuery]);

  const getUsers = () => {
    fetchDatafromApi(`/api/user/all?page=${page + 1}&limit=${rowsPerPage}&search=${searchQuery}`).then((res) => {
      if (res && res.users) {
        setUsersList(res.users);
        setTotalUsers(res.total || 0);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const deleteUserItem = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteData(`/api/user/${id}`).then((res) => {
        if (res?.error === false) {
          context.alertBox("success", "User deleted successfully");
          getUsers();
        } else {
          context.alertBox("error", res?.message || "Failed to delete user");
        }
      });
    }
  };

  const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

  return (
    <section className="w-full py-2">
      <div className="w-full p-4 rounded-md shadow-md bg-white mt-3">
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <div className="col">
            <h2 className="text-[18px] text-gray-700 font-[600]">Users</h2>
          </div>
          <div className="col">
            <Search 
              width="400px" 
              placeholder="Search users...." 
              onChange={handleSearchChange} 
              value={searchQuery}
            />
          </div>
        </div>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 50 }}></TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: 600 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList && usersList.length !== 0 ? (
                usersList.map((user, index) => {
                  const userDate = user.createdAt 
                    ? new Date(user.createdAt).toISOString().split('T')[0]
                    : "N/A";
                  
                  return (
                    <TableRow key={user._id || index} hover>
                      <TableCell>
                        <Checkbox {...label} size="small" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="img rounded-full w-[45px] h-[45px] overflow-hidden border border-gray-200 flex-shrink-0 flex items-center justify-center bg-gray-50">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold bg-gray-100 text-sm">
                                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                              </div>
                            )}
                          </div>
                          <div className="info">
                            <h3 className="text-[14px] text-gray-800 font-[600]">
                              {user.name}
                            </h3>
                            <span className="text-gray-500 text-[12px]">{user.role || "USER"}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-700 text-[13px] flex items-center gap-1">
                          <MdOutlineMail size={16} className="text-gray-400" /> {user.email}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-700 text-[13px] flex items-center gap-1">
                          <MdOutlinePhone size={16} className="text-gray-400" /> {user.mobile || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-[11px] font-bold ${
                          user.role === "ADMIN" 
                            ? "bg-purple-100 text-purple-700" 
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {user.role || "USER"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-700 text-[13px] flex items-center gap-1">
                          <MdOutlineDateRange size={16} className="text-gray-400" /> {userDate}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button className="w-[40px]! h-[40px]! min-w-[40px]! rounded-full! text-gray-900!">
                            <IoEyeOutline size={20} className="" />
                          </Button>
                          <Button
                            className="w-[40px]! h-[40px]! min-w-[40px]! rounded-full! text-gray-900!"
                            onClick={() => deleteUserItem(user._id)}
                            disabled={user.role === "ADMIN"} // Prevent deleting admins accidentally
                          >
                            <FaRegTrashAlt size={16} className="" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" className="text-gray-500 py-8">
                    No Users Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </section>
  );
};

export default UsersComponent;
