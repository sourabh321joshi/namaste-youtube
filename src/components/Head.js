import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_RESULTS_API } from "../utils/constants";
import { cacheSuggestions } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const isDarkMode = useSelector((state) => state.app.darkMode);
  const cachedSuggestions = useSelector((state) => state.search.suggestionCache);

  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    const timer = setTimeout(async () => {
      if (cachedSuggestions[trimmed]) return;
      try {
        const data = await fetch(YOUTUBE_SEARCH_RESULTS_API(trimmed));
        const json = await data.json();
        const suggestionTitles =
          json?.items
            ?.map((item) => item?.snippet?.title)
            .filter(Boolean)
            .filter((value, index, arr) => arr.indexOf(value) === index)
            .slice(0, 8) || [];
        dispatch(cacheSuggestions({ [trimmed]: suggestionTitles }));
      } catch (error) {
        dispatch(cacheSuggestions({ [trimmed]: [] }));
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, cachedSuggestions, dispatch]);

  const suggestions = useMemo(
    () => cachedSuggestions[searchQuery.trim()] || [],
    [cachedSuggestions, searchQuery]
  );

  useEffect(() => {
    const onClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const onSearch = (term = searchQuery) => {
    if (!term.trim()) return;
    navigate(`/results?search_query=${encodeURIComponent(term.trim())}`);
    setShowSuggestions(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-inherit px-4 py-2 dark:border-gray-800">
      <div className="grid grid-cols-12 items-center gap-3">
        <div className="col-span-3 flex items-center sm:col-span-2">
          <button
            onClick={() => dispatch(toggleMenu())}
            className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="toggle menu"
          >
            ☰
          </button>
          <Link to="/" className="ml-2 text-xl font-bold text-red-600">
            YouTube
          </Link>
        </div>

        <div className="col-span-7 sm:col-span-8">
          <div ref={wrapperRef} className="relative">
            <div className="flex">
              <input
                className="w-full rounded-l-full border border-gray-400 bg-transparent px-4 py-2 outline-none"
                type="text"
                value={searchQuery}
                placeholder="Search"
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
              />
              <button
                onClick={() => onSearch()}
                className="rounded-r-full border border-l-0 border-gray-400 px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                🔍
              </button>
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute mt-2 w-full rounded-xl border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onMouseDown={() => {
                      setSearchQuery(suggestion);
                      onSearch(suggestion);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2 flex items-center justify-end gap-2">
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="rounded-full bg-gray-100 px-3 py-2 text-sm dark:bg-gray-700"
          >
            {isDarkMode ? "Light" : "Dark"}
          </button>
          <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>
      </div>
    </header>
  );
};

export default Head;
