import {
  Box,
  Fab,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
} from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { ICreateDocument, IDocument } from "types/Document.d";
import CreateDocumentPage from "components/documents/CreateDocumentPage";
import SubHeader from "components/layout/SubHeader";
import DocumentsFilter from "components/documents/DocumentsFilter";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LoadingPage from "components/misc/LoadingPage";
import { useDocuments } from "hooks/useDocuments";
import DocumentHeader from "components/documents/DocumentHeader";
import { useRouter } from "next/router";
import ControlledModal from "components/misc/ControlledModal";
import useAlertStore from "stores/alertStore";
import useUserStore from "stores/userStore";

/**
 * @author Tom Whitticase
 *
 * @description This page displays all documents in a list format. When a document is clicked, the user is redirected to the document page.
 */

// Main component that displays documents
export default function Documents() {
  const { user } = useUserStore(); //current user logged in

  // Loading state and documents data obtained from the hook
  const { loading, documents, createDocument } = useDocuments();

  // Router hook for redirecting to a document page
  const router = useRouter();
  const openDocument = (id: number) => {
    router.push(`/documents/${id}`);
  };

  // States for controlling the create document modal
  const [createDocumentModalOpen, setCreateDocumentModalOpen] = useState(false);

  // States for filter, search and filter modal
  const [filter, setFilter] = useState({
    topic: null,
    category: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  // State for filtered documents
  const [filteredDocuments, setFilteredDocuments] = useState<
    null | IDocument[]
  >(null);

  const handleCreateDocument = (doc: ICreateDocument) => {
    createDocument(doc);
    setCreateDocumentModalOpen(false);
  };

  // Effect hook to update filtered documents based on filter and search
  useEffect(() => {
    if (documents) {
      let newDocuments: IDocument[] = documents;
      if (filter.topic) {
        newDocuments = newDocuments.filter((doc) => doc.topic === filter.topic);
      }
      if (filter.category !== "all") {
        newDocuments = newDocuments.filter(
          (doc) => doc.category === filter.category
        );
      }
      newDocuments = searchDocuments(newDocuments, searchQuery);
      setFilteredDocuments(newDocuments);
    }
  }, [documents, filter, searchQuery]);

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

  return (
    <>
      <Head>
        <title>Make-it-All | Dashboard</title>
      </Head>
      <SubHeader>
        <div className="flex justify-between w-full h-full items-center gap-2 ">
          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              if (documents) {
                setFilteredDocuments(searchDocuments(documents, searchQuery));
              }
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              value={searchQuery}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() => {
                        if (documents) {
                          setFilteredDocuments(
                            searchDocuments(documents, searchQuery)
                          );
                        }
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setSearchQuery("");
                        if (documents) {
                          setFilteredDocuments(searchDocuments(documents, ""));
                        }
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size="small"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <ToggleButton
            sx={{ display: "flex", gap: 1 }}
            size="small"
            value="check"
            selected={filterOpen}
            onChange={() => {
              setFilterOpen(!filterOpen);
              setFilter({ topic: null, category: "all" });
            }}
          >
            <FilterListIcon />
            Filter
          </ToggleButton>
          {isManagerOrAdmin && (
            <ControlledModal
              open={createDocumentModalOpen}
              setOpen={setCreateDocumentModalOpen}
              title="New Document"
              button={
                <div className="z-[100] fixed bottom-4 mobile-only:bottom-20 right-8">
                  <div className="z-[100] fixed bottom-4 mobile-only:bottom-20 right-8">
                    <Fab
                      size={"medium"}
                      color="primary"
                      aria-label="add"
                      variant={"extended"}
                    >
                      New Document <PostAddIcon sx={{ marginLeft: 1 }} />
                    </Fab>
                  </div>
                </div>
              }
            >
              <CreateDocumentPage
                handleCreateDocument={handleCreateDocument}
                loadingCreateDocument={loading}
              />
            </ControlledModal>
          )}
        </div>
      </SubHeader>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex flex-col">
          {!loading && filteredDocuments && documents ? (
            <>
              {filterOpen && (
                <DocumentsFilter documents={documents} setFilter={setFilter} />
              )}
              <div>
                {filteredDocuments.length < 1 ? (
                  <div className="w-full h-full flex items-center justify-center p-4 text-gray-500 text-xl">
                    There are no documents
                  </div>
                ) : (
                  filteredDocuments.map((document, i) => {
                    return (
                      <Box
                        key={i}
                        onClick={() => {
                          openDocument(document.id);
                        }}
                        sx={{
                          cursor: "pointer",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            backgroundColor: "grey.100",
                          },
                        }}
                      >
                        <DocumentHeader doc={document} />
                      </Box>
                    );
                  })
                )}
              </div>
            </>
          ) : (
            <LoadingPage variant="spinner" />
          )}
        </div>
      </Box>
    </>
  );
}

// Define the searchDocuments function that takes in an array of documents and a search query
function searchDocuments(documents: IDocument[], query: string): IDocument[] {
  // Use the filter method to extract all documents that contain the query in either the title or the body
  const relevantDocuments = documents.filter(
    (document) =>
      // Check if either the title or the body contains the query, case-insensitive
      document.title.toLowerCase().includes(query.toLowerCase()) ||
      document.body.toLowerCase().includes(query.toLowerCase())
  );

  const calcRelevance = (document: IDocument, query: string) => {
    // Calculate the relevance of a document as the number of times the query appears in the title or body
    const titleRelevance = document.title
      .toLowerCase()
      .split(query.toLowerCase()).length;
    const bodyRelevance = document.body
      .toLowerCase()
      .split(query.toLowerCase()).length;
    //apply extra weighting to the title
    return titleRelevance * 4 + bodyRelevance;
  };

  // Sort the relevant documents based on their relevance
  return relevantDocuments.sort((a, b) => {
    // Calculate the relevance of each document as the number of times the query appears in the title or body
    const aRelevance = calcRelevance(a, query);
    const bRelevance = calcRelevance(a, query);
    // Return the difference in relevance, with higher relevance documents coming first
    return bRelevance - aRelevance;
  });
}
