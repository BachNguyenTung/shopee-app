import React, { useContext } from "react";
import ProductContainer from "../components/ProductContainer";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
import { ProductContext } from "../context";
export default function Product() {
  const context = useContext(ProductContext);
  const {
    searchInput,
    filterProductBySearch,
    searchHistory,
    addToSearchHistory,
  } = context;
  return (
    <>
      <Header
        headerSearch={
          <HeaderSearch
            searchInput={searchInput}
            filterProductBySearch={filterProductBySearch}
            searchHistory={searchHistory}
            addToSearchHistory={addToSearchHistory}
          ></HeaderSearch>
        }
      ></Header>
      <ProductContainer></ProductContainer>
    </>
  );
}
