"use client";
import React, { useState, useEffect, useContext } from "react";
import { Button, MenuItem, Select, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Checkbox, Rating } from "@mui/material";
import Search from "../Search";
import { RiEdit2Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { fetchDatafromApi, deleteData } from "../../utils/api";
import { MyContext } from "../context/ThemeProvider";

const columns = [
  { id: "PRODUCT", label: "PRODUCT", minWidth: 300 },
  { id: "CATEGROY", label: "CATEGROY", minWidth: 120 },
  { id: "PRICE", label: "PRICE", minWidth: 100 },
  { id: "STOCK", label: "STOCK", minWidth: 100 },
  { id: "RATING", label: "RATING", minWidth: 120 },
  { id: "ACTIONS", label: "ACTIONS", minWidth: 180 },
];

const ProductComponent = () => {
  const context = useContext(MyContext);
  const [productsList, setProductsList] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryVal, setCategoryVal] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getCategoryData();
  }, []);

  useEffect(() => {
    getProducts();
  }, [page, rowsPerPage, categoryVal, searchQuery]);

  const getCategoryData = () => {
    fetchDatafromApi("/api/categroy").then((res) => {
      if (res?.categories) {
        setCategoryData(res.categories);
      }
    });
  };

  const getProducts = () => {
    let url = `/api/product/getAllProducts?page=${page + 1}&limit=${rowsPerPage}`;
    if (categoryVal) {
      url += `&catId=${categoryVal}`;
    }
    
    fetchDatafromApi(url).then((res) => {
      if (res && res.products) {
        // If search query is present, do a client-side search or query search
        // Since we have a search endpoint or local search, let's filter if query is set
        let filtered = res.products;
        if (searchQuery.trim() !== "") {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (p) =>
              p.name?.toLowerCase().includes(query) ||
              p.brand?.toLowerCase().includes(query) ||
              p.catName?.toLowerCase().includes(query)
          );
        }
        setProductsList(filtered);
        setTotalProducts(res.totalCount || res.total || 0);
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

  const handleChangeCategory = (event) => {
    setCategoryVal(event.target.value);
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const deleteProductItem = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteData(`/api/product/${id}`).then((res) => {
        if (res?.error === false) {
          context.alertBox("success", "Product deleted successfully");
          getProducts();
        } else {
          context.alertBox("error", res?.message || "Failed to delete product");
        }
      });
    }
  };

  const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] text-gray-700 font-[600]">Products</h2>
        <Link href="/products-list/add-product">
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
            Add Products
          </Button>
        </Link>
      </div>
      <div className="w-full p-4 rounded-md shadow-md bg-white mt-3">
        <div className="flex items-center justify-between mb-3 gap-4 flex-wrap">
          <div className="col w-[200px]">
            <h6 className="text-[14px] mb-1 text-gray-700 font-[500]">Category By</h6>
            <Select
              value={categoryVal}
              onChange={handleChangeCategory}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
              className="w-full"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categoryData?.map((cat, index) => (
                <MenuItem key={cat._id || index} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="col">
            <Search 
              width="400px" 
              placeholder="Search products...." 
              onChange={handleSearchChange} 
              value={searchQuery}
            />
          </div>
        </div>
        <TableContainer sx={{ maxHeight: 600 }}>
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
              {productsList && productsList.length !== 0 ? (
                productsList.map((product, index) => {
                  return (
                    <TableRow key={product._id || index} hover>
                      <TableCell>
                        <Checkbox {...label} size="small" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="img p-1 rounded-md bg-white border border-gray-100 flex items-center justify-center w-[50px] h-[60px] overflow-hidden flex-shrink-0">
                            {product.images && product.images[0] ? (
                              <img
                                src={product.images[0]}
                                alt="product image"
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <span className="text-[10px] text-gray-400">No Image</span>
                            )}
                          </div>
                          <div className="info">
                            <h3 className="text-[13px] text-gray-800 font-[600] line-clamp-2 w-[220px]">
                              {product.name}
                            </h3>
                            <span className="text-gray-500 text-[12px]">{product.brand}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.catName || "N/A"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-red-600 text-[14px] font-[600]">
                            ${product.price}
                          </span>
                          {product.oldPrice && (
                            <span className="text-gray-400 text-[12px] font-[500] line-through">
                              ${product.oldPrice}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`font-bold! ${product.stock > 0 ? "text-emerald-600!" : "text-red-600!"}`}>
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Rating name="read-only" value={product.rating || 0} readOnly size="small" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Link href={`/products-list/${product._id}`}>
                            <Button className="w-[40px]! h-[40px]! min-w-[40px]! rounded-full! text-gray-900!">
                              <RiEdit2Line size={20} className="" />
                            </Button>
                          </Link>
                          <Button className="w-[40px]! h-[40px]! min-w-[40px]! rounded-full! text-gray-900!">
                            <IoEyeOutline size={20} className="" />
                          </Button>
                          <Button
                            className="w-[40px]! h-[40px]! min-w-[40px]! rounded-full! text-gray-900!"
                            onClick={() => deleteProductItem(product._id)}
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
                    No Products Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalProducts}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default ProductComponent;
