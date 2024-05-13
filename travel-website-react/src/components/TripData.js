import './TripStyles.css'

function TripData(props) {
    return (
        <div className="t-card" onClick={props.onClick}>
            <div className="t-image">
                <img alt="image" src={props.image}></img>
            </div>
            <h4>{props.heading}</h4>
            <p>€ {props.price} per person</p>
        </div>
    )
}

export default TripData
