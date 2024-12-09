import React from "react";

export function Data({ dataPoints }) {
    return (
        <div>
            {dataPoints.map((dataPoint, index) => (
                <p key={index}>
                    {index} {JSON.stringify(dataPoint)}
                </p>
            ))}
        </div>
    );
}
