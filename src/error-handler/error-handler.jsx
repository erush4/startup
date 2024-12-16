import React from 'react';

export function ErrorHandler({ error }) {
    if (error !== null) {
        console.error(error);
        return (
            <div className='error text-danger'>Error: {error}</div>
        );
    }
    return null;
}
