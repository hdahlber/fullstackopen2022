import Country from "./Country";



const Countries = ({ countriesToShow, setCountriesToShow }) => {
    if (countriesToShow.length === 0) return null;
    if (countriesToShow.length === 1) {
        console.log(countriesToShow)
        return(
            <div>
                {countriesToShow.map(land =>
            <Country key={land.name}country={land}></Country>
                )}
            </div>
        )

    }
    else {
        return countriesToShow.map((country) => (
            <div key={country.name.official}>
                {country.name.common}{" "}
                <button onClick={() => setCountriesToShow([country])}>show</button>
            </div>
        ));
    }
};

export default Countries;
