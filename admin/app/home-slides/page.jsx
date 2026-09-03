"use client";
import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Image from "next/image";
import { RiEdit2Line } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { deleteData, fetchDatafromApi } from "../utils/api";
import { MyContext } from "../components/context/ThemeProvider";

const columns = [
  { id: "IMAGE", label: "SLIDE IMAGE", minWidth: 200 },
  { id: "ACTIONS", label: "ACTIONS", minWidth: 100 },
];

const HomeSlides = () => {
  const [slidesData, setSlideData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const context = useContext(MyContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true);
    setErrorMsg("");
    fetchDatafromApi("/api/homeSlider")
      .then((res) => {
        setIsLoading(false);
        if (res?.success || Array.isArray(res?.slide)) {
          setSlideData(res?.slide || []);
        } else {
          setErrorMsg(res?.message || "Failed to fetch home slides");
        }
      })
      .catch(() => {
        setIsLoading(false);
        setErrorMsg("Failed to fetch home slides");
      });
  };

  const deleteSlideItem = (id) => {
    if (!window.confirm("Are you sure you want to delete this slide?")) {
      return;
    }
    deleteData(`/api/homeSlider/${id}`).then((res) => {
      if (res?.error === false || res?.success) {
        if (context?.alertBox) {
          context.alertBox("success", "Slide deleted successfully!");
        }
        getData();
      } else {
        if (context?.alertBox) {
          context.alertBox("error", res?.message || "Failed to delete slide");
        }
      }
    });
  };

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
        {isLoading ? (
          <div className="flex items-center justify-center p-10">
            <CircularProgress color="inherit" />
          </div>
        ) : errorMsg ? (
          <div className="text-center p-8 text-red-500 font-medium">
            {errorMsg}
          </div>
        ) : slidesData?.length === 0 ? (
          <div className="text-center p-8 text-gray-500 font-medium">
            No home slides found. Click "Add Home Slide" to create one.
          </div>
        ) : (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {slidesData.map((slide) => (
                  <TableRow key={slide._id}>
                    <TableCell className="px-0!">
                      <div className="flex items-center gap-3">
                        <div className="img rounded-md bg-white relative w-[250px] h-[90px] overflow-hidden">
                          <Image
                            src={slide?.images?.[0] || "/banner01.jpg"}
                            alt="Slide image"
                            fill
                            unoptimized
                            className="object-cover hover:scale-105 transition-all"
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Link href={`/home-slides/${slide?._id}`}>
                          <Button className="w-[40px]! h-[40px]! min-w-[40px]! rounded-full! text-gray-900!">
                            <RiEdit2Line size={20} />
                          </Button>
                        </Link>
                        <Button
                          className="w-[40px]! h-[40px]! min-w-[40px]! rounded-full! text-red-600!"
                          onClick={() => deleteSlideItem(slide?._id)}
                        >
                          <FaRegTrashAlt size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default HomeSlides;
