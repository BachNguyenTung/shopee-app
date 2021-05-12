import React, { Component } from "react";
import { ProductContext } from "../context";
import ProductItem from "./ProductItem";
export default class ProductList extends Component {
  static contextType = ProductContext;

  componentWillUnmount = () => {
    const { setDefaultState } = this.context;
    setDefaultState();
  };

  render() {
    let {
      sortedItems,
      similarItems,
      cartItems,
      pageIndex,
      pageSize,
      similarPageIndex,
      similarPageSize,
      handleClick,
    } = this.context;

    if (this.props.similarDisPlay) {
      sortedItems = similarItems;
      pageIndex = similarPageIndex;
      pageSize = similarPageSize;
    }
    const items = sortedItems.slice(
      (pageIndex - 1) * pageSize,
      pageIndex * pageSize
    );

    return items.map((item) => (
      <ProductItem
        key={item.id}
        cartItems={cartItems}
        similarDisPlay={this.props.similarDisPlay}
        item={item}
        event={handleClick}
      ></ProductItem>
    ));
  }
}
