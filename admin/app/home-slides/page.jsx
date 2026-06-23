"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";

import Image from "next/image";

import { RiEdit2Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { deleteData, fetchDatafromApi } from "../utils/api";
const columns = [
  { id: "IMAGE", label: "IMAGE", minWidth: 40 },

  { id: "ACTIONS", label: "ACTIONS", minWidth: 200 },
];
const HomeSlides = () => {
  const [slidesData, setSlideData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    fetchDatafromApi("/api/homeSlider").then((res) => {
      console.log(res);
      setSlideData(res?.slide);
    });
  };

  const deleteSlide = (id) => {
    deleteData(`/api/homeSlider/${id}`).then((res) => {
      if (res?.error === false) {
        getData();
      }
    });
  };

  const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };
  return (
    <div className="w-full py-3 px-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] text-gray-700 font-[600]">Home Slides</h2>
        <Link href={"/home-slides/add-home-slide"}>
          <Button
            size="small"
            sx={{
              border: "1px solid #02b290",
              fontWeight: 600,
              color: "#fff",
              background: "#02b290",
              padding: "8px 15px",
              "&:hover": {
                background: "#02b290",
              },
            }}
          >
            Add Home Slide
          </Button>
        </Link>
      </div>
      <div className="w-full p-4 rounded-md shadow-md bg-white mt-3">
        <TableContainer sx={{ maxHeight: 440 }}>
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
              {slidesData?.length !== 0 &&
                slidesData?.map((slide, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="px-0!">
                        <div className="flex items-center gap-3">
                          <div className="img  rounded-md bg-white">
                            <Image
                              src={slide?.images[0]}
                              alt="product image"
                              width={300}
                              height={90}
                              className="object-cover hover:scale-105 transition-all"
                            />
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/home-slides/edit-slide?slide=${slide?._id}`}
                          >
                            <Button className="w-[40px]! h-[40px]! min-w-[40px]! rounded-full! text-gray-900!">
                              <RiEdit2Line size={20} className="" />
                            </Button>
                          </Link>
                          <Button className="w-[40px]! h-[40px]! min-w-[40px]! rounded-full! text-gray-900!">
                            <IoEyeOutline size={20} className="" />
                          </Button>
                          <Button
                            className="w-[40px]! h-[40px]! min-w-[40px]! rounded-full! text-gray-900!"
                            onClick={() => deleteSlide(slide?._id)}
                          >
                            <FaRegTrashAlt size={16} className="" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </div>
    </div>
  );
};

export default HomeSlides;
