import { useEffect, useState } from "react";
import { Table, Button, Spin } from "antd"; // Import Spin component
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [comparedProducts, setComparedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  const handleCompare = (product) => {
    if (
      comparedProducts.length < 4 &&
      !comparedProducts.some((p) => p.id === product.id)
    ) {
      setComparedProducts([...comparedProducts, product]);
    }
  };

  const navigateToCompare = () => {
    navigate("/compare", { state: { comparedProducts } });
  };

  // Function to check if product is in comparison list
  const isCompared = (product) =>
    comparedProducts.some((p) => p.id === product.id);

  const columns = [
    // Add render functions for all columns to highlight compared items
    ...Object.keys(products[0] || {})
      .filter((key) =>
        [
          "title",
          "description",
          "price",
          "discountPercentage",
          "brand",
          "category",
        ].includes(key)
      )
      .map((key) => ({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        dataIndex: key,
        key,
        sorter: (a, b) =>
          typeof a[key] === "string"
            ? a[key].localeCompare(b[key])
            : a[key] - b[key],
        render: (text, record) => (
          <span className={isCompared(record) ? "highlight" : ""}>
            {key === "price"
              ? `$${text}`
              : key === "discountPercentage"
              ? `${text}%`
              : text}
          </span>
        ),
      })),
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text, record) => (
        <img
          src={text}
          alt="thumbnail"
          className={isCompared(record) ? "highlight-img" : ""}
        />
      ),
    },
    {
      title: "Compare",
      key: "compare",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleCompare(record)}
          disabled={isCompared(record)}
          className="compare-btn"
        >
          {isCompared(record) ? "Added" : "Compare"}
        </Button>
      ),
    },
  ];

  return (
    <div className="product-details">
      <Button
        type="primary"
        onClick={navigateToCompare}
        disabled={comparedProducts.length === 0}
        className="compare-page-btn"
      >
        Compare Products ({comparedProducts.length}/4)
      </Button>

      {/* Add Spin component for loading state */}
      {loading ? (
        <div className="loader-container">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <Table
          dataSource={products}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="id"
        />
      )}
    </div>
  );
};

export default ProductDetails;
