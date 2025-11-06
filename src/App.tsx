import { useState, useEffect } from "react";
import "./App.css";
import Intro from "./Pages/Intro";
import Main from "./Pages/Main";
import LoadingScreen from "./LoadingScreen/loadingscreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - adjust duration as needed
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // Show loading screen while isLoading is true
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show main content after loading is complete
  return (
    <>
      <div>
        <Intro />
        <Main />
      </div>
    </>
  );
}

export default App;

// import "./App.css";
// import Intro from "./Pages/Intro";
// import Main from "./Pages/Main";
// import LoadingScreen from "./LoadingScreen/loadingscreen";

// function App() {
//   return (
//     <>
//       <div>
//         <LoadingScreen/>
//         <Intro />
//         <Main />
//       </div>
//     </>
//   );
// }

// export default App;
