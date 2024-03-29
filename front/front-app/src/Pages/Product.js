import { React, useState, useEffect } from "react";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import WatchesData from "../Components/WatchesData";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = () => {
    const [state, setState] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const params = useParams();
    const loremIpsum =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const navigate = useNavigate();

    const watchId = params.id;
    useEffect(() => {
        console.log("letsgo");
        async function fetchData() {
            const response = await fetch(
                `http://localhost:3000/articles/${watchId}`
            );
            const data = await response.json();
            console.log(data);
            setState(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function getUser() {
            const userData = localStorage.getItem("user");
            const response = await fetch(
                `http://localhost:3000/users_by_username/${userData}`
            );
            const data = await response.json();
            console.log(data);
            setCurrentUser(data);
        }
        getUser();
    }, [state]);

    function addToCart() {
        return axios
            .put(
                `http://localhost:3000/add-article/${currentUser._id}/${state._id}`
            )
            .then(
                setTimeout(() => {
                    navigate("/cart");
                }, 1000)
            )
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    return (
        <div className="w-full flex justify-center bg-white max-h-screen">
            {state ? (
                <div className="w-full max-w-md relative max-h-screen bg-card-gray mx-2 flex items-center flex-col">
                    <a href="/home" className="w-full mt-10 ml-4 pl-4 button">
                        <FaArrowLeft className="w-6 h-6 border-0 border-orange hover:color-orange hover:border-b-4 h-19 ease-in-out duration-100" />
                    </a>
                    <img
                        src={state.image}
                        alt="watch"
                        className="w-2/4 max-h-22 object-cover mt-12 mb-8"
                    />
                    <div className="ml-4 mr-4 card-detail">
                        <h3 className="text-3xl font-semibold text-ledt my-4">
                            {state.nom}
                        </h3>
                        <p className="text-2xl font-bold text-orange text-left my-2">
                            {state.prix} €
                        </p>
                        <p className="font-medium text-left mb-2 mt-10">
                            About
                        </p>
                        <p className="font-light text-center my-2">
                            {loremIpsum}
                        </p>
                        <button
                            onClick={addToCart}
                            className="w-full h-max px-4 py-3 bg-orange text-white mx-2 mt-8 mb-5 categorie-item font-semibold drop-shadow-lg hover:bg-white hover:text-orange ease-in-out duration-200

                "
                        >
                            Add to cart
                        </button>
                    </div>

                    <Footer />
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Product;
