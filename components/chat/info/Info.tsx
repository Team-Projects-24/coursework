import { ReactElement } from "react";

interface InfoProps {
  name: string;
  description: string;
  chatImage: string;
}

export default function Info(props: InfoProps) {
  return (
    <>
      <p>{props.name}</p>
      <img src={props.chatImage} alt="image" />
      <p>{props.description}</p>
    </>
  );
}
