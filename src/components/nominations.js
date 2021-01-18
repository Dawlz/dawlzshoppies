import React from 'react'

const Nominee = props => {

    const removeMovie = (e, movie) => {
        props.editNomination(movie)
    }

    if (props.data.length >= 1) {
        return (
            <div className="col-md-6 p-3">     
                <div className="p-3 bg-light">
                    <h3>Nominations</h3> 
                    <ul className="my-3" style={{paddingLeft: "20px"}}>
                    {
                    props.data.map((movie, idx) => (
                    <li key={idx} className="my-2">
                        <span style={{marginRight: "25px"}}> {movie.movie.Title} </span>
                        <button className="btn btn-danger py-0" onClick={e => removeMovie(e, movie)} >Remove</button>
                    </li>
))
                    }
                    </ul>
                </div>
            </div>
        )
    }
    return <></>
}

export default Nominee;