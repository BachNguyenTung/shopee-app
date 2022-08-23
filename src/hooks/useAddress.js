import { useState, useEffect } from "react";
import ProvincesCitiesVN from "pc-vn";

const useAddress = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");

  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const handleProvinceChoose = (e, value) => {
    console.log(value);
    const province = provinces.find((province) => province.name === value);
    setDistrict(undefined);
    setWard(undefined);
    setProvince(province || null);
  };

  const handleDistrictChoose = (e, value) => {
    const district = districts.find((district) => district.name === value);
    setWard(undefined);
    setDistrict(district || null);
  };

  const handleWardChoose = (e, value) => {
    const ward = wards.find((ward) => ward.name === value);
    setWard(ward || null);
  };

  //Get and set province and set districts and district depend on province
  useEffect(() => {
    const provinces = ProvincesCitiesVN.getProvinces();
    const provincesWithShipPrice = provinces.map((item, index) => {
      return {
        ...item,
        shipPrice: [10000 + 2000 * index, 15000 + 2000 * index],
      };
    });
    setProvinces(provincesWithShipPrice);

    if (province) {
      const districts = ProvincesCitiesVN.getDistrictsByProvinceCode(
        province.code
      );
      setDistricts(districts);
    }

    if (district) {
      const wards = ProvincesCitiesVN.getWardsByDistrictCode(district.code);
      setWards(wards);
    }
  }, [district, province, ward]);

  return {
    name,
    setName,
    phone,
    setPhone,
    street,
    setStreet,
    provinces,
    districts,
    wards,
    province,
    setProvince,
    district,
    setDistrict,
    ward,
    setWard,
    handleDistrictChoose,
    handleProvinceChoose,
    handleWardChoose,
  };
};

export default useAddress;
