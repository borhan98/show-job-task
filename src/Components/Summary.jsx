import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Modal from 'react-modal';
import { useForm } from "react-hook-form";

const Summary = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const show = useLoaderData();
    let subtitle;
    // parse text from element
    const parser = new DOMParser();
    const text = parser.parseFromString(show?.summary, "text/html").children[0].innerText;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0px 10px 20px rgba(64, 61, 61, 0.3)',
        },
    };

    const onSubmit = data => {
        data.show = show?.name;
        localStorage.setItem("booked", [data.name, data.email, data.show]);
    }

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="shows_section py-5 ">
            <div className="container">
                <div className="row">
                    <figure className="col-md-4 p-0">
                        <img className="w-100 h-100 rounded-3" src={show?.image?.original} alt={show?.name} />
                    </figure>
                    <div className="col-md-8 row">
                        <div className="col-lg-12 text-md-end d-flex flex-column ">
                            <div className="flex-grow-1 ">
                                <h3 className="text_clr">{show?.name}</h3>
                                <p className="text_clr">{text}</p>
                                <div className="d-flex justify-content-end gap-1 ">
                                    <p className="me-2">Type: </p>
                                    <span>{show?.type}, </span>
                                    <span>{show?.language}</span>
                                </div>
                                <p className="">
                                    <span className="me-4 ">Premiered: {show?.premiered} </span>
                                    <span>Ended: {show?.ended ? show?.ended : "ongoing"} </span>
                                </p>
                                <div className="d-flex justify-content-end gap-1 ">
                                    <p className="me-2">Runtime: </p>
                                    <span>{show?.runtime} min </span>
                                </div>
                                <h5>Genres</h5>
                                {
                                    show?.genres.map((genre, index) => <span className="ms-3" key={index}>{genre}</span>)
                                }

                            </div>
                            <a onClick={openModal} href="#" to={`shows/${show?.show?.id}`} className="text-decoration-none summary_btn w_fit mx-auto  d-block mb-4">
                                <span className="d-block text-center">Book Now</span>
                            </a>

                            {/* ----------------- Modal --------------------- */}
                            <Modal
                                isOpen={modalIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <h3 className="text-center">{show?.name}</h3>
                                {/* <button onClick={closeModal}>close</button> */}
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* Name Field */}
                                    <div className="d-flex flex-column p-2">
                                        <input
                                            {...register("name", { required: true })}
                                            type="name"
                                            placeholder="Enter your name"
                                            className="input_field"
                                            id="name"
                                        />
                                        {errors.name && (
                                            <span className="text-danger ">Your name is required*</span>
                                        )}
                                    </div>
                                    {/* Email Field */}
                                    <div className="d-flex flex-column p-2">
                                        <input
                                            {...register("email", { required: true })}
                                            type="email"
                                            placeholder="Enter your email"
                                            className="input_field"
                                            id="email"
                                        />
                                        {errors.email && (
                                            <span className="text-danger ">Your email is required*</span>
                                        )}
                                    </div>
                                    {/* Submit button */}
                                    <div className="d-flex mt-2 ">
                                        <button
                                            type="submit"
                                            className="flex-grow-1 btn btn-warning text-white"
                                        >
                                            Button
                                        </button>
                                        <button
                                            onClick={closeModal}
                                            className="flex-grow-1 btn btn-warning text-white ms-2 "
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </Modal>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;