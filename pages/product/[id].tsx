import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import { Header } from "../../components/Header";

import { useContext, useEffect, useState } from 'react';
import dbConnect from '../../lib/dbConnect';
import Product from '../../models/Product';
import { Footer } from '../../components/Footer';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import axios from '../../lib/axios';

const ProductDetails: NextPage = (props: any) => {

    const [hasMounted, setHasMounted] = useState(false);
    const [user, setUser] = useContext(AuthContext);

    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    const addToWishList = () => {
        toast.promise(axios.patch(`/wishlist/${props.product.id}/add`, {}).then(({ data }) => {
            setUser(data.user)
        }).catch(e => {
            console.log(e);
        }), {
            pending: 'Loading ...',
            success: 'Wishlist updated successfully',
            error: 'Registerating failed'
        })
    }

    const addToCart = () => {
        toast.promise(axios.post(`/cart/add`, {
            product_id: props.product.id,
            quantity,
        }).then(({ data }) => {
            setUser(data.user)
        }).catch(e => {
            console.log(e);
        }), {
            pending: 'Loading ...',
            success: 'Product added to cart',
            error: 'Request failed'
        })
    }

    return (
        <div>

            <Header></Header>

            <div className="product-detail">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="product-detail-top">
                                <div className="row align-items-center">
                                    <div className="col-md-5">
                                        <img src={props.product.imagePath as any} alt="Product Image" />
                                    </div>
                                    <div className="col-md-7">
                                        <div className="product-content">
                                            <div className="title"><h2>{props.product.name}</h2></div>
                                            <div className="ratting">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <div className="price">
                                                <h4>Price:</h4>
                                                <p>${props.product.price}</p>
                                            </div>
                                            <div className="quantity">
                                                <h4>Quantity:</h4>
                                                <div className="qty">
                                                    <button className="btn-minus" onClick={() => setQuantity(quantity - 1)}><i className="fa fa-minus"></i></button>
                                                    <input type="text" value={quantity} />
                                                    <button className="btn-plus" onClick={() => setQuantity(quantity + 1)}><i className="fa fa-plus"></i></button>
                                                </div>
                                            </div>
                                            <div className="action">
                                                <button className="btn" onClick={addToWishList}><i className="fa fa-shopping-bag"></i>Wishlist</button>
                                                <button className="btn" onClick={addToCart}><i className="fa fa-shopping-cart"></i>Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row product-detail-bottom">
                                <div className="col-lg-12">

                                    <div className="tab-content">
                                        <div id="description" className="container tab-pane active">
                                            <h4>Product description</h4>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum quam ac mi viverra dictum. In efficitur ipsum diam, at dignissim lorem tempor in. Vivamus tempor hendrerit finibus. Nulla tristique viverra nisl, sit amet bibendum ante suscipit non. Praesent in faucibus tellus, sed gravida lacus. Vivamus eu diam eros. Aliquam et sapien eget arcu rhoncus scelerisque. Suspendisse sit amet neque neque. Praesent suscipit et magna eu iaculis. Donec arcu libero, commodo ac est a, malesuada finibus dolor. Aenean in ex eu velit semper fermentum. In leo dui, aliquet sit amet eleifend sit amet, varius in turpis. Maecenas fermentum ut ligula at consectetur. Nullam et tortor leo.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-4 sidebar">
                            <div className="sidebar-widget tag">
                                <h2 className="title">Tags Cloud</h2>
                                <a href="#">Lorem ipsum</a>
                                <a href="#">Vivamus</a>
                                <a href="#">Phasellus</a>
                                <a href="#">pulvinar</a>
                                <a href="#">Curabitur</a>
                                <a href="#">Fusce</a>
                                <a href="#">Sem quis</a>
                                <a href="#">Mollis metus</a>
                                <a href="#">Sit amet</a>
                                <a href="#">Vel posuere</a>
                                <a href="#">orci luctus</a>
                                <a href="#">Nam lorem</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    await dbConnect();
    const product = await Product.findById(context.params.id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        },
    }
}


export default ProductDetails
