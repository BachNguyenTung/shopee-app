import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import img from "../img/bag.png";
import protectImg from "../img/protect.png";
import { Link } from "react-router-dom";
import { ProductContext } from "../context";
import useModal from "../hooks/useModal";
import AddCartModal from "./AddCartModal";
import ImageGallery from "react-image-gallery";
import Picker from "./Picker";

export default function DetailProduct({ metaTitle }) {
  const scrolltoEl = useRef();
  const {
    singleProduct,
    handleClick,
    items,
    bestSelling,
    shipPriceProvince,
    setShipPriceProvince,
  } = useContext(ProductContext);
  //

  const getModifiedItem = useCallback(() => {
    let itemByMetaTitle = singleProduct(metaTitle);
    itemByMetaTitle = {
      ...itemByMetaTitle,
      amount: 1,
      shipPriceProvince: shipPriceProvince,
    };
    return itemByMetaTitle;
  }, [metaTitle, shipPriceProvince, singleProduct]);
  const defaultItem = getModifiedItem();
  const [item, setItem] = useState(defaultItem);
  const { isAddCartPopup, toggleIsAddCardPopup } = useModal();
  //
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [address, setAddress] = useState("Chọn địa điểm");
  //
  const bestSellingItems = [...items].filter(
    (item) => item.soldAmount >= bestSelling
  );
  const sortedBestSellingItems = [...bestSellingItems].sort(
    (a, b) => parseFloat(b.soldAmount) - parseFloat(a.soldAmount)
  );

  const images = [
    {
      original: require(`../img/${item.imageUrl}`).default,
      thumbnail: require(`../img/${item.imageUrl}`).default,
    },
    {
      original: require(`../img/${item.imageUrl}`).default,
      thumbnail: require(`../img/${item.imageUrl}`).default,
    },
    {
      original: require(`../img/${item.imageUrl}`).default,
      thumbnail: require(`../img/${item.imageUrl}`).default,
    },
  ];
  useEffect(() => {
    // effect
    const item = getModifiedItem();
    setItem(item);
    return () => {
      // cleanup
    };
  }, [shipPriceProvince, getModifiedItem]);

  //
  const togglePicker = () => {
    setIsPickerShow(!isPickerShow);
  };

  const handleDecreAmount = () => {
    const newItem = { ...item };
    newItem.amount--;
    newItem.amount = newItem.amount <= 0 ? 1 : newItem.amount;
    setItem(newItem);
  };
  const handleIncreAmount = () => {
    const newItem = { ...item };
    newItem.amount++;
    setItem(newItem);
  };

  const handleInputAmountChange = (e) => {
    const amount = e.target.value;
    const newItem = { ...item };
    newItem.amount = Number(amount);
    setItem(newItem);
  };

  const handleVariationClick = (e) => {
    const newItem = { ...item };
    newItem.variation = e.target.innerText;
    setItem(newItem);
  };

  const handleBuyNow = (e) => {
    handleClick(e, item);
  };

  const handleAddCart = (e) => {
    handleClick(e, item);
    toggleIsAddCardPopup(!isAddCartPopup);
  };

  const handleScrollTo = (e) => {
    scrolltoEl.current.scrollIntoView();
  };

  return (
    <div className="container">
      <div className="grid detail-breadcrumb">
        Shopee Sức Khỏe + Sắc Đẹp + Chăm sóc tóc + Tinh chất bôi tóc Kirkland
        chính hãng Mỹ, ngăn rụng hói và mọc tóc, râu, mày cho nam
      </div>
      <div className="grid detail-product">
        <div className="detail-product__info">
          <div className="detail-product__info-left">
            <div className="detail-product__img-wrapper">
              <ImageGallery
                showPlayButton={false}
                items={images}
              ></ImageGallery>
            </div>
            <div className="detail-product__sharelike-wrapper">
              <div className="detail-product__share">
                <div className="detail-product__share-label">Chia sẻ:</div>
                <div className="detail-product__share-background detail-product__share-fm"></div>
                <div className="detail-product__share-background detail-product__share-fb"></div>
                <div className="detail-product__share-background detail-product__share-pinterest"></div>
                <div className="detail-product__share-background detail-product__share-twitter"></div>
              </div>
              <div className="detail-product__like">
                <div className="detail-product__like-icon">icon</div>
                <div className="detail-product__like-label">Đã thích (346)</div>
              </div>
            </div>
          </div>

          <div className="detail-product__info-right">
            <div className="detail-product__name">{item.name}</div>
            <div className="detail-product__more">
              <div onClick={handleScrollTo} className="detail-product__rating">
                <span className="detail-product__rating-number">4.9</span>
                <div className="detail-product__rating-icons">
                  <svg
                    enableBackground="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x="0"
                    y="0"
                    className="detail-product__rating-icon"
                  >
                    <polygon
                      points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                    ></polygon>
                  </svg>
                </div>
              </div>
              <div onClick={handleScrollTo} className="detail-product__review">
                <span className="detail-product__review-number">1.2k</span>
                <span className="detail-product__review-label">Đánh giá</span>
              </div>
              <div className="detail-product__sold">
                <span className="detail-product__sold-number">
                  {item.soldAmount}
                </span>
                <span className="detail-product__sold-label">Đã bán</span>
              </div>
            </div>
            <div className="detail-product__price">₫{item.price}</div>
            <div className="detail-product__info-wrapper">
              {/* <div className="detail-product__combo-label">
                Combo Khuyến Mãi
              </div>
              <div className="detail-product__combo-value">Mua 2 + giảm 2%</div> */}

              <div className="detail-product__ship-label">Vận Chuyển</div>
              <div className="detail-product__shipshipto-wrapper">
                <svg
                  height="12"
                  viewBox="0 0 20 12"
                  width="20"
                  className="detail-product__ship-icon"
                >
                  <g fill="none" fillRule="evenodd" transform="">
                    <rect
                      fill="#00bfa5"
                      fillRule="evenodd"
                      height="9"
                      rx="1"
                      width="12"
                      x="4"
                    ></rect>
                    <rect
                      height="8"
                      rx="1"
                      stroke="#00bfa5"
                      width="11"
                      x="4.5"
                      y=".5"
                    ></rect>
                    <rect
                      fill="#00bfa5"
                      fillRule="evenodd"
                      height="7"
                      rx="1"
                      width="7"
                      x="13"
                      y="2"
                    ></rect>
                    <rect
                      height="6"
                      rx="1"
                      stroke="#00bfa5"
                      width="6"
                      x="13.5"
                      y="2.5"
                    ></rect>
                    <circle cx="8" cy="10" fill="#00bfa5" r="2"></circle>
                    <circle cx="15" cy="10" fill="#00bfa5" r="2"></circle>
                    <path
                      d="m6.7082481 6.7999878h-.7082481v-4.2275391h2.8488017v.5976563h-2.1405536v1.2978515h1.9603297v.5800782h-1.9603297zm2.6762505 0v-3.1904297h.6544972v.4892578h.0505892c.0980164-.3134765.4774351-.5419922.9264138-.5419922.0980165 0 .2276512.0087891.3003731.0263672v.6210938c-.053751-.0175782-.2624312-.038086-.3762568-.038086-.5122152 0-.8758247.3017578-.8758247.75v1.8837891zm3.608988-2.7158203c-.5027297 0-.8536919.328125-.8916338.8261719h1.7390022c-.0158092-.5009766-.3446386-.8261719-.8473684-.8261719zm.8442065 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187zm2.6224996-1.8544922c-.5027297 0-.853692.328125-.8916339.8261719h1.7390022c-.0158091-.5009766-.3446386-.8261719-.8473683-.8261719zm.8442064 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187z"
                      fill="#fff"
                    ></path>
                    <path d="m .5 8.5h3.5v1h-3.5z" fill="#00bfa5"></path>
                    <path d="m0 10.15674h3.5v1h-3.5z" fill="#00bfa5"></path>
                    <circle cx="8" cy="10" fill="#047565" r="1"></circle>
                    <circle cx="15" cy="10" fill="#047565" r="1"></circle>
                  </g>
                </svg>
                <span className="detail-product__ship-content">
                  Miễn Phí Vận Chuyển
                </span>
                <span className="detail-product__ship-contentplus">
                  Miễn Phí Vận Chuyển khi đơn đạt giá trị tối thiểu
                </span>

                <svg
                  enableBackground="new 0 0 15 15"
                  viewBox="0 0 15 15"
                  x="0"
                  y="0"
                  className="detail-product__shipto-icon"
                >
                  <g>
                    <line
                      fill="none"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      x1="8.6"
                      x2="4.2"
                      y1="9.8"
                      y2="9.8"
                    ></line>
                    <circle
                      cx="3"
                      cy="11.2"
                      fill="none"
                      r="2"
                      strokeMiterlimit="10"
                    ></circle>
                    <circle
                      cx="10"
                      cy="11.2"
                      fill="none"
                      r="2"
                      strokeMiterlimit="10"
                    ></circle>
                    <line
                      fill="none"
                      strokeMiterlimit="10"
                      x1="10.5"
                      x2="14.4"
                      y1="7.3"
                      y2="7.3"
                    ></line>
                    <polyline
                      fill="none"
                      points="1.5 9.8 .5 9.8 .5 1.8 10 1.8 10 9.1"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                    ></polyline>
                    <polyline
                      fill="none"
                      points="9.9 3.8 14 3.8 14.5 10.2 11.9 10.2"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                    ></polyline>
                  </g>
                </svg>

                <span className="detail-product__shipto-label">
                  Vận Chuyển Tới
                </span>
                <div
                  onClick={togglePicker}
                  className="detail-product__shipto-content"
                >
                  {address}
                  <svg
                    enableBackground="new 0 0 11 11"
                    viewBox="0 0 11 11"
                    x="0"
                    y="0"
                    className={
                      isPickerShow
                        ? "detail-product__content-icon detail-product__content-icon--rotate"
                        : "detail-product__content-icon"
                    }
                  >
                    <g>
                      <path d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path>
                    </g>
                  </svg>
                </div>
                {isPickerShow && (
                  <Picker
                    isPickerShow={isPickerShow}
                    togglePicker={togglePicker}
                    setAddress={setAddress}
                    setShipPriceProvince={setShipPriceProvince}
                  />
                )}

                <span className="detail-product__shipprice-label">
                  Phí Vận Chuyển
                </span>
                <span className="detail-product__shipprice-content">
                  ₫{shipPriceProvince[0]} - ₫{shipPriceProvince[1]}
                  <svg
                    enableBackground="new 0 0 11 11"
                    viewBox="0 0 11 11"
                    x="0"
                    y="0"
                    className="detail-product__shipprice-icon"
                  >
                    <g>
                      <path d="m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z"></path>
                    </g>
                  </svg>
                </span>
              </div>

              <div className="detail-product__variation-label">Variation</div>
              <div className="detail-product__variation-list">
                {item.variationList.map((variationItem, index) => (
                  <button
                    key={index}
                    onClick={handleVariationClick}
                    className={
                      variationItem === item.variation
                        ? "detail-product__variation-item detail-product__variation-item--selected"
                        : "detail-product__variation-item"
                    }
                  >
                    {variationItem}
                  </button>
                ))}
              </div>

              <div className="detail-product__amount-label">Số Lượng</div>
              <div className="detail-product__amount-wrapper">
                <button
                  onClick={handleDecreAmount}
                  className="btn detail-product__amount-desc"
                >
                  -
                </button>
                <input
                  onChange={handleInputAmountChange}
                  value={Number(item.amount)}
                  type="text"
                  className="detail-product__amount-input"
                />
                <button
                  onClick={handleIncreAmount}
                  className="btn detail-product__amount-incre"
                >
                  +
                </button>
                <div className="detail-product__amount-left">
                  645 sản phẩm có sẵn
                </div>
              </div>
            </div>
            <div className="detail-product__btn-wrapper">
              <button
                onClick={handleAddCart}
                data-id={item.id}
                data-name="addToCartBtn"
                className="btn detail-product__btn-cart"
              >
                <svg
                  enableBackground="new 0 0 15 15"
                  viewBox="0 0 15 15"
                  x="0"
                  y="0"
                  className="detail-product__btn-cart-icon"
                >
                  <g>
                    <g>
                      <polyline
                        fill="none"
                        points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                      ></polyline>
                      <circle cx="6" cy="13.5" r="1" stroke="none"></circle>
                      <circle cx="11.5" cy="13.5" r="1" stroke="none"></circle>
                    </g>
                    <line
                      fill="none"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      x1="7.5"
                      x2="10.5"
                      y1="7"
                      y2="7"
                    ></line>
                    <line
                      fill="none"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      x1="9"
                      x2="9"
                      y1="8.5"
                      y2="5.5"
                    ></line>
                  </g>
                </svg>
                <span className="detail-product__btn-cart-text">
                  thêm vào giỏ hàng
                </span>
              </button>
              {isAddCartPopup && (
                <AddCartModal
                  isAddCartPopup={isAddCartPopup}
                  toggleIsAddCardPopup={toggleIsAddCardPopup}
                ></AddCartModal>
              )}

              <Link
                to="/cart"
                onClick={handleBuyNow}
                data-id={item.id}
                data-name="addToCartBtn"
                className="detail-product__btn-checkout"
              >
                Mua ngay
              </Link>
            </div>
            <div className="detail-product__protect-wrapper">
              <img
                src={protectImg}
                alt="protect"
                className="detail-product__protect-icon"
              />
              <div className="detail-product__protect-label">
                Shopee Đảm Bảo
              </div>
              <div className="detail-product__protect-detail">
                3 Ngày Trả Hàng / Hoàn Tiền
              </div>
            </div>
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-content__left">
            <div className="detail-content__detail">
              <div className="detail-content__detail-label">
                CHI TIẾT SẢN PHẨM
              </div>

              <div className="detail-content__breadcrumb-label">Danh Mục</div>
              <div className="detail-content__breadcrumb-item">
                Shopee Sức Khỏe Sắc Đẹp Chăm sóc tóc
              </div>

              <div className="detail-content__brand-label">Thương hiệu</div>
              <div className="detail-content__brand-item">No Brand</div>

              <div className="detail-content__variation-label">
                Khối lượng (g)
              </div>
              <div className="detail-content__variation-item">60</div>

              <div className="detail-content__gender-label">Giới tính</div>
              <div className="detail-content__gender-item">Dành cho Nam</div>

              <div className="detail-content__madeby-label">Xuất xứ</div>
              <div className="detail-content__madeby-item">USA</div>

              <div className="detail-content__amount-label">Kho hàng</div>
              <div className="detail-content__amount-item">662</div>

              <div className="detail-content__location-label">Gửi từ</div>
              <div className="detail-content__location-item">
                Quận 12, TP. Hồ Chí Minh
              </div>
              <div className="detail-content__description-label">
                MÔ TẢ SẢN PHẨM
              </div>
              <div className="detail-content__description-content">MÔ TẢ </div>
            </div>

            <div ref={scrolltoEl} className="detail-content__rating">
              <div className="detail-content__rating-label">
                ĐÁNH GIÁ SẢN PHẨM
              </div>

              <div className="detail-content__rating-overview">
                <div className="detail-content__rating-score">
                  <div className="detail-content__score-result">4.9 trên 5</div>
                  <div className="detail-content__score-icons">
                    <svg
                      enableBackground="new 0 0 15 15"
                      viewBox="0 0 15 15"
                      x="0"
                      y="0"
                      className="detail-content__score-icon"
                    >
                      <polygon
                        points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                      ></polygon>
                    </svg>
                  </div>
                </div>
                <div className="detail-content__overview-list">
                  <button className="btn detail-content__overview-item">
                    Tất cả
                  </button>
                </div>
              </div>
              <div className="detail-content__rating-list">
                <div className="detail-content__rating-item">
                  <div className="detail-content__rating-name">
                    tengicunglaten
                  </div>
                  <div className="detail-content__rating-icons">
                    <svg
                      enableBackground="new 0 0 15 15"
                      viewBox="0 0 15 15"
                      x="0"
                      y="0"
                      className="detail-content__rating-icon"
                    >
                      <polygon
                        points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                      ></polygon>
                    </svg>
                  </div>
                  <div className="detail-content__rating-variation">
                    <span className="detail-content__variation-type">
                      Phân loại hàng:
                    </span>
                    <span className="detail-content__variation-result">
                      1 lọ Kirkland 60ml
                    </span>
                  </div>
                  <div className="detail-content__rating-content">
                    Giao hang hoi lau, dong goi san pham can than, chat luong
                    san pham ok
                  </div>
                  <div className="detail-content__rating-date">
                    2021-04-23 07:57
                  </div>
                  {/* <div className="detail-content__rating-rate"></div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="detail-content__right">
            <div className="detail-content__right-label">
              Top Sản Phẩm Bán Chạy
            </div>
            <div className="detail-content__hot-list">
              {sortedBestSellingItems.map((item, index) => {
                if (index <= 7) {
                  return (
                    <div key={index} className="detail-content__hot-item">
                      <img
                        src={require(`../img/${item.imageUrl}`).default}
                        alt="hot-img"
                        className="detail-content__hot-img"
                      />
                      <div className="detail-content__hot-name">
                        {item.name}
                      </div>
                      <div className="detail-content__hot-price">
                        {item.price}
                      </div>
                    </div>
                  );
                } else return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
