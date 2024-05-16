import './TripStyles.css'

function CartItem(props) {
    return (
        <div className="cart-card" onClick={props.onClick}>
            <div className="cart-info">
                <img alt="image" src={props.image}></img>
                <div className="cart-info2">
                    <h2>{props.heading}</h2>
                    <div className="item-remove" onClick={props.onClickRemove}>
                        <i className="fa-solid fa-trash-can"></i>
                        <p>Remove</p>
                    </div>
                </div>
            </div>
            <div className="cart-count">
                <select
                    value={props.quantity}
                    onChange={(e) => props.onQuantityChange(e.target.value)}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <p>€ {props.totalPrice}</p>
            </div>
        </div>
    )
}

export default CartItem
