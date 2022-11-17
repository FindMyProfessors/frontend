"use client";

/* 
  This component will be deleted once Next 13 fixes client-side routing
*/

import { useEffect } from "react";

const SetTitle = ({ title }: { title: string }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export default SetTitle;
