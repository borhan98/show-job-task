import useShows from "../Hooks/useShows";
import Show from "./Show";


const Shows = () => {
    const [shows] = useShows()

    return (
        <section className="shows_section">
            <div className="container py-5">
                <>
                    <h3 className="text-center text-capitalize">All shows here</h3>
                    <p></p>
                </>
                <div className="row row-gap-3">
                    {
                        shows.map((show, index) => <Show key={index} show={show} />)
                    }
                </div>
            </div>
        </section>
    );
};

export default Shows;