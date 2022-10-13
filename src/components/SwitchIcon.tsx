import * as React from "react"
import {SVGProps} from "react";

const SwitchIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        stroke="currentColor"
        {...props}
    >
        <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3M21.49 15a9 9 0 0 1-14.85 3" />
    </svg>
)

export default SwitchIcon
