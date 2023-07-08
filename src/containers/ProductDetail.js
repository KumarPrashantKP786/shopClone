import React, {useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { selectedProduct, removeSelectedProduct } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const ProductDetail = ()=>{
    const product = useSelector((state) => state.product);
    const {image, title,price,category,description} = product;
    const {productId} = useParams();
    const dispatch = useDispatch();
    console.log("ProductId : ", productId);
    const fetchProductDetail = async () => {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`).catch((err) => {
            console.log(err);
        });
        console.log("response : ", response.data);
        dispatch(selectedProduct(response.data));
    };
     useEffect(()=>{
        if(productId && productId!="") fetchProductDetail();
        return () => {
            dispatch(removeSelectedProduct());
        };
     }, [productId]);
    return (
        <div className="four column wide">
                    <div className="ui link cards">
                        <div className="card">
                            <div className="image">
                                <img src={image} alt={title}></img>
                            </div>
                            <div className="content">
                                <div className="header">{title} </div>
                                <div className="header">${price} </div>
                                <div className="header">{description} </div>
                                <div className="header">{category} </div>
                            </div>
                        </div>
        </div>
        </div>
    );
};

export default ProductDetail;