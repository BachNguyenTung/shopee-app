import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import Pagination from "../Pagination/Pagination";
import useGetOrderItems from "../../hooks/useGetOrderItems";
import MiniPageControl from "../Pagination/MiniPageControl";
import usePagination from "../../hooks/usePagination";
import { useUser } from "../../context/UserProvider";
import { ClipLoading } from "../ClipLoading";

const AccountOrder = () => {
  const { user } = useUser();
  const { orderItems, orderItemsLoading } = useGetOrderItems(user);
  const [searchOrderItems, setSearchOrderItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchOrderItemsFiltered, setSearchOrderItemsFiltered] = useState([]);
  const { pageIndex, setPageIndex, orderPageSize, pageTotal } = usePagination(
    searchOrderItemsFiltered
  );
  const currentOrderItems = [...searchOrderItemsFiltered].slice(
    (pageIndex - 1) * orderPageSize,
    pageIndex * orderPageSize
  );

  const handleSearchInput = (e) => {
    const text = e.target.value;
    handleSearchOrderItems(text);
  };

  const handleSearchOrderItems = (text) => {
    text = text.trim().toLowerCase();
    let searchOrderItems = orderItems ? [...orderItems] : [];
    if (text.length > 0) {
      searchOrderItems = [...orderItems].filter(
        (orderItem) =>
          orderItem.data.basket.some((item) =>
            item.name.toLowerCase().includes(text)
          ) || orderItem.id.toLowerCase().includes(text)
      );
    }
    setSearchOrderItems(searchOrderItems);
  };

  const handleFilterClick = (e) => {
    const filter = e.currentTarget.dataset.name;
    setFilter(filter);
    // handleFilterSearchOrderItems(filter);
  };

  const handleFilterSearchOrderItems = useCallback(
    (filter) => {
      let searchOrderItemsFiltered = [];
      switch (filter) {
        case "delivery":
          searchOrderItemsFiltered = [...searchOrderItems].filter((item) =>
            item.id.includes(filter)
          );
          break;
        case "card":
          searchOrderItemsFiltered = [...searchOrderItems].filter(
            (item) => !item.id.includes("delivery")
          );
          break;
        case "all":
          searchOrderItemsFiltered = [...searchOrderItems];
          break;
        case "cancle":
          // order cancled filter
          break;
        default:
          break;
      }
      setSearchOrderItemsFiltered(searchOrderItemsFiltered);
    },
    [searchOrderItems]
  );

  useEffect(() => {
    setSearchOrderItems(orderItems ? orderItems : []);
  }, [orderItems]);

  useEffect(() => {
    handleFilterSearchOrderItems(filter);
  }, [filter, handleFilterSearchOrderItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="user-order__filter-container">
        <div
          data-name="all"
          className={
            filter === "all"
              ? "user-order__filter-item user-order__filter-item--selected"
              : "user-order__filter-item"
          }
          onClick={handleFilterClick}
        >
          Tất cả
        </div>
        <div
          data-name="delivery"
          className={
            filter === "delivery"
              ? "user-order__filter-item user-order__filter-item--selected"
              : "user-order__filter-item"
          }
          onClick={handleFilterClick}
        >
          Tiền mặt
        </div>
        <div
          data-name="card"
          className={
            filter === "card"
              ? "user-order__filter-item user-order__filter-item--selected"
              : "user-order__filter-item"
          }
          onClick={handleFilterClick}
        >
          Thẻ tín dụng
        </div>
      </div>
      <div className="user-order__search-container">
        <svg className="user-order__search-icon" viewBox="0 0 19 19">
          <g id="Search-New" strokeWidth="1" fill="none" fillRule="evenodd">
            <g
              id="my-purchase-copy-27"
              transform="translate(-399.000000, -221.000000)"
              strokeWidth="2"
            >
              <g id="Group-32" transform="translate(400.000000, 222.000000)">
                <circle id="Oval-27" cx="7" cy="7" r="7"></circle>
                <path
                  d="M12,12 L16.9799555,16.919354"
                  id="Path-184"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </g>
          </g>
        </svg>
        <input
          disabled={orderItems.length === 0}
          type="text"
          className="user-order__search"
          onChange={handleSearchInput}
          placeholder="Tìm kiếm theo ID đơn hàng hoặc Tên Sản phẩm"
        ></input>
      </div>
      <div className="user-order__order-container">
        <div className="user-order__mini-page">
          <MiniPageControl
            totalItems={searchOrderItemsFiltered.length}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={orderPageSize}
            pageTotal={pageTotal}
          ></MiniPageControl>
        </div>
        {currentOrderItems.map((item, index) => (
          <div key={index} className="user-order__order-item">
            <div className="order-product__moment">
              <div className="grid__col order-product__id">
                mã Đơn hàng : {item.id}
              </div>
              <div className="grid__col order-product__time">
                Thời gian đặt:{" "}
                {moment
                  .unix(item.data.created)
                  .format("MMMM Do YYYY, h:mm:ss a")}
              </div>
              <div className="grid__col order-product__shipInfo">
                Địa chỉ nhận hàng: {item.data.shipInfo?.name},{" "}
                {item.data.shipInfo?.phone}, {item.data.shipInfo?.fullAddress}
              </div>
            </div>
            <div className="order-product__header">
              <div className="grid__col order-product__product">Sản Phẩm</div>
              <div className="grid__col order-product__price">Đơn Giá</div>
              <div className="grid__col order-product__amount">Số Lượng</div>
              <div className="grid__col order-product__header-total">
                Số Tiền
              </div>
            </div>
            {item.data.basket.map((basketItem, index) => (
              <div key={index} className="order-product__item">
                <Link
                  to={{
                    pathname: `/product/${basketItem.metaTitle}/${basketItem.id}`,
                    state: { id: basketItem.id },
                  }}
                  className="grid__col order-product__overview"
                >
                  <img
                    src={basketItem.imageUrl}
                    alt="cart-product"
                    className="order-product__img "
                  />
                  <span className="order-product__name">{basketItem.name}</span>
                </Link>
                <div
                  data-name="variation"
                  className="grid__col cart-product__variation"
                >
                  <span className="order-product__variation-label">
                    Phân Loại Hàng:
                  </span>
                  <span className="order-product__variation-numb">
                    {basketItem.variation}
                  </span>
                </div>
                <div className="grid__col order-product__item-price">
                  {/* cart-product__price-item--before  */}
                  {/* cart-product__price-item--after  */}
                  <span className="order-product__price-item">
                    <NumericFormat
                      value={basketItem.price}
                      prefix={"₫"}
                      thousandSeparator={true}
                      displayType="text"
                    ></NumericFormat>
                  </span>
                </div>
                <div className="grid__col order-product__item-amount">
                  <div className="order-product__amount-wrapper">
                    {basketItem.amount}
                  </div>
                </div>
                <div className="grid__col order-product__item-total">
                  <NumericFormat
                    value={basketItem.price * basketItem.amount}
                    prefix={"₫"}
                    thousandSeparator={true}
                    displayType="text"
                  ></NumericFormat>
                </div>
              </div>
            ))}
            <div className="order-product__footer">
              <span className="order-product__label">Tổng số tiền:</span>
              <span className="order-product__total-all">
                <NumericFormat
                  value={item.data.amount}
                  thousandSeparator={true}
                  displayType="text"
                  prefix={"₫"}
                ></NumericFormat>
              </span>
            </div>
          </div>
        ))}
        {orderItems.length === 0 && !orderItemsLoading && (
          <div className="user-order__order-empty">Chưa có đơn hàng.</div>
        )}

        {orderItemsLoading && <ClipLoading></ClipLoading>}
      </div>
      <Pagination
        items={searchOrderItemsFiltered}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageSize={orderPageSize}
        pageTotal={pageTotal}
      ></Pagination>
    </>
  );
};

export default AccountOrder;
