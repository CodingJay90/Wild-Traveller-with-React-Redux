import React from 'react'
import LocationItem from './LocationItem'
import '../explore/Explore.css'

const Location = ({item}) => {
    return (
        <div className="grid">
            {item.map(i => {
                return <LocationItem key={i._id} item={i} />
            })}
        </div>
    )
}

export default Location
