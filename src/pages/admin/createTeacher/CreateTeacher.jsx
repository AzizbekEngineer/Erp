import React, { useEffect, useState } from "react";
import { useGetSellerSearchQuery } from "../../../context/api/sellerApi.js";
import { useCreateProductMutation } from "../../../context/api/productApi.js";
import Module from "../../../components/Module/Module.jsx";
import "./createTeacher.scss";

const initialState = {
  title: "",
  quantity: "",
  price: "",
  units: "",
  category: "",
  comment: "",
};

const CreateTeacher = () => {
  const [value, setValue] = useState("");
  const [seller, setSeller] = useState(null);
  const [product, setProduct] = useState(initialState);
  const { data, isError } = useGetSellerSearchQuery({ value: value.trim() });
  const [createProduct, { isSuccess, isLoading }] = useCreateProductMutation();

  const handleChange = (e) => {
    let { value, name } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      ...product,
      sellerId: seller._id,
    };
    createProduct(newProduct);
  };

  useEffect(() => {
    if (isSuccess) {
      setProduct(initialState);
      setSeller(null);
    }
  }, [isSuccess]);

  return (
    <div className="create__product">
      <h2>Mahsulot Yaratish</h2>
      {seller ? (
        <div className="create__product__seller">
          <p>
            {seller.fname}{" "}
            <button onClick={() => setSeller(null)}>cancel</button>
          </p>
        </div>
      ) : (
        <>
          <input
            className="create__product__choose__seller"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Kimdan olasiz?"
          />
        </>
      )}
      <div className="create__product__sellers">
        {!value.trim() ? (
          <></>
        ) : isError ? (
          <p>Not found</p>
        ) : (
          data?.innerData?.map((item) => (
            <p
              onClick={() => {
                setSeller(item);
                setValue("");
              }}
              key={item._id}
            >
              {item.fname}
            </p>
          ))
        )}
      </div>
      {seller && (
        <Module bg={"#aaa6"} width={600} close={setSeller}>
          <form
            className="create__product__form"
            onSubmit={handleCreateProduct}
          >
            <input
              name="title"
              value={product.title}
              onChange={handleChange}
              type="text"
              placeholder="title"
            />
            <input
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              type="text"
              placeholder="quantity"
            />
            <input
              name="price"
              value={product.price}
              onChange={handleChange}
              type="text"
              placeholder="price"
            />
            <input
              type="text"
              name="units"
              placeholder="units"
              value={product.units}
              onChange={handleChange}
            />
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
            >
              <option value="ichimlik">ichimlik</option>
              <option value="ovqat">ovqat</option>
              <option value="kiyim">kiyim</option>
            </select>
            <input
              name="comment"
              value={product.comment}
              onChange={handleChange}
              type="text"
              placeholder="comment"
            ></input>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </button>
          </form>
        </Module>
      )}
    </div>
  );
};

export default CreateTeacher;
