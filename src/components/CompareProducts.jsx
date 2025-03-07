import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CompareProducts.css";

const CompareProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [comparedProducts, setComparedProducts] = useState(
    location.state?.comparedProducts || []
  );
  const [allProducts, setAllProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (isModalVisible && allProducts.length === 0) {
      axios
        .get("https://dummyjson.com/products")
        .then((res) => setAllProducts(res.data.products))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [isModalVisible]);

  const addProduct = (product) => {
    if (
      comparedProducts.length < 4 &&
      !comparedProducts.some((p) => p.id === product.id)
    ) {
      setComparedProducts([...comparedProducts, product]);
    }
  };

  const removeProduct = (productId) => {
    setComparedProducts(comparedProducts.filter((p) => p.id !== productId));
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() => addProduct(record)}
          disabled={comparedProducts.some((p) => p.id === record.id)}
        >
          Add
        </Button>
      ),
    },
  ];

  return (
    <div className="compare-products">
      <div className="header-section">
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          className="add-more-btn"
        >
          Add More Products
        </Button>
        <Button
          type="default"
          onClick={() => navigate("/")}
          className="back-btn"
        >
          Back to Products
        </Button>
      </div>

      <Modal
        title="Select Products to Compare"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <Table
          dataSource={allProducts}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Modal>

      <div className="comparison-grid">
        {comparedProducts.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            className="product-card"
            actions={[
              <Button
                onClick={() => removeProduct(product.id)}
                className="remove-btn"
              >
                Remove
              </Button>,
            ]}
          >
            <div className="product-detail">
              <label>Price:</label>
              <span>${product.price}</span>
            </div>
            <div className="product-detail">
              <label>Brand:</label>
              <span>{product.brand}</span>
            </div>
            <div className="product-detail">
              <label>Category:</label>
              <span>{product.category}</span>
            </div>
            <div className="product-detail">
              <label>Discount:</label>
              <span>{product.discountPercentage}%</span>
            </div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompareProducts;
