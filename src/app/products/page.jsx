"use client";
import Sidebar from "@/components/Sidebar";
import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProductItem from "@/components/ProductItem";
import Pagination from "@mui/material/Pagination";
import { getProducts } from "@/utils/api";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("A To Z");
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const open = Boolean(anchorEl);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const res = await getProducts({ page: 1, limit: 40 });
      if (res?.success) {
        setProducts(res.products || []);
      }
      setLoading(false);
    };
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((item) =>
        (item?.category || "")
          .toLowerCase()
          .includes(selectedCategory.toLowerCase()),
      );
    }

    result = result.filter((item) => {
      const price = Number(item?.price || 0);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (sortBy === "Z To A") {
      result.sort((a, b) => (b?.name || "").localeCompare(a?.name || ""));
    } else if (sortBy === "Price Low To High") {
      result.sort((a, b) => Number(a?.price || 0) - Number(b?.price || 0));
    } else if (sortBy === "Price High To Low") {
      result.sort((a, b) => Number(b?.price || 0) - Number(a?.price || 0));
    } else {
      result.sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));
    }

    return result;
  }, [products, selectedCategory, priceRange, sortBy]);

  return (
    <div className="py-5 bg-white">
      <div className="container flex gap-4 flex-wrap">
        <div className="sidebarWrapper w-full lg:w-[18%]">
          <Sidebar
            onCategoryChange={setSelectedCategory}
            onPriceChange={setPriceRange}
          />
        </div>
        <div className="rightContent w-full lg:w-[82%] lg:pl-5">
          <div className="top-strip w-full bg-[#f1f1f1] p-2 rounded-md min-h-12 flex items-center justify-between px-4 flex-wrap gap-2">
            <span className="text-[15px] text-gray-700 font-medium">
              There are {filteredProducts.length} Products
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[15px] text-gray-700 font-medium">
                Sort By
              </span>
              <div className="relative">
                <Button
                  className="bg-white! capitalize! text-gray-900! py-1! px-0.75!"
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                  {sortBy}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  slotProps={{ list: { "aria-labelledby": "basic-button" } }}
                >
                  <MenuItem
                    onClick={() => {
                      setSortBy("Z To A");
                      setAnchorEl(null);
                    }}
                  >
                    Z To A
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSortBy("A To Z");
                      setAnchorEl(null);
                    }}
                  >
                    A To Z
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSortBy("Price Low To High");
                      setAnchorEl(null);
                    }}
                  >
                    Price Low To High
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSortBy("Price High To Low");
                      setAnchorEl(null);
                    }}
                  >
                    Price High To Low
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="py-10 text-gray-500">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-5">
              {filteredProducts.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          )}
          <div className="flex items-center justify-center mt-5">
            <Pagination
              count={Math.max(1, Math.ceil(filteredProducts.length / 8))}
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
