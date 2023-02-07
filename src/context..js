import React, {useState, useContext, useEffect} from 'react';
import { useCallback } from 'react';
const URL = "http://openlibrary.org/search.json?title=";
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("the lost world");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");

    const fetchBooks = useCallback(async() => {
        setLoading(true);
        try{
            const response = await fetch(`${URL}${searchTerm}`);
            const data = await response.json();
            const {docs} = data;

            if(docs){
                const newBooks = docs.slice(0, 10).map((bookSingle) => {
                    const {key, author_name, cover_i, edition_count, first_publish_year, title, latest_modified_year} = bookSingle;

                    return {
                        id: key,
                        author: author_name,
                        cover_id: cover_i,
                        edition_count: edition_count,
                        first_publish_year: first_publish_year,
                        title: title,
                        latest_modified_year: latest_modified_year
                    }
                });

                setBooks(newBooks);

                if(newBooks.length > 1){
                    setResultTitle("Here are the Books that you might be looking for");
                } else {
                    setResultTitle("No Books Found!")
                }
            } else {
                setBooks([]);
                setResultTitle("No Books Found!");
            }
            setLoading(false);
        } catch(error){
            console.log(error);
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchBooks();
    }, [searchTerm, fetchBooks]);

    return (
        <AppContext.Provider value = {{
            loading, books, setSearchTerm, resultTitle, setResultTitle,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};