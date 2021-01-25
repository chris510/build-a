const Button = ({
    text,
    handleOnClick,
}) => {
    return (
        <button
            onClick={handleOnClick}
        >
            {text}
        </button>
    )
};

export default Button;