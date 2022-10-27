import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../store/actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousal from '../components/ProductCarousal';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const dispatch = useDispatch();

  let { keyword, pageNumber } = useParams();
  if (!pageNumber) pageNumber = 1;

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, pages, page } = productList;

  const additionalTitle = keyword ? ' | Search' : '';

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta title={`ESHOP${additionalTitle}`} />
      {!keyword ? (
        <ProductCarousal />
      ) : (
        <Link to="/" className="btn btn-outline-dark">
          Go Back
        </Link>
      )}
      {products.length !== 0 ? <h1>Latest Produts</h1> : ''}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.length == 0 ? (
              <h2 className="no-product-found-message">No products found.</h2>
            ) : (
              ''
            )}
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
