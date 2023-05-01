import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import getChatInfo from "pages/api/chat/getChatInfo";

type HeadingProps = { title: String };

const Heading = ({ title }: HeadingProps): ReactElement => {
  return (
    <div>
      <p>{title}</p>
    </div>
  );
};
export default Heading;
