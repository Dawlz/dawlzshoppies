import React from 'react'

const SearchResult = props => {

    const nominateMovie = (e, idx) => {
        props.nominate(idx)
    } 

    if(props.data.length >= 1) {
        return (
            <div className="col-md-6 p-3">
                <div className="p-3 bg-light">
                    <h3>Results for "{props.query}"</h3>
                    <ul className="my-3" style={{paddingLeft: "20px"}}>
                        { props.data.map((item, idx) => (
                            <li key={idx} className="my-2"> 
                            <span style={{marginRight: "25px"}}> {item.movie.Title} {item.movie.Year} </span>
                            <button className={item.nominated ? "btn btn-success py-0 disabled" : "btn btn-success py-0" } onClick={e => nominateMovie(e, idx)} >Nominate</button>
                            </li>
                        ))}
                    </ul>
                </div> 
            </div> 
        )
    }
    return <div className="col-6 p-3"></div>
}

export default SearchResult