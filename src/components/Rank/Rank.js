import React from 'react'

const Rank = ({ name, entries, rank }) => {
    return (
        <div>
            <div className="white f3">
                {`${name}, your current rank is`}
            </div>
            <div className="white f2">
                {`#${rank}`}
            </div>
            <div className="white f3">
                { entries != 1 ? `with ${entries} faces detected` : `with ${entries} face detected`}
            </div>
        </div>
    )
}

export default Rank
