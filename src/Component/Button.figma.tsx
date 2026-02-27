import React from "react";
import { Button } from "./Button";
import figma from "@figma/code-connect";

figma.connect(
  Button,
  "https://www.figma.com/design/9qaQlSYuimzQjuH2GXNE8b/Code-connect--Test?node-id=1-10&m=dev",
  {
    props: {
      text: figma.string("Text"),
      variant: figma.enum("Type", {
        Primary: "primary",
        Secondary: "secondary",
      }),
      icon: figma.enum("Icon", {
        Yes: true,
        No: false,
      }),
    },
    example: (props) => (
      <Button variant={props.variant} icon={props.icon} text={props.text} />
    ),
  },
);
