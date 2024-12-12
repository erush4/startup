import React from 'react';

export function ErrorHandler({ error }) {
    if (error !== null) {
        console.log(error);
        return (
            <div className='error text-danger'>Error: {error.msg}</div>
        );
    }
    return null;
}
