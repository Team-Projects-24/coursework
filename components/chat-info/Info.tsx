import { ReactElement } from "react";

type InfoProps = { title: string };

const Info = ({ title }: InfoProps): ReactElement => {
  return (
    <div>
      <p>{title}</p>
    </div>
  );
};
export default Info;
