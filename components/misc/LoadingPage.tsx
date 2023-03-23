import { Box } from "@mui/material";
import ContentLoader, { Facebook } from "react-content-loader";
import ClipLoader from "react-spinners/ClipLoader";

/**
 * @author Tom Whitticase
 *
 * @description This component provides a loading page.
 */

interface IProps {
  variant?: string;
}
export default function LoadingPage({ variant = "documents" }: IProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {variant === "documents" && (
        <Box sx={{ padding: 2 }}>
          {[...Array(3)].map((e, i) => (
            <Facebook key={i} />
          ))}
        </Box>
      )}
      {variant === "grid" && (
        <ContentLoader width={"100%"} height={"100%"}>
          <rect x="10" y="10" rx="5" ry="5" width="260" height="140" />
          <rect x="280" y="10" rx="5" ry="5" width="260" height="280" />
          <rect x="550" y="10" rx="5" ry="5" width="260" height="140" />
          <rect x="10" y="160" rx="5" ry="5" width="260" height="280" />
          <rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
          <rect x="550" y="160" rx="5" ry="5" width="260" height="280" />
        </ContentLoader>
      )}
      {variant === "table" && (
        <ContentLoader width={"100%"} height={"100%"}>
          <rect x="978" y="30" rx="10" ry="10" width="169" height="19" />
          <rect x="852" y="30" rx="10" ry="10" width="85" height="19" />
          <rect x="731" y="31" rx="10" ry="10" width="85" height="19" />
          <rect x="27" y="31" rx="4" ry="4" width="20" height="20" />
          <rect x="402" y="32" rx="10" ry="10" width="85" height="19" />
          <rect x="67" y="32" rx="10" ry="10" width="85" height="19" />
          <rect x="188" y="33" rx="10" ry="10" width="169" height="19" />
          <rect x="523" y="33" rx="10" ry="10" width="169" height="19" />

          <rect x="978" y="84" rx="10" ry="10" width="169" height="19" />
          <rect x="852" y="84" rx="10" ry="10" width="85" height="19" />
          <rect x="731" y="85" rx="10" ry="10" width="85" height="19" />
          <rect x="27" y="85" rx="4" ry="4" width="20" height="20" />
          <rect x="402" y="86" rx="10" ry="10" width="85" height="19" />
          <rect x="67" y="86" rx="10" ry="10" width="85" height="19" />
          <rect x="188" y="87" rx="10" ry="10" width="169" height="19" />
          <rect x="523" y="87" rx="10" ry="10" width="169" height="19" />

          <rect x="978" y="138" rx="10" ry="10" width="169" height="19" />
          <rect x="852" y="138" rx="10" ry="10" width="85" height="19" />
          <rect x="731" y="139" rx="10" ry="10" width="85" height="19" />
          <rect x="27" y="139" rx="4" ry="4" width="20" height="20" />
          <rect x="402" y="140" rx="10" ry="10" width="85" height="19" />
          <rect x="67" y="140" rx="10" ry="10" width="85" height="19" />
          <rect x="188" y="141" rx="10" ry="10" width="169" height="19" />
          <rect x="523" y="141" rx="10" ry="10" width="169" height="19" />

          <rect x="851" y="195" rx="10" ry="10" width="85" height="19" />
          <rect x="977" y="195" rx="10" ry="10" width="169" height="19" />
          <rect x="730" y="196" rx="10" ry="10" width="85" height="19" />
          <rect x="26" y="196" rx="4" ry="4" width="20" height="20" />
          <rect x="66" y="197" rx="10" ry="10" width="85" height="19" />
          <rect x="401" y="197" rx="10" ry="10" width="85" height="19" />
          <rect x="187" y="198" rx="10" ry="10" width="169" height="19" />
          <rect x="522" y="198" rx="10" ry="10" width="169" height="19" />

          <rect x="977" y="257" rx="10" ry="10" width="169" height="19" />
          <rect x="851" y="257" rx="10" ry="10" width="85" height="19" />
          <rect x="26" y="258" rx="4" ry="4" width="20" height="20" />
          <rect x="730" y="258" rx="10" ry="10" width="85" height="19" />
          <rect x="66" y="259" rx="10" ry="10" width="85" height="19" />
          <rect x="401" y="259" rx="10" ry="10" width="85" height="19" />
          <rect x="187" y="260" rx="10" ry="10" width="169" height="19" />
          <rect x="522" y="260" rx="10" ry="10" width="169" height="19" />

          <rect x="977" y="315" rx="10" ry="10" width="169" height="19" />
          <rect x="851" y="315" rx="10" ry="10" width="85" height="19" />
          <rect x="730" y="316" rx="10" ry="10" width="85" height="19" />
          <rect x="26" y="316" rx="4" ry="4" width="20" height="20" />
          <rect x="66" y="317" rx="10" ry="10" width="85" height="19" />
          <rect x="401" y="317" rx="10" ry="10" width="85" height="19" />
          <rect x="187" y="318" rx="10" ry="10" width="169" height="19" />
          <rect x="522" y="318" rx="10" ry="10" width="169" height="19" />
        </ContentLoader>
      )}
      {variant === "spinner" && (
        <ClipLoader
          className="fixed top-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2"
          color="#eebe0e"
        />
      )}
    </Box>
  );
}
