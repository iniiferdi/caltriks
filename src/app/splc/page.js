'use client';

import { DotBackgroundDemo } from '@/components/BackgroundDots';
import React from 'react';

export default function SplcPage() {
    return (
        <div className="overflow-hidden relative flex flex-col min-h-screen justify-center w-full items-center py-36 bg-black">
            <DotBackgroundDemo />

            <h1 className='text-4xl text-white font-bold mx-auto'>Hello world</h1>
        </div>
    );
}
