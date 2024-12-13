import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation to listen to URL changes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import axios to make API requests

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query 사용자가 입력한 검색어를 저장하는 상태
  const [searchResults, setSearchResults] = useState([]); // State to hold search results 관련 검색어 밑으로 뜨게
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const location = useLocation(); // Hook to listen for URL changes

  // Function to handle search query change
  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value); // Update the search query as user types 사용자가 입력하는 텍스트를 계속 추적해서 searchQuery 상태에 저장함
  };

  // Fetch search results as user types 
  useEffect(() => {
    const fetchSearchResults = async () => {
      // 
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: "0e16d9b4af07e316bb36fc1286684dd6", 
            query: searchQuery, // The search query from the input 사용자가 입력한 검색어
            page: 5, 
            // query, page와 같은 이름들은 API에서 정해진 이름. API 설계자가 설정한 것
          },
        });

        // Limit the results to the first 3 movies
        setSearchResults(response.data.results.slice(0, 3)); // Get only the first 3 results
      } catch (error) {
        console.error("Error fetching search results:", error);
      }

      if (searchQuery.trim() === "") {
        setSearchResults([]); // If the query is empty, reset the results. 사용자가 검색어를 입력하지 않으면 검색 결과를 비움. setSearchResults([])로 결과를 빈 배열로 설정하고, 함수 실행을 종료(return)
        return;
      }
    };

    fetchSearchResults();
  }, [searchQuery]); // Fetch results whenever the search query changes. searchQuery가 바뀔 때마다 실행. 즉 사용자가 입력을 하면 이 코드가 실행되서 새로운 영화 데이터 가져옴





  // Function to handle "Enter" key press for submitting the search query
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`); // Redirect to the search page
    }
  };




  // Reset search results when the user navigates to a different page (Search page)
  useEffect(() => {
    if (location.pathname !== '/') {
      setSearchResults([]); // Reset the search results when navigating away from the home page
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname !== '/search') {
      setSearchQuery([]); // Reset the search results when navigating away from the search page
    }
  }, [location]);



  
  return (
    <div className="relative min-w-[10rem]">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="text-xl absolute right-5 top-[10px] cursor-pointer"
        onClick={handleSearchSubmit} // Trigger search on icon click
      />
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInput} // Handle input change
        onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()} // Trigger search on Enter key press
        placeholder="Search movies..."
        className="p-2 border rounded-full border-gray-300"
      />
      
      
      {/* Display search results as suggestions under the input */}
      {searchQuery && searchResults.length > 0 && (
        <div className="absolute top-10 max-w-[13rem] mt-1 bg-white shadow-md max-h-50 overflow-y-auto w-full border rounded">
          {searchResults.map((movie) => (
            <div
              key={movie.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => navigate(`/search?query=${searchQuery}`)} // Trigger navigation when clicked
            >
              {movie.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
