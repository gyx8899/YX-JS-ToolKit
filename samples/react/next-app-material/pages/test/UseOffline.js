import React from "react";
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  () => import('./_UseOffline.js'),
  { ssr: false }
);

function App() {
  return (
    <div>
      <DynamicComponentWithNoSSR />
    </div>
  )
}

export default App