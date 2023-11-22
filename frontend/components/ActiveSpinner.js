import Spinner from "./Spinner";
import React, { useState, useEffect } from "react";




function ActiveSpinner() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulating an asynchronous operation, such as fetching data
      setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Set a proper time or condition for when to stop loading
    }, []);

    return (
      <div>
        {/* Other content of your component */}
        <Spinner loading={isLoading} />
      </div>
    );
  }
