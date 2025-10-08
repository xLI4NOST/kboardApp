'use client'

import {store} from "@/lib/store";
import {Provider} from "react-redux";
import React from "react";

export function Providers({children}: {children: React.ReactNode}) {
    return <Provider store={store}>{children}</Provider>;
}