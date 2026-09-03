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
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { deleteData, fetchDatafromApi } from "../utils/api";
import { MyContext } from "../components/context/ThemeProvider";

const columns = [
  { id: "IMAGE", label: "IMAGE", minWidth: 200 },
  { id: "TITLE", label: "TITLE", minWidth: 150 },
  { id: "ACTIONS", label: "ACTIONS", minWidth: 100 },
];

const Banners = () => {
  const [bannersData, setBannersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const context = useContext(MyContext);

  useEffect(() => {
    getBannersData();
  }, []);

  const getBannersData = () => {
    setIsLoading(true);
    setErrorMsg("");
    fetchDatafromApi("/api/banner/all")
      .then((res) => {
        setIsLoading(false);
        if (res?.success || Array.isArray(res?.banners)) {
          setBannersData(res?.banners || []);
        } else {
          setErrorMsg(res?.message || "Failed to fetch banners");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMsg("Failed to fetch banners");
      });
  };

  const deleteBannerItem = (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) {
      return;
    }
    deleteData(`/api/banner/${id}`)
      .then((res) => {
        if (res?.success || res?.error === false) {
          if (context?.alertBox) {
            context.alertBox("success", "Banner deleted successfully!");
          }
          getBannersData();
        } else {
          if (context?.alertBox) {
            context.alertBox("error", res?.message || "Failed to delete banner");
          }
        }
      })
      .catch((err) => {
        if (context?.alertBox) {
          context.alertBox("error", "Error deleting banner");
        }
      });
  };

  return (
    <div className="w-full py-3 px-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] text-gray-700 font-[600]">Banners List</h2>
        <Link href={"/banners/add-banner"}>
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
            Add New Banner
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
        ) : bannersData?.length === 0 ? (
          <div className="text-center p-8 text-gray-500 font-medium">
            No banners found. Click "Add New Banner" to create one.
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
                {bannersData.map((banner) => (
                  <TableRow key={banner._id}>
                    <TableCell className="px-0!">
                      <div className="flex items-center gap-3">
                        <div className="img rounded-md bg-white relative w-[250px] h-[90px] overflow-hidden">
                          <Image
                            src={banner.imageUrl || "/banner01.jpg"}
                            alt={banner.title || "Banner"}
                            fill
                            unoptimized
                            className="object-cover hover:scale-105 transition-all"
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-gray-800 font-medium">
                        {banner.title}
                      </div>
                      {banner.link && (
                        <div className="text-xs text-gray-400">
                          Link: {banner.link}
                        </div>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          className="w-[40px]! h-[40px]! min-w-[40px]! rounded-full! text-red-600!"
                          onClick={() => deleteBannerItem(banner._id)}
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

export default Banners;
