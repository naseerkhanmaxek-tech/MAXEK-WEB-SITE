import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const EnquiryContext = createContext(null);

export const EnquiryProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState({});

  const openEnquiry = useCallback((defaults = {}) => {
    setPrefill(defaults || {});
    setOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, prefill, openEnquiry, closeEnquiry }),
    [open, prefill, openEnquiry, closeEnquiry]
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
};

export const useEnquiry = () => {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
};
