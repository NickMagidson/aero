"use client";

import React from "react";
import { Viewer } from "resium";
import { Ion } from "cesium";

// Initialize Cesium Ion API (optional, can use local assets)
Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_API_KEY || "";

const Map2: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <Viewer
        full
        timeline={false}
        animation={false}
      />
    </div>
  );
};

export default Map2;
