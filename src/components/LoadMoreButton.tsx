interface buttonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    buttonTitle: string;
}

const LoadMoreButton: React.FC<buttonProps> = ({ onClick, buttonTitle }) => {
    return (
        <button
            className="mx-auto rounded-lg bg-black p-2 text-white xs:col-span-2 md:col-span-3 lg:col-span-5"
            onClick={onClick}
        >
            {buttonTitle}
        </button>
    );
};

export default LoadMoreButton;
