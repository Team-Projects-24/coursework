import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDocuments } from "hooks/useDocuments";
import Document from "components/documents/Document";
import LoadingPage from "components/misc/LoadingPage";
import Modal from "components/misc/Modal";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import EditDocument from "components/documents/EditDocumentPage";
import ShareDocumentButton from "components/documents/ShareDocumentButton";
import Box from "@mui/material/Box";
import SubHeader from "components/layout/SubHeader";
import { useState, useEffect } from "react";
import useUserStore from "stores/userStore";

/**
 * @author Tom Whitticase
 *
 * @description This page displays a document. It also contains the edit and share buttons.
 */

export default function DocumentPage() {
  const router = useRouter();
  const { id } = router.query;
  const [url, setUrl] = useState<string>("");

  // Get the document data from the hook
  const {
    loading,
    document,
    editDocument,
    loadingEditDocument,
    deleteDocument,
    loadingDeleteDocument,
  } = useDocuments(parseInt(id as string));

  //get the current url when page loads so it can be shared
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const { user } = useUserStore();

  //state for identifying if a user is an admin or manager
  const [isManagerOrAdmin, setIsManagerOrAdmin] = useState(false);
  //when user changes update this state
  useEffect(() => {
    if (user) {
      if (user.role === "admin" || user.role === "manager") {
        setIsManagerOrAdmin(true);
      } else {
        setIsManagerOrAdmin(false);
      }
    }
  }, [user]);
  // The main document page
  const documentPage = (
    <>
      {document && (
        <>
          <SubHeader>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link href="/documents">
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <Box sx={{ display: "flex", gap: 1 }}>
                {isManagerOrAdmin && (
                  <Modal
                    title="Edit Document"
                    button={
                      <Button variant="outlined" startIcon={<EditIcon />}>
                        Edit
                      </Button>
                    }
                  >
                    <>
                      <EditDocument
                        editDocument={editDocument}
                        loadingEditDocument={loadingEditDocument}
                        deleteDocument={deleteDocument}
                        loadingDeleteDocument={loadingDeleteDocument}
                        document={document}
                      />
                    </>
                  </Modal>
                )}
                <ShareDocumentButton documentUrl={url} />
              </Box>
            </Box>
          </SubHeader>
          <Document document={document} />
        </>
      )}
    </>
  );

  // If the document is loading, display the loading page, else display the document page
  return <>{loading ? <LoadingPage variant={"spinner"} /> : documentPage}</>;
}
