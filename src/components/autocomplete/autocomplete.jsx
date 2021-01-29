import { useState, useEffect, createContext, useContext, useReducer, useMemo  } from 'react';

const STARWARS_URL = 'https://swapi.dev/api/people/?search=';
const fetchSearchData = async(url, searchParam) => {
    const response = await fetch(`${url}${searchParam}`);
    const data = await response.json();
    return data.results;
};

const useDebounce = (value, delay, fn) => {
    const [debouncedVal, setDebouncedVal] = useState(null);

    useEffect(() => {
        const debounce = setTimeout(() => {
            // if (fn) fn();
            setDebouncedVal(value);
            return () => {
                clearTimeout(debounce);
            }
        }, delay)
    }, [value])

    return [debouncedVal];
}

const useThrottle = (value, delay) => {
    return value;
}
const initialState = {
    searchParam: '',
    searchList: [],
    cacheSearch: {},
}

const SET_SEARCH_PARAM = 'SET_SEARCH_PARAM';
const SET_SEARCH_LIST = 'SET_SEARCH_LIST';
const CACHE_SEARCH = 'CACHE_SEARCH';
const SearchReducer = (state, action) => {
    switch (action.type) {
        case SET_SEARCH_PARAM:
            return {
                ...state,
                searchParam: action.value,
            }
        case SET_SEARCH_LIST:
            return {
                ...state,
                searchList: action.list,
            }
        case CACHE_SEARCH:
            return {
                ...state,
                cacheSearch: {
                    ...state.cacheSearch,
                    [action.value]: action.list
                }
            }
        default:
            return 'Action not permitted';
    }
}

const SearchContext = createContext(null);
const SearchProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, initialState);
    const { searchParam, searchList, cacheSearch } = state;
    const setSearchParam = (value) => dispatch({
        type: SET_SEARCH_PARAM,
        value,
    })

    const setSearchList = (list) => dispatch({
        type: SET_SEARCH_LIST,
        list,
    })

    const setCacheSearch = (value, list) => dispatch({
        type: CACHE_SEARCH,
        value,
        list,
    })

    const fetchSearchData = async(url, searchParam) => {
        const response = await fetch(`${url}${searchParam}`);
        const data = await response.json();
        return data.results;
    };

    useEffect(() => {
        if (!searchParam) {
            setSearchList([]);
        } else if (cacheSearch[searchParam]) {
            setSearchList(cacheSearch[searchParam]);
        } else {
            const data = fetchSearchData(STARWARS_URL, searchParam);
            setSearchList(data);
            setCacheSearch(searchParam, data);
        };
    }, [searchParam, cacheSearch])
    // const [searchParam, setSearchParam] = useState('');
    // const [searchList, setSearchList] = useState([]);
    // const [cacheSearch, setCacheSearch] = useState({});
    // const [debounced] = useDebounce(searchParam, 5000, () => console.log('hello, this is the dbounced function'))
    console.count(searchParam)
    return (
        <SearchContext.Provider value={{
            searchParam,
            setSearchParam,
            searchList,
            setSearchList,
            cacheSearch,
            setCacheSearch,
        }}
        >
            {children}
        </SearchContext.Provider>
    )
}

const centerStyles = {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
}
const AutoComplete = () => {
    const [searchParam, setSearchParam] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [cacheSearch, setCacheSearch] = useState({});
    return (
        <div className="autocomplete" style={centerStyles}>
            <SearchProvider>
                <Search
                    searchParam={searchParam}
                    setSearchParam={setSearchParam}
                    setSearchList={setSearchList}
                    cacheSearch={cacheSearch}
                    setCacheSearch={setCacheSearch}
                />
                <SearchList
                    searchList={searchList}
                    setSearchParam={setSearchParam}
                    setSearchList={setSearchList}
                />
            </SearchProvider>
        </div>
    )
};

const Search = ({
    searchParam,
    setSearchList,
    setSearchParam,
    cacheSearch,
    setCacheSearch
}) => {
    // const [searchParam, setSearchParam] = useState('')
    // const { searchParam, setSearchParam, setSearchList, cacheSearch, setCacheSearch } = useContext(SearchContext);
    return (
        <div className="search">
            <input
                type="text"
                placeholder="Search me..."
                value={searchParam}
                onChange={async(e) => {
                    const param = e.target.value.trim();
                    // setSearchParam(param);
                    setSearchParam(e.target.value);
                    if (!param) {
                        return setSearchList([]);
                    } else if (cacheSearch[param]) {
                        return setSearchList(cacheSearch[param]);
                    } else {
                        const data = await fetchSearchData(STARWARS_URL, param);
                        setSearchList(data);
                        return setCacheSearch(param, data);
                    };
                }}
            />
        </div>
    )
}

const SearchList = ({
    setSearchParam,
    setSearchList,
    searchList,
}) => {
    // const { searchList, setSearchParam, setSearchList } = useContext(SearchContext);
    return (
        <div className="searchList" style={centerStyles}>
            {!searchList?.length ? 'No searches made' : (
                searchList.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setSearchParam(item.name);
                            setSearchList([]);
                        }}
                    >
                        {item.name}
                    </button>
                ))
            )}
        </div>
    )
}

export default AutoComplete;