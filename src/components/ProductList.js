import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context";
import ProductItem from "./ProductItem";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

export default function ProductList({
  isProductPage,
  similarDisPlay,
  isSearchPage,
}) {
  // const _isMounted = useRef(true);
  const context = useContext(ProductContext);
  let {
    user,
    items,
    orderItems,
    getData,
    type,
    bestSelling,
    setCategoryProduct,
    setSortedProducts,
    setPageIndex,
    setPageTotal,
    searchInput,
    getCartItemsFromStorage,
    calcPageTotals,
    setCartNumb,
    getCheckoutItemsFromStorage,
    setCheckoutProduct,
    calcCartNumb,
    sortedItems,
    similarItems,
    cartItems,
    pageIndex,
    pageSize,
    handleClick,
    setDefaultState,
    getDataFireBase,
    setSearchInput,
    sortedSearchItems,
    searchItems,
    setSortedSearchItems,
    pageTotalCalc,
    setPageSize,
  } = context;
  useEffect(() => {
    if (items.length <= 0) {
      getDataFireBase();
    }
    // if (user) {
    //   db.collection("products").doc(user?.uid).set({
    //     user: user.displayName,
    //     email: user.email,
    //     uid: user.uid,
    //     items: items,
    //   });
    // }
  }, [getDataFireBase, items, orderItems, user]);

  //set default some states
  useEffect(() => {
    setDefaultState();
  }, [setDefaultState]);

  //set default remain state by above state
  useEffect(() => {
    if (isProductPage) {
      // set default only when not searching
      const categoryItems = items.filter((item) => item.type !== type);
      const sortedItems = [...categoryItems];

      // not necessary cause default value is declare
      const pageIndex = 1;
      const pageSize = 10;
      const pageTotal = pageTotalCalc(sortedItems, pageSize);
      //get and set checkoutItems state
      const checkoutItems = getCheckoutItemsFromStorage();
      setCategoryProduct(categoryItems);
      setSortedProducts(sortedItems);
      setPageIndex(pageIndex);
      setPageTotal(pageTotal);
      setCheckoutProduct(checkoutItems);
    } else if (isSearchPage) {
      const searchPageIndex = 1;
      const searchPageSize = 10;
      const searchPageTotal = pageTotalCalc(sortedSearchItems, searchPageSize);
      setPageIndex(searchPageIndex);
      setPageSize(searchPageSize);
      setPageTotal(searchPageTotal);
    } else if (similarDisPlay) {
      const similarPageIndex = 1;
      const similarPageSize = 6;
      const similarPageTotal = pageTotalCalc(similarItems, similarPageSize);
      setPageIndex(similarPageIndex);
      setPageSize(similarPageSize);
      setPageTotal(similarPageTotal);
    }
  }, [
    getCheckoutItemsFromStorage,
    isProductPage,
    isSearchPage,
    items,
    pageTotalCalc,
    setCategoryProduct,
    setCheckoutProduct,
    setPageIndex,
    setPageSize,
    setPageTotal,
    setSortedProducts,
    similarDisPlay,
    similarItems,
    sortedSearchItems,
    type,
  ]);

  let renderItem = [];
  if (isSearchPage) {
    renderItem = sortedSearchItems.slice(
      (pageIndex - 1) * pageSize,
      pageIndex * pageSize
    );
  } else if (similarDisPlay) {
    renderItem = similarItems.slice(
      (pageIndex - 1) * pageSize,
      pageIndex * pageSize
    );
  } else {
    renderItem = sortedItems.slice(
      (pageIndex - 1) * pageSize,
      pageIndex * pageSize
    );
  }
  useEffect(() => {
    setSortedSearchItems(searchItems);
  }, [searchItems, setSortedSearchItems]);
  if (renderItem.length === 0 && isSearchPage) {
    return <div className="app__no-product">Không tìm thấy kết quả nào</div>;
  } else
    return renderItem.map((item, index) => (
      <ProductItem
        key={item.id}
        cartItems={cartItems}
        similarDisPlay={similarDisPlay}
        item={item}
        handleClick={handleClick}
        user={user}
      ></ProductItem>
    ));
}
