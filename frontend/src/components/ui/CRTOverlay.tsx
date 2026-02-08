"use client";

import React from "react";

const CRTOverlay = () => {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">

            {/* Matrix Scanlines */}
            <div className="absolute inset-0 matrix-scanlines animate-[matrixScan_14s_linear_infinite]" />

            {/* Digital Noise */}
            <div className="absolute inset-0 matrix-noise" />

            {/* Soft Vignette */}
            <div className="absolute inset-0 matrix-vignette" />

        </div>
    );
};

export default CRTOverlay;
