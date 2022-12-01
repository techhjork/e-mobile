import Link from "next/link"
import { useContext } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../context/authContext"
import axios from "../lib/axios"



export const ProductCard = ({ product }: any) => {
    const [user, setUser] = useContext(AuthContext);



    const addToWishList = () => {
        toast.promise(axios.patch(`/wishlist/${product.id}/add`, {}).then(({ data }) => {
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
            product_id: product.id,
            quantity: 1,
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
        <div className="col-lg-3">
            <div className="product-item">
                <div className="product-title">
                    <a href="#">{product.name}</a>
                    <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                </div>
                <div className="product-image">
                    <a href="product-detail.html">
                        <img src={product.imagePath as any} style={{ height: '300px', objectFit: 'cover' }} />
                    </a>
                    {
                        user && (
                            <div className="product-action">
                                <button><i className="fa fa-cart-plus" onClick={addToCart} ></i></button>
                                <button><i className="fa fa-heart" onClick={addToWishList} ></i></button>
                            </div>
                        )
                    }
                </div>
                <div className="product-price">
                    <h3><span>$</span>{product.price}</h3>
                    {
                        user ? 
                            <Link href={`/product/${product.id}`}><a className="btn"><i className="fa fa-shopping-cart"></i>Buy Now</a></Link> : 
                            <Link href={`/login`}><a className="btn"><i className="fa fa-shopping-cart"></i>Login</a></Link>
                    }
                </div>
            </div>
        </div>
    )
}

