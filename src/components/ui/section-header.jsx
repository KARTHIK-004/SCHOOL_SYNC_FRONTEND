import React from "react";
import SmallTitle from "./small-title";

export default function SectionHeader({ logo, title, heading, description }) {
  return (
    <>
      <SmallTitle logo={logo} title={title} />
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
        {heading}
      </h2>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        {description}
      </p>
    </>
  );
}
