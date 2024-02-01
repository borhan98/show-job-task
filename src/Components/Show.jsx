import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Show = ({ show }) => {
    // parse text from element
    const parser = new DOMParser();
    const text = parser.parseFromString(show?.show?.summary, "text/html").children[0].innerText;

    return (
        <div className=" col-md-4 col-lg-3 p-0">
            <div className="show_card m-2 p-2 h-100  rounded overflow-hidden d-flex flex-column">
                <figure className="w-100 flex-grow-1">
                    <img className="w-100 rounded " src={show?.show?.image?.medium} alt={show?.show?.name} />
                </figure>
                <h5>{show?.show?.name}</h5>
                <p>{text.slice(0, 100)}...</p>
                <Link to={`shows/${show?.show?.id}`} className="text-decoration-none summary_btn">
                    <span className="d-block text-center">Summary</span>
                </Link>
            </div>
        </div>
    );
};

export default Show;
Show.propTypes = {
    show: PropTypes.object.isRequired,
}