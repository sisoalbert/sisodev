import React from "react";

function SisoDevIcon() {
  return (
    <svg
      width={35}
      height={35}
      viewBox="0 0 1024 1024" // Keep the viewBox attribute for proper scaling
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1024" height="1024" rx={512} fill="white" />

      <path
        d="M821.696 535C714.443 494.909 506.413 495.613 397 501.239C450.987 406.991 649.658 194.58 769.149 221.307C864.742 242.689 847.61 435.828 821.696 535Z"
        fill="#0468BF"
        fillOpacity={0.55}
        stroke="#0468BF"
        strokeOpacity={0.5}
      />
      <path
        d="M203.298 534C310.52 494.034 517.619 496.621 627 502.23C573.029 408.275 375.285 194.637 255.829 221.281C160.265 242.597 177.392 435.136 203.298 534Z"
        fill="#158FBF"
        fillOpacity={0.55}
        stroke="#0468BF"
        strokeOpacity={0.5}
      />
      <ellipse
        cx={510}
        cy={706.5}
        rx={100}
        ry={97.5}
        fill="#409CCC"
        fillOpacity={0.5}
      />
      <ellipse
        cx={497}
        cy={692.5}
        rx={100}
        ry={97.5}
        fill="#409CCC"
        fillOpacity={0.5}
      />
    </svg>
  );
}

export default SisoDevIcon;
