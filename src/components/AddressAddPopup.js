import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { ProductContext } from "../context";
import { db } from "../firebase";

const AddressAddPopup = ({
  isAddressAddShowing,
  toggleAddressAdd,
  phone,
  setPhone,
  name,
  setName,
  street,
  setStreet,
  ward,
  province,
  district,
  isProvince,
  isDistrict,
  isWard,
  setIsProvince,
  setIsDistrict,
  setIsWard,
  provinces,
  districts,
  wards,
  toggleDistrict,
  toggleProvince,
  toggleWard,
  handleDistrictChoose,
  handleProvinceChoose,
  handleWardChoose,
  fullAddress,
  setFullAddress,
  shipInfos,
  setShipInfos,
  shipInfoIndex,
}) => {
  const { user } = useContext(ProductContext);

  const handleBack = () => {
    toggleAddressAdd(!isAddressAddShowing);
    setIsProvince(false);
    setIsDistrict(false);
    setIsWard(false);
  };

  const handleApply = () => {
    if (typeof shipInfoIndex !== "undefined") {
      updateShipInfo();
    } else {
      addNewShipInfo();
    }
  };

  const updateShipInfo = () => {
    try {
      let tempShipInfos = [...shipInfos];
      const created = Date.now();
      const fullAddress = `${street}, ${ward.full_name}`;

      tempShipInfos = tempShipInfos.map((shipInfo) => {
        if (tempShipInfos.indexOf(shipInfo) === shipInfoIndex) {
          return {
            ...shipInfo,
            name: name,
            phone: phone,
            fullAddress: fullAddress,
            created: created,
            street: street,
            ward: ward,
            district: district,
            province: province,
          };
        } else return shipInfo;
      });

      db.collection("users")
        .doc(user?.uid)
        .collection("shipInfos")
        .doc("shipInfoDoc")
        .set({
          shipInfos: tempShipInfos,
        })
        .then(() => {
          setShipInfos(tempShipInfos);
          setFullAddress(fullAddress);
          toggleAddressAdd(!isAddressAddShowing);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addNewShipInfo = () => {
    try {
      let tempShipInfos = shipInfos ? [...shipInfos] : [];
      const created = Date.now();
      const fullAddress = `${street}, ${ward.full_name}`;

      const shipInfo = {
        name: name,
        phone: phone,
        fullAddress: fullAddress,
        isDefault: false,
        created: created,
        street: street,
        ward: ward,
        district: district,
        province: province,
      };

      tempShipInfos = [...tempShipInfos, shipInfo];
      db.collection("users")
        .doc(user?.uid)
        .collection("shipInfos")
        .doc("shipInfoDoc")
        .set({
          shipInfos: tempShipInfos,
        })
        .then(() => {
          setShipInfos(tempShipInfos);
          setFullAddress(fullAddress);
          toggleAddressAdd(!isAddressAddShowing);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhoneChange = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setPhone(e.target.value);
  };

  return isAddressAddShowing
    ? ReactDOM.createPortal(
        <div className="address-profile__modal">
          <div className="address-profile__modal-overlay"></div>
          <div className="address-profile__modal-container">
            <div className="address-profile__modal-header">
              <span className="address-profile__header-label">Địa Chỉ Mới</span>
            </div>
            <div className="address-profile__modal-content">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="address-profile__name"
                placeholder="Họ và tên"
              />
              <input
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                className="address-profile__phone"
                placeholder="Số điện thoại"
              />
              <div
                onClick={toggleProvince}
                className={
                  province
                    ? "address-profile__province address-profile__province--selected"
                    : "address-profile__province"
                }
              >
                {province ? province.name : "Thành phố"}
                {isProvince && (
                  <div className="address-profile__provinces">
                    {provinces.map((item, index) => (
                      <div
                        key={index}
                        onClick={handleProvinceChoose}
                        className="checkout-product__provinces-item"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                onClick={toggleDistrict}
                className={
                  district
                    ? "address-profile__district address-profile__district--selected"
                    : "address-profile__district"
                }
              >
                {district ? district.name : "Quận/Huyện"}
                {isDistrict && (
                  <div className="address-profile__districts">
                    {districts.map((item, index) => (
                      <div
                        key={index}
                        onClick={handleDistrictChoose}
                        className="checkout-product__districts-item"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                onClick={toggleWard}
                className={
                  ward
                    ? "address-profile__ward address-profile__ward--selected"
                    : "address-profile__ward"
                }
              >
                {ward ? ward.name : "Phường/Xã"}
                {isWard && (
                  <div className="address-profile__wards">
                    {wards.map((item, index) => (
                      <div
                        key={index}
                        onClick={handleWardChoose}
                        className="checkout-product__wards-item"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="address-profile__address-detail"
                placeholder="Địa chỉ cụ thể"
              />
            </div>
            <div className="address-profile__popup-footer">
              <button
                onClick={handleBack}
                className="btn address-profile__popup-back "
              >
                Trở lại
              </button>
              <button
                onClick={handleApply}
                className="btn address-profile__popup-apply "
              >
                OK
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default AddressAddPopup;
