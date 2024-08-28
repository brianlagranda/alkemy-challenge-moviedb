import { Spinner } from '@material-tailwind/react';

function LoadingSpinner() {
    return (
        <div className="my-12 flex justify-center">
            <Spinner size="lg" color="success" />
        </div>
    );
}

export default LoadingSpinner;
