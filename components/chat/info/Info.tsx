import { ReactElement } from "react";

interface InfoProps {
  name: string;
  description: string;
  chatImage: string;
}

export default function Info(props: InfoProps) {
  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "2rem",
            padding: "0.2rem",
            textTransform: "uppercase",
          }}
        >
          {props.name}
        </p>
        {/*<img src={props.chatImage} alt="image" />    */}{" "}
      </div>
      <p
        style={{
          fontSize: "1.1rem",
        }}
      >
        {props.description}
      </p>
    </>
  );
}
