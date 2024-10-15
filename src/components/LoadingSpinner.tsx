import { Spinner } from '@material-tailwind/react';

function LoadingSpinner() {
    return (
        <div className="flex justify-center">
            <Spinner size="xl" color="success" />
        </div>
    );
}

export default LoadingSpinner;
